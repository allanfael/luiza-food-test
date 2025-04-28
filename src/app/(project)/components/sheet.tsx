'use client'

import {
  Sheet as SheetPrimitive,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCartStore } from "@/store/cart-store"
import { useSheet } from "@/store/sheet-store"
import { CartItem } from "./cart-item"
import { currencyParse } from "@/utils/currency-parse"
import { ScrollArea } from "@/components/ui/scroll-area"

export const Sheet = () => {
  const { isOpened } = useSheet()
  const { items, addItem, removeItem, totalValue } = useCartStore()

  return (
    <SheetPrimitive open={isOpened}>
      <SheetContent className="w-4/5 rounded-l-md">
        <SheetHeader>
          <SheetTitle>Meu Carrinho</SheetTitle>
          {!items.length && (
            <SheetDescription className="text-center text-md mt-12">
              Nossa que vazio!
            </SheetDescription>
          )}
        </SheetHeader>
        
        <div className="flex flex-col flex-1 min-h-full">
          <ScrollArea className="h-4/5 rounded-md">
            <div className="flex flex-col gap-4 px-5 py-4">
              {items?.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onAdd={addItem} 
                  onRemove={removeItem} 
                  quantity={item.quantity}
                />
              ))}
            </div>
          </ScrollArea>

          <div className="flex border-t flex-1">
            <span className="flex-1 p-4 text-xl font-semibold text-purple-950">Total</span>
            <span className="p-4 text-xl font-semibold text-purple-950">{currencyParse(totalValue)}</span>
          </div>
        </div>
      </SheetContent>
    </SheetPrimitive>
  )
}