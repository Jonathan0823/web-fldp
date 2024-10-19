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

export const deleteDosen = async (id: string) => {
    try {
        const dosen = await prisma.dosen.delete({
            where: {
                id: id,
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