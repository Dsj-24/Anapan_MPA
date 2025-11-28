import type { Prospect } from "../prospect/types.js";
import type { PersonResearch } from "./personResearch.js";
import type { CompanyResearch } from "./companyResearch.js";
import { researchPerson } from "./personResearch.js";
import { researchCompany } from "./companyResearch.js";

export type ResearchContext = {
  prospect: Prospect;
  person: PersonResearch;
  company: CompanyResearch;
};

export async function buildResearchContext(
  prospect: Prospect
): Promise<ResearchContext> {
  const [person, company] = await Promise.all([
    researchPerson(prospect),
    researchCompany(prospect),
  ]);

  return { prospect, person, company };
}
