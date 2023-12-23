"use client";
import React, { useEffect } from "react";
import Sidebar from "../component/shared/sidebar";
import useAuthStore from "@/store/authStore/useAuthStore";
import { useRouter } from "next/navigation";
import { AuthState } from "@/store/authStore/authStoreTypes";
import Header from "../component/shared/header";
import { Layout as AntLayout } from "antd";

const { Content } = AntLayout;

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
    <AntLayout className="flex h-screen md:overflow-hidden">
      <Sidebar />
      <AntLayout>
        <Header />
        <Content className="overflow-hidden overflow-y-auto p-4">
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
