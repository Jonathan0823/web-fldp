import { review } from "@/lib/action";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";

interface ReviewItem {
  id: number;
  nama: string;
  fakultas: string;
  matakuliah: string;
  profilePic: string;
}

interface ReviewCardProps {
  items: ReviewItem[];
  userId: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ items, userId }) => {
  const [ratings, setRatings] = useState<{ [key: string]: { [key: string]: number } }>({});
  const [comment, setComment] = useState<{ [key: string]: string }>({});

  const handleStarClick = (dosenId: number, category: string, index: number) => {
    setRatings((prev) => ({
      ...prev,
      [dosenId]: {
        ...prev[dosenId],
        [category]: index + 1,
      },
    }));
  };

  const handleSubmit = async (dosenId: number) => {
    try {
      const { pembelajaran = 0, tepatWaktu = 0, kehadiran = 0 } = ratings[dosenId] || {};
      const userComment = comment[dosenId] || "";
      await review(
        pembelajaran,
        kehadiran,
        tepatWaktu,
        userComment,
        dosenId.toString(),
        userId
      );
      console.log("Review and comment submitted successfully");
      setComment((prev) => ({ ...prev, [dosenId]: "" })); 
    } catch (error) {
      console.error("Error submitting review and comment:", error);
    }
  };

  const categories = [
    { name: "Pembelajaran", key: "pembelajaran" },
    { name: "Ketepatan Waktu", key: "tepatWaktu" },
    { name: "Kehadiran", key: "kehadiran" },
  ];

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md mb-4 space-y-4"
        >
          <div className="flex items-center space-x-4">
            <FiUser className="text-6xl p-2 rounded-full mt-6 text-[#564add] bg-[#e1e7fe]" />
            <div className="text-xs text-gray-500">
              <p className="font-bold text-gray-900">{item.nama}</p>
              <p>{item.fakultas}</p>
              <p>{item.matakuliah}</p>
            </div>
          </div>

          {categories.map((category) => (
            <div
              key={category.key}
              className="p-4 bg-gray-50 rounded-xl space-y-2 mb-4"
            >
              <div className="flex items-center">
                <h2 className="text-base font-semibold text-gray-900">
                  {category.name}
                </h2>
                <div className="ml-auto flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleStarClick(item.id, category.key, index)}
                      className={`text-2xl ${
                        index < (ratings[item.id]?.[category.key] || 0)
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {(ratings[item.id]?.[category.key] || 0)}/5
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div>
            <input
              type="text"
              placeholder="Tambahkan komentar..."
              value={comment[item.id] || ""}
              onChange={(e) => setComment((prev) => ({ ...prev, [item.id]: e.target.value }))}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={() => handleSubmit(item.id)}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 focus:bg-green-700"
          >
            Submit Review & Comment
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
