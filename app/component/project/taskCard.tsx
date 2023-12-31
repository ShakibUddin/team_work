import { IDeveloper, ITask } from "@/app/(protected)/projects/types";
import Image from "next/image";
import React from "react";

const TaskCard = (props: ITask) => {
  return (
    <div className="flex h-auto w-[200px] flex-col items-center justify-start gap-4 border-[1px] shadow-md cursor-pointer hover:shadow-lg">
      <p className="text-xl font-bold text-brand-color">{props.title}</p>
      <p className="text-xs font-light text-black ">{props.description}</p>
      <div className="flex justify-between">
        <p
          className={`rounded-full p-2 my-2 text-[${props.statusColor}] bg-[${props.statusColor}] bg-opacity-10`}
        >
          {props.status}
        </p>
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
