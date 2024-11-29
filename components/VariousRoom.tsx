"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Input } from "@/components/ui/input";

interface ScheduleModalProps {
  closeVariousSchedule: () => void;
}

export default function VariousRoom({
  closeVariousSchedule,
}: ScheduleModalProps) {
  const [dates, setDates] = useState<Date[] | undefined>([]);
  const [time, setTime] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");
  const [teacherName, setTeacherName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [results, setResults] = useState<any>(null); // API 응답 데이터 저장
  const [showSecondSession, setShowSecondSession] = useState(false); // 두 번째 세션 전환 여부

  async function fetchAvailableRooms() {
    const formattedDates = dates
      ? dates.map((date) =>
          date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        )
      : [];

    const body = {
      dates: formattedDates,
      time: time,
      duration: 1,
      teacher_name: teacherName,
      student_name: studentName,
    };

    const response = await fetch(`http://13.239.133.161/api/schedules/auto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      setResults(data);
      setShowSecondSession(true); // 두 번째 세션으로 전환
    } else {
      alert("Failed to fetch available rooms.");
    }
  }

  async function saveClass() {
    if (!results) return;

    for (let i = 0; i < results.all_dates.length; i++) {
      const body = {
        room_name: results.all_rooms[i],
        date: results.all_dates[i],
        time: results.time,
        duration: 1, // 1시간 고정
        teacher_name: teacherName,
        student_name: studentName,
      };

      await fetch(`http://13.239.133.161/api/schedules/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }

    window.location.reload(); // 새로 고침
  }

  return (
    <dialog
      id="schedule_modal"
      className="modal bg-slate-400 bg-opacity-50"
      open
    >
      <div className="flex flex-row relative">
        <div className="rounded-[3rem] p-5 bg-white">
          <div className="w-[400px] h-[750px]">
            {!showSecondSession ? (
              <>
                <button
                  type="button"
                  onClick={closeVariousSchedule}
                  className="btn btn-sm btn-circle btn-ghost absolute top-6 right-6"
                >
                  ✕
                </button>
                <div className="dot flex mx-5 mt-10 space-x-2">
                  <div className="w-[30px] h-[12px] bg-gradient-to-r from-[#6fdbff] to-[#ffb3fe] rounded-full"></div>
                  <div className="w-[12px] h-[12px] bg-[#D9D9D9] rounded-full"></div>
                </div>

                <div className="flex flex-col items-center mt-5">
                  <DayPicker
                    mode="multiple"
                    selected={dates}
                    onSelect={setDates}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 px-16 py-5 overflow-y-scroll max-h-[300px]">
                  <div className="flex flex-col items-start text-left h-[90px]">
                    <p className="text-lg font-semibold">When is your class?</p>
                    <p className="mt-3 text-md max-h-[48px] overflow-hidden text-ellipsis line-clamp-2">
                      {dates && dates.length > 0
                        ? dates
                            .map((date) =>
                              date.toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })
                            )
                            .join(", ")
                        : "Select a date"}
                    </p>
                  </div>

                  <div className="overflow-y-auto max-h-[500px]"></div>
                  <div>
                    <p className="text-lg font-semibold">
                      What time is your class?
                    </p>
                    <Input
                      type="number"
                      value={time}
                      onChange={(e) =>
                        setTime(
                          e.target.value ? parseInt(e.target.value, 10) : ""
                        )
                      }
                      placeholder="Enter time (24-hour format)"
                      className="w-full"
                      min={0}
                      max={23}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      Class Duration (hours)
                    </p>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) =>
                        setDuration(
                          e.target.value ? parseInt(e.target.value, 10) : ""
                        )
                      }
                      placeholder="Enter duration"
                      className="w-full"
                      min={1}
                      max={8}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Teacher Name</p>
                    <Input
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      placeholder="Enter teacher name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Student Name</p>
                    <Input
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter student name"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={fetchAvailableRooms}
                    disabled={
                      !dates ||
                      !time ||
                      !duration ||
                      !teacherName ||
                      !studentName
                    }
                    className={`w-4/5 h-14 mt-6 rounded-xl text-white ${
                      dates && time && duration && teacherName && studentName
                        ? "bg-gradient-to-r from-[#6fdbff] to-[#ffb3fe]"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Generate Schedule
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="dot flex mx-5 mt-10 space-x-2">
                  <div className="w-[12px] h-[12px] bg-[#D9D9D9] rounded-full"></div>
                  <div className="w-[30px] h-[12px] bg-gradient-to-r from-[#6fdbff] to-[#ffb3fe] rounded-full"></div>
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="text-lg font-semibold mt-3">
                    Schedule Results
                  </h2>
                  {results &&
                    results.all_dates.map((date: string, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between w-3/4 bg-gray-200 rounded-lg p-3 mt-3"
                      >
                        <p>{date}</p>
                        <p>Room: {results.all_rooms[index]}</p>
                        <p>Time: {results.time}</p>
                      </div>
                    ))}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      window.location.reload();
                    }}
                    className="w-4/5 h-14 mt-6 bg-gradient-to-r from-[#6fdbff] to-[#ffb3fe] rounded-xl text-white"
                  >
                    Save Class
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
