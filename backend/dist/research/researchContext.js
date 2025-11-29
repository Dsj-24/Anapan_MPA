import { researchPerson } from "./personResearch.js";
import { researchCompany } from "./companyResearch.js";
import { inferCompanyFromPerson } from "./inferCompany.js";
import { inferRoleFromPerson } from "./inferRole.js";
export async function buildResearchContext(prospect) {
    const person = await researchPerson(prospect);
    const inferredCompany = inferCompanyFromPerson(person);
    console.log("Inferred company from person:", inferredCompany);
    const { rawRole, roleCategory, isAcceptable } = await inferRoleFromPerson(person);
    console.log("Inferred role from person:", rawRole, "bucket:", roleCategory, "acceptable:", isAcceptable);
    const enrichedProspect = {
        ...prospect,
        companyNameGuess: inferredCompany ?? prospect.companyNameGuess,
        // prefer bucket; fall back to raw role; then any previous guess
        roleGuess: roleCategory ?? rawRole ?? prospect.roleGuess,
    };
    const company = await researchCompany(enrichedProspect);
    return {
        prospect: enrichedProspect,
        person,
        company,
        isAcceptableMeeting: isAcceptable,
    };
}
//# sourceMappingURL=researchContext.js.map