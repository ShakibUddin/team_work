"use client";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
type Props = {};

const Header = (props: Props) => {
  const { loggedIn, loggedInUser } = useAuthStore((state: AuthState) => state);
  const setLoggedIn = useAuthStore((state: AuthState) => state.setLoggedIn);
  // const loggedIn = useAuthStore((state: AuthState) => state.loggedIn);
  const router = useRouter();
  const handleLogout = () => {
    setLoggedIn(false);
    router.push("/signin");
  };

  return (
    <div className="header ">
      {loggedIn ? (
        <p className="mr-4  !text-blue-400">Hello, {loggedInUser?.firstName}</p>
      ) : (
        <></>
      )}
      {loggedIn ? (
        <Button
          type="primary"
          onClick={handleLogout}
          className="bg-brand-color text-white hover:!bg-brand-color mr-4"
        >
          Logout
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
