import { IUSER } from "@/store/authStore/authStoreTypes"

export interface IUNAUTHENTICATED_USER {
    email: string,
    password: string
}

export interface IAUTHENTICATED_USER_DATA {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    token: string,
    expirationTime: string
}

export interface ILOGIN_RESPONSE {
    error: boolean,
    message: string,
    data: IUSER | null
}