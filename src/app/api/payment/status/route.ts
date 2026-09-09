import { NextResponse } from "next/server";
import { snap } from "@/lib/midtrans";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");
  if (!orderId) return NextResponse.json({ error: "No order ID" }, { status: 400 });

  const status = await snap.transaction.status(orderId);
  return NextResponse.json(status);
};