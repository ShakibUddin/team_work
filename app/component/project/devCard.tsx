import { IDeveloper } from "@/app/(protected)/projects/types";
import React from "react";
import { MdDelete } from "react-icons/md";

type Props = {
  developer: IDeveloper;
  handleDeleteDev: (id: number) => void;
};

const DevCard = (props: Props) => {
  return (
    <div
      key={props.developer.id}
      className="flex gap-2  justify-center items-center bg-brand-color rounded-md px-4 py-2 text-white w-fit"
    >
      {props.developer.firstName + " " + props.developer.lastName}
      <MdDelete
        onClick={() => {
          props.handleDeleteDev(props.developer.id);
        }}
        className="text-xl text-red-500 cursor-pointer"
      />
    </div>
  );
};

export default DevCard;
