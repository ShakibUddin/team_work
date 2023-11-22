"use client";
import InputField from "@/app/component/shared/InputField";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

type Props = {};

const Signup = (props: Props) => {
  const loggedIn = useAuthStore((state: AuthState) => state.loggedIn);
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) {
      router.replace("/dashboard");
    }
  }, [loggedIn]);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[var(--brand-color)]">
      <div className="m-4 flex w-full flex-col justify-stretch gap-4 rounded-md bg-white p-4 shadow-md sm:w-2/3 md:w-2/3 lg:w-1/3">
        <span className="text-center text-3xl font-bold text-[var(--brand-color)]">
          COMPANY
        </span>
        <InputField
          title={"First Name"}
          type={"text"}
          placeholder={"Enter first name"}
          className="p-4"
          onChange={() => {}}
          onBlur={() => {}}
        />
        <InputField
          title={"Last Name"}
          type={"text"}
          placeholder="Enter last name"
          className="p-4"
          onChange={() => {}}
          onBlur={() => {}}
        />
        <InputField
          title={"Email"}
          placeholder={"Enter email"}
          type={"email"}
          className="p-4"
          onChange={() => {}}
          onBlur={() => {}}
        />
        <InputField
          title={"Password"}
          type={"password"}
          placeholder="Enter password"
          iconRender={(visible) =>
            visible ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />
          }
          className="p-4"
          onChange={() => {}}
          onBlur={() => {}}
        />
        <InputField
          title={"Confirm Password"}
          type={"password"}
          placeholder="Enter password again"
          iconRender={(visible) =>
            visible ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />
          }
          className="p-4"
          onChange={() => {}}
          onBlur={() => {}}
        />
        <Button className="mx-auto h-8 w-32 bg-[var(--brand-color)] text-white hover:border-2 hover:border-[var(--brand-color)] hover:bg-white hover:text-[var(--brand-color)] md:h-8 md:w-32 lg:h-10 lg:w-48">
          SIGN UP
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="font-bold text-blue-500" href={"/signin"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
