"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const OrdersPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("Order")
        .select("*")
        .eq("userId", session.user?.email)
        .order("createdAt", { ascending: false });
      setOrders(data ?? []);
    };
    fetch();
  }, [session]);

  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-2">Account</p>
      <h1 className="font-serif text-3xl text-white mb-8">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-[#a89a80] text-sm">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-[rgba(201,168,124,0.15)] rounded-xl p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] tracking-[2px] uppercase text-[#a89a80]">{order.id}</p>
                <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full ${
                  order.status === "paid" 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-[#c9a87c] font-medium">Rp {order.total.toLocaleString("id-ID")}</p>
              <p className="text-[#a89a80] text-xs mt-1">{new Date(order.createdAt).toLocaleDateString("id-ID")}</p>
            </div>
          ))}
        </div>
      )}

      <Link href="/products" className="inline-block mt-8 text-[11px] tracking-[2px] uppercase text-[#c9a87c] hover:underline">
        Continue Shopping
      </Link>
    </main>
  );
};

export default OrdersPage;