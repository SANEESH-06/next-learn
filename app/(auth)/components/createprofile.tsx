"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Createprofile({ mobile }: { mobile: string }) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // -------------------------
  // IMAGE HANDLER
  // -------------------------
  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setImage(file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  // -------------------------
  // CREATE PROFILE
  // -------------------------
  const handleNext = async () => {
 
      router.push("/dashboard/instruction");
 
  }
  return (
    <div className="flex flex-col px-7 py-0 w-full space-y-6 relative">
      <p className="text-[#000] w-full text-[23px] font-semibold">
        Add Your Details
      </p>

      {/* Image Upload */}
      <div className="flex flex-col items-center">
        <label htmlFor="imageUpload" className="cursor-pointer">
          {preview ? (
            <Image
              src={preview}
              alt="Profile Preview"
              width={96}
              height={96}
              className="w-[132px] h-[127px] rounded-lg object-cover border border-gray-300 shadow-sm"
            />
          ) : (
            <div className="w-[132px] h-[127px] flex flex-col items-center justify-center gap-2.5 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition">
              <Image
                alt="upload icon"
                src={"/icons/Vector.png"}
                width={24}
                height={24}
              />
              <p className="text-[10px] text-gray-400 text-center">
                Add your profile picture
              </p>
            </div>
          )}
        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          // onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Inputs */}
      <div className="max-h-40 space-y-5">
        <div className="flex flex-col">
          <label className="text-gray-800 left-10 top-49 text-[12px] p-1 bg-white absolute font-medium">
            Name*
          </label>
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="w-[339px] h-[40px] border border-gray-300 rounded-lg px-4 text-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800 left-10 top-64 text-[12px] p-1 bg-white absolute font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email Address"
            className="w-[339px] h-[40px] border border-gray-300 rounded-lg px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800 left-10 top-79 p-1 text-[12px] bg-white absolute font-medium">
            Your qualification*
          </label>
          <input
            type="text"
            placeholder="Enter Qualification"
            className="w-[339px] h-[40px] border border-gray-300 rounded-lg px-4"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="relative bottom-0 flex items-center justify-center bg-[#1C3141] text-white rounded-lg hover:bg-[#16232e] transition w-[339px] h-[45px]"
        onClick={handleNext}
      >
        {loading ? "Processing..." : "Get Started"}
      </button>
    </div>
  );
}
