"use client"
import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axios from "axios";

const profiles = [
  {
    name: "Dr. dean Smith",
    specialization: "yapping Terapan",
    rating: 4.5,
    reviews: 50,
  },
  {
    name: "Prof. amba thu khang",
    specialization: "Linguistik Terapan",
    rating: 4.5,
    reviews: 50,
  },
  {
    name: "Mrs. reagga nigarox",
    specialization: "Pendidikan Bahasa Jepang",
    rating: 4.5,
    reviews: 50,
  },
];

export default function ProfileList() {
    const [dosen, setDosen] = useState([]);

    const getDosenData = async () => {
        try{
            const result = await axios.get('http://localhost:3000/api/dosen');
        }catch(e){
            console.log(e);
        }
    }
    getDosenData();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Profil Dosen Pendidikan Bahasa Inggris
      </h2>
      <div className="space-y-4">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-900">{profile.name}</h3>
              <p className="text-sm text-gray-600">{profile.specialization}</p>
              <div className="flex items-center mt-1">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">
                  {profile.rating}/5 ({profile.reviews} penilaian)
                </span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              ➔
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
