export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  badge?: string;
  bgColor?: string;
};

export const products: Product[] = [
  { id: "1", slug: "creme-de-la-mer", brand: "La Mer", name: "Crème de la Mer Moisturizer", price: 3200000, badge: "NEW", bgColor: "linear-gradient(135deg, #f5ede4, #e8d5c4)" },
  { id: "2", slug: "c-firma-serum", brand: "Drunk Elephant", name: "C-Firma Fresh Day Serum", price: 1850000, bgColor: "linear-gradient(135deg, #e4eef5, #c8dce8)" },
  { id: "3", slug: "matte-revolution", brand: "Charlotte Tilbury", name: "Matte Revolution Lipstick", price: 720000, badge: "SALE", bgColor: "linear-gradient(135deg, #f4e4f0, #e8c4dc)" },
  { id: "4", slug: "water-cream", brand: "Tatcha", name: "The Water Cream Moisturizer", price: 1450000, bgColor: "linear-gradient(135deg, #eef4e4, #d4e8c4)" },
];