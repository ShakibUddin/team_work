"use client";
import React, { useEffect, useState } from "react";
import { IProject, IProjectStatus } from "./types";
import ProjectCard from "@/app/component/project/projectCard";
import useAuthStore from "@/store/authStore/useAuthStore";
import { AuthState } from "@/store/authStore/authStoreTypes";
import { AxiosResponse } from "axios";
import { PATHS } from "@/app/utils/apiConstants";
import { useApiRequest } from "@/app/utils/apiService";
import { Breadcrumb, Button, Modal } from "antd";
import CreateProjectForm from "@/app/component/project/createProjectForm";
import CustomBreadCrumb from "@/app/component/shared/customBreadcrumb";

type Props = {};

const Projects = (props: Props) => {
  const { loggedInUser } = useAuthStore((state: AuthState) => state);
  const apiRequest = useApiRequest();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [showProjectCreationForm, setShowProjectCreationForm] = useState(false);
  const [updateProject, setUpdateProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    IProject | undefined
  >();
  const [projectStatus, setProjectStatus] = useState<IProjectStatus[]>([]);
  const [reload, setReload] = useState(false);

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

  const fetchAllProjectStatus = (token: string) => {
    apiRequest({ path: PATHS.PROJECT_STATUS, method: "GET", token }).then(
      (response: AxiosResponse) => {
        setProjectStatus(response?.data);
      }
    );
  };

  const openCreateProjectForm = () => {
    setShowProjectCreationForm(true);
  };

  const handleCloseCreateProjectModal = () => {
    setShowProjectCreationForm(false);
    setUpdateProject(false);
    setSelectedProject(undefined);
  };

  const handleOnEditButtonClick = (project: IProject) => {
    setSelectedProject(project);
    setUpdateProject(true);
    setShowProjectCreationForm(true);
  };

  const handleReload = () => {
    setReload(true);
  };

  useEffect(() => {
    if (loggedInUser?.token) {
      fetchAllProjectStatus(loggedInUser?.token);
      fetchAllProjects(loggedInUser?.token);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (reload && loggedInUser?.token) {
      fetchAllProjects(loggedInUser?.token);
      setReload(false);
    }
  }, [reload, loggedInUser]);

  return (
    <div className="flex flex-col">
      <CustomBreadCrumb
        items={[
          {
            title: "Projects",
          },
        ]}
      />
      <Button
        className="ml-auto action-button-active"
        onClick={openCreateProjectForm}
      >
        Create
      </Button>
      <div className="flex flex-wrap gap-4 w-full">
        {projects.map((project: IProject, index: number) => {
          const statusOfThisProject = projectStatus.filter(
            (status) => status.id === project.statusId
          )[0];
          console.log("statusOfThisProject", statusOfThisProject);
          return (
            <ProjectCard
              id={project.id}
              key={index}
              title={project.title}
              description={project.description}
              taskCount={project.taskCount}
              status={statusOfThisProject?.title}
              statusId={project?.statusId}
              statusColor={statusOfThisProject?.color}
              handleOnClick={handleOnEditButtonClick}
            />
          );
        })}
      </div>
      <Modal
        title={updateProject ? "Update Task" : "Create Task"}
        open={showProjectCreationForm}
        footer={null}
        width={800}
        onCancel={handleCloseCreateProjectModal}
        centered
      >
        <CreateProjectForm
          update={updateProject}
          project={selectedProject}
          handleClose={handleCloseCreateProjectModal}
          handleReload={handleReload}
        />
      </Modal>
    </div>
  );
};

export default Projects;
