import { useSession } from "next-auth/react";
import React from "react";
import { FiUser } from "react-icons/fi";

const MyProfile = () => {
  const { data } = useSession();
  return (
    <div className=" bg-white rounded-xl mt-2 shadow-md min-h-32 flex-col pb-4">
      <div className="ml-6">
        <div className=" flex items-center gap-4 mt-3">
          <FiUser className="text-6xl p-2 rounded-full mt-6 text-[#564add] bg-[#e1e7fe]" />
          <div className="flex flex-col justify-center mt-5">
            <p className="font-bold text-lg">{data?.user?.name}</p>
            <p className="text-gray-700">{data?.user?.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="font-semibold">Jumlah Penilaian</p>
          <p className="font-bold text-[#564add] text-xl">0</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Bergabung Sejak</p>
          <p>September 2023</p>
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
