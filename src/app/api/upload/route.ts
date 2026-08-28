import { NextResponse } from "next/server";
import sharp from "sharp";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

  const fileName = `${uuidv4()}.webp`;
  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, webpBuffer, { contentType: "image/webp" });

  if (error) return NextResponse.json({ error }, { status: 500 });

  const { data } = supabase.storage.from("products").getPublicUrl(fileName);
  return NextResponse.json({ url: data.publicUrl });
};