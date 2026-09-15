import { NextResponse } from "next/server";
import { snap } from "@/lib/midtrans";
import { auth } from "@/lib/auth";

export const GET = async (req: Request) => {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");
  if (!orderId) return NextResponse.json({ error: "No order ID" }, { status: 400 });

  const status = await snap.transaction.status(orderId);
  return NextResponse.json(status);
};