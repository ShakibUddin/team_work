"use client";
import Link from "next/link";
import React, { useState } from "react";

import type { MenuProps } from "antd";
import { Button, Menu, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MdDashboard } from "react-icons/md";
import { AiFillProject, AiOutlineSchedule } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
type Props = {};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link href="/dashboard">Dashboard</Link>,
    "/dashboard",
    <MdDashboard size={25} />
  ),
  getItem(
    <Link href="/projects">Projects</Link>,
    "/projects",
    <AiFillProject size={25} />
  ),
  getItem(
    <Link href="/members">Members</Link>,
    "/members",
    <FaUsers size={25} />
  ),
  getItem(
    <Link href="/calendar">Calendar</Link>,
    "/calendar",
    <AiOutlineSchedule size={25} />
  ),
];

const Sidebar = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sider className="h-screen" collapsed={collapsed}>
      <p className="heading3 my-4 text-center text-white">Team Work</p>
      <Menu
        defaultSelectedKeys={["/dashboard"]}
        mode="inline"
        theme="dark"
        items={items}
      />
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
        }}
      >
        {collapsed ? (
          <MenuUnfoldOutlined size={25} />
        ) : (
          <MenuFoldOutlined size={25} />
        )}
      </Button>
    </Sider>
  );
};

export default Sidebar;
