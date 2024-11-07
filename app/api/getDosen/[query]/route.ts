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
        include: { 
          nilai: true, 
          matakuliah: true, 
          prodi: true, 
          fakultas: true 
        },
      });
    } else {
      dosen = await prisma.dosen.findMany({
        where: {
          OR: [
            {id: { equals: query }},
            { nama: { contains: query } },
            { nip: { contains: query } },
            { email: { contains: query } },
            { prodi: { nama: { contains: query } }},
            { fakultas: { nama: { contains: query }}},
            { matakuliah: {  nama: { contains: query }  }},
          ],
        },
        include: { 
          nilai: true, 
          matakuliah: true, 
          prodi: true, 
          fakultas: true 
        },
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

      const nilaiPembelajaran = d.nilai.map((n) => n.pembelajaran);
      const nilaiKehadiran = d.nilai.map((n) => n.kehadiran);
      const nilaiKetepatanWaktu = d.nilai.map((n) => n.ketepatanWaktu);

      return {
        id: d.id,
        nama: d.nama,
        rating: formattedRating,
        nilai: d.nilai,
        nilaiPembelajaran,
        nilaiKehadiran,
        nilaiKetepatanWaktu,
        nip: d.nip,
        matakuliah: d.matakuliah?.nama || null,
        fakultas: d.fakultas.nama, 
        prodi: d.prodi.nama,
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
