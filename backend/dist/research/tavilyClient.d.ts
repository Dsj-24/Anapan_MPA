export type TavilyResult = {
    title: string;
    url: string;
    content: string;
};
export declare function tavilySearch(query: string, options?: {
    maxResults?: number;
}): Promise<TavilyResult[]>;
//# sourceMappingURL=tavilyClient.d.ts.map