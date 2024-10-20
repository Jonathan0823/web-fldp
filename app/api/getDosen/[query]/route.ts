import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const { query } = params;

  try {
    let dosen;
    if (query === "All") {
      dosen = await prisma.dosen.findMany({
        include: { nilai: true }, 
      });
    } else {
      dosen = await prisma.dosen.findMany({
        where: {
          OR: [
            { prodi: { contains: query } },
            { fakultas: { contains: query } },
            { matakuliah: { contains: query } },
          ],
        },
        include: { nilai: true },
      });
    }

    const dosenWithRatings = dosen.map((d) => {
      const totalNilai = d.nilai.reduce((acc, curr) => {
        return acc + curr.pembelajaran + curr.kehadiran + curr.ketepatanWaktu;
      }, 0);
      
      let averageRating = totalNilai / (d.nilai.length * 3) || 0;
      averageRating = Math.min(averageRating, 5);

      const formattedRating = Number.isInteger(averageRating) 
        ? Math.round(averageRating) 
        : averageRating.toFixed(1);

      return {
        id: d.id,
        nama: d.nama,
        matakuliah: d.matakuliah,
        rating: formattedRating,
        reviews: d.nilai.length,
        nip: d.nip,
        fakultas: d.fakultas,
        prodi: d.prodi,
        email: d.email,

        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      };
    });

    return NextResponse.json(dosenWithRatings);
  } catch (error) {
    console.error("Error getting dosen data:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
