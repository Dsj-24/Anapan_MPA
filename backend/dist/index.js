import express, {} from "express";
import util from "util";
import { inArray } from "drizzle-orm";
import { listUpcomingEventsForUser, getEventById, getFallbackRefreshToken, } from "./calendar/gcc.js";
import { extractProspect } from "./prospect/extractProspect.js";
import { buildResearchContext } from "./research/researchContext.js";
import { generateMeetingPrep } from "./llm/generateMeetPrep.js";
import { getOrCreateMeetingPrepForEvent } from "./llm/getOrCreatePrep.js";
import { upsertUserRefreshToken, getRefreshTokenForUser, } from "./auth/tokenStore.js";
import { db } from "./db/drizzle.js";
import { meetingPrep } from "./db/schema.js";
import { PORT } from "./config/env.js";
const app = express();
app.set("json spaces", 2);
app.use(express.json());
function isMarketingUseCase(prospect) {
    const title = (prospect.meetingTitle || "").toLowerCase();
    const description = (prospect.meetingDescription || "").toLowerCase();
    const hasKeyword = title.includes("sales") ||
        title.includes("marketing") ||
        description.includes("sales") ||
        description.includes("marketing");
    return hasKeyword;
}
const CALENDAR_LOOKAHEAD_LIMIT = 20;
const DASHBOARD_LIMIT = 6;
function normalizeEmail(raw) {
    return raw?.trim().toLowerCase();
}
function requireUserEmail(req) {
    const email = normalizeEmail(req.header("x-user-email"));
    if (!email) {
        throw Object.assign(new Error("MISSING_EMAIL"), { code: "MISSING_EMAIL" });
    }
    return email;
}
// STRICT: per-user calendar only. No fallback here.
async function requireRefreshTokenForEmail(email) {
    const row = await getRefreshTokenForUser(email);
    if (row?.refreshToken) {
        return row.refreshToken;
    }
    throw Object.assign(new Error("NO_REFRESH_TOKEN"), {
        code: "NO_REFRESH_TOKEN",
    });
}
async function listMarketingEvents(refreshToken) {
    const events = await listUpcomingEventsForUser(refreshToken, CALENDAR_LOOKAHEAD_LIMIT);
    const pairs = events
        .map((event) => {
        const prospect = extractProspect(event);
        return { event, prospect };
    })
        .filter((pair) => Boolean(pair.prospect && pair.prospect.startTime))
        .filter(({ prospect }) => isMarketingUseCase(prospect));
    return pairs;
}
async function getEventForUser(refreshToken, eventId) {
    return getEventById(refreshToken, eventId);
}
/**
 * Debug route using ONLY the global fallback token, if configured.
 * This is for your own testing; it is NOT used by the main app flow.
 */
app.get("/", async (_req, res) => {
    const fallback = getFallbackRefreshToken();
    if (!fallback) {
        return res
            .status(400)
            .json({ error: "No fallback refresh token configured for debug route." });
    }
    const events = await listUpcomingEventsForUser(fallback, 10);
    const prospects = events.map(extractProspect);
    prospects.forEach((p) => {
        console.log("Prospect:", p.fullName);
        console.log("Organization:", p.companyNameGuess);
        console.log("Role:", p.roleGuess);
    });
    res.json({
        message: "Debug prospect extraction",
        prospects,
    });
});
/**
 * Called from NextAuth signIn callback to store per‑user refresh tokens.
 */
app.post("/auth/google-token", async (req, res) => {
    const email = normalizeEmail(req.body?.email);
    const refreshToken = req.body?.refreshToken;
    if (!email || !refreshToken) {
        return res
            .status(400)
            .json({ error: "Both email and refreshToken are required." });
    }
    try {
        await upsertUserRefreshToken({ email, refreshToken });
        res.json({ stored: true });
    }
    catch (err) {
        console.error("Error upserting user refresh token", err);
        res.status(500).json({ error: "Failed to store refresh token" });
    }
});
/**
 * Debug: use fallback token to get first upcoming event and generate prep.
 */
app.get("/prep", async (_req, res) => {
    try {
        const fallback = getFallbackRefreshToken();
        if (!fallback) {
            return res
                .status(400)
                .type("text/plain")
                .send("No fallback refresh token configured\n");
        }
        const events = await listUpcomingEventsForUser(fallback, 5);
        if (!events.length) {
            return res
                .status(404)
                .type("text/plain")
                .send("No upcoming events found\n");
        }
        const event = events[0];
        if (!event) {
            return res.status(404).type("text/plain").send("No event found\n");
        }
        const { prep, context } = await getOrCreateMeetingPrepForEvent(event);
        const text = "Prospect: " +
            util.inspect(context.prospect, { depth: null, colors: false }) +
            "\n\nResearchContext built\n" +
            "MeetingPrep: " +
            util.inspect(prep, { depth: null, colors: false }) +
            "\n";
        res.type("text/plain").send(text);
    }
    catch (err) {
        console.error("Error in /prep:", err);
        res
            .status(500)
            .type("text/plain")
            .send("Failed to generate meeting prep\n");
    }
});
/**
 * Debug: one event via fallback.
 */
