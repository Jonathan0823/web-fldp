"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const DetailDosen = () => {
  const params = useSearchParams();
  const dosenId = params.get("dosenId");
  interface Dosen {
    nama: string;
    nip: string;
    email: string;
    prodi: string;
    fakultas: string;
    matakuliah: string;
    rating: number;
  }

  const [dosen, setDosen] = React.useState<Dosen | null>(null);

  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const { data } = await axios.get(`/api/getDosen/${dosenId}`);
        setDosen(data[0]);
        console.log(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (dosenId) {
      fetchDosen();
    }
  }, [dosenId]);

  return (
    <div>
      {dosen && (
        <div className="flex flex-col ">
          <div className="text-left text-base">
            <div className="flex">
              <p className="w-24 font-semibold">Nama</p>
              <p>:</p>
              <p className="ml-2">{dosen.nama}</p>
            </div>
            <div className="flex">
              <p className="w-24 font-semibold">NIP</p>
              <p>:</p>
              <p className="ml-2">{dosen.nip}</p>
            </div>
            <div className="flex">
              <p className="w-24 font-semibold">Email</p>
              <p>:</p>
              <p className="ml-2">{dosen.email}</p>
            </div>
            <div className="flex">
              <p className="w-24 font-semibold">Prodi</p>
              <p>:</p>
              <p className="ml-2">{dosen.prodi}</p>
            </div>
            <div className="flex">
              <p className="w-24 font-semibold">Fakultas</p>
              <p>:</p>
              <p className="ml-2">{dosen.fakultas}</p>
            </div>
            <div className="flex">
              <p className="w-24 font-semibold">Matakuliah</p>
              <p>:</p>
              <p className="ml-2">{dosen.matakuliah}</p>
            </div>
          </div>
          <h2 className="mt-3 text-lg font-bold mb-3">Penilaian</h2>
          <div className="border border-slate-300 p-3 h-72 overflow-hidden shadow-md rounded-lg flex flex-col ">
            <h2 className="font-semibold ">Pembelajaran</h2>
            <div className="flex justify-center gap-4">
              <p>{dosen.rating}/5</p>
            </div>
            <div className="text-left ml-4 mt-2">
              <p className="font-semibold">Komentar:</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default DetailDosen;
