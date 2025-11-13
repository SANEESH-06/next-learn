"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  question_text: string;
  image_url?: string | null;
  options: string[];
}

interface QuestionListResponse {
  message: string;
  success: boolean;
  questions_count: number;
  total_marks: number;
  total_time: number;
  time_for_each_question: number;
  mark_per_each_answer: number;
  instruction: string;
  questions: Question[];
}

export default function Mcq() {
  const router = useRouter();

  const [data, setData] = useState<QuestionListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------
  // AUTH CHECK + API FETCH
  // ---------------------------------------------------
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // If no token, redirect to login
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchQuestions = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          "https://nexlearn.noviindusdemosites.in/question/list",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 401) {
          // Invalid or expired token
          localStorage.clear();
          router.push("/login");
          return;
        }

        const responseData: QuestionListResponse = await res.json();

        if (!res.ok || !responseData.success) {
          throw new Error(responseData.message || "Failed to load questions");
        }

        setData(responseData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [router]);

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading questions...</p>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No questions available</p>
      </div>
    );
  }

  // ---------------------------------------------------
  // RENDER MCQ UI
  // ---------------------------------------------------
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">MCQ Exam</h1>
          <p className="text-gray-600 mb-4">{data.instruction}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Questions</p>
              <p className="font-bold">{data.questions_count}</p>
            </div>
            <div>
              <p className="text-gray-500">Total Marks</p>
              <p className="font-bold">{data.total_marks}</p>
            </div>
            <div>
              <p className="text-gray-500">Total Time</p>
              <p className="font-bold">{data.total_time} mins</p>
            </div>
            <div>
              <p className="text-gray-500">Per Question</p>
              <p className="font-bold">{data.time_for_each_question}s</p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {data.questions.map((question, idx) => (
            <div key={question.id} className="bg-white rounded-lg shadow p-6">
              <p className="font-semibold mb-4">
                {idx + 1}. {question.question_text}
              </p>

              {question.image_url && (
                <img
                  src={question.image_url}
                  alt="Question"
                  className="mb-4 max-w-md rounded"
                />
              )}

              <div className="space-y-2">
                {question.options.map((option, optIdx) => (
                  <label
                    key={optIdx}
                    className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      className="mr-3"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit / Logout */}
        <div className="mt-6 flex gap-2">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Submit
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
