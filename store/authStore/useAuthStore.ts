import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, ILOGIN_RESPONSE, IUSER } from './authStoreTypes';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const authPersist: StateCreator<AuthState, [["zustand/persist", unknown]]> = (set) => ({
  loggedInUser: null,
  loginResponse: null,
  loggedIn: false,
  registrationSuccessful: false,
  setLoggedInUser: (loggedUser: IUSER | null) => set(() => ({ loggedInUser: loggedUser })),
  setRegistrationSuccessful: (registrationSuccessful: boolean) => set(() => ({ registrationSuccessful })),
  setLoginResponse: (loginResponse: ILOGIN_RESPONSE | null) => set(() => ({ loginResponse })),
  setLoggedIn: (loggedIn: boolean) => set(() => ({ loggedIn })),
});

const useAuthStore = create<AuthState>()(
  persist(authPersist, {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
  })
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('AuthStore', useAuthStore);
}

export default useAuthStore;
