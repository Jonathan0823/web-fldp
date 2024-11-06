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
        <div className="flex flex-col">
          <div className="text-left">
            <h1>{dosen.nama}</h1>
            <p>{dosen.nip}</p>
            <p>{dosen.email}</p>
            <p>{dosen.prodi}</p>
            <p>{dosen.fakultas}</p>
            <p>{dosen.matakuliah}</p>
            <p>{dosen.rating}</p>
          </div>
          <h2>Penilaian</h2>
        </div>
      )}
    </div>
  );
};

export default DetailDosen;
