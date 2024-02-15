import React, { useEffect, useState } from "react";
import AutoCompleteField from "../shared/autoCompleteField";
import { IDeveloper } from "@/app/(protected)/projects/types";
import useUserServices from "@/app/services/useUserServices";
import { Button } from "antd";
import SelectField from "../shared/selectField";
import Search from "antd/es/input/Search";

type Props = {
  projectId: number;
  openInvitationModal: boolean;
  handleClose: () => void;
};

const InvitationBox = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const { users, fetchAllUsers } = useUserServices();

  const handleInvite = ({
    userId,
    projectId,
  }: {
    userId: number;
    projectId: number;
  }) => {
    console.log("userId", userId);
    console.log("projectId", projectId);
  };
  return (
    <div className="w-full">
      <Search
        title="Project"
        placeholder="Search Here"
        required
        className="w-full mb-4"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          fetchAllUsers({ searchKey: e.target.value, limit: 10 });
        }}
      />
      <div className="w-[300px] flex flex-col gap-2 h-[300px] overflow-auto">
        {users.map((user) => {
          return (
            <div className="flex justify-between">
              <p>{user?.firstName + " " + user?.lastName}</p>
              <Button
                onClick={() => {
                  handleInvite({
                    userId: user?.id,
                    projectId: props.projectId,
                  });
                }}
              >
                Send
              </Button>
            </div>
          );
        })}
      </div>
      <Button
        className="action-button-active mt-4 w-min ml-auto"
        onClick={props.handleClose}
      >
        Cancel
      </Button>
    </div>
  );
};

export default InvitationBox;
