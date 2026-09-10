import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export const POST = async (req: Request) => {
  const body = await req.json();
  
  // verify signature
  const hash = crypto
    .createHash("sha512")
    .update(`${body.order_id}${body.status_code}${body.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
    .digest("hex");

  if (hash !== body.signature_key) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const { order_id, transaction_status, gross_amount, email } = body;

  if (transaction_status === "settlement" || transaction_status === "capture") {
    await supabase.from("Order").insert({
      id: order_id,
      userId: body.custom_field1,
      total: Number(gross_amount),
      status: "paid",
    });
  }

  return NextResponse.json({ status: "ok" });
};