import { z } from "zod";
import { meetingPrepModel } from "./openaiClient.js";
import { meetingPrepPrompt } from "./prompts/meetingPrepPrompt.js";
import type { ResearchContext } from "../research/researchContext.js";

const MeetingPrepSchema = z.object({
  header: z.object({
    name: z.string(),
    roleLine: z.string(),
    company: z.string(),
  }),
  painPoints: z.array(z.string()),
  talkingPoints: z.array(z.string()),
  approach: z.array(z.string()),
  tips: z.array(z.string()),
  toneSummary: z.string(),
});

export type MeetingPrep = z.infer<typeof MeetingPrepSchema>;

export async function generateMeetingPrep(
  context: ResearchContext
): Promise<MeetingPrep> {
  const json = JSON.stringify(context);
  const messages = await meetingPrepPrompt.formatMessages({
    researchContextJson: json,
  });

  const response = await meetingPrepModel.invoke(messages);

  const raw =
    typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

  const parsed = JSON.parse(raw as string);
  return MeetingPrepSchema.parse(parsed);
}
