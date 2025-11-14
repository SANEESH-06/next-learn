"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      await fetch("https://nexlearn.noviindusdemosites.in/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Logout API failed, but continuing logout...");
    }

    // Remove token
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("mobile");
    localStorage.removeItem("userId");

    // Redirect to home
    router.push("/");
  };

  return (
    <nav className="h-[90px] bg-white flex items-center justify-between px-10 shadow-sm">
      <div className="w-[80px]" />

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <Image
            alt="NexLearn Logo"
            src="/logo/logo2.png"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <div className="flex flex-col leading-tight">
            <p className="text-[25px] font-semibold bg-gradient-to-r from-[#1C3141] to-[#146180] text-transparent bg-clip-text">
              NexLearn
            </p>
            <p className="text-[15px] text-gray-500">futuristic</p>
          </div>
        </div>
      </div>

      <div className="w-[80px] flex justify-end">
        <button
          className="px-4 py-2 rounded-lg bg-[#1C3141] text-white hover:bg-[#16232e] transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
