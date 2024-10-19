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
                mataKuliah: data.matakuliah,
            },
        });
        return dosen;
    } catch (error) {
        throw new Error(String(error));
    }
};
