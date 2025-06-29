import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Navio from "@/models/Navio";

export async function GET() {
  await dbConnect;
  const navios = await Navio.find();
  return NextResponse.json(navios);
}
