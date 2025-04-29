'use client'

import { OrderCard } from "@/components/ui/order-card"
import { Checkbox } from "@/components/ui/checkbox"
import { useCartStore } from "@/store/cart-store"
import { useProduct } from "@/store/product-store"
import { useMemo } from "react"


export const Additional = () => {
  const { onHandleAdditional, items } = useCartStore()
  const { product } = useProduct()

  const array = [
    {
      id: 1,
      name: 'biscoito da sorte',
      price: 2
    },
    {
      id: 2,
      name: 'rolinho primavera',
      price: 8
    },
    {
      id: 3,
      name: 'guioza',
      price: 6
    },
  ] as const

  const additional = useMemo(() => {
    return items.find((i) => i.id === product.id)?.additional || []
  }, [items, product])

  return (
    <OrderCard.Container>
      <OrderCard.Header>
        <div className="flex flex-col">
          <OrderCard.Title title="Mais alguma coisa?" />
          <OrderCard.Subtitle text="escolha até 2" />
        </div>
        <OrderCard.Required />
      </OrderCard.Header>
      <OrderCard.Body>
        <div className="flex flex-col gap-2">
          {array.map((item) => {
            const additionalSelected = additional.find((i) => i.name === item.name)

            return (
              <div key={item.id} className="flex items-center gap-3 text-neutral-500">
                <Checkbox 
                  checked={additionalSelected !== undefined} 
                  onCheckedChange={() => onHandleAdditional(item, product.id)} />
                <p className="text-sm">{item.name}</p>
              </div>
            )
          })}
        </div>
      </OrderCard.Body>
    </OrderCard.Container>
  )
}