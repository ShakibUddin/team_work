import { useState } from "react";
import { useApiRequest } from "../utils/apiService";
import { AxiosResponse } from "axios";
import { PATHS } from "../utils/apiConstants";
import { IDeveloper } from "../(protected)/projects/types";

const useUserServices = () => {
    const apiRequest = useApiRequest();
    const [users, setUsers] = useState<IDeveloper[]>([]);

    const fetchAllUsers = (token: string, searchKey?: string) => {
        apiRequest({
            path: PATHS.ALL_USERS,
            method: "GET",
            token,
            params: { searchKey },
        }).then((response: AxiosResponse) => {
            setUsers(response?.data);
        });
    };

    return { users, fetchAllUsers }
}

export default useUserServices