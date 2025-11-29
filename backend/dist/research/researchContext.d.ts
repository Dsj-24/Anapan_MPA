import type { Prospect } from "../prospect/types.js";
import type { PersonResearch } from "./personResearch.js";
import type { CompanyResearch } from "./companyResearch.js";
export type ResearchContext = {
    prospect: Prospect;
    person: PersonResearch;
    company: CompanyResearch;
    isAcceptableMeeting: boolean;
};
export declare function buildResearchContext(prospect: Prospect): Promise<ResearchContext>;
//# sourceMappingURL=researchContext.d.ts.map