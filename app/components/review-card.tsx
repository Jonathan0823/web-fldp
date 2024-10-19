
import React, { useState } from 'react';

const ReviewCard = () => {
  const [rating, setRating] = useState(0);
  const handleStarClick = (index:number) => {
    setRating(index + 1);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-900">Pembelajaran</h2>
        <div className="ml-auto flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleStarClick(index)} 
              className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
            >
              ★
            </button>
          ))}
          <span className="text-sm text-gray-600 ml-2">{rating}/5</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="p-2 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-800">
            data comment
          </p>
          <p className="text-right text-xs text-gray-500">- mulyono</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-800">
            data comment
          </p>
          <p className="text-right text-xs text-gray-500">- bj</p>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Tambahkan komentar..."
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:bg-blue-700">
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
