import React from "react";

type Developer = {
  name: string;
  avatar?: string;
};
type Props = {
  title: string;
  description: string;
  taskCount: string;
  status: string;
  statusColor: string;
  developers?: Developer[];
};

const ProjectCard = (props: Props) => {
  return (
    <div className="flex h-auto w-[200px] flex-col items-center justify-start gap-4 border-[1px] shadow-md">
      <p className="text-xl font-bold text-brand-color">{props.title}</p>
      <p className="text-sm font-bold text-brand-color">
        {props.taskCount} Tasks
      </p>
      <p className="text-md font-light text-black ">{props.description}</p>
      <div className="flex justify-between">
        <p
          className={`text-[${props.statusColor}] rounded-full p-2 my-2 bg-[${props.statusColor}] bg-opacity-10`}
        >
          {props.status}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
