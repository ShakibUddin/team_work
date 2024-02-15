import axios, { Method } from 'axios';
import { BASE_URL } from './apiConstants';
import useAuthStore from '@/store/authStore/useAuthStore';
import { AuthState } from '@/store/authStore/authStoreTypes';

interface ApiRequestConfig {
    method: Method;
    path: string;
    params?: object;
    token?: string;
    data?: any;
}

export const useApiRequest = () => {
    const { setLoggedIn, setLoggedInUser } = useAuthStore((state: AuthState) => state);
    const { loggedInUser } = useAuthStore((state: AuthState) => state);

    const apiRequest = async (config: ApiRequestConfig) => {
        const { method, path, data, token, params } = config;

        // Default headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + loggedInUser?.token,
        };

        try {
            const response = await axios({
                method,
                url: BASE_URL + path,
                data,
                headers,
                params
            });
            return response.data;
        } catch (error: any) {
            // Handle error
            if (error.response) {
                if (error.response.status === 401) {
                    setLoggedIn(false);
                    setLoggedInUser(null);
                    window.location.href = '/signin';
                }
            } else if (error.request) {
                console.log("request error", error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log("config error", error.config);

            throw error; // Re-throw the error so it can be caught and handled upstream
        }
    }

    return apiRequest;
}
