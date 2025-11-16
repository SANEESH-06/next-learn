// "use client";

// import React, { useState, useEffect } from "react";

// // ===========================
// // 📌 TYPE DEFINITIONS
// // ===========================

// interface AnswerDetail {
//   question_id: number;
//   selected_option_id: number | null;
//   is_correct: boolean;
// }

// interface SubmitResponse {
//   success: boolean;
//   exam_history_id?: string;
//   score?: number;
//   correct?: number;
//   wrong?: number;
//   not_attended?: number;
//   submitted_at?: string;
//   details?: AnswerDetail[];
//   message?: string;
// }

// export default function SubmitResult() {
//   const [token, setToken] = useState<string | null>(null);
//   const [result, setResult] = useState<SubmitResponse | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Load token and fetch data automatically
//   useEffect(() => {
//     const t = localStorage.getItem("accessToken");
//     setToken(t);

//     if (!t) {
//       alert("No token found — please login again.");
//       setLoading(false);
//       return;
//     }

//     const fetchResult = async () => {
//       try {
//         const response = await fetch(
//           "https://nexlearn.noviindusdemosites.in/answers/submit",
//           {
//             method: "POST",
//             headers: { Authorization: `Bearer ${t}` },
//           }
//         );

//         const data = await response.json();

//         // Some APIs wrap inside "detail"
//         const extracted: SubmitResponse = data.detail || data;

//         setResult(extracted);
//       } catch (err) {
//         console.error("Error:", err);
//       }

//       setLoading(false);
//     };

//     fetchResult();
//   }, []);

//   return (
//     <div className="p-4">
//       {loading && <p className="mt-3">Loading...</p>}

//       {/* SUCCESS */}
//       {result && result.success && (
//         <div className="mt-6 p-4 border bg-gray-100 rounded">
//           <h2 className="text-xl font-bold mb-2">Exam Result</h2>

//           <p><strong>Exam History ID:</strong> {result.exam_history_id}</p>
//           <p><strong>Score:</strong> {result.score}</p>
//           <p><strong>Correct:</strong> {result.correct}</p>
//           <p><strong>Wrong:</strong> {result.wrong}</p>
//           <p><strong>Not Attended:</strong> {result.not_attended}</p>
//           <p><strong>Submitted At:</strong> {result.submitted_at}</p>

//           <h3 className="mt-4 font-bold">Question Details:</h3>

//           <ul className="list-disc pl-6">
//             {result.details?.map((item, index) => (
//               <li key={index}>
//                 Q{item.question_id} — {item.is_correct ? "Correct" : "Wrong"} (option: {item.selected_option_id})
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* ERROR */}
//       {result && !result.success && (
//         <p className="mt-4 text-red-500">{result.message}</p>
//       )}
//     </div>
//   );
// }


import React from 'react'

export default function page() {
  return (
    <div><p className='flex items-center justify-center text-8xl'>ANSWER</p></div>
  )
}
