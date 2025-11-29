export type CompanyClassification = {
    name?: string;
    industry: string;
    sizeGuess?: "enterprise" | "midmarket" | "startup";
};
export declare function classifyCompany(snippets: string[]): Promise<CompanyClassification>;
//# sourceMappingURL=classifyCompany.d.ts.map