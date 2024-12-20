import React, { useState, useEffect } from "react";
// API 데이터 타입 정의
type StudentScheduleCounts = Record<string, number>;

type UserGroup = {
  teacher_name: string;
  teacher_total_count: number;
  student_schedule_counts: StudentScheduleCounts;
};

const UserList: React.FC<{ userGroups: UserGroup[] }> = ({ userGroups }) => {
  const [openGroups, setOpenGroups] = useState<boolean[]>([]); // 초기값 빈 배열
  // userGroups가 변경될 때마다 openGroups를 동기화
  useEffect(() => {
    setOpenGroups(new Array(userGroups.length).fill(true)); // 초기값: 모든 그룹이 열림 상태
  }, [userGroups]);

  const toggleGroup = (index: number) => {
    setOpenGroups((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="p-6">
      {userGroups.map((group, idx) => {
        // 전체 price와 salary 계산
        const totalPrice = Object.values(group.student_schedule_counts).reduce(
          (sum, times) => sum + times * 60000, // times * 60,000
          0
        );
        const totalSalary = group.teacher_total_count * 2.5 * 10000;
        const totalTime = Object.values(group.student_schedule_counts).reduce(
          (sum, times) => sum + times,
          0
        );

        return (
          <div
            key={idx}
            className="mb-4 px-6  border rounded-lg shadow-sm overflow-hidden bg-white"
          >
            {/* Group Header with Toggle */}
            <div
              className="flex gap-5 items-center bg-white p-4 font-semibold text-lg cursor-pointer"
              onClick={() => toggleGroup(idx)}
            >
              <div>
                {openGroups[idx] ? (
                  <span>&#9650;</span> // 위쪽 세모 아이콘
                ) : (
                  <span>&#9660;</span> // 아래쪽 세모 아이콘
                )}
              </div>
              <div>{group.teacher_name}</div>

              <div className="text-green-600">
                Price : {totalPrice.toLocaleString()}
              </div>
              <div className="text-red-600">
                Salary : {totalSalary.toLocaleString()}
              </div>
              <div>Times : {totalTime} </div>
            </div>

            {/* Conditional Rendering: Guide Header + User List */}
            {openGroups[idx] && (
              <>
                {/* Guide Header */}
                <div className="flex justify-between bg-gray-200 px-4 py-2 font-semibold text-sm rounded-2xl text-gray-700">
                  <div className="flex-1 text-center">Name</div>
                  <div className="flex-1 text-center">Time</div>
                  <div className="flex-1 text-center">Price</div>
                  <div className="flex-1 text-center">Message</div>
                </div>

                {/* User List */}
                <div>
                  {Object.entries(group.student_schedule_counts).map(
                    ([name, times], userIdx) => (
                      <div
                        key={userIdx}
                        className="flex justify-between items-center p-4 text-sm"
                      >
                        <div className="flex-1 text-center">{name}</div>
                        <div className="flex-1 text-center">{times} times</div>
                        <div className="flex-1 text-center text-green-600">
                          ₩ {(times * 60000).toLocaleString()}
                        </div>
                        <div className="flex-1 text-center">
                          <button className="bg-yellow-300 text-black px-4 py-1 rounded-md hover:bg-yellow-400">
                            Message
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
