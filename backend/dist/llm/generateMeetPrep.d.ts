import { z } from "zod";
import type { ResearchContext } from "../research/researchContext.js";
declare const MeetingPrepSchema: z.ZodObject<{
    header: z.ZodObject<{
        name: z.ZodString;
        roleLine: z.ZodString;
        company: z.ZodString;
    }, z.core.$strip>;
    painPoints: z.ZodArray<z.ZodString>;
    talkingPoints: z.ZodArray<z.ZodString>;
    approach: z.ZodArray<z.ZodString>;
    tips: z.ZodArray<z.ZodString>;
    toneSummary: z.ZodString;
}, z.core.$strip>;
export type MeetingPrep = z.infer<typeof MeetingPrepSchema>;
export declare function generateMeetingPrep(context: ResearchContext): Promise<MeetingPrep>;
export {};
//# sourceMappingURL=generateMeetPrep.d.ts.map