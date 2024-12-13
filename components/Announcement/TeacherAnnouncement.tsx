import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import EnterBtn from "../EnterBtn/EnterBtn";
import Button from "../Button/Button";



interface ScheduleData {
    room_name: string;
    student_name: string;
    time: string;
    time_range: string;
  }

interface RoomData {
    room_name: string;
    description: string;
}

function room_description(data: any, next_schedule_data: any){
    for (const item of data) {
        console.log(item)
        console.log(next_schedule_data.room_name)
        if (item.room_name == next_schedule_data.room_name) { // String comparison
        console.log("Room Description", item);
        return item; // Return room description
        }
    }
}

function convertTo12HourFormat(time24: any) {
    const suffix = time24 >= 12 ? "PM" : "AM";
    const hours12 = time24 % 12 || 12;  // Convert 0 to 12 for midnight
    return `${hours12} ${suffix}`;
}

const today_formatted = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}. ${month}. ${day}.`;
  };

const AnnouncementPage = () => {
    const searchParams = useSearchParams();
    const user = searchParams.get("user");
    const type = searchParams.get("type");
    const user_id = searchParams.get("id");
    const today = today_formatted();
    const [day_schedule_data, setDay_schedule_data] = useState([])
    const [next_schedule_data, setNext_schedule_data] = useState<ScheduleData | null>(null);
    const [room_data, setRoom_data] = useState<RoomData | null>(null);
    const [current_schedule_index, setCurrent_schedule_index] = useState(0)

    useEffect(() => {
        // 비동기 데이터 로딩 함수
        const fetchData = async () => {

          const URL = `http://13.54.77.128/api/schedules/oneday_oneteacher/${today}/${user}`;
          try {
            const res = await fetch(URL, { cache: "no-store" });
            const data = await res.json();
            console.log(data)
            const next = setDay_schedule_data(data);
            setNext_schedule_data(data[current_schedule_index]) // 가져온 데이터를 상태에 설정
            fetchRoomData(data[current_schedule_index])
          } catch (error) {
            console.log("Error")
          }
        };

        const fetchRoomData = async (next_schedule_data: any) => {
            const URL = `http://13.54.77.128/api/room_list/`;
            try {
              const res = await fetch(URL);
              const data = await res.json();
              console.log(data)
              setRoom_data(room_description(data, next_schedule_data)); // 가져온 데이터를 상태에 설정
            } catch (error) {
                console.log("Error")
            };
        };
        fetchData(); // 데이터 요청 함수 호출
    }, [user, today]); // 컴포넌트가 처음 렌더링될 때만 실행

    function updateScheduleIndex() {
        let nextIndex;
        if (current_schedule_index === day_schedule_data.length - 1) {
            nextIndex = 0; // Reset to 0 if at the end
        } else {
            nextIndex = current_schedule_index + 1; // Increment normally
        }
        setCurrent_schedule_index(nextIndex); // Update the index
        setNext_schedule_data(day_schedule_data[nextIndex]); // Set next schedule data based on calculated index
    }

    return (
        <div className="text-center font-bold">
            <h1 className="text-2xl mb-4 text-gray-800">Hi, {user}!</h1>
            <div className="mb-8">
                <div className="flex flex-col">
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Your classes today:</span>{" "}
                        {current_schedule_index + 1}/{day_schedule_data.length}
                    </p>
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Time:</span>{" "}
                        {next_schedule_data ? convertTo12HourFormat(next_schedule_data.time) : "N/A"}
                    </p>
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">With:</span>{" "}
                        {next_schedule_data ? next_schedule_data.student_name : "N/A"}
                    </p>
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Where:</span>{" "}
                        {next_schedule_data && room_data
                            ? `${next_schedule_data.room_name} - ${room_data.description}`
                            : "N/A"}
                    </p>
                    <Link
                        className="text-xs text-green-500 hover:text-green-700"
                        href={`/schedule?user=${user}&type=${type}&id=${user_id}`}
                        >
                        For more details...
                    </Link>
                </div>
            </div>
            <div className="mb-6 text-gray-800">
                <p className="text-lg">Here are all class materials for {next_schedule_data != null ? next_schedule_data.student_name : "your next class:"}:</p>
                <ul className="list-disc list-inside text-left mt-4 space-y-2">
                <li>
                    <span className="text-gray-700">Test the Quizlet</span>{" "}
                    <Link
                    className="text-blue-500 underline hover:text-blue-700"
                    href={next_schedule_data ? `/teacher/student/quizlet?user=${user}&type=${type}&id=${user_id}&student_name=${next_schedule_data?.student_name}` : `/quizlet?/quizlet?user=${user}&type=${type}&id=${user_id}`}
                    >
                    Click here
                    </Link>
                </li>
                <li>
                    <span className="text-gray-700">Check the Diary</span>{" "}
                    <Link
                    className="text-red-500 underline hover:text-red-700"
                    href={next_schedule_data ? `/teacher/student/diary?user=${user}&type=${type}&id=${user_id}&student_name=${next_schedule_data?.student_name}` : `/quizlet?/quizlet?user=${user}&type=${type}&id=${user_id}`}
                    >
                    Click here
                    </Link>
                </li>
                <li>
                    <span className="text-gray-700">Create Notecards</span>{" "}
                    <Link
                    className="text-yellow-500 underline hover:text-yellow-700"
                    href={next_schedule_data ? `/teacher/student/quizlet?user=${user}&type=${type}&id=${user_id}&student_name=${next_schedule_data?.student_name}` : `/quizlet?/quizlet?user=${user}&type=${type}&id=${user_id}`}
                    >
                    Click here
                    </Link>
                </li>
                <li>
                    <Link
                    className="text-gray-500 underline hover:text-gray-700"
                    href={`https://cedar-cowl-36f.notion.site/Teacher-s-guide-for-FLUENT-9e483e59fc674fc1a9bcfd4134f574e5`}
                    >
                    The General Teacher&apos;s Guide 
                    </Link>
                </li>
                </ul>
            </div>
            <div onClick={updateScheduleIndex}>Next Schedule</div>
            <div className="h-24 w-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/flower.png')", backgroundSize: "100px", }}>
            </div>
        </div>
    )
  }; 

  export default function Announcement() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <AnnouncementPage />
      </Suspense>
    );
  }