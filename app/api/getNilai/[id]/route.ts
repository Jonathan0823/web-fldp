
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id)

    try {
        const user = await prisma.nilai.findMany({
            where: {
                userId: id
            },
        })
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error getting dosen data:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
