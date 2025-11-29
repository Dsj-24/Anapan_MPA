import { PrismaClient as PrismaClientType } from "../generated/prisma/index.js";
export const prisma = global.prisma ||
    new PrismaClientType({
        log: ["error", "warn"],
    });
if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}
//# sourceMappingURL=prisma.js.map