"use client";
import {
  IDeveloper,
  IProject,
  ITask,
  ITaskStatus,
} from "@/app/(protected)/projects/types";
import { PATHS } from "@/app/utils/apiConstants";
import { useApiRequest } from "@/app/utils/apiService";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import InputField from "../shared/InputField";
import { useFormik } from "formik";
import * as yup from "yup";
import SelectField from "../shared/selectField";
import TextAreaField from "../shared/textAreaField";
import { Button } from "antd";
import AutoCompleteField from "../shared/autoCompleteField";
import DevCard from "./devCard";

type Props = {
  handleClose: () => void;
  projectId: string;
  taskStatusId: number | undefined;
  handleReload: () => void;
  update: boolean;
  task: ITask | undefined;
};

const CreateTaskForm = (props: Props) => {
  const { loggedInUser } = useAuthStore((state: AuthState) => state);
  const apiRequest = useApiRequest();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [taskStatus, setTaskStatus] = useState<ITaskStatus[]>([]);
  const [users, setUsers] = useState<IDeveloper[]>([]);
  const [developerName, setDeveloperName] = useState("");
  const fetchAllProjects = (token: string) => {
    apiRequest({
      path: PATHS.PROJECTS_BY_OWNER,
      method: "GET",
      token,
      params: { ownerId: loggedInUser?.id },
    }).then((response: AxiosResponse) => {
      setProjects(response?.data);
    });
  };

  const fetchAllTaskStatus = (token: string) => {
    apiRequest({ path: PATHS.TASK_STATUS, method: "GET", token }).then(
      (response: AxiosResponse) => {
        setTaskStatus(response?.data);
      }
    );
  };

  const fetchAllUsers = (token: string, searchKey?: string) => {
    apiRequest({
      path: PATHS.ALL_USERS,
      method: "GET",
      token,
      params: { searchKey },
    }).then((response: AxiosResponse) => {
      setUsers(response?.data);
    });
  };

  const validationSchema = yup.object({
    title: yup
      .string()
      .required("Title is required.")
      .min(10, "Title must be at least 10 characters long.")
      .max(100, "Title must be no more than 100 characters long."),
    description: yup
      .string()
      .required("Description is required.")
      .min(10, "Description must be at least 10 characters long.")
      .max(1000, "Description must be no more than 1000 characters long."),
    projectId: yup.number().required("Project is required."),
    statusId: yup.string().required("Status is required"),
  });

  const initialValues: ITask = {
    id: props.task?.id || undefined,
    title: props.task?.title || "",
    description: props.task?.description || "",
    projectId: props.task?.projectId || parseInt(props.projectId) || undefined,
    statusId: props.task?.statusId || props.taskStatusId || undefined,
    developers: props.task?.developers || "",
  };

  const createTask = (values: any) => {
    apiRequest({
      path: props.update
        ? PATHS.UPDATE_TASK + "?id=" + props.task?.id
        : PATHS.CREATE_TASK,
      method: props.update ? "PUT" : "POST",
      token: loggedInUser?.token,
      data: JSON.stringify({
        ...values,
        developers: props.update
          ? values.developers
          : JSON.parse(values.developers),
      }),
    }).then((response: any) => {
      if (!response?.error) {
        formik.resetForm();
        setDeveloperName("");
        props.handleReload();
        props.handleClose();
      }
    });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: createTask,
  });

  const handleDeleteDev = (id: number) => {
    formik.setFieldValue(
      "developers",
      JSON.stringify(
        JSON.parse(formik.values.developers || "[]").filter(
          (dev: IDeveloper) => dev.id !== id
        )
      )
    );
  };

  useEffect(() => {
    if (loggedInUser?.token) {
      fetchAllProjects(loggedInUser.token);
      fetchAllTaskStatus(loggedInUser.token);
      fetchAllUsers(loggedInUser.token);
    }
  }, [loggedInUser]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <InputField
        title="Title"
        value={formik.values.title}
        required
        maxLength={100}
        showCount
        onChange={formik.handleChange("title")}
        onBlur={formik.handleBlur("title")}
        placeholder="Enter title"
        error={!!(formik.errors.title && formik.touched.title)}
        errorMessage={formik.errors.title}
      />
      <TextAreaField
        title="Description"
        required
        rows={10}
        maxLength={1000}
        showCount
        wrapperStyle={"w-full"}
        value={formik.values.description}
        onChange={formik.handleChange("description")}
        onBlur={formik.handleBlur("description")}
        placeholder="Enter description"
        error={!!(formik.errors.description && formik.touched.description)}
        errorMessage={formik.errors.description}
      />
      <div className="flex gap-4 justify-start">
        <SelectField
          title="Project"
          placeholder="Select project"
          required
          className="w-64"
          value={formik.values.projectId}
          options={projects.map((project: IProject) => ({
            label: project.title,
            value: project.id,
          }))}
          onChange={(value) => {
            formik.setFieldValue("projectId", value);
          }}
          disabled={!!props.projectId}
          onBlur={formik.handleBlur("projectId")}
          error={!!(formik.errors.projectId && formik.touched.projectId)}
          errorMessage={formik.errors.projectId}
        />
        <SelectField
          title="Status"
          placeholder="Select status"
          required
          className="w-64"
          value={formik.values.statusId}
          options={taskStatus.map((taskStatus: ITaskStatus) => ({
            label: taskStatus.title,
            value: taskStatus.id,
          }))}
          onChange={(value) => {
            formik.setFieldValue("statusId", value);
          }}
          disabled={!!props.taskStatusId}
          onBlur={formik.handleBlur("statusId")}
          error={!!(formik.errors.statusId && formik.touched.statusId)}
          errorMessage={formik.errors.statusId}
        />
      </div>
      <AutoCompleteField
        title="Developers"
        popupMatchSelectWidth={500}
        value={developerName}
        onChange={(value) => {
          setDeveloperName(String(value));
          fetchAllUsers(loggedInUser?.token || "", String(value));
        }}
        onSelect={(value: string | number, option: any) => {
          if (formik.values.developers) {
            if (
              !JSON.parse(formik.values.developers).find(
                (developer: IDeveloper) => developer.id === option.developer.id
              )
            ) {
              formik.setFieldValue(
                "developers",
                JSON.stringify([
                  ...JSON.parse(formik.values.developers),
                  option.developer,
                ])
              );
            }
          } else {
            formik.setFieldValue(
              "developers",
              JSON.stringify([option.developer])
            );
          }
          setDeveloperName("");
        }}
        options={users.map((user: IDeveloper) => ({
          label: user.firstName + " " + user.lastName,
          value: user.firstName + " " + user.lastName,
          developer: user,
        }))}
        size="large"
      />
      <div className="flex gap-4 justify-start flex-wrap">
        {formik.values.developers &&
          JSON.parse(formik.values.developers).map((developer: IDeveloper) => {
            return (
              <DevCard
                key={developer?.id}
                developer={developer}
                handleDeleteDev={handleDeleteDev}
              />
            );
          })}
      </div>
      <div className="flex gap-4 ml-auto my-4 w-fit">
        <Button className="action-button-active" onClick={handleSubmit}>
          {props.update ? "Update Task" : "Create Task"}
        </Button>
        <Button
          className="action-button-cancel"
          onClick={() => {
            formik.resetForm();
            setDeveloperName("");
            props.handleClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateTaskForm;
