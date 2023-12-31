"use client";
import { IProject } from "@/app/(protected)/projects/types";
import { useRouter } from "next/navigation";
import React from "react";

const ProjectCard = (props: IProject) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/projects/${props.id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className="flex h-auto w-[200px] flex-col items-center justify-start gap-4 border-[1px] shadow-md cursor-pointer hover:shadow-lg"
    >
      <p className="text-xl font-bold text-brand-color">{props.title}</p>
      <p className="text-sm font-bold text-brand-color">
        {props.taskCount} Tasks
      </p>
      <p className="text-md font-light text-black ">{props.description}</p>
      <div className="flex justify-between">
        <p
          className={`rounded-full p-2 my-2 text-[${props.statusColor}] bg-[${props.statusColor}] bg-opacity-10`}
        >
          {props.status}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
