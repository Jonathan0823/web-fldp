"use client";

import { GoLock } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import React from "react";
import { useState } from "react";
import { CircularProgress } from "@mui/material"; 
import { signIn } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [sending, setSending] = useState<boolean>(false);
  

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setSending(true);
      console.log(email, password);
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Login Failed");
        return;
      }
      toast.success("Login Success");
      setEmail("");
      setPassword("");
      window.location.href = "/";
    
      
    } catch {
      toast.error("Login Failed");
    }finally{
      setSending(false);
  }};

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#eff1f3]">
      <div className="bg-white p-8 mx-4 rounded-lg  md:max-w-md max-w-sm w-full shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Masuk
        </h2>
        <Toaster/>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
              <MdOutlineEmail className="text-gray-500 mr-4 scale-150" />
              <input
                type="email"
                id="email"
                className="w-full focus:outline-none "
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
              <GoLock className="text-gray-500 mr-4 scale-150" />
              <input
                type="password"
                id="password"
                className="w-full focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button disabled={sending} className="w-full bg-[#5046e5] text-white py-2 px-4 rounded-lg hover:bg-[#3b32b0] focus:ring focus:ring-sky-300 focus:outline-none">
            {sending ? <CircularProgress size={24} color="inherit" /> : "Masuk"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="mt-2 text-sm">
          <a href="/signup" className="text-[#5f52b0] hover:underline font-semibold">
            Belum punya akun? Daftar  
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
