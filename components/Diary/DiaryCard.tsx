import { motion } from "framer-motion";

export default function DiaryCard({ diarydata }: { diarydata: any }) {
  // 애니메이션 variants 정의
  const variants = {
    hidden: (isOdd: number) => ({
      opacity: 0,
      x: isOdd ? 50 : -50, // 홀수 인덱스는 오른쪽에서, 짝수 인덱스는 왼쪽에서 시작
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div>
      {diarydata.map((diary: any, index: number) => {
        const date = new Date(diary.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

        return (
          <motion.div
            key={index}
            className={`justify-start z-30 my-3 flex ${
              index % 2 !== 0 ? "flex-row-reverse" : ""
            }`}
            custom={index % 2 !== 0}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.4 }} // 뷰포트의 40%만 보여도 애니메이션 작동
            variants={variants}
          >
            <div className="relative">
              <div
                className={`absolute top-[-2rem] ${
                  index % 2 === 0 ? "left-[-5rem]" : "right-[-3rem]"
                } flex flex-col justify-start m-6 font-[bw] text-[#3f4166]`}
              >
                <div className="flex flex-col font-bold justify-center text-center text-white bg-[#3f4166] rounded-[20%] w-20 h-20 border-[#3f4166] border-[0.2rem]">
                  <h2 className="text-lg">{year}</h2>
                  <h1 className="text-2xl">{month}</h1>
                </div>
              </div>

              <div className="flex flex-col min-w-[15rem] border-2 rounded-xl justify-end my-12 p-5 text-[#3f4166]">
                <h1 className="flex text-xl font-bold justify-start">
                  {month}월 {day}일 {weekday}
                </h1>
                <br />
                <h3 className="text-lg justify-center rounded-[0%] whitespace-pre-wrap">
                  {diary.original_text}
                  <br />
                  <br />
                  <span className="flex text-xl font-bold justify-start bg-gradient-to-r from-[#c8f7ff] via-[#e600ff] to-[#e600ff] text-transparent bg-clip-text">
                    Corrected Diary:
                  </span>
                  {diary.diary_correction}
                  <br />
                  <br />
                  <span className="flex text-xl font-bold justify-start text-[#3f4166]">
                    Summary:
                  </span>
                  {diary.diary_summary}
                  <br />
                  <br />
                  <span className="flex text-xl font-bold justify-start text-[#3f4166]">
                    Expressions:
                  </span>
                  {diary.diary_expressions}
                </h3>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
