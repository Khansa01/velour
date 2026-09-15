import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/auth";

export const GET = async () => {
  const { data: products } = await supabase.from("Product").select("*");
  return NextResponse.json(products ?? []);
};

export const POST = async (req: Request) => {
  const session = await auth();
  if (!session || session.user?.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, brand, price, category, description, imageUrl, badge, bgColor, slug } = body;

  const { data: product } = await supabase.from("Product").insert({
    name, brand, price, category, description, imageUrl, badge, bgColor, slug
  }).select().single();

  return NextResponse.json(product);
};