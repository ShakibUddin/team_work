"use client";
import {
  IDeveloper,
  IProject,
  ITask,
  ITaskPriority,
  ITaskStatus,
} from "@/app/(protected)/projects/types";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import React, { useEffect, useState } from "react";
import InputField from "../../shared/InputField";
import { useFormik } from "formik";
import * as yup from "yup";
import SelectField from "../../shared/selectField";
import TextAreaField from "../../shared/textAreaField";
import { Button, Checkbox } from "antd";
import AutoCompleteField from "../../shared/autoCompleteField";
import DevCard from "../devCard";
import DatePickerField from "../../shared/datePickerField";
import dayjs from "dayjs";
import useTaskServices from "@/app/services/useTaskServices";
import useProjectServices from "@/app/services/useProjectServices";
import useUserServices from "@/app/services/useUserServices";
import TaskCommentSection from "../comment/taskCommentSection";

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
  const [developerName, setDeveloperName] = useState("");
  const [bulkCreate, setBulkCreate] = useState(false);
  const {
    taskPriorities,
    taskStatus,
    fetchAllTaskStatus,
    fetchAllTaskPriorities,
    createTask,
    resetComments,
  } = useTaskServices();
  const { projects, fetchAllProjects } = useProjectServices();
  const { users, fetchAllUsers } = useUserServices();

  const validationSchema = yup.object({
    title: yup
      .string()
      .when("bulkCreate", (bulkCreate, schema) =>
        bulkCreate
          ? schema
          : schema
              .required("Title is required.")
              .min(10, "Title must be at least 10 characters long.")
              .max(100, "Title must be no more than 100 characters long.")
      ),
    description: yup
      .string()
      .max(1000, "Description must be no more than 1000 characters long."),
    projectId: yup.number().required("Project is required."),
    statusId: yup.string().required("Status is required"),
    dueDate: yup.string().nullable(),
    priorityId: yup.number(),
    taskTitles: yup.string().when("bulkCreate", (bulkCreate, schema) => {
      return bulkCreate[0]
        ? schema
            .required("Please insert tasks")
            .min(10, "Minimum 10 characters are required")
            .max(1000, "Max character limit reacher")
        : schema;
    }),
  });

  const initialValues: ITask = {
    id: props.task?.id || undefined,
    title: props.task?.title || "",
    description: props.task?.description || "",
    projectId: props.task?.projectId || parseInt(props.projectId) || undefined,
    statusId: props.task?.statusId || props.taskStatusId || undefined,
    developers: props.task?.developers || "[]",
    dueDate: props.task?.dueDate || null,
    priorityId: props.task?.priorityId || 3,
    taskTitles: undefined,
    comments: [],
  };

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      createTask({
        bulkCreate,
        props,
        values,
        handleOnSuccess: () => {
          formik.resetForm();
          setDeveloperName("");
        },
      });
    },
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

  const enableBulkCreate = () => {
    setBulkCreate(!bulkCreate);
  };

  useEffect(() => {
    fetchAllProjects({
      ownerId: loggedInUser?.id || 0,
    });
    fetchAllTaskStatus();
    fetchAllUsers();
    fetchAllTaskPriorities();
  }, [loggedInUser]);

  useEffect(() => {
    if (!props?.task?.id) {
      resetComments();
    }
  }, [props?.task?.id]);

  return (
    <div className="flex flex-wrap lg:h-[calc(100vh-200px)] h-auto gap-4">
      <div
        className={`flex flex-col gap-4 items-start overflow-y-auto h-full shadow-md p-4 rounded-md ${
          props?.task?.id ? "lg:w-[49%] w-full" : "w-full"
        }`}
      >
        {bulkCreate ? (
          <div className="w-full flex-col">
            <TextAreaField
              title="Tasks"
              rows={10}
              maxLength={10000}
              showCount
              required
              wrapperStyle={"w-full"}
              value={formik.values.taskTitles}
              onChange={formik.handleChange("taskTitles")}
              onBlur={formik.handleBlur("taskTitles")}
              placeholder="Enter taskTitles"
              error={!!(formik.errors.taskTitles && formik.touched.taskTitles)}
              errorMessage={formik.errors.taskTitles}
            />
            <p className="text-red-500">
              N.B. Each line will be treated as on task title
            </p>
          </div>
        ) : (
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
        )}
        <TextAreaField
          title="Description"
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
        <div className="flex gap-4 flex-wrap justify-between">
          <SelectField
            title="Project"
            placeholder="Select project"
            required
            className="w-36"
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
            className="w-36"
            value={formik.values.statusId}
            options={taskStatus.map((taskStatus: ITaskStatus) => ({
              label: taskStatus.title,
              value: taskStatus.id,
            }))}
            onChange={(value) => {
              formik.setFieldValue("statusId", value);
            }}
            disabled={!!props.taskStatusId && !props.update}
            onBlur={formik.handleBlur("statusId")}
            error={!!(formik.errors.statusId && formik.touched.statusId)}
            errorMessage={formik.errors.statusId}
          />
          <SelectField
            title="Priority"
            placeholder="Select priority"
            className="w-36"
            value={formik.values.priorityId}
            options={taskPriorities.map((taskPriority: ITaskPriority) => ({
              label: taskPriority.title,
              value: taskPriority.id,
            }))}
            onChange={(value) => {
              formik.setFieldValue("priorityId", value);
            }}
            onBlur={formik.handleBlur("priorityId")}
          />
          <DatePickerField
            title="Due Date"
            allowClear
            className="w-36"
            value={formik.values.dueDate ? dayjs(formik.values.dueDate) : null}
            onChange={(date) => {
              formik.setFieldValue("dueDate", date);
            }}
            disabledDate={(current) => {
              return current && current <= dayjs().startOf("day");
            }}
          />
        </div>

        <AutoCompleteField
          title="Developers"
          popupMatchSelectWidth={500}
          value={developerName}
          onChange={(value) => {
            setDeveloperName(String(value));
            fetchAllUsers();
          }}
          onSelect={(value: string | number, option: any) => {
            if (formik.values.developers) {
              if (
                !JSON.parse(formik.values.developers).find(
                  (developer: IDeveloper) =>
                    developer.id === option.developer.id
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
            JSON.parse(formik.values.developers).map(
              (developer: IDeveloper) => {
                return (
                  <DevCard
                    key={developer?.id}
                    developer={developer}
                    handleDeleteDev={handleDeleteDev}
                  />
                );
              }
            )}
        </div>
        <div className="flex justify-between gap-4 ml-auto my-4 w-full items-center mt-auto">
          {!props.update ? (
            <Checkbox className="items-center" onChange={enableBulkCreate}>
              Create tasks in bulk
            </Checkbox>
          ) : (
            <></>
          )}
          <div className="flex gap-4 ml-auto">
            <Button className="action-button-active" onClick={handleSubmit}>
              {props.update
                ? "Update Task"
                : bulkCreate
                ? "Create Tasks"
                : "Create Task"}
            </Button>
            <Button
              className="action-button-cancel"
              onClick={() => {
                formik.resetForm();
                setDeveloperName("");
                setBulkCreate(false);
                resetComments();
                props.handleClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      {props?.task?.id ? (
        <TaskCommentSection
          taskId={props?.task?.id}
          wrapperStyle={`lg:w-[49%] w-full p-4 ${
            props?.task?.id ? "lg:w-[49%] w-full" : "w-0"
          }`}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateTaskForm;
