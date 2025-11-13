"use client";

import Image from "next/image";
import "react-phone-input-2/lib/style.css";
import Login from "./components/login";
import { useState } from "react";
import Otp from "./components/otp";
import Createprofile from "./components/createprofile";

export default function MainLogin() {
  const [islogin, setIsLogin] = useState(false);
  const [isverify, setIsVerify] = useState(false);
  const [mobile, setMobile] = useState("");

  return (
    <div className='flex justify-center items-center bg-[url("/background/bg.png")] bg-cover bg-center h-screen'>
      <div className="flex relative rounded-lg z-0 w-[866px] h-[501px] bg-gradient-to-t from-[#273c4b] to-[#021b2c] p-2 overflow-hidden shadow-xl">
        
        {/* LEFT SIDE */}
        <div className="w-[462px] h-full bg-gradient-to-t from-[#273c4b] to-[#021b2c] flex flex-col">
          <div className="flex py-[38px] items-center gap-2 justify-center">
            <Image
              src={"/logo/logo.png"}
              alt={"logo"}
              width={1000}
              height={1000}
              className="w-20 h-20"
            />
            <div>
              <p className="text-white font-bold text-4xl">NextLearn</p>
              <p className="text-white text-[15px]">futuristic learning</p>
            </div>
          </div>

          <div className="flex justify-center items-center py-10">
            <Image
              src={"/login/login.png"}
              alt="login"
              width={1000}
              height={1000}
              className="w-[335px] h-[260px]"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="z-10 w-[394px] rounded-md h-[481px] bg-white flex flex-col py-5">
          {isverify ? (
            <Createprofile mobile={mobile}  />
          ) : islogin ? (
            <Otp onSuccess={() => setIsVerify(true)} mobile={mobile} />
          ) : (
            <Login onSuccess={() => setIsLogin(true)} setMobile={setMobile} />
          )}
        </div>

      </div>
    </div>
  );
}
