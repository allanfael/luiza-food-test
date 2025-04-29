'use client'

import { OrderCard } from "@/components/ui/order-card"
import { Checkbox } from "@/components/ui/checkbox"
import { useCartStore } from "@/store/cart-store"
import { useProduct } from "@/store/product-store"
import { useMemo } from "react"


export const Accompaniment = () => {
  const { onHandleAccompaniment, items } = useCartStore()
  const { product } = useProduct()

  const accompanimentArray = [
    {
      id: 1,
      name: 'shoyu',
    },
    {
      id: 2,
      name: 'gengibre',
    },
    {
      id: 3,
      name: 'wasabi',
    },
    {
      id: 4,
      name: 'sem acompanhamentos',
    }
  ]

  const accompaniments = useMemo(() => {
    return items.find((i) => i.id === product.id)?.accompaniment
  }, [items, product])

  return (
    <OrderCard.Container>
      <OrderCard.Header>
        <div className="flex flex-col">
          <OrderCard.Title title="Acompanhamento" />
          <OrderCard.Subtitle text="Adicione acompanhamentos" />
        </div>
        <OrderCard.Required />
      </OrderCard.Header>
      <OrderCard.Body>
        <div className="flex flex-col gap-2">
          {accompanimentArray.map((item) => {

            return (
              <div key={item.id} className="flex items-center gap-3 text-neutral-500">
                <Checkbox 
                  checked={accompaniments?.includes(item.name)} 
                  onCheckedChange={() => onHandleAccompaniment(item.name, product.id)} />
                <p className="text-sm">{item.name}</p>
              </div>
            )
          })}
        </div>
      </OrderCard.Body>
    </OrderCard.Container>
  )
}