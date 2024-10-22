
import React from "react";
import { FiUser } from "react-icons/fi";
import { formatDateToIndonesian } from "@/lib/utilis";


interface User {
  email: string;
  name: string;
  penilaian: []; 
  createdAt: string;
}

const MyProfile = ({ user }: { user: User }) => {
  return (
    <div className=" bg-white rounded-xl mt-2 shadow-md min-h-32 flex-col pb-4">
      <div className="ml-6">
        <div className=" flex items-center gap-4 mt-3">
          <FiUser className="text-6xl p-2 rounded-full mt-6 text-[#564add] bg-[#e1e7fe]" />
          <div className="flex flex-col justify-center mt-5">
            <p className="font-bold text-lg">{user.email}</p>
            <p className="text-gray-700">{user.name}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="font-semibold">Jumlah Penilaian</p>
          <p className="font-bold text-[#564add] text-xl">{user.penilaian.length}</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Bergabung Sejak</p>
          <p>{formatDateToIndonesian(user.createdAt)}</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Rata-Rata Penilaian</p>
          <p>4.5</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
