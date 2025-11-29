import type { calendar_v3 } from "googleapis";
import { type MeetingPrep } from "./generateMeetPrep.js";
import type { ResearchContext } from "../research/researchContext.js";
export type MeetingPrepRecord = {
    prep: MeetingPrep;
    context: ResearchContext;
};
export declare function getOrCreateMeetingPrepForEvent(event: calendar_v3.Schema$Event): Promise<MeetingPrepRecord>;
//# sourceMappingURL=getOrCreatePrep.d.ts.map