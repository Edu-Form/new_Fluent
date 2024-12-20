"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  async function Login() {
    try {
      const response = await fetch(`http://13.54.77.128/api/user/${username}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data) {
          console.log(data[0].user_name);
          if (data[0].type == "student") {
            const url = `/home?user=${data[0].user_name}&type=${data[0].type}&id=${data[0].user_number}`;
            router.push(url);
          } else if (data[0].type == "teacher") {
            const url = `/teacher/home?user=${data[0].user_name}&type=${data[0].type}&id=${data[0].user_number}`;
            router.push(url);
          } else if (data[0].type == "admin") {
            const url = `/admin/home?user=${data[0].user_name}&type=${data[0].type}&id=${data[0].user_number}`;
            router.push(url);
          }
        }
      }
    } catch {
      router.push("/");
    }
  }

  // 로그인
  // async function Login() {
  //   const current_user = user_validation(username);
  //   console.log(username, current_user);
  //   if (current_user == "0") {
  //     router.push("/");
  //   } else {
  //     router.push(`/schedule?user=${current_user}&student=false`);
  //   }
  // }

  return (
    <div className="h-[90vh] w-full bg-white flex flex-col items-center justify-center">
      <Card className="w-[15vw]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter Student ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between ">
          <Button className="w-full" onClick={Login}>
            Log in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
