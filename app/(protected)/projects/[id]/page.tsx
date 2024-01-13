"use client";
import TaskCard from "@/app/component/project/taskCard";
import { PATHS } from "@/app/utils/apiConstants";
import { useApiRequest } from "@/app/utils/apiService";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { AxiosResponse } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { ITask, ITaskByStatus, ITaskStatus } from "../types";
import { MdAdd } from "react-icons/md";
import { Modal } from "antd";
import CreateTaskForm from "@/app/component/project/createTaskForm";

// type Props = {};

const Page = ({ params }: { params: { id: number } }) => {
  const { loggedInUser } = useAuthStore((state: AuthState) => state);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>();
  const [taskStatus, setTaskStatus] = useState<ITaskStatus[]>([]);
  const [openTaskCreatingModal, setOpenTaskCreationModal] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedTaskStatusId, setSelectedTaskStatusId] = useState<number>();
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

  const handleReload = () => {
    setReload(true);
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

  const handleShowCreateTaskModal = () => {
    setOpenTaskCreationModal(true);
  };

  const handleCloseCreateTaskModal = () => {
    setOpenTaskCreationModal(false);
    setUpdateTask(false);
    setSelectedTask(undefined);
  };

  const handleOpenTaskForm = (task: ITask) => {
    setOpenTaskCreationModal(true);
    setUpdateTask(true);
    setSelectedTask(task);
  };

  useEffect(() => {
    if (reload && loggedInUser?.token) {
      fetchTasksByProjectId(loggedInUser?.token);
      setReload(false);
    }
  }, [reload, loggedInUser]);

  return (
    <div className="flex gap-4">
      {taskStatus.map((status: ITaskStatus) => {
        return (
          <div
            key={status.id}
            className="grow flex flex-col gap-4 p-4 border-2 shadow-md rounded-md h-[calc(100vh-120px)] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xl font-bold uppercase text-${status.color}`}
              >
                {status.title}
              </span>
              <MdAdd
                size={20}
                onClick={() => {
                  setSelectedTaskStatusId(status.id);
                  handleShowCreateTaskModal();
                }}
                className="h-8 w-8 hover:bg-[var(--brand-color)] hover:text-white cursor-pointer rounded-full"
              />
            </div>

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
                  onClick={() => {
                    handleOpenTaskForm(task);
                  }}
                />
              );
            })}
          </div>
        );
      })}
      <Modal
        title={updateTask ? "Update Task" : "Create Task"}
        open={openTaskCreatingModal}
        footer={null}
        width={800}
        onCancel={handleCloseCreateTaskModal}
        centered
      >
        <CreateTaskForm
          update={updateTask}
          task={selectedTask}
          handleClose={handleCloseCreateTaskModal}
          projectId={String(params?.id)}
          taskStatusId={selectedTaskStatusId}
          handleReload={handleReload}
        />
      </Modal>
    </div>
  );
};

export default Page;
