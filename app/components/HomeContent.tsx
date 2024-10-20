"use client";
import React, { useState, useEffect } from "react";
import { FiHome, FiUser } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import MyProfile from "./Home/MyProfile";
import ProfileList from "./ListDosen";
import ReviewCard from "./review-card";
import axios from "axios";
import {ThreeCircles } from 'react-loader-spinner'; 

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
}

const HomeContent: React.FC<HomeContentProps> = ({ session }) => {
  const [activeButton, setActiveButton] = useState("home");
  const [filter, setFilter] = useState("All");
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [reviewTime, setReviewTime] = useState<{ [key: string]: Date | null }>({});
  const [loading, setLoading] = useState(true); 

  const fetchUser = async () => {
    setLoading(true); 
    try {
      const res = await axios.get(`/api/getUser/${session}`);
      const response = await axios.get(`/api/getDosen/${filter}`);
      const reviewsResponse = await axios.get(`/api/getNilai/${session}`);
      setUser(res.data);
      setFilter("All");
      const timeData = reviewsResponse.data.reduce((acc: { [key: string]: Date | null }, review: { dosenId: string; createdAt: string }) => {
        acc[review.dosenId] = new Date(review.createdAt);
        return acc;
      }, {});
      setReviewTime(timeData);
      setItems(response.data); 
    } catch (error) {
      console.log("Error getting user data:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUser();
  }, [session]);

  useEffect(() => {
    if (items.length > 0 && Object.keys(reviewTime).length > 0) {
      const filtered = items.filter(item => {
        const lastReviewTime = reviewTime[item.id as string];
        const now = new Date();
        return !lastReviewTime || (now.getTime() - lastReviewTime.getTime() >= 24 * 60 * 60 * 1000);
      });
      setFilteredItems(filtered); 
    }
  }, [items, reviewTime]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <div className="flex justify-between text-gray-500 mt-8 md:text-base text-sm">
        <button
          className={`flex items-center ${activeButton === "home" ? "text-[#5442f6]" : ""}`}
          onClick={() => handleButtonClick("home")}
        >
          <FiHome className="scale-150" />
          <p className="ml-2">Beranda</p>
        </button>
        <button
          className={`flex items-center ${activeButton === "dosen" ? "text-[#5442f6]" : ""}`}
          onClick={() => handleButtonClick("dosen")}
        >
          <RiGroupLine className="scale-150" />
          <p className="ml-2">Profil Dosen</p>
        </button>
        <button
          className={`flex items-center ${activeButton === "saya" ? "text-[#5442f6]" : ""}`}
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
            {activeButton === "home" && (
              <div>
                <h3 className="font-bold text-lg">Beranda</h3>
                <p className="mt-2">
                  Selamat datang di website penilaian dan umpan balik antara dosen
                  dan mahasiswa dengan realtime.
                </p>
                <h3 className="font-bold text-lg mb-3">penilaian hari ini</h3>
                <ReviewCard items={filteredItems} userId={session || ""}/>
              </div>
            )}
            {activeButton === "dosen" && (
              <div>
                <h3 className="font-bold text-lg">Profil Dosen</h3>
                <p className="mt-2">
                  Informasi profil dosen akan ditampilkan di sini.
                </p>
                <ProfileList />
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
