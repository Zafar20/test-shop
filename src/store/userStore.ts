import { create } from "zustand";
import type { IUser } from "../types";
import { devtools } from "zustand/middleware";


interface IUserStore {
    user: null | IUser
    setUser: (data: IUser) => void
    logoutUser: () => void
}

export const userStore = create<IUserStore>()(devtools((set) => ({
    user: null,
    setUser: (data) => set({ user: data }),
    logoutUser: () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }
})))