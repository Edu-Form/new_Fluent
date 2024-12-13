"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";


const Student_List = ({data} : any) =>  {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const type = searchParams.get("type"); 
  const user_id = searchParams.get("id");
  const func = searchParams.get("func");
  const url_data = `user=${user}&type=${type}&id=${user_id}`
  const router = useRouter();


  return (
    (
      <div className="relative ">
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#3f4166] to-[#292956] z-0"></div>

        <div className="relative z-10 flex justify-center gap-10 ">
          <div className="flex  justify-center mt-20">
            <div className="flex justify-center flex-col  w-[45rem] h-[40rem] rounded-[0.5rem] border-[0.1rem] bg-white  cursor-pointer duration-300 ease-in-out transform hover:border-blue-600 hover:drop-shadow-xl">
              <div>
                <div className="flex justify-center ">
                {data.map((item: string[], index: number) => (
                    <div key={index} className="w-36 h-36 border-2 border-blue-500 rounded-lg flex justify-center items-center bg-gray-100 hover:bg-blue-500 hover:text-white transform hover:scale-105 transition-all duration-300">
                    <Link href={`/teacher/student/${func}?${url_data}&student_name=${item[0]}`}>
                        <div className="text-center font-semibold">{item[0]}&apos;s diary</div>
                    </Link>
                    </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ) 
}

const Home = () => {

    const searchParams = useSearchParams();
    const user = searchParams.get("user");
    const type = searchParams.get("type"); 
    const user_id = searchParams.get("id");
    const func = searchParams.get("func");
    const [data, setData] = useState([])

    useEffect(() => {
        // 비동기 데이터 로딩 함수
        const fetchData = async () => {
            const URL = `http://13.54.77.128/api/diary/${type}/${user}`;
            const res = await fetch(URL, { cache: "no-store" });
            const data = await res.json();
            setData(data); // 가져온 데이터를 상태에 설정
            console.log(data)
        } // 데이터 요청 함수 호출

        fetchData()
    }, [user, type]); // 컴포넌트가 처음 렌더링될 때만 실행

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {data.length >= 1 ? (
                <Student_List data={data} />
            ) : (
                <div>Loading...</div>
            )}
        </Suspense>
    );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}