"use client";
import React from "react";
import "./globals.css";
import Sidebar from "@/component/shared/sidebar";
import { usePathname } from "next/navigation";
import Header from "@/component/shared/header";
import useAuthStore from "@/store/authStore/useAuthStore";
import { AuthState } from "@/store/authStore/authStoreTypes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const loggedIn = useAuthStore((state: AuthState) => state.loggedIn);
  return (
    <html lang="en">
      <body className={"flex justify-start"}>
        {pathname !== "/signin" && pathname !== "/signup" && loggedIn ? (
          <Sidebar />
        ) : (
          <></>
        )}
        <div>
          {pathname !== "/signin" && pathname !== "/signup" && loggedIn ? (
            <Header />
          ) : (
            <></>
          )}
          <div className="flex flex-col items-start">{children}</div>
        </div>
      </body>
    </html>
  );
}
