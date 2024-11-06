"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdStarOutline } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { ThreeCircles } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";
import Modal from "./Modal";
import Link from "next/link";
interface DosenProfile {
  id: string;
  nama: string;
  matakuliah: string;
  rating: string;
  nilai: [];
}

export default function ProfileList() {
  const [dosen, setDosen] = useState<DosenProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDosenData = async () => {
      try {
        const result = await axios.get(`/api/getDosen/All`);
        setDosen(result.data);
        setLoading(false);
        console.log(result.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    getDosenData();
  }, []);

  const params = useSearchParams();
  const show = params.get("show");

  return (
    <div>
      {loading ? (
        <div className="min-h-dvh flex justify-center pt-20">
          <ThreeCircles color="#5442f6" height={80} width={80} />
        </div>
      ) : (
        <div className="space-y-4">
          {show && <Modal type={"detail"} />}
          {dosen.length > 0 ? (
            dosen.map((profile, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {profile.nama}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Spesialisasi: {profile.matakuliah}
                  </p>
                  <div className="flex items-center mt-2">
                    <IoMdStarOutline className="w-7 h-7 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">
                      {profile.rating}/5 ({profile.nilai.length} penilaian)
                    </span>
                  </div>
                </div>
                <Link href={`/?show=true&dosenId=${profile.id}`} className="text-gray-400 hover:text-gray-600">
                  <MdNavigateNext className="w-8 h-8" />
                </Link>
              </div>
            ))
          ) : (
            <p>Data dosen tidak ditemukan.</p>
          )}
        </div>
      )}
    </div>
  );
}
