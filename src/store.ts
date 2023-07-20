import { create } from "zustand";

export type UserType = {
  name: string;
  email: string;
  phone: string;
  agent: number;
  isFirstVisit?: boolean;
};
export const useAppStore = create((set) => ({
  user: {
    name: "",
    email: "",
    phone: "",
    agent: 1,
  },

  updateUserData: () => set((state: { user: UserType }) => ({ user: state })),
  userOnboardStep: 0,
  setUserOnboardStep: (step: number) => set({ userOnboardStep: step }),
  isDataFetching: false,
  setIsDataFetching: (isFetching: boolean) => set({ isDataFetching: isFetching }),
  updateAgent: () =>
    set((state: { user: UserType }) => ({ user: { ...state.user, agent: state.user.agent === 1 ? 2 : 1 } })),
}));
