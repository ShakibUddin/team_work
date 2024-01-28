"use client";
import useAuthServices from "@/app/services/useAuthService";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { Button } from "antd";
import React from "react";
type Props = {};

const Header = (props: Props) => {
  const { loggedIn, loggedInUser } = useAuthStore((state: AuthState) => state);
  const { logoutUser } = useAuthServices();

  const handleLogout = () => {
    logoutUser(loggedInUser?.id || 0);
  };
  return (
    <div className="header">
      {loggedIn ? (
        <p className="mr-4  !text-blue-400">Hello, {loggedInUser?.firstName}</p>
      ) : (
        <></>
      )}
      {loggedIn ? (
        <Button
          type="primary"
          onClick={handleLogout}
          className="mr-4 bg-brand-color text-white hover:!bg-brand-color"
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
