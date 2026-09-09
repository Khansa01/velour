import { NextResponse } from "next/server";
import { snap } from "@/lib/midtrans";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const POST = async (req: Request) => {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items, total } = await req.json();
  const orderId = `VELOUR-${Date.now()}`;

  // simpan order ke DB dulu
  await supabase.from("Order").insert({
    id: orderId,
    userId: session.user?.email,
    total,
    status: "pending",
  });

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: total,
    },
    item_details: items.map((item: any) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      name: item.name,
    })),
    customer_details: {
      email: session.user?.email,
      name: session.user?.name,
    },
    custom_field1: session.user?.email,
  };

  const token = await snap.createTransaction(parameter);
  return NextResponse.json({ token: token.token });
};