import { useCartStore } from "@/app/store/cartStore";
import { products } from "@/lib/data/products";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();
  const add = useCartStore((s) => s.add);

  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Image */}
        <div
          className="w-full md:w-1/2 h-80 md:h-[500px] rounded-xl"
          style={{ background: product.bgColor ?? "linear-gradient(135deg, #f5ede4, #e8d5c4)" }}
        />

        {/* Info */}
        <div className="flex-1 flex flex-col justify-center">
          {product.badge && (
            <span className="text-[10px] tracking-widest bg-[#c9a87c] text-[#1a1a1a] px-2 py-0.5 w-fit mb-4">
              {product.badge}
            </span>
          )}
          <p className="text-[11px] tracking-[3px] uppercase text-[#a89a80] mb-2">{product.brand}</p>
          <h1 className="font-serif text-3xl text-white mb-4">{product.name}</h1>
          <p className="text-2xl text-[#c9a87c] font-medium mb-6">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <p className="text-[#a89a80] text-sm leading-relaxed mb-8">
            A luxurious formula crafted for radiant, healthy-looking skin. Suitable for all skin types.
          </p>

          <div className="flex gap-3">
            <button onClick={() => add(product)} className="flex-1 py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors">
              Add to Cart
            </button>
            <button className="px-4 py-3 border border-[rgba(201,168,124,0.3)] text-[#c9a87c] text-xs tracking-[2px] uppercase hover:border-[#c9a87c] transition-colors">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}