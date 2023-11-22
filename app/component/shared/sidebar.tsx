"use client";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  const setLoggedIn = useAuthStore((state: AuthState) => state.setLoggedIn);
  // const loggedIn = useAuthStore((state: AuthState) => state.loggedIn);
  const router = useRouter();
  const handleLogout = () => {
    setLoggedIn(false);
    router.push("/signin");
  };

  return (
    <div className="side-bar-menu">
      <p className="heading2">Team Work</p>
      <ul className="side-bar-links">
        <li>
          <Link className="side-bar-link" href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="side-bar-link" href="/dashboard/projects">
            Projects
          </Link>
        </li>
        <li>
          <Link className="side-bar-link" href="/dashboard/about">
            About
          </Link>
        </li>
        <Button onClick={handleLogout} className="text-white">
          Logout
        </Button>
      </ul>
    </div>
  );
};

export default Sidebar;
