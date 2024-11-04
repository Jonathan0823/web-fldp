"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdStarOutline } from "react-icons/io";
interface DosenProfile {
  nama: string;
  matakuliah: string;
  rating: string; 
  reviews: number;
}

export default function ProfileList() {
  const [dosen, setDosen] = useState<DosenProfile[]>([]);

  useEffect(() => {
    const getDosenData = async () => {
      try {
        const result = await axios.get(`/api/getDosen/All`);
        setDosen(result.data);
        console.log("Data fetched:", result.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    getDosenData();
  }, []); 

  return (
    <div>
      <div className="space-y-4">
        {dosen.length > 0 ? (
          dosen.map((profile, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{profile.nama}</h3>
                <p className="text-sm text-gray-600">Spesialisasi: {profile.matakuliah}</p>
                <div className="flex items-center mt-3">
                  <IoMdStarOutline className="w-7 h-7 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {profile.rating}/5 ({profile.reviews} penilaian)
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">➔</button>
            </div>
          ))
        ) : (
          <p>Data dosen tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}
