import React from 'react'
import Image from 'next/image'
export default function navbar() {
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
              <p className="text-[25px] font-semibold text-[#1C3141]">
                NexLearn
              </p>
              <p className="text-[15px] text-gray-500">futuristic</p>
            </div>
          </div>
        </div>

        <div className="w-[80px] flex justify-end">
          <button
            className="px-4 py-2 rounded-lg bg-[#1C3141] text-white hover:bg-[#16232e] transition"
            // onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
  )
}
