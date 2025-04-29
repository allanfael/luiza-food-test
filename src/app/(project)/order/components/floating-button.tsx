'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { useProduct } from "@/store/product-store"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

export const FloatingButton = () => {
  const navigate = useRouter()
  const { product } = useProduct()
  const { items } = useCartStore()

  const cart = useMemo(() => {
    return items.find((i) => i.product.id === product.id)
  }, [items, product])

  const enabledButton = !!cart?.product.id && cart.accompaniment.length > 0 
  
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 pb-4 bg-transparent z-10">
      <Button
        disabled={!enabledButton}
        onClick={() => navigate.push('/checkout')} 
        className="bg-purple-800 w-full h-12 hover:bg-purple-900">
          ver ticket
      </Button>
    </div>
  )
}