import React, { useEffect, useState } from "react";
import AutoCompleteField from "../shared/autoCompleteField";
import { IDeveloper } from "@/app/(protected)/projects/types";
import useUserServices from "@/app/services/useUserServices";
import { Button } from "antd";
import SelectField from "../shared/selectField";
import Search from "antd/es/input/Search";
import { useApiRequest } from "@/app/utils/apiService";
import { PATHS } from "@/app/utils/apiConstants";
import { AxiosResponse } from "axios";
import useProjectServices from "@/app/services/useProjectServices";

type Props = {
  projectId: number;
  openInvitationModal: boolean;
  handleClose: () => void;
};

const InvitationBox = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const { users, handleUsers, fetchUsersToInvite } = useProjectServices();
  const [invitedUsers, setInvitedUser] = useState<number[]>([]);
  const apiRequest = useApiRequest();
  const handleInvite = ({
    userId,
    projectId,
  }: {
    userId: number;
    projectId: number;
  }) => {
    apiRequest({
      path: PATHS.INVITE_TO_PROJECT,
      method: "POST",
      data: JSON.stringify({ userId, projectId: Number(projectId) }),
    }).then((response: AxiosResponse) => {
      setInvitedUser([...invitedUsers, userId]);
    });
  };

  const closePopOver = () => {
    setInvitedUser([]);
    setSearchText("");
    handleUsers([]);
    props.handleClose();
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
          fetchUsersToInvite({
            searchKey: e.target.value,
            limit: 10,
            projectId: Number(props.projectId),
          });
        }}
      />
      <div className="w-[300px] flex flex-col gap-2 h-[300px] overflow-auto">
        {users.map((user) => {
          const alreadyInvitedUser =
            invitedUsers.includes(user?.id) || user?.invited;
          return (
            <div className="flex justify-between">
              <p>{user?.firstName + " " + user?.lastName}</p>
              <Button
                disabled={alreadyInvitedUser}
                onClick={() => {
                  handleInvite({
                    userId: user?.id,
                    projectId: props.projectId,
                  });
                }}
              >
                {alreadyInvitedUser ? "Sent" : "Send"}
              </Button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-4">
        <Button className="action-button-active w-min" onClick={closePopOver}>
          Cancel
        </Button>
        <Button className="action-button-active w-min" onClick={closePopOver}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default InvitationBox;
