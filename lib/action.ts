"use server";

import { prisma } from "./prisma";

export const createDosen = async (data: {
    nama: string;
    nip: string;
    fakultasId: string;  
    prodiId: string;     
    email: string;
    matkulId: string; 
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
    fakultasId?: string; 
    prodiId?: string;   
    email?: string;
    matkulId?: string; 
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
                fakultasId: data.fakultasId,
                prodiId: data.prodiId,
                email: data.email,
                matkulId: data.matkulId,
            },
        });
        return dosen;
    } catch (error) {
        throw new Error(String(error));
    }
}

export const deleteDosen = async (idUser: string, idDosen: string) => {
    try {
        console.log(idUser, idDosen);
        const valid = await prisma.user.findUnique({
            where: {
                id: idUser,
            },
        });
        
        if (valid?.role !== "Admin") {
            throw new Error("User is not an admin");
        }
        
        const dosen = await prisma.dosen.delete({
            where: {
                id: idDosen,
            },
        });
        return dosen;
    } catch (error) {
        throw new Error(String(error));
    }
}

export const createFakultas = async (nama: string) => {
    try {
    const validate = await prisma.fakultas.findFirst({
        where: {
            nama,
        },
    });
    if (validate) {
        return "Fakultas already exists";
    }
        const fakultas = await prisma.fakultas.create({
            data: {
                nama,
            },
        });
        return fakultas;
    } catch (error) {
        throw new Error(String(error));
    }
}


export const createProdi = async (nama: string, fakultasId: string) => {
    try {
        const validate = await prisma.prodi.findFirst({
            where: {
                nama,
            },
        });
        if (validate) {
            return "Prodi already exists";
        }
        const prodi = await prisma.prodi.create({
            data: {
                nama,
                fakultasId,
            },
        });
        return prodi;
    } catch (error) {
        throw new Error(String(error));
    }
}

export const createMatakuliah = async (nama: string, fakultasId:string) => {
    try {
        const validate = await prisma.matakuliah.findFirst({
            where: {
                nama,
            },
        });
        if (validate) {
            return "Matakuliah already exists";
        }
        const matakuliah = await prisma.matakuliah.create({
            data: {
                nama,
                fakultasId,
            },
        });
        return matakuliah;
    } catch (error) {
        throw new Error(String(error));
    }
}