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

function parseJsonSafely(raw: string): any {
  let txt = raw.trim();

  if (txt.startsWith("```")) {
    txt = txt.replace(/^```[a-zA-Z]*\s*/, "");
    txt = txt.replace(/```$/, "");
  }

  try {
    return JSON.parse(txt);
  } catch (e) {
    console.error("Failed to parse LLM JSON:", e);
    return {};
  }
}

function normSection(val: any): string[] {
  if (!Array.isArray(val)) return [];

  return val
    .map((item) => {
      if (typeof item === "string") return item;

      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;

        const titleField = obj.title;
        const detailField = obj.detail;
        const hasTitleField =
          typeof titleField === "string" && titleField.trim().length > 0;
        const hasDetailField =
          typeof detailField === "string" && detailField.trim().length > 0;

        if (hasTitleField || hasDetailField) {
          const title = hasTitleField ? (titleField as string).trim() : "";
          const detail = hasDetailField ? (detailField as string).trim() : "";
          if (title && detail) return `${title}: ${detail}`;
          if (title) return title;
          if (detail) return detail;
        }

        const entries = Object.entries(obj);
        const firstEntry = entries[0] as [string, unknown] | undefined;

        if (firstEntry) {
          const [key, value] = firstEntry;
          const title = String(key).trim();
          const detail = String(value ?? "").trim();
          if (title && detail) return `${title}: ${detail}`;
          if (title) return title;
          if (detail) return detail;
        }
      }

      return "";
    })
    .filter((s) => s.trim().length > 0);
}

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

  console.log("[LLM raw meeting prep]:", raw);

  const parsed: any = parseJsonSafely(raw);

  const bucket = context.prospect.roleGuess;

  const safe = {
    header: {
      name:
        parsed?.header?.name ??
        context.prospect.fullName ??
        "Unknown prospect",
      roleLine:
        bucket ??
        parsed?.header?.roleLine ??
        "MARKETING LEADER",
      company:
        parsed?.header?.company ??
        context.company.name ??
        context.prospect.companyNameGuess ??
        "Customer",
    },
    painPoints: normSection(parsed?.painPoints),
    talkingPoints: normSection(parsed?.talkingPoints),
    approach: normSection(parsed?.approach),
    tips: normSection(parsed?.tips),
    toneSummary:
      typeof parsed?.toneSummary === "string" ? parsed.toneSummary : "",
  };

  return MeetingPrepSchema.parse(safe);
}
