import React from "react";
import { format, addDays, subDays } from "date-fns";

interface WeekSelectorProps {
  selected: Date | undefined;
  onDateSelect: (date: Date) => void;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  selected,
  onDateSelect,
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  // 주의 시작 날짜 계산
  const startOfWeek = subDays(currentDate, currentDate.getDay());
  const days = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfWeek, index)
  );

  const handlePrevWeek = () => {
    setCurrentDate((prev) => subDays(prev, 7));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => addDays(prev, 7));
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-gray-100 rounded-lg overflow-hidden">
      {/* 이전 주 버튼 */}
      <button
        onClick={handlePrevWeek}
        className="p-2 text-gray-500 hover:text-blue-500"
      >
        &lt;
      </button>
      {/* 날짜 목록 */}
      <div className="flex gap-4 overflow-x-auto">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onDateSelect(day)}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                selected &&
                format(day, "yyyy-MM-dd") === format(selected, "yyyy-MM-dd")
                  ? "bg-blue-500 text-white" // 선택된 날짜 스타일
                  : "bg-white text-gray-700" // 선택되지 않은 날짜 스타일
              }`}
            >
              {format(day, "d")}
            </div>
            <span className="text-sm text-gray-500">{format(day, "eee")}</span>
          </div>
        ))}
      </div>
      {/* 다음 주 버튼 */}
      <button
        onClick={handleNextWeek}
        className="p-2 text-gray-500 hover:text-blue-500"
      >
        &gt;
      </button>
    </div>
  );
};

export default WeekSelector;
