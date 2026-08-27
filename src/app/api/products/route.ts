import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const GET = async () => {
  const { data: products } = await supabase.from("Product").select("*");
  return NextResponse.json(products ?? []);
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const { data: product } = await supabase.from("Product").insert(body).select().single();
  return NextResponse.json(product);
};