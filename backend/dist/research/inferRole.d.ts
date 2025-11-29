import type { PersonResearch } from "./personResearch.js";
export type InferredRole = {
    rawRole: string | null;
    roleCategory: string | null;
    isAcceptable: boolean;
};
export declare function inferRoleFromPerson(person: PersonResearch): Promise<InferredRole>;
//# sourceMappingURL=inferRole.d.ts.map