import { PrismaPg } from "@prisma/adapter-pg";
import PrismaClientPkg from "@prisma/client";
const { PrismaClient } = PrismaClientPkg;

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false }
});
const prisma = new PrismaClient({ adapter });

const main = async () => {
  await prisma.product.createMany({
    data: [
      { slug: "creme-de-la-mer", brand: "La Mer", name: "Crème de la Mer Moisturizer", price: 3200000, badge: "NEW", bgColor: "linear-gradient(135deg, #f5ede4, #e8d5c4)", category: "Skincare" },
      { slug: "c-firma-serum", brand: "Drunk Elephant", name: "C-Firma Fresh Day Serum", price: 1850000, bgColor: "linear-gradient(135deg, #e4eef5, #c8dce8)", category: "Skincare" },
      { slug: "matte-revolution", brand: "Charlotte Tilbury", name: "Matte Revolution Lipstick", price: 720000, badge: "SALE", bgColor: "linear-gradient(135deg, #f4e4f0, #e8c4dc)", category: "Makeup" },
      { slug: "water-cream", brand: "Tatcha", name: "The Water Cream Moisturizer", price: 1450000, bgColor: "linear-gradient(135deg, #eef4e4, #d4e8c4)", category: "Skincare" },
    ],
    skipDuplicates: true,
  });
  console.log("Seeded!");
};

main().catch(console.error).finally(() => prisma.$disconnect());