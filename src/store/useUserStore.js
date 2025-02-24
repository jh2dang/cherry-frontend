import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoggedIn: false,

        login: (name, email) =>
          set({ user: { name, email }, isLoggedIn: true }, false, 'user/login'),

        logout: () =>
          set({ user: null, isLoggedIn: false }, false, 'user/logout'),
      }),
      { name: 'userStore' }
    ),
    { name: 'User Store' }
  )
);

export default useUserStore;
