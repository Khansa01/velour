import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const product = await prisma.product.create({ data: body });
  return NextResponse.json(product);
};