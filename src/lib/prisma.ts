import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = await import("@prisma/client");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});

export const prisma = new PrismaClient({ adapter });