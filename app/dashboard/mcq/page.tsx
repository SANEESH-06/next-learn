"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const [isOpen, setIsOpen] = useState(false);

  const [review, setReview] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  // Stores selected answers
  const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});

  // Stores which questions were visited
  const [visited, setVisited] = useState<{ [key: number]: boolean }>({});

  const [currentIndex, setCurrentIndex] = useState(0);
  const route = useRouter();
  // ----------------------------
  // FETCH QUESTIONS
  // ----------------------------
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
        setTotalTime(data.total_time);
      } catch (err) {
        setError("Network error while loading questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // ----------------------------
  // STORE SELECTED OPTION
  // ----------------------------
  const handleSelect = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    // If user selects answer → color becomes green
    setVisited((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  // ----------------------------
  // NEXT QUESTION
  // ----------------------------
  const handleNext = () => {
    const qId = questions[currentIndex].question_id;

    // Mark current question as visited when moving forward
    setVisited((prev) => ({
      ...prev,
      [qId]: true,
    }));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // ----------------------------
  // PREVIOUS QUESTION
  // ----------------------------
  const handlePrevious = () => {
    const qId = questions[currentIndex].question_id;

    setVisited((prev) => ({
      ...prev,
      [qId]: true,
    }));

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // ----------------------------
  // RIGHT SIDE — BOX COLOR LOGIC
  // ----------------------------
  const getBoxColor = (qId: number) => {
    const isAnswered = answers[qId];
    const isVisited = visited[qId];
    const isReviewMarked = review;

    if (isAnswered && isReviewMarked)
      return "bg-[#4CAF50] border-4 border-[#800080] text-white";

    if (isAnswered) return "bg-[#4CAF50] text-white";

    if (isReviewMarked) return "bg-[#800080] text-white";

    if (isVisited) return "bg-[#EE3535] text-white"; // NOT answered after visiting → RED

    return "bg-white text-black"; // DEFAULT
  };

  //submit//

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("No token found — please login again.");
      return;
    }

    const formattedAnswers = questions.map((q) => ({
      question_id: q.question_id,
      selected_option_id: answers[q.question_id] || null,
    }));

    const formData = new FormData();
    formData.append("answers", JSON.stringify(formattedAnswers));

    try {
      const res = await fetch(
        "https://nexlearn.noviindusdemosites.in/answers/submit",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Test submitted successfully!");
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (err) {
      alert("Network error while submitting test.");
    }
    route.push("/dashboard/result");

  };

  return (
    <div className="min-h-auto flex flex-col bg-blue-50">
      <Navbar />

      <div className="flex flex-row p-8 justify-between py-2">
        <div className="w-[1146px] flex">
          {loading && <p className="py-10">Loading...</p>}
          {error && <p className="py-10 text-red-600">{error}</p>}

          {!loading && questions.length > 0 && (
            <div>
              <div className="flex py-4 items-center justify-between">
                <p>Ancient Indian History MCQ</p>

                <div className="bg-white w-[69px] flex items-center p-2 h-[29px] rounded-sm shadow-sm">
                  {String(currentIndex + 1).padStart(2, "0")}/
                  {String(questions.length).padStart(2, "0")}
                </div>
              </div>

              {/* MAIN QUESTION */}
              <div className="bg-white py-4 h-[315px]">
                <button
                  onClick={() => setIsOpen(true)}
                  className="w-[293px] ml-4 h-[44px] rounded-md p-1 gap-2 bg-[#146180] flex items-center"
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

                <div className="bg-white rounded-lg p-4">
                  <p className="font-medium py-2 text-lg">
                    {questions[currentIndex].number}.{" "}
                    {questions[currentIndex].question}
                  </p>

                  <Image
                    src={questions[currentIndex].image || "/image.png"}
                    alt="Question Image"
                    width={600}
                    height={400}
                    className="mt-3 w-[288px] h-[161px]"
                  />
                </div>

                {/* OPTIONS */}
                <div className="mt-4 space-y-2">
                  {questions[currentIndex].options.map((opt, index) => (
                    <div
                      key={opt.id}
                      className="p-2 bg-white py-5 hover:bg-blue-100 rounded cursor-pointer flex justify-between items-center"
                    >
                      <div className="flex gap-4">
                        <span className="font-semibold">{index + 1}</span>
                        <span>{opt.option}</span>
                      </div>

                      <input
                        type="radio"
                        name={`question-${currentIndex}`}
                        value={opt.id}
                        checked={
                          answers[questions[currentIndex].question_id] ===
                          opt.id
                        }
                        onChange={() =>
                          handleSelect(
                            questions[currentIndex].question_id,
                            opt.id
                          )
                        }
                        className="w-5 h-5 accent-[#1C3141]"
                      />
                    </div>
                  ))}

                  <div className="flex gap-5 py-4 items-center justify-between">
                    <button
                      onClick={() => setReview(true)}
                      className="w-[368px] h-[46px] rounded-sm bg-[#800080] text-white"
                    >
                      Mark for review
                    </button>

                    <button
                      onClick={handlePrevious}
                      className="w-[368px] h-[46px] rounded-sm bg-[#CECECE] text-black"
                    >
                      Previous
                    </button>

                    <button
                      onClick={handleNext}
                      className="w-[368px] h-[46px] rounded-sm bg-[#1C3141] text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE QUESTION NUMBERS */}
        <div>
          <div className="flex justify-between py-4">
            <p>Question No. Sheet:</p>

            <div className="flex gap-2 items-center">
              <p>Remaining Time :</p>

              <div className="bg-[#063870] text-white w-[96] h-[29] flex items-center p-2 rounded-sm shadow-sm">
                <Image
                  alt=""
                  width={1000}
                  height={1000}
                  src={"/icons/Timer.png"}
                  className="w-5 h-5"
                />
                <p>{totalTime || "-- : --"}:45</p>
              </div>
            </div>
          </div>

          <div className="w-[674px] flex flex-row">
            <div className="flex flex-row w-[674px] min-h-[600px] p-1">
              {questions.map((q) => (
                <div
                  key={q.question_id}
                  className={`flex items-center justify-center w-[57px] h-[57px] m-2 rounded-md shadow-sm text-black ${getBoxColor(
                    q.question_id
                  )}`}
                >
                  {q.number}
                </div>
              ))}
            </div>
          </div>

          {/* LEGEND */}
          <div className="flex justify-between gap-4 text-sm h-8 px-2 items-end">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#4CAF50] rounded" />
              <p>Attended</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#EE3535] rounded" />
              <p>Not Attended</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#800080] rounded" />
              <p>Marked For Review</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#4CAF50] border-4 border-[#800080] rounded" />
              <p>Answered & Marked</p>
            </div>
          </div>
        </div>
      </div>

      {/* COMPREHENSION POPUP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-[600px] max-h-[80vh] p-5 rounded-lg shadow-lg overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-3">Comprehension</h2>

            <div
              dangerouslySetInnerHTML={{
                __html:
                  questions[currentIndex].comprehension ||
                  "<p>No content found.</p>",
              }}
            />

            <button
              onClick={() => setIsOpen(false)}
              className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* REVIEW / SUBMIT */}
      {review && (
        <div
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
          onClick={() => setReview(false)}
        >
          <div
            className="bg-white w-[393px] p-5 rounded-2xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b pb-2 justify-between">
              <h2 className="font-semibold">
                Are you sure you want to submit the test?
              </h2>
              <button
                onClick={() => setReview(false)}
                className="text-2xl leading-3"
              >
                ×
              </button>
            </div>

            <div className="mt-4">
              <div className="flex justify-between py-2">
                <p>Remaining Time:</p>
                <p>81:50</p>
              </div>

              <div className="flex justify-between py-2">
                <p>Total Questions:</p>
                <p>{questions.length}</p>
              </div>

              <div className="flex justify-between py-2">
                <p>Questions Answered:</p>
                <p>{Object.keys(answers).length}</p>
              </div>

              <div className="flex justify-between py-2">
                <p>Marked for Review:</p>
                <p>{review ? "Yes" : "No"}</p>
              </div>
            </div>

            <button
              className="mt-5 w-full h-[48px] bg-[#1C3141] text-white rounded-lg"
              onClick={handleSubmit}
            >
              Submit Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
