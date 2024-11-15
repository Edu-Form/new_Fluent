"use client";

import { useEffect, useState } from "react";

export default function QuizletCard({
  content,
}: {
  content: QuizletCardProps;
}) {
  const date = content.date;
  const words = content.cards;
  const [card, setCard] = useState(0);
  const [cardface, setCardface] = useState(0);

  return (
    <div className="flex flex-col justify-center items-center ">
      {content.date ? (
        <div className="text-2xl font-bold mb-3 text-white">{date}</div>
      ) : (
        <div className="text-2xl font-bold mb-10 text-white">
          Please Select a Quizlet
        </div>
      )}
      <div
        className="flex flex-col justify-center items-center w-[70vw] h-[60vh] rounded overflow-hidden shadow-xl border-2 bg-white"
        onClick={() => (cardface == 0 ? setCardface(1) : setCardface(0))}
      >
        <div className="flex  items-center px-6 py-4">
          {content.cards ? (
            <div className="font-bold text-3xl mb-2 text-center">
              {words[card][cardface]}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex mt-3 gap-10 quizlet-card-button">
        <div
          className="inline text-4xl hover:animate-pulse text-white  rounded-[100%]hover:bg-slate-400"
          onClick={() => {
            if (card === 0) {
              setCard(words.length - 1);
            } else {
              setCard(card - 1);
            }
            setCardface(0);
          }}
        >
          {"<"}
        </div>
        {content.cards ? (
          <div className="flex text-white align-middle ">
            {card + 1} / {words.length}
          </div>
        ) : (
          <div></div>
        )}
        <div
          className="inline text-4xl hover:animate-pulse text-white rounded-[100%] hover:bg-slate-400"
          onClick={() => {
            if (card + 1 === words.length) {
              setCard(0);
            } else {
              setCard(card + 1);
            }
            setCardface(0);
          }}
        >
          {">"}
        </div>
      </div>
    </div>
  );
}

// .vocab[card][cardface]
