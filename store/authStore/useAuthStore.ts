import { create } from 'zustand'
import { AuthState, IUser } from './authStoreTypes';
import { mountStoreDevtool } from 'simple-zustand-devtools';


const useAuthStore = create<AuthState>((set) => ({
  currentUser: {},
  loggedIn: false,
  setUser: (loggedUser: IUser) => set(() => ({ currentUser: loggedUser })),
  setLoggedIn: (loggedIn: boolean) => set(() => {
    console.log("loggedIn ------------------------------------", loggedIn)
    return { loggedIn }
  }),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('AuthStore', useAuthStore);
}

export default useAuthStore;