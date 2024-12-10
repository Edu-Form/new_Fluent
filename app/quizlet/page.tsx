"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EnterButton from "@/components/Button/Button";
import { useSearchParams } from "next/navigation";

import QuizletCard from "@/components/Quizlet/QuizletCard";
import QuizletModal from "@/components/Quizlet/QuizletModal";

// Edit button
const content = {
  select: "Select Quizlet",
  edit: "Click Edit",
  write: "Create Quizlet",
  check: "Check Diary",
};

const QuizletPage = () => {
  const searchParams = useSearchParams();
  const show = searchParams.get("show");

  const [selectQuizlet, setSelectQuizlet] = useState(false);
  // const [createData, setCreateData] = useState("");
  const [cardsets, setCardsets] = useState<QuizletCardProps[]>([]);

  const [data, setData] = useState<QuizletCardProps[]>([]);
  const [currentCard, setCurrentCard] = useState<QuizletCardProps | null>(null);

  const studentName = "Phil"; // 학생 이름 고정

  function showQuizlet() {
    if (!selectQuizlet) {
      fetchQuizletData();
      setSelectQuizlet(true);
    } else {
      setSelectQuizlet(false);
    }
  }

  const fetchQuizletData = async () => {
    try {
      const response = await fetch(
        `http://3.106.143.91/api/quizlet/student/${studentName}`
      );
      const quizletData: QuizletCardProps[] = await response.json();
      setData(quizletData);
    } catch (error) {
      console.error("Failed to fetch quizlet data:", error);
    }
  };

  useEffect(() => {
    fetchQuizletData();
  }, []);

  const showQuizletCards = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedDate = e.currentTarget.value;
    const selectedCard = data.find((item) => item.date === selectedDate);
    if (selectedCard) setCurrentCard(selectedCard);
  };

  return (
    <div className="flex bg-gradient-to-b from-[#3f4166] to-[#292956]">
      {/* 사이드바 */}
      <div className="flex-col bg-white w-1/8 min-h-screen ">
        <div className="flex m-5 mb-14 justify-center">
          <Link href="/" className="btn btn-ghost text-xl font-['Playwrite']">
            Fluent
          </Link>
        </div>
        <p className="px-5 my-8 text-gray-400 text-sm font-semibold">
          quizlet 관리
        </p>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col " onClick={showQuizlet}>
            <EnterButton content={content.select} />
            <div>
              {selectQuizlet ? (
                data.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col items-center m-2 p-3 border-slate-300 border-2 hover:bg-slate-300"
                  >
                    <Button value={item.date} onClick={showQuizletCards}>
                      {item.date}
                    </Button>
                  </div>
                ))
              ) : (
                <h1 className="opacity-0">No Quizlet</h1>
              )}
            </div>
          </div>

          {cardsets.map((card) => (
            <div key={card._id}>{card.date}</div>
          ))}
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex w-full justify-center items-center">
        <div className="quizlet_card">
          <QuizletCard
            content={
              currentCard
                ? {
                    ...currentCard,
                    cards: currentCard.eng_quizlet.map((eng, index) => [
                      eng,
                      currentCard.kor_quizlet[index] || "",
                    ]),
                  }
                : {
                    _id: "",
                    student_name: "",
                    date: "",
                    original_text: "",
                    eng_quizlet: [],
                    kor_quizlet: [],
                    cards: [],
                  }
            }
          />
        </div>
      </div>
      {show && <QuizletModal />}
    </div>
  );
};
// Suspense를 사용하여 QuizletPage를 감싸기
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizletPage />
    </Suspense>
  );
}
