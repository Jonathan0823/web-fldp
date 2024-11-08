"use client";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { MdLeaderboard } from "react-icons/md";
import CommentBox from "./CommentBox";

const DetailDosen = ({ userId }: { userId: string }) => {
  const params = useSearchParams();
  const dosenId = params.get("dosenId");
  interface Dosen {
    nilai: [];
    nama: string;
    nip: string;
    email: string;
    prodi: string;
    fakultas: string;
    matakuliah: string;
    rating: number;
    nilaiPembelajaran: number[];
    nilaiKehadiran: number[];
    nilaiKetepatanWaktu: number[];
    nilaiPengajaran: number[];
    nilaiPenyampaianMateri: number[];
  }

  const [dosen, setDosen] = React.useState<Dosen | null>(null);

  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const { data } = await axios.get(`/api/getDosen/${dosenId}`);
        setDosen(data[0]);
        console.log(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (dosenId) {
      fetchDosen();
    }
  }, [dosenId]);

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

  const ratingPembelajaran = dosen?.nilaiPembelajaran.reduce((acc, curr) => {
    const total = acc + curr;
    return total;
  }, 0);

  const ratingKehadiran = dosen?.nilaiKehadiran.reduce((acc, curr) => {
    const total = acc + curr;
    return total;
  }, 0);

  const ratingKetepatanWaktu = dosen?.nilaiKetepatanWaktu.reduce(
    (acc, curr) => {
      const total = acc + curr;
      return total;
    },
    0
  );

  const ratingPengajaran = dosen?.nilaiPengajaran.reduce((acc, curr) => {
    const total = acc + curr;
    return total;
  }, 0);

  const ratingPenyampaianMateri = dosen?.nilaiPenyampaianMateri.reduce(
    (acc, curr) => {
      const total = acc + curr;
      return total;
    },
    0
  );

  const filterRating = (rating: number, type: string) => {
    if (type === "pembelajaran") {
      return dosen?.nilaiPembelajaran.filter((nilai) => nilai === rating)
        .length;
    }
    if (type === "kehadiran") {
      return dosen?.nilaiKehadiran.filter((nilai) => nilai === rating).length;
    }
    if (type === "ketepatanWaktu") {
      return dosen?.nilaiKetepatanWaktu.filter((nilai) => nilai === rating)
        .length;
    }
    if (type === "pengajaran") {
      return dosen?.nilaiPengajaran.filter((nilai) => nilai === rating).length;
    }
    if (type === "penyampaianMateri") {
      return dosen?.nilaiPenyampaianMateri.filter((nilai) => nilai === rating)
        .length;
    }
  };

  const persentageRating = (rating: number, type: string) => {
    if (type === "pembelajaran") {
      const totalRating = dosen?.nilaiPembelajaran.length;
      const ratingCount = dosen?.nilaiPembelajaran.filter(
        (nilai) => nilai === rating
      ).length;
      return ratingCount !== undefined && totalRating !== undefined
        ? (ratingCount / totalRating) * 100
        : 0;
    }
    if (type === "kehadiran") {
      const totalRating = dosen?.nilai.length;
      const ratingCount = dosen?.nilaiKehadiran.filter(
        (nilai) => nilai === rating
      ).length;
      return ratingCount !== undefined && totalRating !== undefined
        ? (ratingCount / totalRating) * 100
        : 0;
    }
    if (type === "ketepatanWaktu") {
      const totalRating = dosen?.nilaiKetepatanWaktu.length;
      const ratingCount = dosen?.nilaiKetepatanWaktu.filter(
        (nilai) => nilai === rating
      ).length;
      return ratingCount !== undefined && totalRating !== undefined
        ? (ratingCount / totalRating) * 100
        : 0;
    }
    if (type === "pengajaran") {
      const totalRating = dosen?.nilaiPengajaran.length;
      const ratingCount = dosen?.nilaiPengajaran.filter(
        (nilai) => nilai === rating
      ).length;
      return ratingCount !== undefined && totalRating !== undefined
        ? (ratingCount / totalRating) * 100
        : 0;
    }
    if (type === "penyampaianMateri") {
      const totalRating = dosen?.nilaiPenyampaianMateri.length;
      const ratingCount = dosen?.nilaiPenyampaianMateri.filter(
        (nilai) => nilai === rating
      ).length;
      return ratingCount !== undefined && totalRating !== undefined
        ? (ratingCount / totalRating) * 100
        : 0;
    }
  };

  const renderRating = (rating: number) => {
    return rating % 1 === 0 ? rating : rating.toFixed(2);
  };

  return (
    <div>
      {dosen && (
        <div className="flex flex-col">
          <div className="text-left text-base">
            {[
              { label: "Nama", value: dosen.nama },
              { label: "NIP", value: dosen.nip },
              { label: "Email", value: dosen.email },
              { label: "Prodi", value: dosen.prodi },
              { label: "Fakultas", value: dosen.fakultas },
              { label: "Matakuliah", value: dosen.matakuliah },
            ].map((item, index) => (
              <div key={index} className="flex">
                <p className="w-24 font-semibold">{item.label}</p>
                <p>:</p>
                <p className="ml-2">{item.value}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-3 text-lg font-bold mb-3">Penilaian</h2>
          <div className="flex flex-col">
            {dosen.nilai.length > 0 ? (
              <div className="flex flex-col gap-5">
                <div className="border border-slate-300 p-3 overflow-hidden shadow-md rounded-lg flex flex-col ">
                  <h2 className="font-semibold mb-1">Metode Pengajaran</h2>
                  <div className="flex justify-center gap-1 text-sm">
                    {ratingPengajaran !== undefined &&
                      renderStars(ratingPengajaran / dosen.nilai.length)}
                    <div className="flex justify-center items-center gap-2">
                      <p className="ml-1">
                        {ratingPengajaran
                          ? renderRating(ratingPengajaran / dosen.nilai.length)
                          : "0"}
                        /5
                      </p>
                      <MdLeaderboard className="w-6 h-6 text-[#935cc4]" />
                    </div>
                  </div>
                  <div className="mx-4 mt-6">
                    <h3 className="font-semibold text-left">
                      Distribusi Rating:
                    </h3>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center justify-center gap-3"
                      >
                        <p className="w-20">{rating} Star</p>
                        <Progress
                          value={persentageRating(rating, "pengajaran")}
                        />
                        <p>{filterRating(rating, "pengajaran")}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-left ml-4 mt-2">
                    <p className="font-semibold">Komentar:</p>
                    <div>
                      {dosenId && (
                        <CommentBox type="pengajaran" dosenId={dosenId} userId={userId} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-slate-300 p-3 overflow-hidden shadow-md rounded-lg flex flex-col ">
                  <h2 className="font-semibold mb-1">Media Pembelajaran</h2>
                  <div className="flex justify-center gap-1 text-sm">
                    {ratingPembelajaran !== undefined &&
                      renderStars(
                        ratingPembelajaran / dosen.nilaiPembelajaran.length
                      )}
                    <div className="flex justify-center items-center gap-2">
                      <p className="ml-1">
                        {ratingPembelajaran
                          ? renderRating(
                              ratingPembelajaran /
                                dosen.nilaiPembelajaran.length
                            )
                          : "0"}
                        /5
                      </p>
                      <MdLeaderboard className="w-6 h-6 text-[#935cc4]" />
                    </div>
                  </div>
                  <div className="mx-4 mt-6">
                    <h3 className="font-semibold text-left">
                      Distribusi Rating:
                    </h3>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center justify-center gap-3"
                      >
                        <p className="w-20">{rating} Star</p>
                        <Progress
                          value={persentageRating(rating, "pembelajaran")}
                        />
                        <p>{filterRating(rating, "pembelajaran")}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-left ml-4 mt-2">
                    <p className="font-semibold">Komentar:</p>
                    <div>
                      {dosenId && (
                        <CommentBox type="pembelajaran" dosenId={dosenId} userId={userId} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-slate-300 p-3 overflow-hidden shadow-md rounded-lg flex flex-col ">
                  <h2 className="font-semibold mb-1">Penyampaian Materi</h2>
                  <div className="flex justify-center gap-1 text-sm">
                    {ratingPenyampaianMateri !== undefined &&
                      renderStars(ratingPenyampaianMateri / dosen.nilai.length)}
                    <div className="flex justify-center items-center gap-2">
                      <p className="ml-1">
                        {ratingPenyampaianMateri
                          ? renderRating(
                              ratingPenyampaianMateri / dosen.nilai.length
                            )
                          : "0"}
                        /5
                      </p>
                      <MdLeaderboard className="w-6 h-6 text-[#935cc4]" />
                    </div>
                  </div>
                  <div className="mx-4 mt-6">
                    <h3 className="font-semibold text-left">
                      Distribusi Rating:
                    </h3>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center justify-center gap-3"
                      >
                        <p className="w-20">{rating} Star</p>
                        <Progress
                          value={persentageRating(rating, "penyampaianMateri")}
                        />
                        <p>{filterRating(rating, "penyampaianMateri")}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-left ml-4 mt-2">
                    <p className="font-semibold">Komentar:</p>
                    <div>
                      {dosenId && (
                        <CommentBox
                          type="penyampaianMateri"
                          dosenId={dosenId}
                          userId={userId}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-slate-300 p-3 overflow-hidden shadow-md rounded-lg flex flex-col ">
                  <h2 className="font-semibold mb-1">Kehadiran</h2>
                  <div className="flex justify-center gap-1 text-sm">
                    {ratingKehadiran !== undefined &&
                      renderStars(ratingKehadiran / dosen.nilai.length)}
                    <div className="flex justify-center items-center gap-2">
                      <p className="ml-1">
                        {ratingKehadiran
                          ? renderRating(ratingKehadiran / dosen.nilai.length)
                          : "0"}
                        /5
                      </p>
                      <MdLeaderboard className="w-6 h-6 text-[#935cc4]" />
                    </div>
                  </div>
                  <div className="mx-4 mt-6">
                    <h3 className="font-semibold text-left">
                      Distribusi Rating:
                    </h3>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center justify-center gap-3"
                      >
                        <p className="w-20">{rating} Star</p>
                        <Progress
                          value={persentageRating(rating, "kehadiran")}
                        />
                        <p>{filterRating(rating, "kehadiran")}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-left ml-4 mt-2">
                    <p className="font-semibold">Komentar:</p>
                    <div>
                      {dosenId && (
                        <CommentBox type="kehadiran" dosenId={dosenId} userId={userId}/>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-slate-300 p-3 overflow-hidden shadow-md rounded-lg flex flex-col ">
                  <h2 className="font-semibold mb-1">Ketepatan Waktu</h2>
                  <div className="flex justify-center gap-1 text-sm">
                    {ratingKetepatanWaktu !== undefined &&
                      renderStars(ratingKetepatanWaktu / dosen.nilai.length)}
                    <div className="flex justify-center items-center gap-2">
                      <p className="ml-1">
                        {ratingKetepatanWaktu
                          ? renderRating(
                              ratingKetepatanWaktu / dosen.nilai.length
                            )
                          : "0"}
                        /5
                      </p>
                      <MdLeaderboard className="w-6 h-6 text-[#935cc4]" />
                    </div>
                  </div>
                  <div className="mx-4 mt-6">
                    <h3 className="font-semibold text-left">
                      Distribusi Rating:
                    </h3>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center justify-center gap-3"
                      >
                        <p className="w-20">{rating} Star</p>
                        <Progress
                          value={persentageRating(rating, "ketepatanWaktu")}
                        />
                        <p>{filterRating(rating, "ketepatanWaktu")}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-left ml-4 mt-2">
                    <p className="font-semibold">Komentar:</p>
                    <div>
                      {dosenId && (
                        <CommentBox type="tepatWaktu" dosenId={dosenId} userId={userId} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-center">Belum ada penilaian</h2>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailDosen;
