"use client";
import InputField from "@/app/component/shared/InputField";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { Button, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { ISIGNUP_RESPONSE, ISIGNUP_UNAUTHENTICATED_USER } from "./types";
import useAuthServices from "@/app/services/useAuthService";

const Signup = () => {
  const [api, contextHolder] = notification.useNotification();
  const { createUser } = useAuthServices();
  const loggedIn = useAuthStore((state: AuthState) => state.loggedIn);
  const { setRegistrationSuccessful } = useAuthStore(
    (state: AuthState) => state
  );

  const router = useRouter();

  const openNotification = (response: ISIGNUP_RESPONSE) => {
    api.info({
      message: response?.error ? "Error" : "Success",
      description: response?.message,
      placement: "topRight",
    });
  };

  const handelCreateUser = async (values: ISIGNUP_UNAUTHENTICATED_USER) => {
    const response = await createUser(values);
    const jsonResponse: ISIGNUP_RESPONSE = await response.json();
    if (jsonResponse?.error) {
      openNotification(jsonResponse);
    } else {
      setRegistrationSuccessful(true);
      router.replace("/signin");
    }
  };

  const initialValues: ISIGNUP_UNAUTHENTICATED_USER = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required."),
    lastName: yup.string().required("Last name is required."),
    email: yup.string().required("Email is required."),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Enter password again"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handelCreateUser,
  });

  useEffect(() => {
    if (loggedIn) {
      router.replace("/dashboard");
    }
  }, [loggedIn]);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[var(--brand-color)]">
      {contextHolder}
      <div className="m-4 flex w-full flex-col justify-stretch gap-4 rounded-md bg-white p-4 shadow-md sm:w-2/3 md:w-2/3 lg:w-1/3">
        <span className="text-center text-3xl font-bold text-[var(--brand-color)]">
          COMPANY
        </span>
        <InputField
          value={formik.values.firstName}
          title={"First Name"}
          type={"text"}
          placeholder={"Enter first name"}
          className="p-4"
          onChange={formik.handleChange("firstName")}
          onBlur={formik.handleBlur("firstName")}
          error={!!(formik.touched.firstName && formik.errors.firstName)}
          errorMessage={formik.errors.firstName}
        />
        <InputField
          value={formik.values.lastName}
          title={"Last Name"}
          type={"text"}
          placeholder="Enter last name"
          className="p-4"
          onChange={formik.handleChange("lastName")}
          onBlur={formik.handleBlur("lastName")}
          error={!!(formik.touched.lastName && formik.errors.lastName)}
          errorMessage={formik.errors.lastName}
        />
        <InputField
          value={formik.values.email}
          title={"Email"}
          placeholder={"Enter email"}
          type={"email"}
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
          placeholder="Enter password"
          iconRender={(visible) =>
            visible ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />
          }
          className="p-4"
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          error={!!(formik.touched.password && formik.errors.password)}
          errorMessage={formik.errors.password}
        />
        <InputField
          value={formik.values.confirmPassword}
          title={"Confirm Password"}
          type={"password"}
          placeholder="Enter password again"
          iconRender={(visible) =>
            visible ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />
          }
          className="p-4"
          onChange={formik.handleChange("confirmPassword")}
          onBlur={formik.handleBlur("confirmPassword")}
          error={
            !!(formik.touched.confirmPassword && formik.errors.confirmPassword)
          }
          errorMessage={formik.errors.confirmPassword}
        />
        <Button
          onClick={(e) => {
            formik.handleSubmit();
          }}
          className="mx-auto h-8 w-32 bg-[var(--brand-color)] text-white hover:border-2 hover:border-[var(--brand-color)] hover:bg-white hover:text-[var(--brand-color)] md:h-8 md:w-32 lg:h-10 lg:w-48"
        >
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
