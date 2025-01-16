"use client";

import { API } from "@/utils/api";
import Lottie from "lottie-react";
import timerAnimationData from "@/app/lotties/mainLoading.json";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Suspense } from "react";
import { useEffect, useState } from "react";

const Student_List = ({ data }: any) => {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const type = searchParams.get("type");
  const user_id = searchParams.get("id");
  const func = searchParams.get("func");
  const url_data = `user=${user}&type=${type}&id=${user_id}`;
  const router = useRouter();

  return (
    <div className="relative z-10 flex justify-center gap-10 ">
      <div className="flex  justify-center mt-20">
        <div>
          <div className="flex flex-col justify-center ">
            {/* <div className="text-center mb-6"> Select Student: </div> */}

            <div className="flex justify-center gap-10 ">
              {data.map((item: string[], index: number) => (
                <div key={index}>
                  <Link
                    href={`/teacher/student/${func}?${url_data}&student_name=${item[0]}`}
                    className="w-60 h-60 border-2 border-[#35375A] rounded-xl flex justify-end items-start text-white bg-[#35375A] hover:bg-[#8A8CAF] hover:border-[#8A8CAF]  transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-center font-semibold m-2 text-3xl">
                      {item[0]}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const type = searchParams.get("type");
  const user_id = searchParams.get("id");
  const func = searchParams.get("func");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 비동기 데이터 로딩 함수
    const fetchData = async () => {
      try {
        const URL = `${API}/api/diary/${type}/${user}`;
        const res = await fetch(URL, { cache: "no-store" });

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setData(data); // 가져온 데이터를 상태에 설정
        console.log(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    }; // 데이터 요청 함수 호출

    fetchData();
  }, [user, type]); // 컴포넌트가 처음 렌더링될 때만 실행

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
    <Suspense fallback={<div>Loading...</div>}>
      {data.length >= 1 ? <Student_List data={data} /> : <div>Loading...</div>}
    </Suspense>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
