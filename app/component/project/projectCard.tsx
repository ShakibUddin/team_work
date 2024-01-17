"use client";
import { IProject } from "@/app/(protected)/projects/types";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

interface IProjectCard extends IProject {
  handleOnClick: (id: IProject) => void;
}
const ProjectCard = (props: IProjectCard) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/projects/${props.id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className="flex h-auto w-[200px] flex-col items-center justify-between gap-4 border-[1px] shadow-md cursor-pointer hover:shadow-lg p-4 overflow-hidden"
    >
      <p className="text-xl font-bold text-brand-color">{props.title}</p>
      <p className="text-sm font-bold text-brand-color">
        {props.taskCount} Tasks
      </p>
      <p className="text-sm font-light text-black line-clamp-2 w-full text-justify">
        {props.description}
      </p>
      <div className="flex justify-between">
        <p
          className={`rounded-full p-2 my-2 text-[${props.statusColor}] bg-[${props.statusColor}] bg-opacity-10`}
        >
          {props.status}
        </p>
      </div>
      <Button
        className="action-button-outlined"
        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          e.stopPropagation();
          props.handleOnClick(props);
        }}
      >
        Edit
      </Button>
    </div>
  );
};

export default ProjectCard;
