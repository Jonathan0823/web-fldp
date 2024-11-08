"use client";
import { sendComments } from "@/lib/action";
import axios from "axios";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LuSend } from "react-icons/lu";
interface Comment {
  id: string;
  dosenId: string;
  user: {
    id: string;
    name: string;
  };
  comment: string;
  type: string;
  createdAt: string;
}

const CommentBox = ({
  type,
  dosenId,
  userId,
}: {
  type: string;
  dosenId: string;
  userId: string;
}) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [comment, setComment] = React.useState("");
  const getComments = async () => {
    const res = await axios.get(`/api/getComments/${dosenId}`);
    setComments(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleSubmit = async () => {
    try {
      await sendComments(dosenId, userId, comment, type);
      toast.success("Komentar berhasil dikirim");
      getComments();
      setComment("");
    } catch {
      toast.error("Gagal mengirim komentar");
    }
  };

  const filteredComments = comments
    .filter((comment: Comment) => comment.type === type)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <div className="h-48 relative">
      <Toaster />
      <div className="overflow-y-auto h-full pb-11">
        {filteredComments.length === 0 && (
          <div className="text-center text-gray-400">Belum ada komentar</div>
        )}
        {filteredComments.map((comment: Comment) => (
          <div key={comment.id} className="my-3">
            <h2>{comment.comment}</h2>
            <p className="text-sm text-slate-500">- {comment.user.name}</p>
          </div>
        ))}
      </div>
      <div className="flex absolute bottom-0 w-full">
        <input
          type="text"
          placeholder="Tambahkan komentar"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-[#f3f4f6] rounded-lg px-4 relative py-2"
        />
        <button className=" text-[#9956d4] py-2 absolute right-0 mr-2" onClick={handleSubmit}>
          <LuSend className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
