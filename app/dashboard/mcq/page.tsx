"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Image from "next/image";

/* ============================
   Correct API Types
=============================== */

interface Option {
  id: number;
  option: string;
  is_correct: boolean;
  image?: string | null;
}

interface Question {
  question_id: number;
  number: number;
  question: string;
  comprehension?: string | null;
  image?: string | null;
  options: Option[];
}

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 🔥 NEW: popup state

  /* ============================
     Fetch Questions
  =============================== */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("No token found — please login again.");
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "https://nexlearn.noviindusdemosites.in/question/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Invalid or expired token.");
          return;
        }

        setQuestions(data.questions);
      } catch (err) {
        setError("Network error while loading questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  /* ============================
     UI RENDER
  =============================== */

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <div className="w-[1146px] py-2 pl-7">
        {loading && <p className="py-10">Loading...</p>}
        {error && <p className="py-10 text-red-600">{error}</p>}

        {!loading && questions.length > 0 && (
          <div>
            {/* Read Paragraph Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="w-[293px] h-[44px] rounded-md p-1 gap-2 bg-[#146180] flex items-center"
            >
              <Image
                alt=""
                width={1000}
                height={1000}
                src={"/icons/ArticleNyTimes.png"}
                className="w-6 h-6"
              />
              <p className="text-white">Read Comprehensive Paragraph</p>
              <Image
                alt=""
                width={1000}
                height={1000}
                src={"/icons/Polygon 3.png"}
                className="w-3 h-4"
              />
            </button>

            <div className="bg-white rounded-lg p-4 mt-3">
              {/* Question Title */}
              <p className="font-medium py-2 text-lg">
                {questions[0].number}. {questions[0].question}
              </p>

              {/* Image */}
              <Image
                src={questions[0].image || "/image.png"}
                alt="Question Image"
                width={600}
                height={400}
                className="mt-3 w-[288px] h-[161px]"
              />
            </div>

            {/* Options */}
            <div className="mt-4 space-y-2">
              <div className="mt-4 space-y-2">
                {questions[0].options.map((opt, index) => (
                  <div
                    key={opt.id}
                    className="p-2 bg-white hover:bg-blue-200 rounded cursor-pointer flex items-start gap-3"
                  >
                    {/* Option Number */}
                    <span className="font-semibold">{index + 1}.</span>

                    {/* Option Text */}
                    <span>{opt.option}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-5 py-4 items-center  justify-between">
              <button className="w-[368px] h-[46px] rounded-sm bg-[#800080] text-white">Mark for review</button>
              <button className="w-[368px] h-[46px] rounded-sm bg-[#CECECE] text-black">Pervious</button>
              <button className="w-[368px] h-[46px] rounded-sm bg-[#1C3141] text-white">Next</button>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20  flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)} // click outside to close
        >
          <div
            className="bg-white w-[600px] max-h-[80vh] p-5 rounded-lg shadow-lg overflow-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h2 className="text-xl font-semibold mb-3">Comprehension</h2>

            <div
              dangerouslySetInnerHTML={{
                __html:
                  questions[0].comprehension || "<p>No content found.</p>",
              }}
            />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
