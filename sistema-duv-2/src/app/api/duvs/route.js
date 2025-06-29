import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Duv from "@/models/Duv";

export async function GET() {
  await dbConnect;
  const duvs = await Duv.find();
  return NextResponse.json(duvs);
}
