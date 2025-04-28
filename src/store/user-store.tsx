import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface UserState {
  email: string
  setEmail: (email: string) => void
  reset: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        email: '',
        setEmail: (email) => set({ email }),
        reset: () => set({ email: '' }),
      }),
      { name: 'user-store' },
    ),
  ),
)
