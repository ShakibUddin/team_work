import Link from "next/link";
import React from "react";
import millify from "millify";
import "../styles/dashboard.module.css";

type Props = {
  title: string;
  icon: React.ReactNode;
  data: number;
  link?: string;
  linkTextColor?: string;
  iconBgColor: string;
};

const DataCard = ({
  title,
  icon,
  data,
  link,
  linkTextColor,
  iconBgColor,
}: Props) => {
  return (
    <div className="flex h-auto min-w-[100px] grow flex-col items-start justify-start gap-4 rounded-md bg-brand-color p-4 shadow-md">
      <div className="flex w-full items-center justify-between">
        <span className="text-lg text-white">{title}</span>
        <div
          className={`${iconBgColor} flex h-fit w-fit items-center justify-center rounded-full bg-opacity-10 p-2`}
        >
          {icon}
        </div>
      </div>

      <p className="text-3xl font-bold text-white">{millify(data)}</p>
      <div className="flex w-full flex-row justify-between">
        {link ? (
          <Link
            className={`${linkTextColor} text-sm hover:underline`}
            href={link}
          >
            {"See More"}
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DataCard;
