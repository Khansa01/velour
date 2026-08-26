import Link from "next/link";

type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  badge?: string | null;
  bgColor?: string | null;
  category?: string | null;
  description?: string | null;
  createdAt?: Date;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block rounded-xl overflow-hidden border border-[rgba(201,168,124,0.15)] bg-[#222] hover:border-[#c9a87c] transition-colors">
      {/* Image placeholder */}
      <div
        className="h-48 flex items-center justify-center relative"
        style={{ background: product.bgColor ?? "linear-gradient(135deg, #f5ede4, #e8d5c4)" }}
      >
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#1a1a1a] text-white text-[10px] px-2 py-0.5 tracking-widest">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[10px] text-[#a89a80] tracking-widest uppercase">{product.brand}</p>
        <p className="text-[13px] text-white mt-1 mb-1">{product.name}</p>
        <p className="text-[14px] text-[#c9a87c] font-medium">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </Link>
  );
}