import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export async function executePrismaQuery<T>(query: (prisma: PrismaClient) => Promise<T>) {
    try {
        return await query(prisma);
    } finally {
        await prisma.$disconnect()
    }
}
