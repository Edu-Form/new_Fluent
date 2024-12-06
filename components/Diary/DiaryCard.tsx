import { motion } from "framer-motion";

export default function DiaryCard({ diarydata }) {
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

  const parseMarkdown = (text: string) => {
    // *단어*는 빨간색, **단어**는 파란색으로 스타일을 적용
    return text
      .split(/\*(.*?)\*/g)
      .map((part, index) => {
        // 마크다운의 *과 **를 기준으로 텍스트를 분할 후, 스타일을 적용
        if (index % 2 !== 0) {
          // *...* 구간을 빨간색으로 감싸기
          return (
            <span key={index} className="text-red-500 line-through">
              {part}
            </span>
          );
        }
        return part;
      })
      .map((part, index) => {
        // **...** 구간을 파란색으로 감싸기
        if (typeof part === "string" && part.includes("**")) {
          return part.split("**").map((subPart, subIndex) => (
            <span
              key={subIndex}
              className={subIndex % 2 === 1 ? "text-blue-500" : ""}
            >
              {subPart}
            </span>
          ));
        }
        return part;
      });
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
            key={diary.date}
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
            {index % 2 === 0 ? (
              <>
                <div className="relative">
                  <div className="absolute top-[-2rem] left-[-5rem] flex flex-col justify-start m-6 font-[bw] text-[#3f4166]">
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
                    <h3 className="text-lg  justify-center  rounded-[0%] whitespace-pre-wrap">
                      {diary.original_text}
                      <br />
                      <br />
                      <span className="flex text-xl font-bold justify-start bg-gradient-to-r from-[#c8f7ff] via-[#e600ff] to-[#e600ff] text-transparent bg-clip-text">
                        Corrected Diary:
                      </span>
                      <br />
                      {parseMarkdown(diary.modified_text)}
                    </h3>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <div className="absolute top-[-2rem] right-[-3rem] flex flex-col justify-start m-6 font-[bw] text-[#3f4166]">
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
                    <h3 className="text-lg  justify-center  rounded-[0%] whitespace-pre-wrap">
                      {diary.original_text}
                      <br />
                      <br />
                      <span className="flex text-xl font-bold justify-start bg-gradient-to-r from-[#c8f7ff] to-[#ff69ff] text-transparent bg-clip-text">
                        Corrected Diary:
                      </span>
                      <br />
                      {parseMarkdown(diary.modified_text)}
                    </h3>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
