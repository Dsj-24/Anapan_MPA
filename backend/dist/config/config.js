import dotenv from "dotenv";
dotenv.config();
const required = [
    "OPENAI_API_KEY",
    "TAVILY_API_KEY",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_REFRESH_TOKEN",
];
// In case any Key is missing
required.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required env var: ${key}`);
    }
});
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
export const PORT = Number(process.env.PORT ?? 3000);
//# sourceMappingURL=config.js.map