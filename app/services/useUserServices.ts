import { useState } from "react";
import { useApiRequest } from "../utils/apiService";
import { AxiosResponse } from "axios";
import { PATHS } from "../utils/apiConstants";
import { IDeveloper } from "../(protected)/projects/types";

const useUserServices = () => {
    const apiRequest = useApiRequest();
    const [users, setUsers] = useState<IDeveloper[]>([]);

    const fetchAllUsers = ({ searchKey, limit }: { searchKey?: string, limit?: number }) => {
        apiRequest({
            path: PATHS.ALL_USERS,
            method: "GET",
            params: { searchKey, limit },
        }).then((response: AxiosResponse) => {
            setUsers(response?.data);
        });
    };

    return { users, fetchAllUsers }
}

export default useUserServices