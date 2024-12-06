"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DiaryModal() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [original_text, setMessage] = useState("");

  const postDiary = async (e: any) => {
    e.preventDefault();
    console.log(date, original_text);

    const student_name = "Phil";

    await fetch("http://3.106.143.91/api/diary/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student_name, date, original_text }),
    })
      .then((res) => {
        router.push("/diary");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto  bg-slate-400 bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-[#3f4166] shadow rounded-t-lg dark:bg-gray-700">
          <div className="flex items-center justify-between p-3 md:p-3 border-b  dark:border-gray-600">
            <h3 className="text-lg font-semibold text-white dark:text-white">
              Write Diary
            </h3>
            <Link
              type="button"
              className="text-gray-400 bg-transparent  rounded-[50%] text-sm w-6 h-6 ms-auto inline-flex justify-center items-center "
              href="/diary"
            >
              <div className="dot w-[0.8rem] h-[0.8rem] bg-red-600 hover:bg-red-900 rounded-[50%] "></div>
              {/* <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg> */}
              <span className="sr-only">Close modal</span>
            </Link>
          </div>{" "}
        </div>

        <div className="relative bg-white rounded-b-lg shadow dark:bg-gray-700">
          <form className="p-4 md:p-5" onSubmit={postDiary}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required={true}
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="diary"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Diary Content
                </label>
                <textarea
                  id="original_text"
                  rows={12}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="What did you do today?"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-[#3f4166] hover:bg-[#777ab3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Submit Diary
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
