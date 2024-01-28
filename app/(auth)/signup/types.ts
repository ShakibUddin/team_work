export interface IUSER {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface ISIGNUP_RESPONSE {
    error: boolean,
    message: string,
    data: null
}

export interface ISIGNUP_UNAUTHENTICATED_USER extends IUSER {
    confirmPassword: string
}