export declare function upsertUserRefreshToken(params: {
    email: string;
    refreshToken: string;
}): Promise<void>;
export declare function getRefreshTokenForUser(email: string): Promise<{
    email: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
} | undefined>;
//# sourceMappingURL=tokenStore.d.ts.map