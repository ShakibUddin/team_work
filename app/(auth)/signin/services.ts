import { IUNAUTHENTICATED_USER } from "./types";

export const loginUser = async (values: IUNAUTHENTICATED_USER) => {
    return await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
}