"use client";
import { FiUserPlus } from "react-icons/fi";
import { GoLock } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import React from "react";
import { useState } from "react";
import { CircularProgress } from "@mui/material"; 


const SignUp: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState<string>(" ");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setSending(true);
      await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccessMessage("Sign Up Success");
      
        window.location.href = "/signin";

      
    } catch (error) {
      setError("Sign Up Failed");
      throw error;
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#eff1f3]">
      <div className="bg-white p-8 rounded-lg md:max-w-md max-w-sm w-full shadow-md">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Daftar Akun Baru
        </h2>

        <form onSubmit={handleSignUp}>
          
          <div className="mb-3">
            <label
              className="block text-sm font-semibold text-gray-500"
              htmlFor="email"
            >
              Email Pribadi
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
              <MdOutlineEmail className="text-gray-500 mr-4 scale-150" />
              <input
                type="email"
                name="email"
                id="email"
                className="w-full focus:outline-none"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label
              className="block text-sm font-semibold text-gray-500"
              htmlFor="password"
            >
              Kata Sandi
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
              <GoLock className="text-gray-500 mr-4 scale-150" />
              <input
                type="password"
                name="password"
                id="password"
                className="w-full focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-semibold text-gray-500"
              htmlFor="name"
            >
              Nama Anonim
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
              <FiUserPlus className="text-gray-500 mr-4 scale-150" />
              <input
                type="text"
                name="name"
                id="name"
                className="w-full focus:outline-none"
                placeholder="Contoh: Udang Terbang"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <label className="text-sm text-gray-500 font-semibold">Gunakan nama anonim yang baik dan tidak senonoh</label>
          </div>

          <button disabled={sending} className="w-full mt-3 bg-[#5046e5] text-white py-2 px-4 rounded-lg hover:bg-[#3b32b0] focus:ring focus:ring-sky-300 focus:outline-none">
          {sending ? <CircularProgress size={24} color="inherit" /> : "Daftar"}
          </button>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {successMessage && (
            <p className="mt-2 text-sm text-green-500">{successMessage}</p>
          )}
        </form>
        <div className="text-center mt-4">
          <p className="mt-2 text-sm">
            
            <a href="/signin" className="text-[#5f52b0] hover:underline font-semibold">
            Sudah punya akun? Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
