"use client";

import ProductCard from "@/components/product/ProductCard";
import { useWishlistStore } from "../store/wishlistStore";

const WishlistPage = () => {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <main className="px-6 md:px-16 py-24 bg-[#1a1a1a] min-h-screen text-center">
        <p className="text-[#a89a80] text-sm tracking-widest uppercase">Your wishlist is empty</p>
      </main>
    );
  }

  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-2">Saved Items</p>
      <h1 className="text-3xl font-serif text-white mb-8">My Wishlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}

export default WishlistPage;