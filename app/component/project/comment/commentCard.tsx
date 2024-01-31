import Image from "next/image";
import React from "react";
import person1 from "../../../../public/persons/person1.jpeg";
import { IDeveloper } from "@/app/(protected)/projects/types";
import dayjs from "dayjs";
require("dayjs/plugin/relativeTime");
dayjs.extend(require("dayjs/plugin/relativeTime"));

type Props = {
  user: IDeveloper;
  comment: string;
  dateTime: string;
};

declare module "dayjs" {
  interface Dayjs {
    fromNow(): string;
  }
}

const CommentCard = (props: Props) => {
  return (
    <div className="flex justify-start items-start w-full gap-2">
      <div className="rounded-full !overflow-hidden w-[8%]">
        <Image
          src={props.user?.avatar || person1}
          alt="person"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col gap-2 w-[92%]">
        <div className="flex gap-2">
          <p className="font-bold">
            {props.user.firstName + " " + props.user.lastName}
          </p>
          <p className="font-light">{dayjs(props.dateTime).fromNow()}</p>
        </div>
        <p>{props.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
