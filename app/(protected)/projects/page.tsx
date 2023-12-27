"use client";
// import { AuthState } from "@/store/authStore/authStoreTypes";
// import useAuthStore from "@/store/authStore/useAuthStore";
import React, { useEffect, useState } from "react";
import { IProject, IProjectStatus } from "./types";
import ProjectCard from "@/app/component/project/projectCard";
import useAuthStore from "@/store/authStore/useAuthStore";
import { AuthState } from "@/store/authStore/authStoreTypes";
import { AxiosResponse } from "axios";
import { PATHS } from "@/app/utils/apiConstants";
import { useApiRequest } from "@/app/utils/apiService";

type Props = {};

const Projects = (props: Props) => {
  const { loggedInUser } = useAuthStore((state: AuthState) => state);
  const apiRequest = useApiRequest();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectStatus, setProjectStatus] = useState<IProjectStatus[]>([]);

  const fetchAllProjects = (token: string) => {
    apiRequest({
      path: PATHS.ALL_PROJECTS,
      method: "GET",
      token,
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

  useEffect(() => {
    if (loggedInUser?.token) {
      fetchAllProjectStatus(loggedInUser?.token);
      fetchAllProjects(loggedInUser?.token);
    }
  }, [loggedInUser]);

  return (
    <div className="flex gap-4 flex-wrap">
      {projects.map((project: IProject, index: number) => {
        const statusOfThisProject = projectStatus.filter(
          (status) => status.id === project.status
        )[0];
        return (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            taskCount={project.taskCount}
            status={statusOfThisProject.title}
            statusColor={statusOfThisProject.color}
          />
        );
      })}
    </div>
  );
};

export default Projects;
