import { FoodFilter, OrderByType } from '@/interfaces/food-filter'
import { create } from 'zustand'


interface FilterState {
  setFilter: (mode: FoodFilter) => void
  setOrderBy: (mode: OrderByType) => void
  filter: FoodFilter
  orderBy: OrderByType
  reset: () => void
}

export const useFilter = create<FilterState>()(
  (set) => ({
    filter: 'all',
    stars: 0,
    orderBy: 'best',
    setFilter(filter) {
      set({
        filter,
      })
    },
    setOrderBy(mode) {
      set({
        orderBy: mode,
      })
    },
    reset() {
      set({
        filter: 'all',
      })
    },
  }),
)
