import { ChatOpenAI } from "@langchain/openai";
import { OPENAI_API_KEY } from "../config/env.js";
// LLM for classifying 
const classifierModel = new ChatOpenAI({
    apiKey: OPENAI_API_KEY,
    modelName: "gpt-4o-mini",
    temperature: 0,
});
export async function classifyCompany(snippets) {
    if (!snippets.length) {
        return { industry: "generic" };
    }
    const joined = snippets.join("\n\n");
    const response = await classifierModel.invoke([
        {
            role: "system",
            content: "You classify companies by reading snippets. Respond ONLY with JSON.",
        },
        {
            role: "user",
            content: `
Snippets:
${joined}

Return JSON like:
{"name":"Acme Corp","industry":"retail","sizeGuess":"enterprise"}

Allowed industries: retail, ecommerce, saas, fintech, banking, generic.
Allowed sizeGuess: enterprise, midmarket, startup.
If unsure, use "generic" and omit sizeGuess.
`,
        },
    ]);
    const raw = typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);
    try {
        const parsed = JSON.parse(raw);
        return {
            name: parsed.name,
            industry: parsed.industry ?? "generic",
            sizeGuess: parsed.sizeGuess,
        };
    }
    catch {
        return { industry: "generic" };
    }
}
//# sourceMappingURL=classifyCompany.js.map