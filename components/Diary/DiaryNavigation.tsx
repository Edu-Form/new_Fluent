"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import EnterButton from "../Button/Button";
import { motion } from "framer-motion";

//edit button
const content = {
  submit: "submit",
  edit: "click Edit",
  write: "Write Diary",
};

const DiaryNavigation = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거하여 메모리 누수를 방지하려고 만들어놨습니다~
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []); // 빈 배열을 넣으면 컴포넌트가 처음 렌더링될 때만 실행 -> 이벤트 한번만!

  return (
    <div
      className={`header flex z-10  fixed 
    ${scrollPosition < 900 ? "w-[100vw] top-0" : "w-[80vw] top-10"}`}
    >
      <div
        className={`w-full h-20 flex items-center justify-between transition-all duration-700 ${
          scrollPosition < 900
            ? "bg-transparent text-white"
            : "bg-white text-black border-2 border-gray-300 rounded-3xl shadow-md"
        }`}
      >
        <Link href="/" className={`pl-24 text-xl font-['Playwrite']`}>
          Fluent
        </Link>

        <Link className={`font-['Playwrite'] mr-7`} href="diary/?show=true">
          <EnterButton id="write" content={content} />
        </Link>
      </div>
    </div>
  );
};

export default DiaryNavigation;
