"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { useCartStore } from "@/app/store/cartStore";
import { useWishlistStore } from "@/app/store/wishlistStore";

const ProductDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = React.use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const { add: addToCart } = useCartStore();
  const { add, remove, has } = useWishlistStore();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase.from("Product").select("*").eq("slug", slug).single();
      setProduct(data);
    };
    fetchProduct();
  }, [slug]);

  if (!product) return (
    <main className="px-16 py-12 bg-[#1a1a1a] min-h-screen text-[#a89a80]">Loading...</main>
  );

  const isWishlisted = has(product.id);

  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Image */}
        <div
          className="w-full md:w-1/2 h-80 md:h-[500px] rounded-xl overflow-hidden"
          style={{ background: product.bgColor ?? "linear-gradient(135deg, #f5ede4, #e8d5c4)" }}
        >
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          )}
        </div>

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
            {product.description ?? "A luxurious formula crafted for radiant, healthy-looking skin."}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                if (!session) { router.push("/login"); return; }
                addToCart(product);
              }}
              className="flex-1 py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() => isWishlisted ? remove(product.id) : add(product)}
              className={`px-4 py-3 border text-xs tracking-[2px] uppercase transition-colors ${
                isWishlisted
                  ? "border-[#c9a87c] text-[#c9a87c]"
                  : "border-[rgba(201,168,124,0.3)] text-[#a89a80] hover:border-[#c9a87c] hover:text-[#c9a87c]"
              }`}
            >
              {isWishlisted ? "Wishlisted ♥" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;