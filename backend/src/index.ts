import express, { type Request, type Response } from "express";
import { listUpcomingEvents } from "./calendar/gcc.js";
import { extractProspect } from "./prospect/extractProspect.js";
import { buildResearchContext } from "./research/researchContext.js";
import { generateMeetingPrep } from "./llm/generateMeetPrep.js"; 

const app = express();
app.set("json spaces", 2);

app.get("/", async (_req: Request, res: Response) => {
  const events = await listUpcomingEvents();

  const prospects = events.map(extractProspect);

  // print prospect names to console
  prospects.forEach((p) => {
    console.log("Prospect:", p.fullName);
    console.log("Organization:",p.companyNameGuess);
    console.log("Role:",p.roleGuess);

  });

  app.get("/debug/prep", async (_req: Request, res: Response) => {
    try {
      const events = await listUpcomingEvents();
      if (!events.length) {
        return res.status(404).json({ error: "No upcoming events found" });
      }

      const event = events[0]; // first upcoming event
      if (!event) {
        return res.status(404).json({ error: "No upcoming event found" });
      }
      const prospect = extractProspect(event);
      console.log("Prospect:", prospect);

      const context = await buildResearchContext(prospect);
      console.log("ResearchContext built");
  
      const prep = await generateMeetingPrep(context);
      console.log("MeetingPrep:", prep);
  
      res.json({ prospect, context, prep });
    } catch (err) {
      console.error("Error in /debug/prep:", err);
      res.status(500).json({ error: "Failed to generate meeting prep" });
    }
  });
  

  res.json({
    message: "Hehe",
    prospects,
  });
});

app.listen(3001);
console.log("HAHA");
