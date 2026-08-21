import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/data/products";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1a1a1a] px-6 md:px-16 py-24 md:py-36 text-center">
        <p className="text-[11px] tracking-[3px] text-[#c9a87c] uppercase mb-4">
          New Collection 2026
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-normal text-white leading-tight mb-4">
          Beauty that tells<br />
          <em className="italic text-[#c9a87c]">your story</em>
        </h1>
        <p className="text-[#a89a80] text-sm md:text-base mb-8">
          Curated luxury for every skin, every mood, every moment
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/products" className="px-8 py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors">
            Shop Now
          </Link>
          <Link href="/products" className="px-8 py-3 border border-white text-white text-xs tracking-[2px] uppercase hover:border-[#c9a87c] hover:text-[#c9a87c] transition-colors">
            Explore Brands
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 md:px-16 py-12 bg-[#222]">
        <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-6">Shop by category</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {["Skincare", "Makeup", "Fragrance", "Hair", "Best Sellers"].map((cat) => (
            <div key={cat} className="border border-[rgba(201,168,124,0.2)] rounded-xl p-5 text-center cursor-pointer hover:border-[#c9a87c] transition-colors">
              <p className="text-[12px] text-[#a89a80] tracking-wide">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="px-6 md:px-16 py-12 bg-[#1a1a1a]">
        <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-6">Trending now</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}