import { IDeveloper, ITask } from "@/app/(protected)/projects/types";
import Image from "next/image";
import React from "react";
import { Avatar, Tooltip } from "antd";

const TaskCard = (props: ITask) => {
  return (
    <div className="flex h-auto min-w-[200px] flex-col items-start justify-start gap-4 border-[1px] shadow-md cursor-pointer hover:shadow-lg p-4 rounded-md">
      <p className="text-xl font-bold text-brand-color">{props.title}</p>
      <p className="text-xs font-light text-black ">{props.description}</p>
      <div className="flex justify-start items-center">
        <Avatar.Group
          maxCount={3}
          maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        >
          {props.developers &&
            JSON.parse(props.developers).map((dev: IDeveloper) => (
              <Tooltip
                key={dev.id}
                placement="topLeft"
                title={dev.firstName + " " + dev.lastName}
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex justify-center items-center">
                  {dev.avatar ? (
                    <Avatar src={dev.avatar} />
                  ) : (
                    <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {dev.firstName[0].toUpperCase()}
                    </Avatar>
                  )}
                </div>
              </Tooltip>
            ))}
        </Avatar.Group>
      </div>
    </div>
  );
};

export default TaskCard;
