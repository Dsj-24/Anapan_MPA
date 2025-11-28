import fetch from "node-fetch";
import { TAVILY_API_KEY } from "../config/env.js";

export type TavilyResult = {
  title: string;
  url: string;
  content: string;
};

export async function tavilySearch(
  query: string,
  options: { maxResults?: number } = {}
): Promise<TavilyResult[]> {
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

  const data: any = await res.json();
  const results: any[] = data.results ?? [];

  return results.map((r) => ({
    title: r.title ?? "",
    url: r.url ?? "",
    content: r.content ?? "",
  }));
}
