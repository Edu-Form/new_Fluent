"use client";

import Lottie from "lottie-react";
import timerAnimationData from "@/app/lotties/mainLoading.json";

import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import DiaryBg from "@/public/images/diarymain.svg";
import DiaryCard from "@/components/Diary/DiaryCard";
import DiaryNavigation from "@/components/Diary/DiaryNavigation";

const DiaryPage = () => {
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]); //types에 명시된 타입을 가져오게 함
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const type = searchParams.get("type");
  const student_name = searchParams.get("student_name");
  const user_id = searchParams.get("id");

  const variants: { [key: string]: any } = {
    hidden: {
      opacity: 0.2,
      y: 15,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        repeat: Infinity,
        repeatType: "reverse",
      },
    }),
  };

  useEffect(() => {
    // 비동기 데이터 로딩 함수
    const fetchData = async () => {
      const URL = `http://13.54.77.128/api/diary/student/${student_name}`;
      try {
        const res = await fetch(URL, { cache: "no-store" });
        const data = await res.json();
        setDiaryData(data); // 가져온 데이터를 상태에 설정
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };
    fetchData();
  }, [student_name]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center text-xl font-['Playwrite']">
        <div>Fluent</div>
        <div className="mt-4 w-32 h-32">
          <Lottie animationData={timerAnimationData} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <div className="h-[100vh] w-[100vw] overflow-hidden relative flex justify-center items-center"> */}
      {/* <Image
          src={DiaryBg}
          alt="diarymain"
          layout="fill" // 부모 요소를 꽉 채우기 위해 layout="fill" 사용
          objectFit="cover" // 이미지가 부모 요소의 크기에 맞게 조정
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 text-center">
          <span className="text-white text-3xl">
            {student_name}&apos;s Diary.
          </span>
          <span className="animate-blink text-white text-4xl">|</span>
        </div> */}

      {/* 아래 가운데 배치된 SCROLL DOWN 텍스트 */}
      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-0">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={variants}
            className="text-white text-[3rem]"
          >
            ↓
          </motion.span>
        </div> */}
      {/* </div> */}

      <div className="relative">
        <div className=" relative px-60 h-[80vh] hide-scrollbar">
          <DiaryCard
            diarydata={diaryData.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )}
          />
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default function Diary() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative">
        <div className="flex justify-center">
        </div>
        <DiaryPage />
      </div>
    </Suspense>
  );
}
