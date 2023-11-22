"use client";
import React, { useEffect } from "react";
import Sidebar from "../component/shared/sidebar";
import useAuthStore from "@/store/authStore/useAuthStore";
import { useRouter } from "next/navigation";
import { AuthState } from "@/store/authStore/authStoreTypes";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const loggedIn = useAuthStore((state: AuthState) => state.loggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/signin");
    } else {
      router.replace("/dashboard");
    }
  }, [loggedIn]);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidebar />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
};

export default Layout;
