import { ChatOpenAI } from "@langchain/openai";
import { OPENAI_API_KEY } from "../config/env.js";
import type { PersonResearch } from "./personResearch.js";

const roleModel = new ChatOpenAI({
  apiKey: OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
  temperature: 0,
});

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

export type InferredRole = {
  rawRole: string | null;
  isAcceptable: boolean;
};

export async function inferRoleFromPerson(
  person: PersonResearch
): Promise<InferredRole> {
  // If no person profile, don't block; leave role unknown.
  if (!person.personFound || person.sources.length === 0) {
    return { rawRole: null, isAcceptable: true };
  }

  const snippets = person.sources
    .map((s, i) => `Source ${i + 1} (URL: ${s.url}):\n${s.snippet}`)
    .join("\n\n");

  const response = await roleModel.invoke([
    {
      role: "system",
      content: `
You extract a person's current job title from the snippets provided.
- Use ONLY information in the snippets (they may include LinkedIn, company pages, news).
- If you can reasonably infer a single current title, return it as a short string, e.g. "Chief Marketing Officer, Walmart".
- If the current role is unclear, respond with {"role": null}.
Return JSON only, like {"role": "Chief Marketing Officer, Walmart"} or {"role": null}.`,
    },
    { role: "user", content: `Snippets:\n\n${snippets}` },
  ]);

  const raw =
    typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

  let role: string | null = null;
  try {
    const parsed = JSON.parse(raw as string);
    if (typeof parsed.role === "string" && parsed.role.trim().length > 0) {
      role = parsed.role.trim();
    }
  } catch {
    // parsing failed → treat as unknown
  }

  if (!role) {
    return { rawRole: null, isAcceptable: true };
  }

  const lower = role.toLowerCase();
  const isAcceptable = ACCEPTABLE_ROLE_KEYWORDS.some((kw) =>
    lower.includes(kw)
  );

  return { rawRole: role, isAcceptable };
}
