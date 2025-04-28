import { CartItem } from '@/interfaces/cart'
import { Product } from '@/interfaces/product'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface CartState {
  items: CartItem[]
  totalItems: number
  addItem: (item: Product) => void
  removeItem: (item: Product) => void
  totalValue: number
  reset: () => void
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        totalItems: 0,
        totalValue: 0,
        addItem(item) {
          const items = get().items
          const alreadyExists = items.find((i) => i.id === item.id)
      
          if (alreadyExists) {
            set((state) => ({
              items: items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              totalItems: state.totalItems + 1,
              totalValue: state.totalValue + item.value,
            }))
            return 
          } 
      
          set((state) => ({
            items: [...items, { ...item, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalValue: state.totalValue + item.value,
          }))
        },
        removeItem(selectedItem) {
          const items = get().items
          const onlyOne = items.find((i) => i.id === selectedItem.id)?.quantity === 1
      
          if (onlyOne) {
            set((state) => ({
              items: items.filter((item) => item.id !== selectedItem.id),
              totalItems: state.totalItems - 1,
              totalValue: state.totalValue - selectedItem.value,
            }))
            return
          }
      
          set((state) => ({
            items: items.map((item) =>
              item.id === selectedItem.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
            totalItems: state.totalItems - 1,
            totalValue: state.totalValue - selectedItem.value,
          }))
        },
        reset() {
          set(() => ({
            items: [],
            totalItems: 0,
            totalValue: 0,
          }))
        },
      }),
      { name: 'cart-store' },
    ),
  )
)
