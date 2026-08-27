import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import * as PrismaClientPkg from "@prisma/client";

// @ts-ignore
const PrismaClient = PrismaClientPkg.PrismaClient ?? PrismaClientPkg.default.PrismaClient;

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export const prisma = new PrismaClient({ adapter });