'use client'

import { OrderCard } from "@/components/ui/order-card"
import { useCartStore } from "@/store/cart-store"
import { useProduct } from "@/store/product-store"
import { useMemo } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export const Cutlery = () => {
  const { onHandleCutlery, items } = useCartStore()
  const { product } = useProduct()

  const array = [
    {
      id: 1,
      name: 'hashi',
      price: 0
    },
    {
      id: 2,
      name: 'garfo e faca descartável',
      price: 1
    },
  ] as const

  const cutlery = useMemo(() => {
    return items.find((i) => i.id === product.id)?.cutlery
  }, [items, product])

  return (
    <OrderCard.Container>
      <OrderCard.Header>
        <div className="flex flex-col">
          <OrderCard.Title title="precisa de talher?" />
          <OrderCard.Subtitle text="escolha até 1" />
        </div>
        <OrderCard.Required />
      </OrderCard.Header>
      <OrderCard.Body>
        <div className="flex flex-col gap-2">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value={array[0].name}
                checked={cutlery?.name === array[0].name}
                id={array[0].name} 
                onClick={() => onHandleCutlery({name: array[0].name, price: array[0].price}, product.id)}
              />
              <p className="text-sm text-neutral-500">{array[0].name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value={array[1].name}
                checked={cutlery?.name === array[1].name}
                id={array[1].name} 
                onClick={() => onHandleCutlery({name: array[1].name, price: array[1].price}, product.id)}
              />
              <p className="text-sm text-neutral-500">{array[1].name}</p>
            </div>
          </RadioGroup>
        </div>
      </OrderCard.Body>
    </OrderCard.Container>
  )
}