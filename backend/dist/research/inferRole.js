import { ChatOpenAI } from "@langchain/openai";
import { OPENAI_API_KEY } from "../config/env.js";
const roleModel = new ChatOpenAI({
    apiKey: OPENAI_API_KEY,
    modelName: "gpt-4o-mini",
    temperature: 0,
});
const ROLE_BUCKETS = [
    "CMO",
    "VP MARKETING",
    "HEAD OF MARKETING",
    "GROWTH / DEMAND GENERATION",
    "SALES / REVENUE LEADER",
    "MARKETING LEADER",
];
function mapRoleToBucket(rawRole) {
    if (!rawRole)
        return null;
    const r = rawRole.toLowerCase();
    if (r.includes("chief marketing officer") || r.includes("cmo")) {
        return "CMO";
    }
    if (r.includes("vp marketing") || r.includes("vice president")) {
        return "VP MARKETING";
    }
    if (r.includes("head of marketing") ||
        r.includes("director of marketing") ||
        r.includes("marketing director")) {
        return "HEAD OF MARKETING";
    }
    if (r.includes("growth") ||
        r.includes("demand generation") ||
        r.includes("performance marketing")) {
        return "GROWTH / DEMAND GENERATION";
    }
    if (r.includes("sales") ||
        r.includes("revenue") ||
        r.includes("business development") ||
        r.includes("account executive") ||
        r.includes("customer success")) {
        return "SALES / REVENUE LEADER";
    }
    if (r.includes("marketing") ||
        r.includes("brand") ||
        r.includes("communications")) {
        return "MARKETING LEADER";
    }
    return null;
}
const ACCEPTABLE_ROLE_KEYWORDS = [
    "marketing",
    "growth",
    "demand generation",
    "cmo",
    "chief marketing officer",
    "vp marketing",
    "head of marketing",
    "sales",
    "revenue",
    "business development",
    "account executive",
    "customer success",
];
export async function inferRoleFromPerson(person) {
    if (!person.personFound || person.sources.length === 0) {
        return { rawRole: null, roleCategory: null, isAcceptable: true };
    }
    const snippets = person.sources
        .map((s, i) => `Source ${i + 1} (URL: ${s.url}):\n${s.snippet}`)
        .join("\n\n");
    const response = await roleModel.invoke([
        {
            role: "system",
            content: `
You are extracting a person's current job title and employer.
Use ONLY explicit statements in the text (e.g. "is Chief Marketing Officer at Walmart").
If you can clearly identify the current title and company, return them.
If not, respond with {"role": null, "company": null}.
Return JSON only, exactly in this shape:
{"role": "<title, e.g. Chief Marketing Officer>", "company": "<employer name>"} or {"role": null, "company": null}.
Do not invent or generalize (e.g. do not say "Employee at Walmart").`,
        },
        {
            role: "user",
            content: `Snippets:\n\n${snippets}`,
        },
    ]);
    const raw = typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);
    let role = null;
    try {
        const parsed = JSON.parse(raw);
        if (typeof parsed.role === "string" && parsed.role.trim()) {
            role = parsed.role.trim();
        }
    }
    catch {
        // parsing failed => treat as unknown
    }
    if (!role) {
        return { rawRole: null, roleCategory: null, isAcceptable: true };
    }
    const lower = role.toLowerCase();
    const isAcceptable = ACCEPTABLE_ROLE_KEYWORDS.some((kw) => lower.includes(kw));
    const roleCategory = mapRoleToBucket(role);
    return { rawRole: role, roleCategory, isAcceptable };
}
//# sourceMappingURL=inferRole.js.map