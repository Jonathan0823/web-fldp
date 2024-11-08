"use client";
import axios from "axios";
import React, { useEffect } from "react";

interface Comment{
    id: string;
    dosenId: string;
    user: {
        id: string;
        name: string;
    }
    comment: string;
    type: string;
    createdAt: string;
}

const CommentBox = ({ type, dosenId }: { type: string; dosenId: string }) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const getComments = async () => {
    const res = await axios.get(`/api/getComments/${dosenId}`);
    setComments(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    getComments();
  }, []);


  const filteredComments = comments
  .filter((comment: Comment) => comment.type === type)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  return (
    <div className="h-48 relative overflow-y-auto">
     <div className="overflow-y-auto">
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
    </div>
  );
};

export default CommentBox;
