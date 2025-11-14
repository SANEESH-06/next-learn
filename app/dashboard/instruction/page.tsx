"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
export default function Instruction() {
  const route = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    route.push("/");
  };
  const handleStart = () => {
    route.push("/dashboard/mcq");
  };
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
     <Navbar/>

      <main className="flex flex-col items-center justify-start flex-1">
        <p className="text-[26px] font-medium text-[#1C3141] py-6 text-center">
          Ancient Indian History MCQ
        </p>

        <div className="flex flex-col justify-center items-center w-[682px] h-[135px] bg-[#273c4b] rounded-lg shadow-md text-white ">
          <div className="flex gap-32 items-center pr-8 text-[15.82px]">
            <p>{`Total MCQ's`}:</p>
            <p>Total marks:</p>
            <p>Total time:</p>
          </div>
          <div className="flex gap-33 items-center justify-center text-[42.19px]">
            <p>100</p>
            <p>100</p>
            <p>90:00</p>
          </div>
        </div>
        <div className="flex flex-row gap-55 font-extralight -mt-30 mr-10">
          <p className="    text-8xl text-white font-extralight w-[1px] h-10 ">
            |
          </p>
          <p className="   text-8xl text-white font-extralight w-[1px] h-10 ">
            |
          </p>
        </div>
        <div className="mb-20"></div>
        <div className="w-[682px]">
          <p className="py-[22px] font-semibold">Instructions:</p>
          <div className="list-decimal pl-6 space-y-2">
            <li>You have 100 minutes to complete the test.</li>
            <li>Test consists of 100 multiple-choice q’s.</li>
            <li>
              You are allowed 2 retest attempts if you do not pass on the first
              try.
            </li>
            <li>Each incorrect answer will incur a negative mark of -1/4.</li>
            <li>
              Ensure you are in a quiet environment and have a stable internet
              connection.
            </li>
            <li>
              Keep an eye on the timer, and try to answer all questions within
              the given time.
            </li>
            <li>
              Do not use any external resources such as dictionaries, websites,
              or assistance.
            </li>
            <li>
              Complete the test honestly to accurately assess your proficiency
              level.
            </li>
            <li>Check answers before submitting.</li>
            <li>
              Your test results will be displayed immediately after submission,
              indicating whether you have passed or need to retake the test.
            </li>
          </div>
          <div className="flex  justify-center items-center py-[22px]">
            <button className="  bg-[#1C3141] text-white rounded-lg  w-[361px] h-[48px] "
            onClick={handleStart}
            >
              Start Test
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
