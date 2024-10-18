"use client"
import React, { useState } from 'react';
import { FiHome, FiUser } from 'react-icons/fi';
import { RiGroupLine } from 'react-icons/ri';

const HomeContent = () => {
  const [activeButton, setActiveButton] = useState('home');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <div className="flex justify-between text-gray-500 mt-8 md:text-base text-sm">
        <button
          className={`flex items-center ${activeButton === 'home' ? 'text-[#5442f6]' : ''}`}
          onClick={() => handleButtonClick('home')}
        >
          <FiHome className="scale-150" />
          <p className="ml-2">Beranda</p>
        </button>
        <button
          className={`flex items-center ${activeButton === 'dosen' ? 'text-[#5442f6]' : ''}`}
          onClick={() => handleButtonClick('dosen')}
        >
          <RiGroupLine className="scale-150" />
          <p className="ml-2">Profil Dosen</p>
        </button>
        <button
          className={`flex items-center ${activeButton === 'saya' ? 'text-[#5442f6]' : ''}`}
          onClick={() => handleButtonClick('saya')}
        >
          <FiUser className="scale-150" />
          <p className="ml-2">Profil Saya</p>
        </button>
      </div>
    </div>
  );
};

export default HomeContent