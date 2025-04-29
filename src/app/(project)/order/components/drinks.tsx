'use client'

import { OrderCard } from "@/components/ui/order-card"
import { useCartStore } from "@/store/cart-store"
import { AddDrinks } from "./add-drinks"
import { useProduct } from "@/store/product-store"
import { useMemo } from "react"


export const Drinks = () => {
  const { items, onAddDrink, onRemoveDrink } = useCartStore()
  const { product } = useProduct()

  const drinksArray = [
    {
      id: 1,
      name: 'coca-cola',
      price: 5,
      quantity: 0
    },
    {
      id: 2,
      name: 'fanta laranja',
      price: 5,
      quantity: 0
    },
    {
      id: 3,
      name: 'guaraná antártica',
      price: 5,
      quantity: 0
    },
    {
      id: 4,
      name: 'suco prats laranja',
      price: 6,
      quantity: 0
    },
    {
      id: 5,
      name: 'água sem gás',
      price: 3,
      quantity: 0
    }
  ] as const

  const cartDrinks = useMemo(() => {
    return items.find((i) => i.id === product.id)?.drinks || []
  }, [items, product])


  return (
    <OrderCard.Container>
      <OrderCard.Header>
        <div className="flex flex-col">
          <OrderCard.Title title="Vai querer bebida?" />
          <OrderCard.Subtitle text="escolha quantos quiser" />
        </div>
      </OrderCard.Header>
      <OrderCard.Body>
        <div className="flex flex-col gap-2">
          {drinksArray.map((item) => {
            const quantity = cartDrinks.find((d) => d.id === item.id)?.quantity || 0
            
            return (
              <div key={item.id} className="flex items-center gap-4">
                <AddDrinks 
                  text={item.name} 
                  price={item.price} 
                  onAdd={() => onAddDrink(item, product.id)} 
                  onRemove={() => onRemoveDrink(item, product.id)} 
                  quantity={quantity}/>
              </div>
            )
          })}
        </div>
      </OrderCard.Body>
    </OrderCard.Container>
  )
}