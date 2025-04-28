'use client'

import { useCartStore } from "@/store/cart-store"
import { useSheet } from "@/store/sheet-store"
import { ShoppingCart } from "lucide-react"

export const Cart = () => {
  const { totalItems } = useCartStore()
  const { setOpen } = useSheet()

  return (
    <button onClick={() => setOpen(true)} className="relative flex items-baseline">
      <ShoppingCart color='white'/>
      <div className="h-4 w-4 flex rounded-full items-center justify-center text-center bg-white">
        <span test-id='total-items' className='text-black text-xs font-semibold'>{totalItems}</span>
      </div>
    </button>
  )
}