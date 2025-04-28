import { create } from 'zustand'


interface SheetState {
  setOpen: (mode: boolean) => void
  isOpened: boolean
}

export const useSheet = create<SheetState>()(
  (set) => ({
    isOpened: false,
    setOpen(mode) {
      set({
        isOpened: mode,
      })
    },
  }),
)
