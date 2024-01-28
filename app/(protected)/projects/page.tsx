"use client";
import React, { useEffect, useState } from "react";
import { IProject } from "./types";
import ProjectCard from "@/app/component/project/projectCard";
import useAuthStore from "@/store/authStore/useAuthStore";
import { AuthState } from "@/store/authStore/authStoreTypes";
import { Button, Modal } from "antd";
import CreateProjectForm from "@/app/component/project/createProjectForm";
import CustomBreadCrumb from "@/app/component/shared/customBreadcrumb";
import useProjectServices from "@/app/services/useProjectServices";

type Props = {};

const Projects = (props: Props) => {
  const { loggedInUser } = useAuthStore((state: AuthState) => state);
  const [showProjectCreationForm, setShowProjectCreationForm] = useState(false);
  const [updateProject, setUpdateProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    IProject | undefined
  >();
  const [reload, setReload] = useState(false);
  const { projects, projectStatus, fetchAllProjects, fetchAllProjectStatus } =
    useProjectServices();

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
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
    if (loggedInUser?.token) {
      fetchAllProjects({
        ownerId: loggedInUser?.id,
        token: loggedInUser?.token,
      });
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
