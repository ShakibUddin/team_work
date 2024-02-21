export const BASE_URL = process.env.base;
export const REQUEST_TIMEOUT = 5000;
export const PATHS = {
    SIGNUP: "user/register",
    SIGNIN: "user/login",
    ALL_PROJECTS: "project/all",
    PROJECTS_BY_OWNER: "project/details",
    PROJECT_STATUS: "project/status/all",
    TASK_STATUS: "task/status/all",
    TAKS_PRIORITY: "task/priorities/all",
    LOGOUT: "user/logout",
    TASKS_IN_A_PROJECT: "task/project",
    ALL_USERS: "user/all/users",
    CREATE_TASK: "task/create",
    UPDATE_TASK: "task/update",
    CREATE_PROJECT: "project/create",
    UPDATE_PROJECT: "project/update",
    COMMENTS: "task/comment",
    ADD_COMMENT: "task/comment/add",
    INVITE_TO_PROJECT: "project/invite",
    SEARCH_USERS_TO_INVITE: "project/search/dev",
};