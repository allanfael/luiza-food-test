import { CartItem } from '@/interfaces/cart'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface State {
  product: CartItem
  setProduct: (product: CartItem) => void
  reset: () => void
}

export const useProduct = create<State>()(
  devtools(
    persist(
      (set) => ({
        product: {} as CartItem,
        setProduct: (product) => set({ product }, false, 'setProduct'),
        reset: () => set({ product: {} as CartItem }, false, 'reset'),
      }),
      {
        name: 'product-store', // chave no localStorage
      }
    ),
  )
)
