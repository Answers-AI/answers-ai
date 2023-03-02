import { PrismaClient } from '../generated/prisma-client';
declare global {
    var prisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient<import("../generated/prisma-client").Prisma.PrismaClientOptions, never, import("../generated/prisma-client").Prisma.RejectOnNotFound | import("../generated/prisma-client").Prisma.RejectPerOperation | undefined>;
//# sourceMappingURL=client.d.ts.map