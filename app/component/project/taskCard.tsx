import { IDeveloper, ITask } from "@/app/(protected)/projects/types";
import Image from "next/image";
import React from "react";

const TaskCard = (props: ITask) => {
  return (
    <div className="flex h-auto min-w-[200px] flex-col items-start justify-start gap-4 border-[1px] shadow-md cursor-pointer hover:shadow-lg p-4 rounded-md">
      <p className="text-xl font-bold text-brand-color">{props.title}</p>
      <p className="text-xs font-light text-black ">{props.description}</p>
      <div className="flex justify-between">
        {props.assignedDevs &&
          props.assignedDevs.map((dev: IDeveloper) => (
            <div className="rounded-full" key={dev.id}>
              {dev.avatar ? (
                <Image
                  alt={dev.name}
                  src={dev.avatar}
                  width={50}
                  height={50}
                  className="w-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full">
                  {dev.name[0].toUpperCase()}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskCard;
