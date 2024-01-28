"use client";
import { IProject, IProjectStatus } from "@/app/(protected)/projects/types";
import { AuthState } from "@/store/authStore/authStoreTypes";
import useAuthStore from "@/store/authStore/useAuthStore";
import React, { useEffect } from "react";
import InputField from "../shared/InputField";
import { useFormik } from "formik";
import * as yup from "yup";
import TextAreaField from "../shared/textAreaField";
import { Button } from "antd";
import SelectField from "../shared/selectField";
import useProjectServices from "@/app/services/useProjectServices";

type Props = {
  handleClose: () => void;
  handleReload: () => void;
  update: boolean;
  project: IProject | undefined;
};

const CreateProjectForm = (props: Props) => {
  const { loggedInUser } = useAuthStore((state: AuthState) => state);
  const { projectStatus, fetchAllProjectStatus, createProject } =
    useProjectServices();
  const validationSchema = yup.object({
    title: yup
      .string()
      .required("Title is required.")
      .min(5, "Title must be at least 5 characters long.")
      .max(20, "Title must be no more than 20 characters long."),
    description: yup
      .string()
      .required("Description is required.")
      .min(10, "Description must be at least 10 characters long.")
      .max(1000, "Description must be no more than 1000 characters long."),
    statusId: yup.number().required("Project status is required."),
  });

  const initialValues: IProject = {
    id: props?.project?.id || 0,
    ownerId: props?.project?.ownerId || String(loggedInUser?.id) || "",
    title: props.project?.title || "",
    description: props.project?.description || "",
    statusId: props.project?.statusId || 1,
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
      createProject({
        props,
        values,
        token: loggedInUser?.token || "",
        handleOnSuccess: () => {
          formik.resetForm();
        },
      });
    },
  });

  useEffect(() => {
    if (loggedInUser?.token) fetchAllProjectStatus(loggedInUser?.token);
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
      <SelectField
        title="Project"
        placeholder="Select project"
        required
        className="w-36"
        value={formik.values.statusId}
        options={projectStatus.map((projectStatus: IProjectStatus) => ({
          label: projectStatus.title,
          value: projectStatus.id,
        }))}
        onChange={(value) => {
          formik.setFieldValue("statusId", value);
        }}
        onBlur={formik.handleBlur("statusId")}
        error={!!(formik.errors.statusId && formik.touched.statusId)}
        errorMessage={formik.errors.statusId}
      />
      <div className="flex gap-4 ml-auto my-4 w-fit">
        <Button className="action-button-active" onClick={handleSubmit}>
          {props.update ? "Update Project" : "Create Project"}
        </Button>
        <Button
          className="action-button-cancel"
          onClick={() => {
            formik.resetForm();
            props.handleClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateProjectForm;
