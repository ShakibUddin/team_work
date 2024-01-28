import { IDeveloper, ITask } from "@/app/(protected)/projects/types";
import React from "react";
import { Avatar, Tooltip } from "antd";
import dayjs from "dayjs";
import { FaRegCommentAlt } from "react-icons/fa";

interface ITaskCard extends ITask {
  onClick: () => void;
  priority: string;
  priorityColor: string;
}
const TaskCard = (props: ITaskCard) => {
  return (
    <div
      className="flex w-full flex-col items-start justify-start gap-2 border-[1px] shadow-md cursor-pointer hover:shadow-lg p-4 rounded-md"
      onClick={props.onClick}
    >
      <div className="flex justify-between w-full">
        <p
          className="text-white px-4 rounded-sm"
          style={{ backgroundColor: props.priorityColor }}
        >
          {props.priority} Priority
        </p>
        <p className="font-semibold">
          Due {props.dueDate ? dayjs(props.dueDate).format("MM-DD-YYYY") : ""}
        </p>
      </div>
      <p className="text-xl font-semibold text-brand-color">{props.title}</p>
      <div className="w-full flex justify-between items-center mt-auto">
        <div className="flex gap-2 items-center justify-start">
          <FaRegCommentAlt size={20} /> {"11"}
        </div>
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
