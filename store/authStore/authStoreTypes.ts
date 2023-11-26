export interface IUSER {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    token: string
    expiresIn: string,
    expirationTime: string
}

export interface ILOGIN_RESPONSE {
    error: boolean,
    message: string
}

export interface AuthState {
    loggedInUser: IUSER | null;
    loggedIn: boolean;
    registrationSuccessful: boolean;
    loginResponse: ILOGIN_RESPONSE | null;
    setLoggedInUser: (loggedUser: IUSER | null) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    setRegistrationSuccessful: (registrationSuccessful: boolean) => void;
    setLoginResponse: (loginResponseMessage: ILOGIN_RESPONSE | null) => void;
}