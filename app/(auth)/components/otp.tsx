"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Otp({ onSuccess, mobile }: { onSuccess: () => void; mobile: string }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async () => {
    if (!otp) return toast("Please enter OTP");
    if (otp.length !== 6) return toast("OTP must be 6 digits");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("mobile", mobile);
      formData.append("otp", otp);

      const res = await fetch(
        "https://nexlearn.noviindusdemosites.in/auth/verify-otp",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        toast(data.message || "Invalid OTP");
        return;
      }

     
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      localStorage.setItem("userId", data.user_id);
      localStorage.setItem("mobile", data.mobile);

      toast("Login successful!");
      onSuccess(); 
    } catch (err) {
      toast("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // RESEND OTP
  // ----------------------------------------------------
  const handleResend = async () => {
    if (!mobile) return toast("Mobile number missing!");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("mobile", mobile);

      const res = await fetch(
        "https://nexlearn.noviindusdemosites.in/auth/send-otp",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        toast(data.message || "Failed to resend OTP");
        return;
      }

      toast("OTP resent!");
    } catch (err) {
      toast("Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-7 py-7 w-[339px] space-y-4">
      <p className="text-[#000] text-[23px] font-semibold">Enter the code we texted you</p>
      <p className="text-gray-600 text-[16px]">{`We've sent an SMS to ${mobile}`}</p>

      <div className="flex flex-col space-y-2">
        <label htmlFor="otp" className="text-gray-400 relative top-5 left-4 bg-white text-[14px] font-medium">
          SMS code
        </label>

        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
          className="w-[339px] h-[56px] border border-gray-300 rounded-lg px-4 text-gray-700 placeholder:text-gray-400"
        />
      </div>

      <p className="text-[13px] text-zinc-600">Your 6 digit code is on its way. This may take a few moments.</p>

      <button
        className="underline text-[14px] text-black font-semibold hover:text-zinc-600"
        onClick={handleResend}
        disabled={loading}
      >
        {loading ? "Resending..." : "Resend code"}
      </button>

      <button
        type="button"
        disabled={loading}
        className="absolute bottom-10 bg-[#1C3141] text-white rounded-lg w-[339px] h-[45px] flex justify-center items-center hover:bg-[#16232e] disabled:opacity-50"
        onClick={handleSubmit}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}
