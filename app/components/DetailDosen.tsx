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
    nilaiPembelajaran: number[];
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

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <svg
            key={`full-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.286 7.042a1 1 0 00.95.69h7.416c.969 0 1.371 1.24.588 1.81l-6.01 4.36a1 1 0 00-.364 1.118l2.286 7.042c.3.921-.755 1.688-1.54 1.118l-6.01-4.36a1 1 0 00-1.176 0l-6.01 4.36c-.784.57-1.838-.197-1.54-1.118l2.286-7.042a1 1 0 00-.364-1.118l-6.01-4.36c-.783-.57-.38-1.81.588-1.81h7.416a1 1 0 00.95-.69l2.286-7.042z"
            />
          </svg>
        ))}
        {halfStar === 1 && (
          <svg
            key="half"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.286 7.042a1 1 0 00.95.69h7.416c.969 0 1.371 1.24.588 1.81l-6.01 4.36a1 1 0 00-.364 1.118l2.286 7.042c.3.921-.755 1.688-1.54 1.118l-6.01-4.36a1 1 0 00-1.176 0l-6.01 4.36c-.784.57-1.838-.197-1.54-1.118l2.286-7.042a1 1 0 00-.364-1.118l-6.01-4.36c-.783-.57-.38-1.81.588-1.81h7.416a1 1 0 00.95-.69l2.286-7.042z"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <svg
            key={`empty-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.286 7.042a1 1 0 00.95.69h7.416c.969 0 1.371 1.24.588 1.81l-6.01 4.36a1 1 0 00-.364 1.118l2.286 7.042c.3.921-.755 1.688-1.54 1.118l-6.01-4.36a1 1 0 00-1.176 0l-6.01 4.36c-.784.57-1.838-.197-1.54-1.118l2.286-7.042a1 1 0 00-.364-1.118l-6.01-4.36c-.783-.57-.38-1.81.588-1.81h7.416a1 1 0 00.95-.69l2.286-7.042z"
            />
          </svg>
        ))}
      </>
    );
  };

  const ratingPembelajaran = dosen?.nilaiPembelajaran.reduce((acc, curr) => {
    const total = acc + curr;
    return total;
  }, 0);

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
            <h2 className="font-semibold mb-1">Pembelajaran</h2>
            <div className="flex justify-center gap-1 text-sm">
            {ratingPembelajaran !== undefined && renderStars(ratingPembelajaran / dosen.nilaiPembelajaran.length)}
              <p className="ml-1">{ratingPembelajaran ? (ratingPembelajaran / dosen.nilaiPembelajaran.length) : 'N/A'}/5</p>
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
