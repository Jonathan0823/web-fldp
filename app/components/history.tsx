"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";

interface Penilaian {
  id: string;
  pembelajaran: number;
  kehadiran: number;
  ketepatanWaktu: number;
  dosenId: string;
  userId: string;
  komen: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Dosen {
  id: string;
  nama: string;
}

interface ProfileListProps {
  penilaian: Penilaian[];
}

export default function History({ penilaian = [] }: ProfileListProps) {
  const [dosenMap, setDosenMap] = useState<{ [key: string]: Dosen }>({});

  useEffect(() => {
    const getDosenData = async () => {
      try {
        const dosenIds = Array.from(new Set(penilaian.map(p => p.dosenId)));
        const fetchDosenPromises = dosenIds.map(id => axios.get(`/api/getDosen/${id}`));
        const results = await Promise.all(fetchDosenPromises);
        const dosenData = results.reduce((acc, response) => {
          const dosen = response.data[0];
          acc[dosen.id] = dosen;
          return acc;
        }, {} as { [key: string]: Dosen });
        setDosenMap(dosenData);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };

    if (penilaian.length > 0) {
      getDosenData();
    }
  }, [penilaian]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Riwayat Penilaian Dosen</h2>
      <div className="space-y-4">
        {penilaian.length > 0 ? (
          penilaian.map((profile) => (
            <div
              key={profile.id}
              className="p-6 bg-white rounded-lg shadow-md flex flex-col transition-transform transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Penilaian Dosen: {dosenMap[profile.dosenId]?.nama || 'Loading...'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Pembelajaran: <span className="font-medium">{profile.pembelajaran}</span>, Kehadiran: <span className="font-medium">{profile.kehadiran}</span>, Ketepatan Waktu: <span className="font-medium">{profile.ketepatanWaktu}</span>
              </p>
              {profile.komen && (
                <p className="text-sm text-gray-600 mt-1">
                  Komen: <span className="italic">{profile.komen}</span>
                </p>
              )}
              <div className="flex items-center mt-1">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">
                  {profile.pembelajaran}/5
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Ditambahkan pada: {new Date(profile.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Data dosen tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}
