import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const { query } = params;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        dosenId: { equals: query },
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ status: 200, data: comments });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}


