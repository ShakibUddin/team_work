"use client";
import { AuthState, ILOGIN_RESPONSE } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { notification } from "antd";
import React, { useEffect, useRef } from "react";
import DataCard from "../../component/dashboard/dataCard";
import { FaUsers, FaTasks } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";

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
      <div className="flex w-full flex-wrap gap-4 mt-4">
        <DataCard
          title={"Projects"}
          icon={<AiFillProject size={30} className="text-cyan-600" />}
          data={5}
          iconBgColor={"bg-cyan-50"}
        />
        <DataCard
          title={"Tasks"}
          icon={<FaTasks size={30} className="text-yellow-600" />}
          data={234}
          iconBgColor={"bg-yellow-50"}
        />
        <DataCard
          title={"Members"}
          icon={<FaUsers size={30} className="text-purple-600" />}
          data={5}
          iconBgColor={"bg-purple-50"}
        />
        <DataCard
          title={"Total Build for today"}
          icon={<MdOutlineRocketLaunch size={30} className="text-pink-600" />}
          data={3}
          iconBgColor={"bg-pink-50"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
