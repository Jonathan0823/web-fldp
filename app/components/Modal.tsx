import Link from "next/link";
import React from "react";
import { IoMdClose } from "react-icons/io";
import DetailDosen from "./DetailDosen";
import ReviewCard from "./review-card";

interface ModalProps {
  type: "detail" | "rate";
  userId: string;
}

const Modal = ({ type, userId }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-auto w-full flex items-center justify-center">
      <div className="p-5 py-8 relative border w-full shadow-lg rounded-md md:max-w-md max-w-sm hide-scrollbar h-screen overflow-y-auto bg-white">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900">
            {type === "detail" ? "Detail Dosen" : "Evaluasi Kinerja Dosen"}
          </h3>
          <div className="mt-2 px-2 py-3">
            {type === "detail" ? (
              <div>
                <DetailDosen userId={userId} />
              </div>
            ) : (
              <div>
                <div>Beri Nilai</div>

                <div>
                  <ReviewCard userId={userId} />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <Link
              href="/"
              className="absolute top-9 right-7 text-gray-400 hover:text-red-500"
            >
              <IoMdClose className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
