"use client";

import Link from "next/link";
import EnterBtn from "@/components/EnterBtn/EnterBtn";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Announcement from "@/components/Announcement/StudentAnnouncement";
import Image from "next/image";
import Navigation from "@/components/navigation";

const HomePage = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const type = searchParams.get("type");
  const user_id = searchParams.get("id");
  const url_data = `user=${user}&type=${type}&id=${user_id}`;
  const router = useRouter();

  function Quizlet() {
    router.push(`/quizlet?${url_data}`);
  }

  function Diary() {
    router.push(`/diary?${url_data}`);
  }

  function Schedule() {
    console.log(`/schedule?${url_data}`);
    router.push(`/schedule?${url_data}`);
  }

  return (
    <div className="relative ">
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#3f4166] to-[#292956] z-0"></div>

      <div className="relative z-10 flex justify-center gap-10 ">
        <div className="flex  justify-center mt-20">
          <div className="flex flex-col relative w-[45rem] h-[40rem] rounded-[0.5rem] border-[0.1rem] bg-gradient-to-br from-[#e7cfb4] to-[#f0e9d4] cursor-pointer duration-300 ease-in-out transform hover:border-blue-600 hover:drop-shadow-xl">
            {/* <Image
              src={"/images/mainPage.svg"}
              alt=""
              width={500}
              height={500}
              className="absolute z-0 left-0 bottom-0  "
            /> */}
            <div>
              <div className="flex justify-center ">
                <Announcement />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  h-[40rem] justify-between  items-center mt-20">
          <legend
            className="relative flex  justify-center w-full h-[20rem] text-xl font-bold font-sans mb-8 bg-white rounded-[0.5rem] border-[0.1rem] "
            onClick={Schedule}
          >
            TO DO LIST
          </legend>

          <div className="flex gap-5">
            <div onClick={Quizlet}>
              <EnterBtn id="quizlet" image="/images/quizlet.svg" />
            </div>
            <div onClick={Diary}>
              <EnterBtn id="diary" image="/images/diary.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
