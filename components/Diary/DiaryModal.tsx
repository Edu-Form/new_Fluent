"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Lottie from "lottie-react";
import timerAnimationData from "@/app/assets/lotties/timeLoading.json";

interface QuizeletlModalProps {
  closeIsModal: () => void;
}

export default function DiaryModal({ closeIsModal }: QuizeletlModalProps) {
  const router = useRouter();
  const [class_date, setClassDate] = useState(""); // 수업 날짜 state 추가
  const [date, setDate] = useState("");
  const [original_text, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const student_name = searchParams.get("user");
  const type = searchParams.get("type");
  const user_id = searchParams.get("id");

  const postDiary = async (e: any) => {
    e.preventDefault();
    console.log(student_name, class_date, date, original_text);

    setLoading(true); // Submit을 누르면 로딩 시작

    try {
      const response = await fetch("http://13.54.77.128/api/diary/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ student_name, class_date, date, original_text }),
      });

      if (response.ok) {
        closeIsModal();
        router.push(`/diary?user=${student_name}&type=${type}&id=${user_id}`);
        window.location.reload(); // 강제 새로고침
      } else {
        console.error("Failed to save diary");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false); // 요청 후 로딩 끝
    }
  };

  return (
    <dialog id="my_modal_3" className="modal bg-slate-400 bg-opacity-50" open>
      <div className="flex flex-row relative">
        {/* 로딩 중일 때 애니메이션 표시 */}
        {loading ? (
          <div className="absolute inset-0 flex justify-center items-center rounded-[3rem] bg-slate-500 bg-opacity-50 z-50">
            <div className="w-40 h-40 bg-white flex justify-center items-center rounded-2xl">
              <Lottie animationData={timerAnimationData} />
            </div>
          </div>
        ) : null}

        <div className="rounded-[3rem] p-5 bg-white">
          <form
            className="w-[400px] h-[650px]  border-none5"
            onSubmit={postDiary}
          >
            <button
              onClick={() => !loading && closeIsModal()}
              className="btn btn-sm btn-circle btn-ghost absolute top-6 right-6 text-black"
            >
              ✕
            </button>
            <p className="my-5 w-40 h-12 text-xl font-semibold rounded-[20px] text-white bg-[#121B5C] flex items-center justify-center">
              Write Diary
            </p>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="class_date"
                  className="time text-lg font-semibold text-black"
                >
                  Class Date
                </label>
                <input
                  type="date"
                  name="class_date"
                  id="class_date"
                  onChange={(e) => setClassDate(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required={true}
                  disabled={loading} // 로딩 중에는 입력 비활성화
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="date"
                  className="time text-lg font-semibold text-black"
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
                  disabled={loading} // 로딩 중에는 입력 비활성화
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="diary"
                  className="time text-lg font-semibold text-black"
                >
                  Diary Content
                </label>
                <textarea
                  id="original_text"
                  rows={12}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="What did you do today?"
                  disabled={loading} // 로딩 중에는 텍스트박스 비활성화
                ></textarea>
              </div>
            </div>
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 mb-5 w-full flex justify-center">
              <button
                type="submit"
                className={`w-4/5 h-14 mt-6 rounded-xl text-white bg-[#121B5C]`}
                disabled={loading} // 로딩 중에는 버튼 비활성화
              >
                Submit Diary
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
