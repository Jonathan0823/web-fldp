import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
              penilaian: true,  
            },
        })
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error getting dosen data:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
