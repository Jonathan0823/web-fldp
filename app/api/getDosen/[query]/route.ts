import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  try {
    const { query } = params;
    const search = await prisma.dosen.findMany({
      where: {
        OR: [
          {
            fakultas: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            prodi: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            mataKuliah: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return NextResponse.json(search);
  } catch (err) {
    console.log(err);
  }
}
