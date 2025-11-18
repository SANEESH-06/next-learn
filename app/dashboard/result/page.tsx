"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";
import Image from "next/image";


interface ResultType {
  score: number;
  correct: number;
  wrong: number;
  not_attended: number;
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const historyId = searchParams.get("history");

  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        `https://nexlearn.noviindusdemosites.in/answers/result/${historyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setResult(data);
      setLoading(false);
    }

    if (historyId) fetchResult();
  }, [historyId]);

  if (loading) {
    return (
      <div className="h-lvh flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-lvh flex justify-center items-center text-xl">
        Result not found
      </div>
    );
  }


  return (
    <div className="h-lvh flex flex-col bg-blue-50">
      <Navbar />
      <div className="flex flex-col gap-4 justify-center items-center py-[33px]">
        <div className=" flex justify-center items-center rounded-lg bg-from bg-gradient-to-r from-[#146180] to-[#1C3141] w-[429px] h-[150px]">
          <div className="flex flex-col justify-center items-center text-white">
            <p>Marks Obtained:</p>
            <p className="text-6xl"> {result?.score}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-105 ">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <Image
                src={"/icons/Group 1000007271.png"}
                alt=""
                width={1000}
                height={1000}
                className="w-10 h-10"
              />
              <p>Total Questions:</p>
            </div>
            <p>10</p>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <Image
                src={"/icons/Group 1000007271 (1).png"}
                alt=""
                width={1000}
                height={1000}
                className="w-10 h-10"
              />

              <p>Correct Answers:</p>
            </div>
            <p>{result?.score}</p>
          </div>
          <div className="flex  items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={"/icons/Group 1000007271 (2).png"}
                alt=""
                width={1000}
                height={1000}
                className="w-10 h-10"
              />

              <p>Incorrect Answers:</p>
            </div>
            <p>{result?.wrong}</p>
          </div>
          <div className="flex  items-center justify-between">
            <div className=" flex items-center gap-2">
              <Image
                src={"/icons/Group 1000007271 (3).png"}
                alt=""
                width={1000}
                height={1000}
                className="w-10 h-10"
              />
              <p>Not Attended Questions:</p>
            </div>

            <p>{result?.not_attended}</p>
          </div>
        </div>
        <div></div>
        <button className="w-105 bg-[#20394d] text-white h-[48px]  rounded-lg">
          Done
        </button>
      </div>
    </div>
  );
}
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
