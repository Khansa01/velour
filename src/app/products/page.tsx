import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/data/products";

export default function ProductsPage() {
  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-2">All Products</p>
      <h1 className="text-3xl font-serif text-white mb-8">Our Collection</h1>

      <div className="flex gap-8">
        {/* Filter sidebar */}
        <aside className="hidden md:block w-48 shrink-0">
          <p className="text-[11px] tracking-[2px] uppercase text-[#c9a87c] mb-4">Category</p>
          <ul className="flex flex-col gap-2">
            {["All", "Skincare", "Makeup", "Fragrance", "Hair"].map((cat) => (
              <li key={cat} className="text-[13px] text-[#a89a80] hover:text-[#c9a87c] cursor-pointer transition-colors">
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}   