"use server";

import { prisma } from "./prisma";

export const createDosen = async (data: {
    nama: string;
    nip: string;
    fakultas: string;
    prodi: string;
    email: string;
    matakuliah: string;
}) => {
    try {
        const dosen = await prisma.dosen.create({
            data: {
                ...data,
            },
        });
        return dosen;
    } catch (error) {
        throw new Error(String(error));
    }
};

interface DosenData {
    id: string;
    nama?: string;
    nip?: string;
    fakultas?: string;
    prodi?: string;
    email?: string;
    matakuliah?: string;
}

export const editDosen = async (data: DosenData) => {
    try {
        const dosen = await prisma.dosen.update({
            where: {
                id: data.id,
            },
            data: {
                nama: data.nama,
                nip: data.nip,
                fakultas: data.fakultas,
                prodi: data.prodi,
                email: data.email,
                matakuliah: data.matakuliah,
            },
        });
        return dosen;
    } catch (error) {
        throw new Error(String(error));
    }
}

export const deleteDosen = async (idUser: string, idDosen:string) => {
    try {
        console.log(idUser, idDosen);
       const valid = await prisma.user.findUnique({
            where: {
                id: idUser,
            },
        })
        
        if(valid?.role != "Admin"){
            throw new Error("User is not an admin");
        }
        const dosen = await prisma.dosen.delete({
            where: {
                id: idDosen,
            },
        });
        return dosen;
    } catch (e) {
        throw new Error(String(e));
    }
}