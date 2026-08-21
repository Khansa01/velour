"use client";

import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const { items, remove, total } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="px-6 md:px-16 py-24 bg-[#1a1a1a] min-h-screen text-center">
        <p className="text-[#a89a80] text-sm tracking-widest uppercase">Your cart is empty</p>
      </main>
    );
  }

  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-2">Your Cart</p>
      <h1 className="font-serif text-3xl text-white mb-8">Shopping Bag</h1>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Items */}
        <div className="flex-1 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border border-[rgba(201,168,124,0.15)] rounded-xl p-4">
              <div
                className="w-24 h-24 rounded-lg shrink-0"
                style={{ background: item.bgColor ?? "linear-gradient(135deg, #f5ede4, #e8d5c4)" }}
              />
              <div className="flex-1">
                <p className="text-[10px] tracking-widest uppercase text-[#a89a80]">{item.brand}</p>
                <p className="text-white text-sm mt-1">{item.name}</p>
                <p className="text-[#c9a87c] mt-1">Rp {item.price.toLocaleString("id-ID")}</p>
                <p className="text-[#a89a80] text-xs mt-1">Qty: {item.quantity}</p>
              </div>
              <button
                onClick={() => remove(item.id)}
                className="text-[#a89a80] hover:text-[#c9a87c] text-xs tracking-widest uppercase transition-colors self-start"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="md:w-72 border border-[rgba(201,168,124,0.15)] rounded-xl p-6 h-fit">
          <p className="text-[11px] tracking-[3px] uppercase text-[#a89a80] mb-4">Order Summary</p>
          <div className="flex justify-between text-white mb-6">
            <span className="text-sm">Total</span>
            <span className="text-[#c9a87c] font-medium">Rp {total().toLocaleString("id-ID")}</span>
          </div>
          <button className="w-full py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}