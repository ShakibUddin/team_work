"use client";
import useAuthStore from "@/store/authStore/useAuthStore";
import Dashboard from "./dashboard/page";
import { AuthState } from "@/store/authStore/authStoreTypes";
import Signin from "./(auth)/signin/page";

export default function Home() {
  const loggedIn = useAuthStore((state: AuthState) => state.loggedIn);
  console.log("loggedIn", loggedIn);
  return (
    <main className="flex flex-col items-center justify-between">
      {loggedIn ? <Dashboard /> : <Signin />}
    </main>
  );
}
