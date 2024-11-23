import React from "react";
import { FiUser } from "react-icons/fi";
import { formatDateToIndonesian } from "@/lib/utilis";
import { renderRating } from "../DetailDosen";

interface User {
  email: string;
  name: string;
  penilaian: [];
  createdAt: string;
}
interface Nilai {
  pembelajaran: number;
  kehadiran: number;
  ketepatanWaktu: number;
}

const MyProfile = ({ user }: { user: User }) => {

  const totalPenilaian = user.penilaian.length;
  const totalRating = user.penilaian.reduce((acc: number, nilai: Nilai) => {
    return acc + nilai.pembelajaran + nilai.kehadiran + nilai.ketepatanWaktu;
  }, 0);
  const averageRating = totalRating / (totalPenilaian * 5) || 0;

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

  return (
    <div className=" bg-white rounded-xl mt-2 shadow-md min-h-32 flex-col pb-4">
      <div className="ml-6">
        <div className=" flex items-center gap-4 mt-3">
          <FiUser className="text-6xl p-2 rounded-full mt-6 text-[#564add] bg-[#e1e7fe]" />
          <div className="flex flex-col justify-center mt-5">
            <p className="font-bold text-lg">{user.name}</p>
            <p className="text-gray-700">{user.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="font-semibold">Jumlah Penilaian</p>
          <p className="font-bold text-[#564add] text-xl">
            {user.penilaian.length}
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Bergabung Sejak</p>
          <p>{formatDateToIndonesian(user.createdAt)}</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Rata-Rata Penilaian</p>
          <div className="flex gap-3">
            <div className="flex gap-1">{renderStars(averageRating)}</div>
            <p className="mt-[3px]">{renderRating(averageRating)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
