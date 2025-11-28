import type { Prospect } from "../prospect/types.js";
import { tavilySearch } from "./tavilyClient.js";

export type PersonResearchSource = {
  url: string;
  snippet: string;
  extractedRole?: string;
  extractedLocation?: string;
};

export type PersonResearch = {
  personFound: boolean;
  sources: PersonResearchSource[];
};

export async function researchPerson(
  prospect: Prospect
): Promise<PersonResearch> {
  if (!prospect.fullName || !prospect.companyNameGuess) {
    return { personFound: false, sources: [] };
  }

  const queries: string[] = [
    `"${prospect.fullName}" "${prospect.companyNameGuess}" marketing`,
  ];
  if (prospect.emailDomain) {
    queries.push(`"${prospect.fullName}" "${prospect.emailDomain}"`);
  }

  const sources: PersonResearchSource[] = [];

  for (const q of queries) {
    const results = await tavilySearch(q, { maxResults: 5 });
    for (const r of results) {
      const title = r.title;
      const content = r.content;
      const url = r.url;
      const text = `${title}\n${content}`;
      const nameMatches = text
        .toLowerCase()
        .includes(prospect.fullName.toLowerCase());
      const companyMatches = prospect.companyNameGuess
        ? text.toLowerCase().includes(prospect.companyNameGuess.toLowerCase()) ||
          text.toLowerCase().includes(prospect.emailDomain ?? "")
        : true;
      if (!url || !nameMatches || !companyMatches) continue;
      sources.push({
        url,
        snippet: content.slice(0, 500),
      });
    }
  }

  const unique = sources.filter(
    (s, i, arr) => arr.findIndex((t) => t.url === s.url) === i
  );
  const personFound = unique.length > 0;

  return { personFound, sources: unique.slice(0, 3) };
}
