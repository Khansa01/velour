import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

const AdminPage = async () => {
  const { data: products } = await supabase.from("Product").select("*");
  const { count: orderCount } = await supabase.from("Order").select("*", { count: "exact", head: true });

  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-2">Dashboard</p>
      <h1 className="font-serif text-3xl text-white mb-8">Admin Panel</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Products", value: products?.length ?? 0 },
          { label: "Orders", value: orderCount ?? 0 },
          { label: "Users", value: "-" },
          { label: "Revenue", value: "-" },
        ].map((stat) => (
          <div key={stat.label} className="border border-[rgba(201,168,124,0.15)] rounded-xl p-6">
            <p className="text-[11px] tracking-[3px] uppercase text-[#a89a80] mb-2">{stat.label}</p>
            <p className="text-3xl text-[#c9a87c] font-medium">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Products table */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80]">Products</p>
        <Link href="/admin/products/new" className="px-4 py-2 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors">
          + Add Product
        </Link>
      </div>

      <div className="border border-[rgba(201,168,124,0.15)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#222]">
            <tr>
              {["Brand", "Name", "Price", "Category", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[11px] tracking-[2px] uppercase text-[#a89a80]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id} className="border-t border-[rgba(201,168,124,0.1)] hover:bg-[#222] transition-colors">
                <td className="px-4 py-3 text-[13px] text-[#a89a80]">{p.brand}</td>
                <td className="px-4 py-3 text-[13px] text-white">{p.name}</td>
                <td className="px-4 py-3 text-[13px] text-[#c9a87c]">Rp {p.price.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3 text-[13px] text-[#a89a80]">{p.category ?? "-"}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${p.id}`} className="text-[11px] text-[#c9a87c] hover:underline tracking-widest uppercase">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminPage;