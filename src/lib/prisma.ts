import { PrismaPg } from "@prisma/adapter-pg";
import PrismaClientPkg from "@prisma/client";

const { PrismaClient } = PrismaClientPkg;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});

export const prisma = new PrismaClient({ adapter });