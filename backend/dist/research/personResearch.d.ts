import type { Prospect } from "../prospect/types.js";
export type PersonResearchSource = {
    url: string;
    snippet: string;
    extractedRole?: string;
    extractedLocation?: string;
};
export type PersonResearch = {
    personFound: boolean;
    fullName?: string;
    primaryTitle?: string;
    primaryCompany?: string;
    seniority?: "CLEVEL" | "VP" | "DIRECTOR" | "MANAGER" | "IC";
    location?: string;
    keywords?: string[];
    linkedinUrl?: string;
    bioSummary?: string;
    sources: PersonResearchSource[];
};
export declare function researchPerson(prospect: Prospect): Promise<PersonResearch>;
//# sourceMappingURL=personResearch.d.ts.map