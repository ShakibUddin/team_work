import { IUNAUTHENTICATED_USER } from "./types";

export const createUser = async (values: IUNAUTHENTICATED_USER) => {
    return await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
}