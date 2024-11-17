import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { review, sendComments } from "@/lib/action";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { formatToTitleCase } from "./ListDosen";

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
  const [comments, setComments] = useState<{ [key: string]: string }>({});
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
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching review data", error);
      } finally {
        setApiLoading(false);
      }
    };
    fetchData();
  }, [dosenId, userId]);



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
    if (
      !ratings[dosenId] ||
      Object.values(ratings[dosenId]).some((rating) => rating === 0)
    ) {
      return toast.error("Harap berikan penilaian untuk semua kategori");
    }
    if(
      Object.values(comments).some((comment) => comment === "")
    ) {
      return toast.error("Harap berikan komentar untuk semua kategori");
    }
    
    setLoading(true);
    toast.loading("Mengirim evaluasi...");
    try {
      const {
        pembelajaran = 0,
        tepatWaktu = 0,
        kehadiran = 0,
        pengajaran = 0,
        penyampaianMateri = 0,
      } = ratings[dosenId] || {};
      const commentPembelajaran = comments["pembelajaran"] || "";
      const commentKehadiran = comments["kehadiran"] || "";
      const commentTepatWaktu = comments["tepatWaktu"] || "";
      const commentPengajaran = comments["pengajaran"] || "";
      const commentPenyampaianMateri = comments["penyampaianMateri"] || "";

      if (
        !pembelajaran ||
        !kehadiran ||
        !tepatWaktu ||
        !pengajaran ||
        !penyampaianMateri
      ) {
        toast.dismiss();
        return toast.error("Harap berikan penilaian untuk semua kategori");
      }
      if (
        !commentPembelajaran ||
        !commentKehadiran ||
        !commentTepatWaktu ||
        !commentPengajaran ||
        !commentPenyampaianMateri
      ) {
        toast.dismiss();
        return toast.error("Harap berikan komentar untuk semua kategori");
      }
      

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
        "",
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
      toast.dismiss();
      toast.success("Review berhasil dikirim");
    } catch {
      toast.dismiss();
      toast.error("Gagal mengirim review");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: "Metode Pengajaran", key: "pengajaran" },
    { name: "Media Pembelajaran", key: "pembelajaran" },
    { name: "Penyampaian Materi", key: "penyampaianMateri" },
    { name: "Ketepatan Waktu", key: "tepatWaktu" },
    { name: "Kehadiran", key: "kehadiran" },
  ];



  return (
    <div>
      <Toaster />
      {apiLoading ? (
        <div className="text-center text-gray-500">Loading data...</div>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada dosen yang perlu direview saat ini.
        </p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md mb-4 space-y-4"
          >
            <div className="flex items-center space-x-4">
              <FiUser className="text-6xl p-2 rounded-full text-[#564add] bg-[#e1e7fe]" />
              <div className="text-xs text-gray-500 text-left">
                <p className="font-bold text-gray-900">
                  {formatToTitleCase(item.nama)}
                </p>
                <p>{formatToTitleCase(item.fakultas)}</p>
                <p>{formatToTitleCase(item.matakuliah)}</p>
              </div>
            </div>

            {categories.map((category) => (
              <div
                key={category.key}
                className=" rounded-xl space-y-2 mb-4"
              >
                <div className="flex flex-col items-center">
                  <h2 className="mr-auto text-sm font-semibold text-gray-900">
                    {category.name}
                  </h2>
                  <div className="flex mr-auto items-center space-x-1">
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
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    className="w-full p-2 border rounded text-xs h-24 resize-none"
                    value={comments[category.key] || ""}
                    onChange={(e) =>
                      handleCommentChange(category.key, e.target.value)
                    }
                    placeholder={`Berikan komentar tentang ${category.name}`}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    fill="none"
                    viewBox="0 0 24 24"
                    className="absolute bottom-2 right-1"
                  >
                    <path
                      stroke="#797979"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m21 15-6 6m6-13L8 21"
                    />
                  </svg>
                </div>
              </div>
            ))}

            <button
              disabled={loading}
              onClick={() => handleSubmit(item.id)}
              className="mt-4 w-full bg-[#3b82f6] text-white py-2 rounded-lg shadow-md hover:bg-[#326fd2]"
            >
              {loading ? "Mengirim Evaluasi...." : "Kirim Evaluasi"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewCard;
