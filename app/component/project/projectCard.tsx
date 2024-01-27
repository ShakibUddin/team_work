"use client";
import { IProject } from "@/app/(protected)/projects/types";
import { Avatar, Button, Popover } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import person1 from "../../../public/persons/person1.jpeg";
import person2 from "../../../public/persons/person2.jpeg";
import person3 from "../../../public/persons/person3.jpeg";
import person4 from "../../../public/persons/person4.jpeg";
import Image from "next/image";

interface IProjectCard extends IProject {
  handleOnClick: (id: IProject) => void;
  status: string;
}
const ProjectCard = (props: IProjectCard) => {
  const router = useRouter();
  const [showPopover, setShowPopover] = useState(false);
  const handleNavigation = () => {
    router.push(`/projects/${props.id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className="flex h-auto w-[400px] flex-col gap-4 border-[1px] shadow-md cursor-pointer hover:shadow-lg p-4 overflow-hidden"
    >
      <div className="flex justify-between items-center w-full">
        <span className="text-xl font-bold text-brand-color">
          {props.title}
        </span>
        <Popover
          placement="bottomLeft"
          trigger={"click"}
          open={showPopover}
          content={
            <div className="p-0">
              <p
                className="cursor-pointer hover:bg-blue-300 font-semibold p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopover(false);
                  props.handleOnClick(props);
                }}
              >
                Edit Project
              </p>
              <p
                className="text-red-600 hover:bg-red-300 font-semibold cursor-pointer p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopover(false);
                }}
              >
                Delete Project
              </p>
            </div>
          }
        >
          <BsThreeDotsVertical
            size={20}
            onClick={(e) => {
              e.stopPropagation();
              setShowPopover(true);
            }}
          />
        </Popover>
      </div>

      <p className="text-sm text-start font-semibold text-brand-color">
        {props.taskCount}{" "}
        {props?.taskCount && parseInt(props.taskCount) > 1 ? "Tasks" : "Task"}
      </p>
      <p className="text-sm font-light text-black line-clamp-2 w-full text-justify">
        {props.description}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <p
          className={`rounded-full p-2 my-2`}
          style={{
            color: "white",
            backgroundColor: props.statusColor,
          }}
        >
          {props.status}
        </p>
        <Avatar.Group
          maxCount={3}
          maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          size={40}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
            <Image className="w-full" src={person1} alt="person1" />
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
            <Image className="w-full" src={person2} alt="person2" />
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
            <Image className="w-full" src={person3} alt="person3" />
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
            <Image className="w-full" src={person4} alt="person4" />
          </div>
        </Avatar.Group>
      </div>
    </div>
  );
};

export default ProjectCard;
