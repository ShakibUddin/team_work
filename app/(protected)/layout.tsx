"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../component/shared/sidebar";
import useAuthStore from "@/store/authStore/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { AuthState } from "@/store/authStore/authStoreTypes";
import Header from "../component/shared/header";
import { Layout as AntLayout } from "antd";

const { Content } = AntLayout;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const loggedIn = useAuthStore((state: AuthState) => state.loggedIn);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (!loggedIn) {
      router.replace("/signin");
    } else {
      router.replace(pathname);
    }
  }, [loggedIn]);

  if (isClient) {
    return (
      <AntLayout className="flex h-screen md:overflow-hidden">
        <Sidebar />
        <AntLayout>
          <Header />
          <Content className="h-[calc(100vh-103px)] overflow-hidden overflow-y-auto p-4">
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    );
  }
  return <div></div>;
};

export default Layout;
