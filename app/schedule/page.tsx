"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import "react-day-picker/dist/style.css";
import EnterButton from "@/components/Button/Button";
import AddRoom from "@/components/addroom";
import VariousRoom from "@/components/VariousRoom";

const ToastUI = dynamic(() => import("@/components/ToastUI/ToastUI"), {
  ssr: false,
});

const SchedulePage = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const type = searchParams.get("type");
  const user_id = searchParams.get("id");
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVariousRoomOpen, setIsVariousRoomOpen] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);

  const openAddSchedule = () => setIsModalOpen(true);
  const closeAddSchedule = () => setIsModalOpen(false);

  const openVariousSchedule = () => setIsVariousRoomOpen(true); // 다양한 스케줄 모달 열기
  const closeVariousSchedule = () => setIsVariousRoomOpen(false); // 다양한 스케줄 모달 닫기

  const URL = `http://13.239.158.4/api/schedules/${type}/${user}`;

  useEffect(() => {
    if (!user || classes.length > 0) return;

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(URL);
        console.log("data 은? ", data);
        setClasses(data);
      })
      .catch((error) => console.log("값을 불러오지 못 합니다", URL));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, URL, classes.length]);

  function Quizlet() {
    const url = `/quizlet?user=${user}&type=${type}&id=${user_id}`;
    router.push(url);
  }

  function Diary() {
    const url = `/diary?user=${user}&type=${type}&id=${user_id}`;
    router.push(url);
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
        {type == "student" && (
          <div className="h-fit">
            <p className="px-5 my-8 text-gray-400 text-sm font-semibold">
              학생
            </p>
            <div className="flex flex-col gap-10">
              <div onClick={Quizlet}>
                <EnterButton content="Enter Quizlet" />
              </div>
              <div onClick={Diary}>
                <EnterButton content="Enter Diary" />
              </div>
            </div>
          </div>
        )}
        {type != "student" && ( // student가 false일 때만 렌더링
          <div>
            <div className="h-fit" onClick={openAddSchedule}>
              <p className="px-5 my-8 text-gray-400 text-sm font-semibold">
                달력관리
              </p>
              <EnterButton content="Add Schedule" />
            </div>
            <div className="h-fit" onClick={openVariousSchedule}>
              <p className="px-5 my-8 text-gray-400 text-sm font-semibold">
                자동 스케줄 추가
              </p>
              <EnterButton content="AI SChEDULE" className="auto-schedule" />
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex justify-center items-center max-w-full max-h-full overflow-auto">
        <div className="bg-white w-[95%] h-[90%] max-w-full m-5 p-5 rounded-lg shadow-lg overflow-hidden">
          <ToastUI data={classes} />
        </div>
      </div>
      {/* AddRoom 모달 */}
      {type != "student" && isModalOpen && (
        <AddRoom closeAddSchedule={closeAddSchedule} />
      )}
      {/* VariousRoom 모달 */}
      {type != "student" && isVariousRoomOpen && (
        <VariousRoom closeVariousSchedule={closeVariousSchedule} />
      )}
    </div>
  );
};

export default function Quizlet() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SchedulePage />
    </Suspense>
  );
}
