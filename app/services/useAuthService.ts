import { AuthState } from "@/store/authStore/authStoreTypes";
import { ILOGIN_UNAUTHENTICATED_USER } from "../(auth)/signin/types";
import { ISIGNUP_UNAUTHENTICATED_USER } from "../(auth)/signup/types";
import useAuthStore from "@/store/authStore/useAuthStore";
import { useRouter } from "next/navigation";
import { useApiRequest } from "../utils/apiService";
import { PATHS } from "../utils/apiConstants";
import { AxiosResponse } from "axios";

const useAuthServices = () => {
    const setLoggedIn = useAuthStore((state: AuthState) => state.setLoggedIn);
    const router = useRouter();
    const apiRequest = useApiRequest();

    const loginUser = async (values: ILOGIN_UNAUTHENTICATED_USER) => {
        return await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
    }

    const createUser = async (values: ISIGNUP_UNAUTHENTICATED_USER) => {
        return await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
    }

    const logoutUser = (id: number) => {
        apiRequest({
            path: PATHS.LOGOUT,
            method: "GET",
            params: { id },
        }).then((response: AxiosResponse) => {
            setLoggedIn(false);
            router.push("/signin");
        });
    };

    return { loginUser, createUser, logoutUser }
}

export default useAuthServices