export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    token: string
}

export interface AuthState {
    currentUser: IUser | object;
    loggedIn: boolean;
    setUser: (loggedUser: IUser) => void;
    setLoggedIn: (loggedIn: boolean) => void;
}