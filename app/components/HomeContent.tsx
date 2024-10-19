"use client";
import React, { useState } from "react";
import { FiHome, FiUser } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import MyProfile from "./Home/MyProfile";
import { SessionProvider } from "next-auth/react";
import ProfileList from "./ListDosen";
import ReviewCard from "./review-card";

const HomeContent = () => {
  const [activeButton, setActiveButton] = useState("home");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <SessionProvider>
    <div>
      <div className="flex justify-between text-gray-500 mt-8 md:text-base text-sm">
        <button
          className={`flex items-center ${
            activeButton === "home" ? "text-[#5442f6]" : ""
          }`}
          onClick={() => handleButtonClick("home")}
        >
          <FiHome className="scale-150" />
          <p className="ml-2">Beranda</p>
        </button>
        <button
          className={`flex items-center ${
            activeButton === "dosen" ? "text-[#5442f6]" : ""
          }`}
          onClick={() => handleButtonClick("dosen")}
        >
          <RiGroupLine className="scale-150" />
          <p className="ml-2">Profil Dosen</p>
        </button>
        <button
          className={`flex items-center ${
            activeButton === "saya" ? "text-[#5442f6]" : ""
          }`}
          onClick={() => handleButtonClick("saya")}
        >
          <FiUser className="scale-150" />
          <p className="ml-2">Profil Saya</p>
        </button>
      </div>
      <div className="mt-8">
        {activeButton === "home" && (
          <div>
            <h3 className="font-bold text-lg">Beranda</h3>
            <p className="mt-2">
              Selamat datang di website penilaian dan umpan balik antara dosen
              dan mahasiswa dengan realtime.
            </p>
          </div>
        )}
        {activeButton === "dosen" && (
          <div>
            <h3 className="font-bold text-lg">Profil Dosen</h3>
            <p className="mt-2">
              Informasi profil dosen akan ditampilkan di sini.
            </p>
            <ProfileList/>
          </div>
        )}
        {activeButton === "home" && (
          <div>
            <h3 className="font-bold text-lg">Profil Saya</h3>
            <ReviewCard />
          </div>
        )}
        {activeButton === "saya" && (
          <div>
            <h3 className="font-bold text-lg">Profil Saya</h3>
            <MyProfile />
          </div>
        )}
      </div>
    </div>
    </SessionProvider>
  );
};

export default HomeContent;
