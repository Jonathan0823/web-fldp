import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.fakultas.findMany({});
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting dosen data:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
