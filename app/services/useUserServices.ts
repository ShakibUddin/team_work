import { useState } from "react";
import { useApiRequest } from "../utils/apiService";
import { AxiosResponse } from "axios";
import { PATHS } from "../utils/apiConstants";
import { IDeveloper } from "../(protected)/projects/types";

const useUserServices = () => {
    const apiRequest = useApiRequest();
    const [users, setUsers] = useState<IDeveloper[]>([]);

    const fetchAllUsers = ({ searchKey = "", limit = 10 }: { searchKey?: string, limit?: number }) => {
        apiRequest({
            path: PATHS.ALL_USERS,
            method: "GET",
            params: { searchKey, limit },
        }).then((response: AxiosResponse) => {
            setUsers(response?.data);
        });
    };

    const handleUsers = (value: IDeveloper[]) => {
        setUsers(value)
    }
    return { users, handleUsers, fetchAllUsers }
}

export default useUserServices