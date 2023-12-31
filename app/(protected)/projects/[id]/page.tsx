"use client";
import TaskCard from "@/app/component/project/taskCard";
import { PATHS } from "@/app/utils/apiConstants";
import { useApiRequest } from "@/app/utils/apiService";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { ITask, ITaskStatus } from "../types";

// type Props = {};

const Page = ({ params }: { params: { id: number } }) => {
  const { loggedInUser } = useAuthStore((state: AuthState) => state);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskStatus, setTaskStatus] = useState<ITaskStatus[]>([]);
  const apiRequest = useApiRequest();

  const fetchTasksByProjectId = (token: string) => {
    apiRequest({
      path: PATHS.TASKS_IN_A_PROJECT,
      method: "GET",
      token,
      params: { projectId: params?.id },
    }).then((response: AxiosResponse) => {
      setTasks(response?.data);
    });
  };

  const fetchAllTaskStatus = (token: string) => {
    apiRequest({ path: PATHS.TASK_STATUS, method: "GET", token }).then(
      (response: AxiosResponse) => {
        setTaskStatus(response?.data);
      }
    );
  };

  useEffect(() => {
    if (loggedInUser?.token && params?.id) {
      fetchTasksByProjectId(loggedInUser?.token);
      fetchAllTaskStatus(loggedInUser?.token);
    }
  }, [loggedInUser, params?.id]);

  return (
    <div className="flex gap-4 flex-wrap">
      {tasks.map((task: ITask) => {
        const statusOfThisTask = taskStatus.filter(
          (status) => status.id === task.statusId
        )[0];
        return (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            projectId={task.projectId}
            status={statusOfThisTask?.title}
            statusColor={statusOfThisTask?.color}
          />
        );
      })}
    </div>
  );
};

export default Page;
