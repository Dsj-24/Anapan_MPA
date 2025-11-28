import { defineConfig } from "drizzle-kit";
import "dotenv/config";
export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL, // your Neon URL from .env
    },
});
//# sourceMappingURL=drizzle.config.js.map