// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import EnterButton from "@/components/Button/Button";
// import { useSearchParams } from "next/navigation";

// import QuizletCard from "@/components/Quizlet/QuizletCard";
// import QuizletModal from "@/components/Quizlet/QuizletModal";

// type SearchParamProps = {
//   searchParams: Record<string, string> | null | undefined;
// };

// //edit button
// const content = {
//   select: "Select Quizlet",
//   edit: "click Edit",
//   write: "Create Quizlet",
//   check: "Check Diary",
// };

// export default function Quizlet() {
//   const searchParams = useSearchParams();
//   const show = searchParams.get("show");

//   const [selectQuizlet, setSelectQuizlet] = useState(false);
//   const [data, setData] = useState<QuizletData[]>([]);
//   const [createData, setCreateData] = useState("");
//   const [submitClicked, setSubmitClicked] = useState(false);
//   const [cardsets, setCardsets] = useState<Card[]>([]);

//   // QuizletCardProps 타입에 맞는 초기값 설정
//   const [currentcard, setCurrentCard] = useState<QuizletCardProps>({});

//   function showQuizlet() {
//     if (!selectQuizlet) {
//       cards();
//       setSelectQuizlet(true);
//     } else setSelectQuizlet(false);
//   }

//   const cards = async () => {
//     const cardData = await fetch("http://localhost:3001/quizlet");
//     const jsonCardData = await cardData.json();
//     console.log(jsonCardData);
//     setData(jsonCardData);
//   };

//   function showQuizletCards(e) {
//     for (const item of data) {
//       if (item.date == e.target.value) {
//         setCurrentCard(item);
//       }
//     }
//   }
//   // parameter로 안넣어주면, 처음 button이 render되었을 때의 변수의 값으로 저장이됨 (update 값이 아닌). 따라서 parameter에 넣어주면 됨. useEffect로 버튼이 클릭되면 변수값 업데이트를 시켜서 넣어줌.
//   function createQuizletAPI(updated_data) {
//     console.log(createData);

//     fetch("http://localhost:3001/quizlet", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         date: updated_data,
//         cards: [],
//       }),
//     });
//   }

//   useEffect(() => {
//     if (submitClicked && createData) {
//       createQuizletAPI(createData);
//       setSubmitClicked(false);
//     }
//   });

//   function save(e) {
//     setCreateData(e.target.value);
//     console.log(e.target.value);
//   }

//   function createQuizlet() {
//     const a = document.createElement("textarea");
//     const c = document.createElement("input");
//     const b = document.querySelector(".inputQuizletData");

//     a.classList.add("text-white");
//     a.oninput = save;
//     c.type = "button";
//     c.value = "Submit";
//     c.onclick = () => setSubmitClicked(true);

//     b?.appendChild(a);
//     b?.appendChild(c);
//   }

//   function updateQuizlet() {}

//   return (
//     <div className="flex bg-gradient-to-b from-[#3f4166] to-[#292956]">
//       <div className="flex-col bg-white w-1/8 min-h-screen ">
//         <div className="flex m-5 mb-14 justify-center">
//           <Link href="/" className="btn btn-ghost  text-xl font-['Playwrite']">
//             Fluent
//           </Link>
//         </div>
//         <p className="px-5 my-8 text-gray-400 text-sm font-semibold">
//           quizlet 관리
//         </p>
//         <div className="flex flex-col gap-10">
//           <Link href="quizlet/?show=true">
//             <EnterButton content={content.write} />
//           </Link>

//           <div className="flex flex-col " onClick={showQuizlet}>
//             <EnterButton content={content.select} />
//             <div>
//               {selectQuizlet ? (
//                 data.map((item) => (
//                   <div
//                     key={item.date} // 최상위 div에 key prop를 옮김
//                     className="flex flex-col items-center m-2 p-3 border-slate-300 border-2 hover:bg-slate-300"
//                   >
//                     <Button value={item.date} onClick={showQuizletCards}>
//                       {item.date}
//                     </Button>
//                   </div>
//                 ))
//               ) : (
//                 <h1 className="opacity-0">No Quizlet</h1>
//               )}
//             </div>
//           </div>

//           {cardsets.map((card) => (
//             <div key={card.date}>{card.date}</div>
//           ))}
//         </div>
//       </div>

//       <div className="flex w-full justify-center items-center">
//         <div className="quizlet_card" onClick={updateQuizlet}>
//           <QuizletCard content={currentcard} />
//         </div>
//       </div>

//       {show && <QuizletModal />}
//     </div>
//   );
// }

export default function empty(){
    return <div>Hello</div>
}
