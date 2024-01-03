"use client";
import TaskCard from "@/app/component/project/taskCard";
import { PATHS } from "@/app/utils/apiConstants";
import { useApiRequest } from "@/app/utils/apiService";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { AxiosResponse } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { ITask, ITaskByStatus, ITaskStatus } from "../types";
import { stat } from "fs";

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

  const convertTasks = (tasks: ITask[], taskStatus: ITaskStatus[]) => {
    const result: ITaskByStatus = {};
    taskStatus.forEach((status: ITaskStatus) => {
      result[status.id] = tasks.filter(
        (task: ITask) => task.statusId === status.id
      );
    });
    return result;
  };
  const modifiedTasks = useMemo(() => {
    return convertTasks(tasks, taskStatus);
  }, [tasks, taskStatus]);

  return (
    // <div className="flex gap-4 flex-wrap">
    // {tasks.map((task: ITask) => {
    //   const statusOfThisTask = taskStatus.filter(
    //     (status) => status.id === task.statusId
    //   )[0];
    // return (
    //   <TaskCard
    //     key={task.id}
    //     id={task.id}
    //     title={task.title}
    //     description={task.description}
    //     projectId={task.projectId}
    //     status={statusOfThisTask?.title}
    //     statusColor={statusOfThisTask?.color}
    //   />
    // );
    // })}
    // </div>
    <div className="flex gap-4">
      {taskStatus.map((status: ITaskStatus) => {
        return (
          <div
            key={status.id}
            className="grow flex flex-col gap-4 p-4 border-2 shadow-md rounded-md h-[calc(100vh-120px)] overflow-y-auto"
          >
            <p
              className={`text-lg font-bold uppercase text-center text-${status.color}`}
            >
              {status.title}
            </p>
            {modifiedTasks[status.id].map((task: ITask) => {
              return (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  projectId={task.projectId}
                  status={status?.title}
                  statusId={status?.id}
                  statusColor={status?.color}
                  developers={task.developers}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
