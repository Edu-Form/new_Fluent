//퀴즈렛 타입을 지정해놓았습니다

interface QuizletCardProps {
  cards: string[][]; // 카드 내용 배열 (각 카드는 [앞면, 뒷면] 형식)
  _id: string;
  student_name: string;
  date: string;
  original_text: string;
  eng_quizlet: string[];
  kor_quizlet: string[];
}

interface QuizletData {
  date: string;
  cards: any[]; // cards 배열의 요소 타입을 구체적으로 지정할 수도 있어요.
}
interface Card {
  date: string;
}

//다이어리 타입을 지정해놓았습니다

type DiaryData = {
  status_code: number;
  id: string;
  student_name: string;
  date: string;
  message: {
    student_name: string;
    date: string;
    original_text: string;
    diary_correction: string;
    modified_diary_correction: string;
    diary_expressions: string;
    diary_summary: string;
  };
  // 필요한 다른 속성들도 여기에 추가하세요.
};
