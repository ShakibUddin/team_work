import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AuthState, IUser } from './authStoreTypes';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const useAuthStore = create<AuthState>()(persist(
  (set) => {
    return {
      currentUser: {},
      loggedIn: false,
      setUser: (loggedUser: IUser) => set(() => ({ currentUser: loggedUser })),
      setLoggedIn: (loggedIn: boolean) => set(() => {
        return { loggedIn }
      }),
    }
  },
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
  }
));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('AuthStore', useAuthStore);
}

export default useAuthStore;
