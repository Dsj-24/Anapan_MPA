import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { DATABASE_URL } from "../config/env.js";
const sql = postgres(DATABASE_URL, {
    ssl: "require",
});
export const db = drizzle(sql);
//# sourceMappingURL=drizzle.js.map