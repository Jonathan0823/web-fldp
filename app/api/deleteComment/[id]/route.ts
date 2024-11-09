import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const response = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ status: 200, data: response });
  } catch {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
