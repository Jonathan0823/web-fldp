import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { review, sendComments } from "@/lib/action";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

interface ReviewItem {
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

interface ReviewCardProps {
  userId: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ userId }) => {
  const [ratings, setRatings] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [comment, setComment] = useState<{ [key: string]: string }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [reviewTime, setReviewTime] = useState<{ [key: string]: Date | null }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [apiLoading, setApiLoading] = useState(true);
  const params = useSearchParams();
  const dosenId = params.get("dosenId");

  useEffect(() => {
    const fetchData = async () => {
      setApiLoading(true);
      try {
        const response = await axios.get(`/api/getDosen/${dosenId}`);
        const reviewsResponse = await axios.get(`/api/getNilai/${userId}`);
        setItems(response.data);
        setReviewTime(
          reviewsResponse.data.reduce(
            (
              acc: { [key: string]: Date },
              review: { dosenId: string; lastReviewTime: string }
            ) => {
              acc[review.dosenId] = new Date(review.lastReviewTime);
              return acc;
            },
            {}
          )
        );
      } catch (error) {
        console.error("Error fetching review data", error);
      } finally {
        setApiLoading(false);
      }
    };
    fetchData();
  }, [dosenId, userId]);

  const getNextMonday = (date: Date) => {
    const nextMonday = new Date(date);
    nextMonday.setDate(date.getDate() + ((8 - date.getDay()) % 7));
    nextMonday.setHours(0, 0, 0, 0);
    return nextMonday;
  };

  const handleStarClick = (
    dosenId: string,
    category: string,
    index: number
  ) => {
    setRatings((prev) => ({
      ...prev,
      [dosenId]: {
        ...prev[dosenId],
        [category]: index + 1,
      },
    }));
  };

  const handleCommentChange = (categoryKey: string, value: string) => {
    setComments((prev) => ({ ...prev, [categoryKey]: value }));
  };

  

  const handleSubmit = async (dosenId: string) => {
    setLoading(true);
    try {
      const {
        pembelajaran = 0,
        tepatWaktu = 0,
        kehadiran = 0,
        pengajaran = 0,
        penyampaianMateri = 0,
      } = ratings[dosenId] || {};
      const userComment = comment[dosenId] || "";
      const commentPembelajaran = comments["pembelajaran"] || "";
      const commentKehadiran = comments["kehadiran"] || "";
      const commentTepatWaktu = comments["tepatWaktu"] || "";
      const commentPengajaran = comments["pengajaran"] || "";
      const commentPenyampaianMateri = comments["penyampaianMateri"] || "";
      await Promise.all([
        sendComments(dosenId, userId, commentPembelajaran, "pembelajaran"),
        sendComments(dosenId, userId, commentKehadiran, "kehadiran"),
        sendComments(dosenId, userId, commentTepatWaktu, "tepatWaktu"),
        sendComments(dosenId, userId, commentPengajaran, "pengajaran"),
        sendComments(
          dosenId,
          userId,
          commentPenyampaianMateri,
          "penyampaianMateri"
        ),
      ]);
      await review(
        pembelajaran,
        kehadiran,
        tepatWaktu,
        pengajaran,
        penyampaianMateri,
        userComment,
        dosenId.toString(),
        userId
      );
     
      setComments(() => ({
        pembelajaran: "",
        kehadiran: "",
        tepatWaktu: "",
        pengajaran: "",
        penyampaianMateri: "",
      }));
      setComment((prev) => ({ ...prev, [dosenId]: "" }));
      setReviewTime((prev) => ({ ...prev, [dosenId]: new Date() }));
      toast.success("Review berhasil dikirim");
    } catch (error) {
      console.error("Error submitting review and comment:", error);
      toast.error("Gagal mengirim review");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: "Pembelajaran", key: "pembelajaran" },
    { name: "Ketepatan Waktu", key: "tepatWaktu" },
    { name: "Kehadiran", key: "kehadiran" },
    { name: "Pengajaran", key: "pengajaran" },
    { name: "Penyampaian Materi", key: "penyampaianMateri" },
  ];

  const filteredItems = items.filter((item) => {
    const lastReviewTime = reviewTime[item.id];
    const now = new Date();
    return !lastReviewTime || now >= getNextMonday(lastReviewTime);
  });

  return (
    <div>
      <Toaster />
      {apiLoading ? (
        <div className="text-center text-gray-500">Loading data...</div>
      ) : filteredItems.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada dosen yang perlu direview saat ini.
        </p>
      ) : (
        filteredItems.map((item) => (
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
                        onClick={() =>
                          handleStarClick(item.id, category.key, index)
                        }
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
                      {ratings[item.id]?.[category.key] || 0}/5
                    </span>
                  </div>
                </div>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={comments[category.key] || ""}
                  onChange={(e) =>
                    handleCommentChange(category.key, e.target.value)
                  }
                  placeholder={`Add a comment for ${category.name}`}
                />
              </div>
            ))}

            <div>
              <input
                type="text"
                placeholder="Tambahkan komentar..."
                value={comment[item.id] || ""}
                onChange={(e) =>
                  setComment((prev) => ({ ...prev, [item.id]: e.target.value }))
                }
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              disabled={loading}
              onClick={() => handleSubmit(item.id)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 focus:bg-green-700"
            >
              {loading ? "Mengirim rating...." : "Submit Review & Comment"}
            </button>
            
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewCard;
