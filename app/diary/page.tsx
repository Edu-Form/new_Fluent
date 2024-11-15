"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DiaryBg from "@/public/images/diarymain.svg";
import DiaryModal from "@/components/Diary/DiaryModal";
import DiaryCard from "@/components/Diary/DiaryCard";
import DiaryNavigation from "@/components/Diary/DiaryNavigation";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

//edit button
const content = {
  submit: "submit",
  edit: "click Edit",
  write: "Write Diary",
};

export default function Diary({ searchParams }: SearchParamProps) {
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]); //types에 명시된 타입을 가져오게 함
  const [loading, setLoading] = useState(true);

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

  const show = searchParams?.show;

  useEffect(() => {
    // 비동기 데이터 로딩 함수
    const fetchData = async () => {
      const URL = "http://localhost:3001/diary";
      try {
        const res = await fetch(URL, { cache: "no-store" });
        const data = await res.json();
        setDiaryData(data); // 가져온 데이터를 상태에 설정
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchData(); // 데이터 요청 함수 호출
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className="relative">
        <div className="flex justify-center">
          {" "}
          <DiaryNavigation />
        </div>

        <div className="h-[100vh] w-[100vw] overflow-hidden relative flex justify-center items-center">
          <Image
            src={DiaryBg}
            alt="diarymain"
            layout="fill" // 부모 요소를 꽉 채우기 위해 layout="fill" 사용
            objectFit="cover" // 이미지가 부모 요소의 크기에 맞게 조정
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <span className="text-white text-3xl">Write, your Diary.</span>
            <span className="animate-blink text-white text-4xl">|</span>
          </div>

          {/* 아래 가운데 배치된 SCROLL DOWN 텍스트 */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <motion.span
              initial="hidden"
              animate="visible"
              variants={variants}
              className="text-white text-[3rem]"
            >
              ↓
            </motion.span>
          </div>
        </div>

        <div className=" px-60  relative ">
          <div className=" relative px-60 h-[80vh] hide-scrollbar">
            <DiaryCard
              diarydata={diaryData.sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )}
            />
          </div>
        </div>

        {/* 모달 창 */}
        {show && (
          <div className="z-30 relative">
            <DiaryModal />
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
