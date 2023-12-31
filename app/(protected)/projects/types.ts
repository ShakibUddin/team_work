export interface IDeveloper {
    id: number;
    name: string;
    avatar?: string;
}

export interface IProject {
    id: number,
    title: string,
    description: string,
    status: number,
    statusColor: string,
    taskCount: string,
    createdAt: string,
    updatedAt: string
}

export interface ITask {
    id: number;
    title: string;
    description: string;
    projectId: string;
    status: string;
    statusColor?: string;
    assignedDevs?: IDeveloper[];
    createdAt?: string;
    updatedAt?: string;
}

export interface IProjectStatus {
    id: number,
    title: string,
    color: string,
    createdAt: string,
    updatedAt: string
}

export interface ITaskStatus extends IProjectStatus { }