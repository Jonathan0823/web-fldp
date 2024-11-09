"use client";
import React, { useState, useEffect } from "react";
import { FiHome, FiUser } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import MyProfile from "./Home/MyProfile";
import ProfileList, { formatToTitleCase } from "./ListDosen";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import Link from "next/link";
import Modal from "./Modal";
import { useSearchParams } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  penilaian: [];
  createdAt: string;
}

interface Item {
  id: string;
  nama: string;
  rating: number;
  nip: string;
  matakuliah: string;
  fakultas: string;
  prodi: string;
  email: string;
  createdAt: string;
}

interface HomeContentProps {
  session: string;
  role: string;
}

const HomeContent: React.FC<HomeContentProps> = ({ session, role }) => {
  const [activeButton, setActiveButton] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("activeButton") || "home";
    }
    return "home";
  });
  const [user, setUser] = useState<User | null>(null);
  const [dosen, setDosen] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const [res, response] = await Promise.all([
        axios.get(`/api/getUser/${session}`),
        axios.get(`/api/getDosen/All`),
      ]);
      setUser(res.data);
      setDosen(response.data);
    } catch (error) {
      console.log("Error getting user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const params = useSearchParams();
  const show = params.get("show");

  const currentButton = localStorage.getItem("activeButton");

  useEffect(() => {
    fetchUser();
    console.log(show);
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    if (typeof window !== "undefined") {
      localStorage.setItem("activeButton", buttonName);
    }
  };

  return (
    <div>
      <div className="flex justify-between text-gray-500 mt-8 md:text-base text-sm">
        <button
          className={`flex items-center ${
            currentButton === "home" ? "text-[#5442f6]" : ""
          }`}
          onClick={() => handleButtonClick("home")}
        >
          <FiHome className="scale-150" />
          <p className="ml-2">Beranda</p>
        </button>
        <button
          className={`flex items-center ${
            currentButton === "dosen" ? "text-[#5442f6]" : ""
          }`}
          onClick={() => handleButtonClick("dosen")}
        >
          <RiGroupLine className="scale-150" />
          <p className="ml-2">Profil Dosen</p>
        </button>
        <button
          className={`flex items-center ${
            currentButton === "saya" ? "text-[#5442f6]" : ""
          }`}
          onClick={() => handleButtonClick("saya")}
        >
          <FiUser className="scale-150" />
          <p className="ml-2">Profil Saya</p>
        </button>
      </div>
      <div className=" mt-8">
        {loading ? (
          <div className="min-h-dvh flex justify-center items-center">
            <ThreeCircles color="#5442f6" height={80} width={80} />
          </div>
        ) : (
          <>
            {show && <Modal type={"rate"} userId={session} role={role} />}
            {activeButton === "home" && (
              <div>
                <h3 className="font-bold text-lg">Beranda</h3>
                <p className="mt-2">
                  Selamat datang di website penilaian dan umpan balik antara
                  dosen dan mahasiswa dengan realtime.
                </p>
                <h3 className="font-bold text-lg mb-3 mt-3">
                  Siapa yang ingin kamu nilai?
                </h3>
                <div>
                  {dosen.map((item, index) => (
                    <div key={index}>
                      <div
                        key={index}
                        className="p-4 mb-3 bg-white rounded-lg shadow flex items-center justify-between"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {formatToTitleCase(item.nama)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Spesialisasi: {formatToTitleCase(item.matakuliah)}
                          </p>
                        </div>
                        <Link href={`/?show=true&dosenId=${item.id}`}>Nilai</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeButton === "dosen" && (
              <div>
                <h3 className="font-bold text-lg mb-3">Profil Dosen</h3>
                <ProfileList userId={session} role={role}/>
              </div>
            )}
            {activeButton === "saya" && (
              <div>
                <h3 className="font-bold text-lg">Profil Saya</h3>
                {user && <MyProfile user={user} />}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
