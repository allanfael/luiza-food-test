'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { currencyParse } from "@/utils/currency-parse"

export const Subtotal = () => {
  const { totalItemsValue } = useCartStore()

  return (
    <div className="fixed bottom-0 rounded-t-md shadow-md left-1/2 transform -translate-x-1/2 w-full bg-white inset-shadow-sm max-w-6xl h-24 z-10">
      <div className="flex justify-between px-4">
        <div className="flex flex-col mt-6 flex-1">
          <span className="text-sm font-semibold">subtotal</span>
          <span className="font-semibold text-xl text-purple-800">{currencyParse(totalItemsValue)}</span>
        </div>
        <Button 
          onClick={() => {}} 
          className="bg-purple-800 w-full mt-6 h-12 hover:bg-purple-900 flex-1">
           ir para pagamento
        </Button>
      </div>
    </div>
  )
}