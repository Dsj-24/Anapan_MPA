import express, { type Request, type Response } from "express";
import util from "util";
import { listUpcomingEvents } from "./calendar/gcc.js";
import { extractProspect } from "./prospect/extractProspect.js";
import { buildResearchContext } from "./research/researchContext.js";
import { generateMeetingPrep } from "./llm/generateMeetPrep.js";
import { getOrCreateMeetingPrepForEvent } from "./llm/getOrCreatePrep.js";
import type { Prospect } from "./prospect/types.js";


const app = express();
app.set("json spaces", 2);

function isMarketingUseCase(prospect: Prospect): boolean {
    const title = (prospect.meetingTitle || "").toLowerCase();
    const description = (prospect.meetingDescription || "").toLowerCase();
  
    const hasKeyword =
      title.includes("sales") ||
      title.includes("marketing") ||
      description.includes("sales") ||
      description.includes("marketing");
  
    return hasKeyword;
  }
  

app.get("/", async (_req: Request, res: Response) => {
  const events = await listUpcomingEvents();

  const prospects = events.map(extractProspect);

  // print prospect names to console
  prospects.forEach((p) => {
    console.log("Prospect:", p.fullName);
    console.log("Organization:",p.companyNameGuess);
    console.log("Role:",p.roleGuess);

  });

  res.json({
    message: "Hehe",
    prospects,
  });
});

app.get("/prep", async (_req: Request, res: Response) => {
    try {
      const events = await listUpcomingEvents();
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
  
      // Uses Drizzle-backed cache; calls generateMeetingPrep inside if needed
      const { prep, context } = await getOrCreateMeetingPrepForEvent(event);
  
      const text =
        "Prospect: " +
        util.inspect(context.prospect, { depth: null, colors: false }) +
        "\n\nResearchContext built\n" +
        "MeetingPrep: " +
        util.inspect(prep, { depth: null, colors: false }) +
        "\n";
  
      res.type("text/plain").send(text);
    } catch (err) {
      console.error("Error in /prep:", err);
      res
        .status(500)
        .type("text/plain")
        .send("Failed to generate meeting prep\n");
    }
  });

  app.get("/debug/prep/:eventId", async (req: Request, res: Response) => {
    try {
      const events = await listUpcomingEvents();
      const event = events.find((e) => e.id === req.params.eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found in upcoming list" });
      }
  
      const { prep, context } = await getOrCreateMeetingPrepForEvent(event);
      res.json({ prospect: context.prospect, context, prep });
    } catch (err) {
      console.error("Error in /debug/prep/:eventId:", err);
      res.status(500).json({ error: "Failed to generate meeting prep" });
    }
  });

  app.get("/preps", async (_req: Request, res: Response) => {
    try {
      const events = await listUpcomingEvents();
      if (!events.length) {
        return res
          .status(404)
          .json({ error: "No upcoming events found" });
      }
  
      const withProspects = events
        .filter((e) => !!e.id)
        .map((event) => ({
          event,
          prospect: extractProspect(event),
        }));
  
      // filter to marketing / sales use case
      const marketing = withProspects.filter(({ prospect }) =>
        isMarketingUseCase(prospect)
      );
  
      // sort by start time and take top 5
      const top5 = marketing
        .sort((a, b) => {
          const tA = new Date(a.prospect.startTime).getTime();
          const tB = new Date(b.prospect.startTime).getTime();
          return tA - tB;
        })
        .slice(0, 5);
  
      const results = await Promise.all(
        top5.map(async ({ event, prospect }) => {
          const { prep, context } = await getOrCreateMeetingPrepForEvent(event);
  
          return {
            eventId: event.id,
            startTime: prospect.startTime,
            meetingTitle: prospect.meetingTitle,
            prospect: context.prospect,
            prep,
          };
        })
      );
  
      res.json({ meetings: results });
    } catch (err) {
      console.error("Error in /preps:", err);
      res.status(500).json({ error: "Failed to generate meeting preps" });
    }
  });
  
  
  app.get("/debug/prep", async (_req: Request, res: Response) => {
    try {
      const events = await listUpcomingEvents();
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
          message:
            "No qualifying sales/marketing meeting scheduled for this event based on web profile.",
          prospect: context.prospect,
          person: context.person,
          company: context.company,
        });
      }
  
      const prep = await generateMeetingPrep(context);
      console.log("MeetingPrep:", prep);
  
      res.json({ prospect: context.prospect, context, prep });
    } catch (err) {
      console.error("Error in /debug/prep:", err);
      res.status(500).json({ error: "Failed to generate meeting prep" });
    }
  });
  

app.listen(3001);
console.log("HAHA");
