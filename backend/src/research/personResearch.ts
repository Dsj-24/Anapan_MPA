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
  const fullName = prospect.fullName?.trim();
  if (!fullName) {
    return { personFound: false, sources: [] };
  }

  const company = prospect.companyNameGuess?.trim();
  const emailDomain = prospect.emailDomain?.trim();

  const queries: string[] = [];

  if (company) {
    queries.push(`"${fullName}" "${company}" marketing`);
  }

  if (emailDomain) {
    queries.push(`"${fullName}" "${emailDomain}"`);
  }

  // Try to lean on LinkedIn / leadership profiles
  queries.push(`"${fullName}" linkedin marketing`);
  queries.push(`"${fullName}" leadership marketing`);

  const sources: PersonResearchSource[] = [];

  for (const q of queries) {
    const results = await tavilySearch(q, { maxResults: 8 });

    for (const r of results) {
      const title = r.title ?? "";
      const content = r.content ?? "";
      const url = r.url ?? "";
      const text = `${title}\n${content}`;

      if (!url || !content.trim()) continue;

      const lowerText = text.toLowerCase();
      const nameMatches = lowerText.includes(fullName.toLowerCase());
      if (!nameMatches) continue;

      // If we know a company or domain, prefer snippets that mention them.
      if (company && !lowerText.includes(company.toLowerCase())) {
        if (emailDomain && !lowerText.includes(emailDomain.toLowerCase())) {
          // company & domain both missing in text -> lower priority: skip here
          continue;
        }
      }

      sources.push({
        url,
        snippet: content.slice(0, 600),
      });
    }
  }

  // De‑duplicate by URL and prioritize LinkedIn / corporate URLs first
  const unique = sources.filter(
    (s, i, arr) => arr.findIndex((t) => t.url === s.url) === i
  );

  unique.sort((a, b) => {
    const ua = a.url.toLowerCase();
    const ub = b.url.toLowerCase();

    const score = (u: string): number => {
      if (u.includes("linkedin.com")) return 3;
      if (u.includes("about/leadership") || u.includes("corporate")) return 2;
      if (u.includes("forbes.com") || u.includes("bloomberg.com")) return 1;
      return 0;
    };

    return score(ub) - score(ua);
  });

  const personFound = unique.length > 0;

  return {
    personFound,
    sources: unique.slice(0, 5),
  };
}
