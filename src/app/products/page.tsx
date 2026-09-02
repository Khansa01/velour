import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/product/ProductCard";

export const revalidate = 0;

const ProductsPage = async ({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) => {
  const { q, category } = await searchParams;

  let query = supabase.from("Product").select("*");
  if (q) query = query.ilike("name", `%${q}%`);
  if (category && category !== "All") query = query.eq("category", category);

  const { data: products } = await query;
  const items = products ?? [];

  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-2">All Products</p>
      <h1 className="text-3xl font-serif text-white mb-8">
        {q ? `Results for "${q}"` : "Our Collection"}
      </h1>

      <form method="GET" action="/products" className="mb-8 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search products..."
          className="flex-1 bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c]"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors"
        >
          Search
        </button>
      </form>

      <div className="flex gap-8">
        <aside className="hidden md:block w-48 shrink-0">
          <p className="text-[11px] tracking-[2px] uppercase text-[#c9a87c] mb-4">Category</p>
          <ul className="flex flex-col gap-2">
            {["All", "Skincare", "Makeup", "Fragrance", "Hair"].map((cat) => (
              <li key={cat}>
                <a
                  href={`/products?${q ? `q=${q}&` : ""}category=${cat}`}
                  className={[
                    "text-[13px] transition-colors",
                    category === cat || (!category && cat === "All")
                      ? "text-[#c9a87c]"
                      : "text-[#a89a80] hover:text-[#c9a87c]",
                  ].join(" ")}
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">
          {items.length === 0 ? (
            <p className="text-[#a89a80] text-sm">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;