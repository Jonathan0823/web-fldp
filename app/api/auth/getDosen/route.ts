import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: { params: { prodi: string } }) {
    const { prodi } = params;
    if (!prodi) {
        return NextResponse.json({ status: 401, message: "Unauthorized" });
    }
    try {
        const user = await prisma.dosen.findMany({
            where: {
               prodi: String(prodi),
            },
            include:{nilai:true}
        });
    
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error getting users:", error);
        return NextResponse.json({ status: 500 });
    }
    }
