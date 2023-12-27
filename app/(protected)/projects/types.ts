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

export interface IProjectStatus {
    id: number,
    title: string,
    color: string,
    createdAt: string,
    updatedAt: string
}