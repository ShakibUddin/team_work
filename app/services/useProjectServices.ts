import { useState } from "react";
import { useApiRequest } from "../utils/apiService";
import { AxiosResponse } from "axios";
import { PATHS } from "../utils/apiConstants";
import { IProject, IProjectStatus } from "../(protected)/projects/types";

const useProjectServices = () => {
    const apiRequest = useApiRequest();
    const [projects, setProjects] = useState<IProject[]>([]);
    const [projectStatus, setProjectStatus] = useState<IProjectStatus[]>([]);

    const fetchAllProjects = ({ ownerId }: { ownerId: number }) => {
        apiRequest({
            path: PATHS.PROJECTS_BY_OWNER,
            method: "GET",
            params: { ownerId },
        }).then((response: AxiosResponse) => {
            setProjects(response?.data);
        });
    };

    const fetchAllProjectStatus = () => {
        apiRequest({ path: PATHS.PROJECT_STATUS, method: "GET" }).then(
            (response: AxiosResponse) => {
                setProjectStatus(response?.data);
            }
        );
    };

    const createProject = ({ props, values, handleOnSuccess }: { props: any, values: any, handleOnSuccess: () => void }) => {
        const payload = { ...values };
        if (!props.update) {
            delete payload.id;
        }
        apiRequest({
            path: props.update
                ? PATHS.UPDATE_PROJECT + "?id=" + props.project?.id
                : PATHS.CREATE_PROJECT,
            method: props.update ? "PUT" : "POST",
            data: JSON.stringify(payload),
        }).then((response: any) => {
            if (!response?.error) {
                handleOnSuccess()
                props.handleReload();
                props.handleClose();
            }
        });
    };

    return { projects, projectStatus, fetchAllProjects, fetchAllProjectStatus, createProject }
}

export default useProjectServices