import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { userTokens } from "../db/schema.js";

export async function upsertUserRefreshToken(params: {
  email: string;
  refreshToken: string;
}) {
  const { email, refreshToken } = params;
  await db
    .insert(userTokens)
    .values({ email, refreshToken })
    .onConflictDoUpdate({
      target: userTokens.email,
      set: { refreshToken, updatedAt: new Date() },
    });
}

export async function getRefreshTokenForUser(email: string) {
  const rows = await db
    .select()
    .from(userTokens)
    .where(eq(userTokens.email, email))
    .limit(1);
  return rows[0];
}
