export interface IDeveloper {
    id: number;
    firstName: string;
    lastName: string;
    avatar?: string;
}

export interface IProject {
    id: number,
    title: string,
    description: string,
    ownerId?: string,
    statusId: number | undefined,
    statusColor?: string,
    taskCount?: string,
    createdAt?: string,
    updatedAt?: string
}

export interface ITask {
    id: number | undefined;
    title: string | undefined;
    description: string | undefined;
    dueDate: string | null;
    projectId: number | undefined;
    statusId: number | undefined;
    priorityId: number | undefined;
    status?: string | undefined;
    statusColor?: string | undefined;
    developers?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
}

export interface IProjectStatus {
    id: number,
    title: string,
    color: string,
    createdAt: string,
    updatedAt: string
}

export interface ITaskByStatus {
    [key: number]: ITask[];
}
export interface ITaskStatus extends IProjectStatus { }
export interface ITaskPriority extends IProjectStatus { }