import type { Prospect } from "../prospect/types.js";
export type CompanyResearch = {
    companyFound: boolean;
    name?: string;
    industry?: string;
    sizeGuess?: "enterprise" | "midmarket" | "startup";
    keySnippets: string[];
};
export declare function researchCompany(prospect: Prospect): Promise<CompanyResearch>;
//# sourceMappingURL=companyResearch.d.ts.map