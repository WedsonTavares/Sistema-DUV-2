import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Pessoa from "@/models/Pessoa";

export async function GET() {
  await dbConnect;
  const pessoas = await Pessoa.find();
  return NextResponse.json(pessoas);
}
