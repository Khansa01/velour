"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const OrdersPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [paymentInfo, setPaymentInfo] = useState<{ vaNumber: string; bank: string; orderId: string } | null>(null);

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

  const checkStatus = async (orderId: string) => {
    const res = await fetch(`/api/payment/status?order_id=${orderId}`);
    const data = await res.json();

    if (data.transaction_status === "settlement") {
      await supabase
        .from("Order")
        .update({ status: "paid" })
        .eq("id", orderId);

      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "paid" } : o));
    }
    
    if (data.va_numbers?.[0]) {
      setPaymentInfo({
        vaNumber: data.va_numbers[0].va_number,
        bank: data.va_numbers[0].bank.toUpperCase(),
        orderId,
      });
    }
  };

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
              <button
                onClick={() => checkStatus(order.id)}
                className="mt-3 text-[11px] tracking-[2px] uppercase text-[#c9a87c] hover:underline"
              >
                Check Payment Status
              </button>
            </div>
          ))}
        </div>
      )}

      <Link href="/products" className="inline-block mt-8 text-[11px] tracking-[2px] uppercase text-[#c9a87c] hover:underline">
        Continue Shopping
      </Link>

      {paymentInfo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#222] border border-[rgba(201,168,124,0.2)] rounded-xl p-8 max-w-sm w-full mx-4">
            <h2 className="font-serif text-xl text-white mb-6 text-center">Payment Details</h2>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between">
                <p className="text-[11px] tracking-[2px] uppercase text-[#a89a80]">Order ID</p>
                <p className="text-[13px] text-white">{paymentInfo.orderId}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[11px] tracking-[2px] uppercase text-[#a89a80]">Bank</p>
                <p className="text-[13px] text-white">{paymentInfo.bank}</p>
              </div>
              <div className="border-t border-[rgba(201,168,124,0.1)] pt-3">
                <p className="text-[11px] tracking-[2px] uppercase text-[#a89a80] mb-2">Virtual Account Number</p>
                <p className="text-[#c9a87c] font-medium text-lg tracking-widest">{paymentInfo.vaNumber}</p>
              </div>
            </div>
            <button
              onClick={() => setPaymentInfo(null)}
              className="w-full py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </main>
  );
};

export default OrdersPage;