import { tavilySearch } from "./tavilyClient.js";
import { ChatOpenAI } from "@langchain/openai";
import { OPENAI_API_KEY } from "../config/env.js";
const personaModel = new ChatOpenAI({
    apiKey: OPENAI_API_KEY,
    modelName: "gpt-4o-mini",
    temperature: 0,
});
async function summarizePersona(fullName, sources) {
    if (!sources.length)
        return { fullName };
    const snippets = sources
        .map((s, i) => `Source ${i + 1} (URL: ${s.url}):\n${s.snippet}`)
        .join("\n\n");
    const response = await personaModel.invoke([
        {
            role: "system",
            content: `
You are summarizing a marketing or sales leader's public profile from web snippets.

Rules:
- Use ONLY information present in the snippets.
- If something is unclear, omit it (do NOT guess or hallucinate).
- Focus on role, seniority, company, location, and key themes.

Return JSON only in this shape:
{
  "primaryTitle": string | null,
  "primaryCompany": string | null,
  "seniority": "CLEVEL" | "VP" | "DIRECTOR" | "MANAGER" | "IC" | null,
  "location": string | null,
  "keywords": string[],
  "linkedinUrl": string | null,
  "bioSummary": string | null
}
`,
        },
        {
            role: "user",
            content: `Person name: ${fullName}\n\nSnippets:\n\n${snippets}`,
        },
    ]);
    const raw = typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);
    try {
        const parsed = JSON.parse(raw);
        return {
            fullName,
            primaryTitle: parsed.primaryTitle ?? null,
            primaryCompany: parsed.primaryCompany ?? null,
            seniority: parsed.seniority ?? null,
            location: parsed.location ?? null,
            keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
            linkedinUrl: parsed.linkedinUrl ?? null,
            bioSummary: parsed.bioSummary ?? null,
        };
    }
    catch {
        return { fullName };
    }
}
export async function researchPerson(prospect) {
    const fullName = prospect.fullName?.trim();
    if (!fullName) {
        return { personFound: false, sources: [] };
    }
    const company = prospect.companyNameGuess?.trim();
    const emailDomain = prospect.emailDomain?.trim();
    const queries = [];
    if (company) {
        queries.push(`"${fullName}" "${company}" marketing`);
    }
    if (emailDomain) {
        queries.push(`"${fullName}" "${emailDomain}"`);
    }
    // Bias toward LinkedIn / leadership profiles
    queries.push(`"${fullName}" linkedin marketing`);
    queries.push(`"${fullName}" leadership marketing`);
    const sources = [];
    for (const q of queries) {
        const results = await tavilySearch(q, { maxResults: 8 });
        for (const r of results) {
            const title = r.title ?? "";
            const content = r.content ?? "";
            const url = r.url ?? "";
            const text = `${title}\n${content}`;
            if (!url || !content.trim())
                continue;
            const lowerText = text.toLowerCase();
            const nameMatches = lowerText.includes(fullName.toLowerCase());
            if (!nameMatches)
                continue;
            if (company && !lowerText.includes(company.toLowerCase())) {
                if (emailDomain && !lowerText.includes(emailDomain.toLowerCase())) {
                    continue;
                }
            }
            sources.push({
                url,
                snippet: content.slice(0, 600),
            });
        }
    }
    const unique = sources.filter((s, i, arr) => arr.findIndex((t) => t.url === s.url) === i);
    unique.sort((a, b) => {
        const ua = a.url.toLowerCase();
        const ub = b.url.toLowerCase();
        const score = (u) => {
            if (u.includes("linkedin.com"))
                return 3;
            if (u.includes("about/leadership") || u.includes("corporate"))
                return 2;
            if (u.includes("forbes.com") || u.includes("bloomberg.com"))
                return 1;
            return 0;
        };
        return score(ub) - score(ua);
    });
    const personFound = unique.length > 0;
    if (!personFound) {
        return { personFound: false, sources: [] };
    }
    const persona = await summarizePersona(fullName, unique.slice(0, 5));
    return {
        personFound,
        ...persona,
        sources: unique.slice(0, 5),
    };
}
//# sourceMappingURL=personResearch.js.map