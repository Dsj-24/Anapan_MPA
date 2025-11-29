import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { meetingPrep } from "../db/schema.js";
import { extractProspect } from "../prospect/extractProspect.js";
import { buildResearchContext } from "../research/researchContext.js";
import { generateMeetingPrep } from "./generateMeetPrep.js";
export async function getOrCreateMeetingPrepForEvent(event) {
    if (!event.id)
        throw new Error("Event is missing id");
    // 1. Check DB first
    const existingRows = await db
        .select()
        .from(meetingPrep)
        .where(eq(meetingPrep.eventId, event.id))
        .limit(1);
    const existing = existingRows[0];
    if (existing) {
        return {
            prep: existing.prepJson,
            context: existing.contextJson,
        };
    }
    // 2. Generate fresh prep
    const prospect = extractProspect(event);
    const context = await buildResearchContext(prospect);
    const prep = await generateMeetingPrep(context);
    // 3. Persist
    await db.insert(meetingPrep).values({
        eventId: event.id,
        fullName: prospect.fullName,
        email: prospect.email,
        company: prep.header.company,
        roleLine: prep.header.roleLine,
        meetingTitle: prospect.meetingTitle,
        startTime: new Date(prospect.startTime),
        prepJson: prep,
        contextJson: context,
    });
    return { prep, context };
}
//# sourceMappingURL=getOrCreatePrep.js.map