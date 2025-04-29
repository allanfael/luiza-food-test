'use client'

import { useProduct } from "@/store/product-store"
import { currencyParse } from "@/utils/currency-parse"
import { AddQuantity } from "./add-quantity"
import { useCartStore } from "@/store/cart-store"
import { useMemo } from "react"

export const ProductDetails = () => {
  const { product } = useProduct()
  const { addItem, removeItem, items } = useCartStore()

  const selectedProduct = useMemo(() => {
    return items.find((i) => i.product.id === product.id)
  },[items, product])

  const amountProductPrice = selectedProduct?.product.discountPrice || selectedProduct?.product.initialPrice || selectedProduct?.product.price || 0
  const total = amountProductPrice * (selectedProduct?.product.quantity || 0)

  return (
    <div className="flex p-4 flex-col bg-white">
      <h2 className="text-xl font-medium mb-2">{product.fullName || product.name}</h2>

      <div className="flex gap-2 items-center mb-2">
        <span className="text-xs font-semibold text-neutral-500">a partir de</span>
        <span className="font-semibold text-purple-800">{currencyParse(product.discountPrice || product.initialPrice || product.price)}</span>
      </div>

      <span className="text-xs font-medium text-neutral-500">{product.description}</span>

      <AddQuantity 
        onAdd={() => addItem(product)} 
        onIncrement={() => addItem(product)} 
        onDecrement={() => removeItem(product)} 
        total={total} 
        totalItems={selectedProduct?.product.quantity || 0}/>
    </div>
  )
}