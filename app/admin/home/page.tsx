"use client";

import React, { useState, useEffect } from "react";
import UserList from "@/components/Admin/UserList";
import { API } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

// API 데이터 타입 정의
type StudentScheduleCounts = Record<string, number>;

type ApiResponse = {
  teacher_name: string;
  teacher_total_count: number;
  student_schedule_counts: StudentScheduleCounts;
};

const HomePage = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const type = searchParams.get("type");
  const user_id = searchParams.get("id");
  const url_data = `user=${user}&type=${type}&id=${user_id}`;
  const router = useRouter();

  const [monthIndex, setMonthIndex] = useState(new Date().getMonth()); // 현재 달(0~11)을 기본값으로 설정
  const [userGroups, setUserGroups] = useState<any[]>([]); // API 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  // 현재 달 이름 가져오기
  const currentMonthName = new Date(0, monthIndex).toLocaleString("ko-KR", {
    month: "long",
  });

  // API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/api/payment/2024.%2012`);
        const data: ApiResponse[] = await response.json();
        setUserGroups(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [monthIndex]); // 달 변경 시 데이터 다시 로드

  // 전체 합계 계산
  const totalPrice = userGroups.reduce((sum, group) => {
    const studentScheduleCounts = group.student_schedule_counts as Record<
      string,
      number
    >; // 명시적 타입 단언
    const groupTotalPrice = Object.values(studentScheduleCounts).reduce(
      (studentSum, times) => studentSum + times * 60000,
      0
    );
    return sum + groupTotalPrice;
  }, 0);

  const totalSalary = userGroups.reduce(
    (sum, group) => sum + group.teacher_total_count * 2.5 * 10000,
    0
  );

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div className="inline-flex items-center w-screen h-screen bg-[#F2F2F2]">
      <div className="flex flex-col py-8 w-[12rem] h-screen items-center bg-gradient-to-t to-[#200E5D] from-[#2649E8] text-3xl font-bold text-white font-['Playwrite']">
        <div>Fluent</div>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col w-full  bg-white shadow-md items-start p-6 gap-6">
          <div className="flex items-center justify-center space-x-4">
            {/* 이전 버튼 */}
            <button
              onClick={handlePrevMonth}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              &#9664; {/* 왼쪽 화살표 */}
            </button>

            {/* 현재 달 */}
            <span className="text-lg font-semibold">{currentMonthName}</span>

            {/* 다음 버튼 */}
            <button
              onClick={handleNextMonth}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              &#9654; {/* 오른쪽 화살표 */}
            </button>
          </div>

          <div className="flex justify-between mb-6 text-2xl font-bold py-2">
            <div>
              Total
              <span className="text-green-600">
                &nbsp; &nbsp; Price : {totalPrice.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-red-600">
                &nbsp; &nbsp; Salary : {totalSalary.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <UserList userGroups={userGroups} />
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
