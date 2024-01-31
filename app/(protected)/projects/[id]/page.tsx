"use client";
import TaskCard from "@/app/component/project/task/taskCard";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import React, { useEffect, useMemo, useState } from "react";
import { ITask, ITaskByStatus, ITaskPriority, ITaskStatus } from "../types";
import { MdAdd } from "react-icons/md";
import { Modal } from "antd";
import CreateTaskForm from "@/app/component/project/task/createTaskForm";
import CustomBreadCrumb from "@/app/component/shared/customBreadcrumb";
import Link from "next/link";
import useTaskServices from "@/app/services/useTaskServices";

const Page = ({ params }: { params: { id: number } }) => {
  const { loggedInUser } = useAuthStore((state: AuthState) => state);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>();
  const [openTaskCreatingModal, setOpenTaskCreationModal] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedTaskStatusId, setSelectedTaskStatusId] = useState<number>();

  const {
    tasks,
    taskPriorities,
    taskStatus,
    fetchAllTaskStatus,
    fetchAllTaskPriorities,
    fetchTasksByProjectId,
  } = useTaskServices();

  const handleReload = () => {
    setReload(true);
  };

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
    if (loggedInUser?.token) {
      fetchAllTaskPriorities(loggedInUser?.token);
      fetchAllTaskStatus(loggedInUser?.token);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
    if (loggedInUser?.token && params) {
      fetchTasksByProjectId(params, loggedInUser?.token);
    }
  }, [reload, loggedInUser, params]);

  return (
    <div className="flex flex-col gap-4">
      <CustomBreadCrumb
        items={[
          {
            title: <Link href={"/projects"}>Projects</Link>,
          },
          {
            title: "Tasks",
          },
        ]}
      />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {taskStatus.map((status: ITaskStatus) => {
          return (
            <div
              key={status.id}
              className="grow flex flex-col min-w-[300px] max-w-[500px] gap-4 border-t-4 p-4 shadow-md rounded-md h-[calc(100vh-160px)] overflow-y-auto "
              style={{
                borderColor: status?.color,
              }}
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
                const priorityOfThisProject = taskPriorities.filter(
                  (priority: ITaskPriority) => priority.id === task.priorityId
                )[0];
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
                    dueDate={task?.dueDate}
                    priorityId={task?.priorityId}
                    priorityColor={priorityOfThisProject?.color}
                    priority={priorityOfThisProject?.title}
                    onClick={() => {
                      handleOpenTaskForm(task);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <Modal
        title={updateTask ? "Update Task" : "Create Task"}
        open={openTaskCreatingModal}
        footer={null}
        width={1400}
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
