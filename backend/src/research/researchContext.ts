import type { Prospect } from "../prospect/types.js";
import type { PersonResearch } from "./personResearch.js";
import type { CompanyResearch } from "./companyResearch.js";
import { researchPerson } from "./personResearch.js";
import { researchCompany } from "./companyResearch.js";
import { inferCompanyFromPerson } from "./inferCompany.js";
import { inferRoleFromPerson } from "./inferRole.js";

export type ResearchContext = {
  prospect: Prospect;
  person: PersonResearch;
  company: CompanyResearch;
  isAcceptableMeeting: boolean;
};

export async function buildResearchContext(
  prospect: Prospect
): Promise<ResearchContext> {
  // 1) Person research first
  const person = await researchPerson(prospect);

  // 2) Infer company from person (as before)
  const inferredCompany = inferCompanyFromPerson(person);
  console.log("Inferred company from person:", inferredCompany);

  const { rawRole, isAcceptable } = await inferRoleFromPerson(person);
  console.log("Inferred role from person:", rawRole, "acceptable:", isAcceptable);
  
  const enrichedProspect: Prospect = {
    ...prospect,
    companyNameGuess: inferredCompany ?? prospect.companyNameGuess,
    roleGuess: rawRole ?? prospect.roleGuess,
  };
  
  const company = await researchCompany(enrichedProspect);
  
  return {
    prospect: enrichedProspect,
    person,
    company,
    isAcceptableMeeting: isAcceptable,
  };
}
