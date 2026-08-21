"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";

const CheckoutPage = () => {
  const { items, total, clear } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/login");
  }, [session, router]);

  const handleOrder = () => {
    // nanti diganti payment gateway
    clear();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <main className="px-6 md:px-16 py-24 bg-[#1a1a1a] min-h-screen text-center">
        <p className="text-[#a89a80] text-sm tracking-widest uppercase">Your cart is empty</p>
      </main>
    );
  }

  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-2">Checkout</p>
      <h1 className="text-3xl font-serif text-white mb-8">Order Summary</h1>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Form */}
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-[11px] tracking-[3px] uppercase text-[#c9a87c] mb-2">Shipping Details</p>
          {[
            { name: "name", placeholder: "Full Name" },
            { name: "email", placeholder: "Email" },
            { name: "phone", placeholder: "Phone Number" },
            { name: "address", placeholder: "Street Address" },
            { name: "city", placeholder: "City" },
            { name: "zip", placeholder: "ZIP Code" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              className="bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c]"
            />
          ))}
        </div>

        {/* Summary */}
        <div className="md:w-72 border border-[rgba(201,168,124,0.15)] rounded-xl p-6 h-fit">
          <p className="text-[11px] tracking-[3px] uppercase text-[#a89a80] mb-4">Items</p>
          <div className="flex flex-col gap-3 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <p className="text-[13px] text-white">{item.name} <span className="text-[#a89a80]">x{item.quantity}</span></p>
                <p className="text-[13px] text-[#c9a87c]">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-[rgba(201,168,124,0.15)] pt-4 flex justify-between mb-6">
            <span className="text-sm text-white">Total</span>
            <span className="text-[#c9a87c] font-medium">Rp {total().toLocaleString("id-ID")}</span>
          </div>
          <button
            onClick={handleOrder}
            className="w-full py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;