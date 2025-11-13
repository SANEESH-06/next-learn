"use client";

import PhoneInput from "react-phone-input-2";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Login({
  onSuccess,
  setMobile,
}: {
  onSuccess: () => void;
  setMobile: (value: string) => void;
}) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!phone) {
      toast("Please enter your number");
      return;
    }

    const fullMobile = "+" + phone;
    setMobile(fullMobile); // Save for OTP page

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("mobile", fullMobile);

      const res = await fetch(
        "https://nexlearn.noviindusdemosites.in/auth/send-otp",
        {
          method: "POST",
          body: formData,
        }
      );

      const raw = await res.clone().text();
      console.log("Status:", res.status);
      console.log("Response:", raw);

      if (!res.ok) {
        toast("Incorrect number");
        throw new Error("Login failed");
      }

      const data = await res.json();

      if (!data.success) {
        toast(data.message);
        return;
      }

      onSuccess(); // Move to OTP screen
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-7 py-7 w-[339px] space-y-4">
      <p className="text-[#000] text-[23px] font-semibold">
        Enter your phone number
      </p>

      <p className="text-gray-600 text-[16px]">
        We use your mobile number to identify your account
      </p>

      <PhoneInput
        country={"in"}
        value={phone}
        onChange={setPhone}
        placeholder="+91 1234567890"
        inputClass="!w-[339px] !h-[56px] !border-gray-300 !rounded-lg !text-gray-700 !pl-12 placeholder:text-gray-400"
        containerClass="!w-[339px] !rounded-lg"
        buttonClass="!rounded-l-lg !bg-white !border-gray-300 !border-r-0"
      />

      <p className="text-[12px] font-normal">
        By tapping Get started, you agree to the{" "}
        <span className="font-semibold">Terms & Conditions</span>
      </p>

      <button
        type="submit"
        className="absolute bottom-10 flex items-center justify-center bg-[#1C3141] text-white rounded-lg hover:bg-[#16232e] transition w-[339px] h-[45px]"
        onClick={handleSubmit}
      >
        {loading ? "Processing..." : "Get Started"}
      </button>
    </div>
  );
}
