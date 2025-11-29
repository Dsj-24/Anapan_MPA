import fetch from "node-fetch";
import { TAVILY_API_KEY } from "../config/env.js";
export async function tavilySearch(query, options = {}) {
    console.log("[Tavily] query:", query);
    const res = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            api_key: TAVILY_API_KEY,
            query,
            max_results: options.maxResults ?? 5,
            search_depth: "basic",
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        console.error("Tavily error", res.status, text);
        return [];
    }
    const data = await res.json();
    const results = data.results ?? [];
    console.log("[Tavily] results:", results.slice(0, 3).map((r) => ({ title: r.title, url: r.url })));
    return results.map((r) => ({
        title: r.title ?? "",
        url: r.url ?? "",
        content: r.content ?? "",
    }));
}
//# sourceMappingURL=tavilyClient.js.map