"use client";

import React from "react";
import Image from "next/image";

interface BtnProps {
  id: string;
  image: string;
}

const EnterBtn: React.FC<BtnProps> = ({ id, image }) => {
  const getDetails = (id: string) => {
    switch (id) {
      case "quizlet":
        return { main: "QUIZLET", sub: "Quizlet의 한줄소개" };
      case "diary":
        return { main: "DIARY", sub: "Diary의 한줄소개" };
      case "ai":
        return { main: "AI", sub: "AI의 한줄소개" };
      default:
        return { main: "Unknown", sub: "No details available" };
    }
  };
  // id에 맞는 데이터를 가져옴
  const { main, sub } = getDetails(id);

  return (
    // <button>
    //   <div
    //     id={id}
    //     className="flex w-[30rem] h-[5rem] rounded-[0.5rem] m-5 border-[0.05rem] bg-white   cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105  hover:border-blue-600"
    //   >
    //     <div className="overflow-hidden rounded-l-[0.5rem]">
    //       <Image
    //         src={image} // public 폴더 기준 경로
    //         alt="image"
    //         width={120}
    //         height={100}
    //       />
    //     </div>
    //     <div className="p-2 text-left ">
    //       <h1 className="font-bold text-xl mb-2">{main}</h1>
    //       {/* <h2 className="text-sm text-gray-400 mb-8">{sub}</h2> */}
    //       <span className="text-gray-400 text-sm">Go to Detail {">"}</span>
    //     </div>
    //   </div>
    // </button>

    // 온보딩버전
    <button>
      <div
        id={id}
        className="w-[15rem] h-[12rem] rounded-[0.5rem]  border-[0.05rem] bg-white  cursor-pointer duration-300 ease-in-out transform hover:border-blue-600 hover:drop-shadow-xl"
      >
        {/* {" "}
        <Image
          src={image} // public 폴더 기준 경로
          alt="image"
          width={336}
          height={40}
          className="rounded-t-[0.5rem]"
        /> */}
        <div className="p-6 text-left">
          <h1 className="font-bold text-xl mb-2">{main}</h1>
          <h2 className="text-sm text-gray-400 mb-8">{sub}</h2>
          {/* <span className="text-black text-sm">Go to Detail {">"}</span> */}
        </div>
      </div>
    </button>
  );
};

export default EnterBtn;
