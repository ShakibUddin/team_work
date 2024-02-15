import { useState } from "react";
import { IComment, ITask, ITaskPriority, ITaskStatus } from "../(protected)/projects/types";
import { useApiRequest } from "../utils/apiService";
import { AxiosResponse } from "axios";
import { PATHS } from "../utils/apiConstants";

const useTaskServices = () => {
    const apiRequest = useApiRequest();

    const [tasks, setTasks] = useState<ITask[]>([]);
    const [taskPriorities, setTaskPriorities] = useState<ITaskPriority[]>([]);
    const [taskStatus, setTaskStatus] = useState<ITaskStatus[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);

    const fetchTasksByProjectId = (params: any) => {
        apiRequest({
            path: PATHS.TASKS_IN_A_PROJECT,
            method: "GET",
            params: { projectId: params?.id },
        }).then((response: AxiosResponse) => {
            setTasks(response?.data);
        });
    };

    const fetchAllTaskPriorities = () => {
        apiRequest({ path: PATHS.TAKS_PRIORITY, method: "GET" }).then(
            (response: AxiosResponse) => {
                setTaskPriorities(response?.data);
            }
        );
    };

    const fetchAllTaskStatus = () => {
        apiRequest({ path: PATHS.TASK_STATUS, method: "GET" }).then(
            (response: AxiosResponse) => {
                setTaskStatus(response?.data);
            }
        );
    };

    const createTask = ({ bulkCreate, values, props, handleOnSuccess }: { bulkCreate: boolean, values: any, props: any, handleOnSuccess: () => void }) => {
        const payload = { ...values };
        if (bulkCreate) {
            delete payload.title;
        } else {
            delete payload.taskTitles;
        }
        apiRequest({
            path: props.update
                ? PATHS.UPDATE_TASK + "?id=" + props.task?.id
                : PATHS.CREATE_TASK,
            method: props.update ? "PUT" : "POST",
            data: JSON.stringify({
                ...payload,
                bulkCreate,
                developers: props.update
                    ? payload.developers
                    : JSON.parse(payload.developers),
            }),
        }).then((response: any) => {
            if (!response?.error) {
                handleOnSuccess()
                props.handleReload();
                props.handleClose();
            }
        });
    };

    const addComment = ({ comment, userId, taskId, handleOnSuccess }: { comment: string, userId: number, taskId: number, handleOnSuccess: () => void }) => {
        apiRequest({
            path: PATHS.ADD_COMMENT,
            method: "POST",
            data: JSON.stringify({
                comment,
                userId,
                taskId
            }),
        }).then((response: any) => {
            if (!response?.error) {
                handleOnSuccess();
            }
        });
    };

    const fetchAllComments = ({ taskId }: { taskId: number }) => {
        apiRequest({ path: PATHS.COMMENTS, method: "GET", params: { taskId } }).then(
            (response: AxiosResponse) => {
                setComments(response?.data);
            }
        );
    };

    const resetComments = () => {
        setComments([])
    }

    return { tasks, taskPriorities, taskStatus, comments, fetchAllTaskStatus, fetchAllTaskPriorities, fetchTasksByProjectId, createTask, fetchAllComments, addComment, resetComments }
}

export default useTaskServices