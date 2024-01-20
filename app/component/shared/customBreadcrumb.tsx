import { Breadcrumb } from "antd";
import Link from "next/link";
import React from "react";

interface IBreadCrumbItem {
  title: React.ReactNode;
}
type Props = {
  items: IBreadCrumbItem[];
};

const CustomBreadCrumb = (props: Props) => {
  return (
    <Breadcrumb
      items={[
        {
          title: <Link href={"/dashboard"}>Dashboard</Link>,
        },
        ...props.items,
      ]}
    />
  );
};

export default CustomBreadCrumb;
