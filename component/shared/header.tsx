import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import Link from "next/link";
import React, { useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

type Props = {};

const Header = (props: Props) => {
  const [darkMood, setDarkMood] = useState(false);
  const loggedIn = useAuthStore((state: AuthState) => state.loggedIn);
  const setLoggedIn = useAuthStore((state: AuthState) => state.setLoggedIn);

  const handleDarkMood = () => {
    setDarkMood(false);
  };

  const handleLightMood = () => {
    setDarkMood(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="header">
      {darkMood ? (
        <BsFillMoonFill
          style={{ cursor: "pointer" }}
          className="cursor-pointer"
          onClick={handleDarkMood}
          size={20}
        />
      ) : (
        <BsFillSunFill
          style={{ cursor: "pointer" }}
          className="cursor-pointer"
          color="orange"
          onClick={handleLightMood}
          size={30}
        />
      )}
      {loggedIn ? (
        <Link onClick={handleLogout} className="p-4" href={"/"}>
          Sign Out
        </Link>
      ) : (
        <Link className="p-4" href={"/signin"}>
          SignIn
        </Link>
      )}
    </div>
  );
};

export default Header;
