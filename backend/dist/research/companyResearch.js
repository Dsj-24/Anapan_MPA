import { classifyCompany } from "./classifyCompany.js";
import { tavilySearch } from "./tavilyClient.js";
const EMAIL_PROVIDERS = ["gmail", "yahoo", "hotmail", "outlook", "proton"];
export async function researchCompany(prospect) {
    let base = prospect.companyNameGuess;
    if (!base && prospect.emailDomain) {
        const [first] = prospect.emailDomain.split(".");
        if (first && !EMAIL_PROVIDERS.includes(first.toLowerCase())) {
            base = first;
        }
    }
    if (!base) {
        return { companyFound: false, keySnippets: [] };
    }
    const queries = [
        `"${base}" company "about us"`,
        `"${base}" marketing "loyalty program"`,
        `"${base}" "digital marketing" campaigns`,
    ];
    const snippets = [];
    for (const q of queries) {
        const results = await tavilySearch(q, { maxResults: 5 });
        for (const r of results) {
            const content = r.content;
            if (!content)
                continue;
            snippets.push(content.slice(0, 600));
            if (snippets.length >= 5)
                break;
        }
        if (snippets.length >= 5)
            break;
    }
    if (!snippets.length) {
        return { companyFound: false, keySnippets: [] };
    }
    const classification = await classifyCompany(snippets.slice(0, 3));
    const response = {
        companyFound: true,
        name: classification.name ?? prospect.companyNameGuess,
        industry: classification.industry,
        sizeGuess: classification.sizeGuess,
        keySnippets: snippets.slice(0, 3),
    };
    // Ensure full type compliance with CompanyResearch and fix 'sizeGuess' undefined issue
    return {
        companyFound: true,
        name: response.name ?? "",
        industry: response.industry ?? "",
        sizeGuess: response.sizeGuess ?? "midmarket",
        keySnippets: response.keySnippets,
    };
}
//# sourceMappingURL=companyResearch.js.map