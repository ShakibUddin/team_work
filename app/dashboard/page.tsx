"use client";
import { AuthState, ILOGIN_RESPONSE } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { notification } from "antd";
import React, { useEffect, useRef } from "react";

const Dashboard = () => {
  const [api, contextHolder] = notification.useNotification();
  const ref = useRef({ flag: false });

  const { setRegistrationSuccessful, setLoginResponse } = useAuthStore(
    (state: AuthState) => state
  );
  const { loginResponse } = useAuthStore((state: AuthState) => state);

  const openNotification = (response: ILOGIN_RESPONSE) => {
    api.info({
      message: response?.error ? "Error" : "Success",
      description: response?.message,
      placement: "topRight",
    });
  };

  useEffect(() => {
    if (
      loginResponse &&
      Object.keys(loginResponse).length > 0 &&
      !ref.current.flag
    ) {
      ref.current.flag = true;
      setRegistrationSuccessful(false);
      setLoginResponse(null);
      openNotification(loginResponse);
    }
  }, [loginResponse]);

  return (
    <div>
      {contextHolder}
      Dashboard
    </div>
  );
};

export default Dashboard;
