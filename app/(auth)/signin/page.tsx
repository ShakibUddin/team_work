"use client";
import InputField from "@/app/component/shared/InputField";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { Button, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import * as yup from "yup";
import { useFormik } from "formik";
import { ILOGIN_RESPONSE, IUNAUTHENTICATED_USER } from "./types";
import { loginUser } from "./services";

const Signin = () => {
  const [api, contextHolder] = notification.useNotification();
  const ref = useRef({ flag: false });
  const {
    setLoggedIn,
    setLoginResponse,
    setLoggedInUser,
    registrationSuccessful,
  } = useAuthStore((state: AuthState) => state);
  const { loggedIn } = useAuthStore((state: AuthState) => state);
  const router = useRouter();

  const openNotification = (response: ILOGIN_RESPONSE) => {
    api.info({
      message: response?.error ? "Error" : "Success",
      description: response?.message,
      placement: "topRight",
    });
  };

  const handleLogin = async (values: IUNAUTHENTICATED_USER) => {
    const response = await loginUser(values);
    const jsonResponse: ILOGIN_RESPONSE = await response.json();
    if (jsonResponse?.error) {
      openNotification(jsonResponse);
    } else {
      setLoggedIn(true);
      setLoggedInUser(jsonResponse?.data);
      setLoginResponse({
        error: jsonResponse?.error,
        message: jsonResponse?.message,
      });
    }
  };

  const initialValues: IUNAUTHENTICATED_USER = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup.string().required("Email is required."),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  useEffect(() => {
    if (loggedIn) {
      router.replace("/dashboard");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (registrationSuccessful && !ref.current.flag) {
      ref.current.flag = true;
      api.info({
        message: "Success",
        description: "Registration Successful! Please Login",
        placement: "topRight",
      });
    }
  }, [registrationSuccessful]);

  return (
    <div className="flex min-h-screen !w-screen items-center justify-center bg-[var(--brand-color)]">
      {contextHolder}
      <div className="m-4 flex !w-auto flex-col justify-stretch gap-4 rounded-md bg-white p-4 shadow-md sm:!w-2/3 md:!w-2/3 lg:!w-1/3">
        <span className="text-center text-3xl font-bold text-[var(--brand-color)]">
          COMPANY
        </span>
        <InputField
          value={formik.values.email}
          title={"Email"}
          type={"email"}
          placeholder="Email"
          className="p-4"
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          error={!!(formik.touched.email && formik.errors.email)}
          errorMessage={formik.errors.email}
        />
        <InputField
          value={formik.values.password}
          title={"Password"}
          type={"password"}
          placeholder="Password"
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("email")}
          iconRender={(visible) =>
            visible ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />
          }
          className="p-4"
          error={!!(formik.touched.password && formik.errors.password)}
          errorMessage={formik.errors.password}
        />
        <Button
          onClick={(e) => {
            formik.handleSubmit();
          }}
          className="mx-auto h-8 w-32 bg-[var(--brand-color)] text-white hover:border-2 hover:border-[var(--brand-color)]  hover:bg-white hover:text-[var(--brand-color)] md:h-8 md:w-32 lg:h-10 lg:w-48"
        >
          LOGIN
        </Button>
        <p className="text-center">
          Do not have an account?{" "}
          <Link className="font-bold text-blue-500" href={"/signup"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