app.get("/debug/prep/:eventId", async (req, res) => {
    try {
        const fallback = getFallbackRefreshToken();
        if (!fallback) {
            return res
                .status(400)
                .json({ error: "No fallback refresh token configured for debug route." });
        }
        const eventId = req.params.eventId;
        if (!eventId) {
            return res.status(400).json({ error: "Missing event id." });
        }
        const event = await getEventForUser(fallback, eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        const { prep, context } = await getOrCreateMeetingPrepForEvent(event);
        res.json({ prospect: context.prospect, context, prep });
    }
    catch (err) {
        console.error("Error in /debug/prep/:eventId:", err);
        res.status(500).json({ error: "Failed to generate meeting prep" });
    }
});
/**
 * Main dashboard endpoint: per‑user meetings.
 * Uses only that user's stored refresh token.
 */
app.get("/preps", async (req, res) => {
    try {
        const email = requireUserEmail(req);
        const refreshToken = await requireRefreshTokenForEmail(email);
        const events = await listMarketingEvents(refreshToken);
        const limited = events
            .filter(({ event }) => !!event.id)
            .sort((a, b) => new Date(a.prospect.startTime).getTime() -
            new Date(b.prospect.startTime).getTime())
            .slice(0, DASHBOARD_LIMIT);
        const eventIds = limited
            .map(({ event }) => event.id)
            .filter((id) => Boolean(id));
        const existingPreps = eventIds.length
            ? await db
                .select({ eventId: meetingPrep.eventId })
                .from(meetingPrep)
                .where(inArray(meetingPrep.eventId, eventIds))
            : [];
        const readySet = new Set(existingPreps.map((row) => row.eventId));
        const meetings = limited.map(({ event, prospect }) => ({
            eventId: event.id,
            startTime: prospect.startTime,
            meetingTitle: prospect.meetingTitle,
            prospect,
            prepStatus: readySet.has(event.id) ? "ready" : "pending",
        }));
        res.json({
            meetings,
            recommendation: meetings.length === 0
                ? 'You have no upcoming Sales/Marketing meetings. Create one in Google Calendar with "Sales" or "Marketing" in the title to see it here.'
                : undefined,
        });
    }
    catch (err) {
        if (err.code === "MISSING_EMAIL") {
            return res.status(400).json({ error: "Missing user email header." });
        }
        if (err.code === "NO_REFRESH_TOKEN") {
            // User has never granted Calendar access → no meetings instead of using someone else's token
            return res.json({
                meetings: [],
                recommendation: "We couldn’t access your Google Calendar. Please re‑sign in and accept the calendar permission.",
            });
        }
        console.error("Error in /preps:", err);
        res.status(500).json({ error: "Failed to generate meeting preps" });
    }
});
/**
 * Detail endpoint – generate & return prep for a specific event.
 * Again, strictly per user.
 */
app.get("/meetings/:eventId/prep", async (req, res) => {
    try {
        const email = requireUserEmail(req);
        const refreshToken = await requireRefreshTokenForEmail(email);
        const eventId = req.params.eventId;
        if (!eventId) {
            return res.status(400).json({ error: "Missing event id." });
        }
        const event = await getEventForUser(refreshToken, eventId);
        if (!event) {
            return res
                .status(404)
                .json({ error: "Event not found or no longer upcoming." });
        }
        const { prep, context } = await getOrCreateMeetingPrepForEvent(event);
        const startTime = context.prospect.startTime || event.start?.dateTime || "";
        res.json({
            eventId: event.id,
            meetingTitle: context.prospect.meetingTitle,
            startTime,
            prospect: context.prospect,
            prep,
        });
    }
    catch (err) {
        if (err.code === "MISSING_EMAIL") {
            return res.status(400).json({ error: "Missing user email header." });
        }
        if (err.code === "NO_REFRESH_TOKEN") {
            return res.status(403).json({
                error: "Google Calendar access not granted for this user. Please re‑connect.",
            });
        }
        console.error("Error in /meetings/:eventId/prep:", err);
        res.status(500).json({ error: "Failed to generate meeting prep" });
    }
});
/**
 * Debug: first upcoming event via fallback, through full research pipeline.
 */
app.get("/debug/prep", async (_req, res) => {
    try {
        const fallback = getFallbackRefreshToken();
        if (!fallback) {
            return res.status(400).json({
                error: "No fallback refresh token configured for debug route.",
            });
        }
        const events = await listUpcomingEventsForUser(fallback, 5);
        if (!events.length) {
            return res.status(404).json({ error: "No upcoming events found" });
        }
        const event = events[0];
        if (!event) {
            return res.status(404).json({ error: "No event found" });
        }
        const prospect = extractProspect(event);
        console.log("Prospect:", prospect);
        const context = await buildResearchContext(prospect);
        console.log("ResearchContext built");
        if (!context.isAcceptableMeeting) {
            return res.status(200).json({
                message: "No qualifying sales/marketing meeting scheduled for this event based on web profile.",
                prospect: context.prospect,
                person: context.person,
                company: context.company,
            });
        }
        const prep = await generateMeetingPrep(context);
        console.log("MeetingPrep:", prep);
        res.json({ prospect: context.prospect, context, prep });
    }
    catch (err) {
        console.error("Error in /debug/prep:", err);
        res.status(500).json({ error: "Failed to generate meeting prep" });
    }
});
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map