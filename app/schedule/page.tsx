"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import "react-day-picker/dist/style.css";
import EnterButton from "@/components/Button/Button";
// import ToastUI from "@/components/ToastUI/ToastUI";
import AddRoom from "@/components/addroom";

const ToastUI = dynamic(() => import("@/components/ToastUI/ToastUI"), {
  ssr: false,
});

export default function Page() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user"); // user 상태 추가
  const student = searchParams.get("student") === "true"; // student=true`일 때 true로 평가
  const userType = student ? "student" : "teacher"; // userType 상태 추가
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const URL = `http://13.239.133.161/api/schedules/${userType}/${user}`;
  const [classes, setClasses] = useState<any[]>([]); // classes의 타입 정의

  useEffect(() => {
    if (!user || classes.length > 0) return;

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("data 은? ", data);
        setClasses(data);
      })
      .catch((error) => console.log("값을 불러오지 못 합니다", URL));
  }, [user, URL]); // user 값이 바뀔 때마다 새로 fetch

  function Quizlet() {
    router.push(`/quizlet`);
    // router.push(
    //   `/quizlet?user=${user}&student=${student}&access_token=${access_token_info}`
    // );
  }

  function Diary() {
    router.push(`/diary`);
    // router.push(`/diary?access_token=${access_token_info}`);
  }

  return (
    <div className="flex bg-gradient-to-b from-[#3f4166] to-[#292956]">
      <div className="flex-col bg-white w-1/8 min-h-screen">
        <div className="flex m-5 mb-14 justify-center">
          <Link href="/" className="btn btn-ghost text-xl font-['Playwrite']">
            Fluent
          </Link>
        </div>
        {/* student가 true일 때 */}
        {student && (
          <div className="h-fit">
            <p className="px-5 my-8 text-gray-400 text-sm font-semibold">
              학생
            </p>
            <div className="flex flex-col gap-10">
              <div onClick={Quizlet}>
                <EnterButton
                  id="quizlet"
                  content={{ quizlet: "Enter Quizlet" }}
                />
              </div>
              <div onClick={Diary}>
                <EnterButton id="diary" content={{ diary: "Enter Diary" }} />
              </div>
            </div>
          </div>
        )}
        {!student && ( // student가 false일 때만 렌더링
          <div className="h-fit" onClick={openModal}>
            <p className="px-5 my-8 text-gray-400 text-sm font-semibold">
              달력관리
            </p>
            <EnterButton id="edit" content={{ edit: "click Edit" }} />
          </div>
        )}
      </div>
      <div className="flex-1 flex justify-center items-center max-w-full max-h-full overflow-auto">
        <div className="bg-white w-[95%] h-[90%] max-w-full m-5 p-5 rounded-lg shadow-lg overflow-hidden">
          <ToastUI data={classes} />
        </div>
      </div>
      {!student && isModalOpen && <AddRoom closeModal={closeModal} />}
    </div>
  );
}
