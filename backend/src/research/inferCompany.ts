import type { PersonResearch } from "./personResearch.js";

const GENERIC_WORDS = new Set([
  "gmail",
  "google",
  "yahoo",
  "hotmail",
  "outlook",
  "linkedin",
  "twitter",
  "facebook",
  "instagram",
  "medium",
  "github",
  "stack",
  "overflow",
]);

export function inferCompanyFromPerson(
  person: PersonResearch
): string | undefined {
  const counts = new Map<string, number>();

  for (const source of person.sources) {
    const text = `${source.snippet} ${source.url}`;
    const regex = /\b(?:at|@)\s+([A-Z][A-Za-z0-9&\- ]{2,40})/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      let raw = match[1]?.trim();
      if (!raw) continue;
      raw = raw.replace(/[.,;!].*$/, "").trim();
      if (!raw) continue;

      const normalized = raw.toLowerCase();
      const firstToken = normalized.split(/\s+/)[0] ?? "";
      if (GENERIC_WORDS.has(firstToken)) continue;

      const canonical =
        raw.charAt(0).toUpperCase() + raw.slice(1).trim();
      counts.set(canonical, (counts.get(canonical) ?? 0) + 1);
    }
  }

  if (!counts.size) return undefined;

  let bestName: string | undefined;
  let bestCount = 0;
  for (const [name, count] of counts.entries()) {
    if (count > bestCount) {
      bestCount = count;
      bestName = name;
    }
  }

  return bestName;
}
