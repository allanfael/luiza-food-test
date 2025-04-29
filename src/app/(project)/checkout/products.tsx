'use client'

import { OrderCard } from "@/components/ui/order-card"
import { useCartStore } from "@/store/cart-store"
import { useProduct } from "@/store/product-store"
import { currencyParse } from "@/utils/currency-parse"
import { AddQuantity } from "./add-quantity"
import { Pencil } from "lucide-react"
import { CartItem } from "@/interfaces/cart"
import { useRouter } from "next/navigation"

export const Products = () => {
  const { items, addItem, removeItem } = useCartStore()
  const { product, setProduct } = useProduct()

  const navigate = useRouter()

  const onEdit = (product: CartItem) => {
    setProduct(product)
    navigate.push('/order')
  }

  return (
    <div className="flex flex-col w-full pb-28">
      {items?.map((item, index) => {
        return (
          <OrderCard.Container key={item.id} className={index === 0 ? 'mt-0' : 'mt-1' }>
            <OrderCard.Header>
              <OrderCard.Title title={item.product?.fullName || item.product?.name} />
              <div className="flex gap-3 flex-col items-end flex-1">
                <span className="text-sm font-semibold text-purple-800">{currencyParse(item.product?.discountPrice||item.product?.price)}</span>
                <div className="flex gap-8 items-center">
                  <button className="flex gap-2 items-center" onClick={() => onEdit(item.product)}>
                    <Pencil className="text-teal-400" width={12} height={12}/>
                    <span className="text-xs font-semibold text-teal-400">editar</span>
                  </button>
                  <AddQuantity onDecrement={() => removeItem(item.product)} onIncrement={() => addItem(item.product)} totalItems={item.product?.quantity} />
                </div>
              </div>
            </OrderCard.Header>
            <OrderCard.Body className="gap-3">
              {item.product?.isPortion && (
                <div className="flex gap-2 flex-col">
                  <span className ="text-xs font-semibold text-neutral-500">• tamanho</span>
                  <span className="ml-2 text-xs font-medium text-neutral-500">{product.portionSize}</span>
                </div>
              )}
              {!!item.drinks?.length && (
                <div className="flex gap-2 flex-col">
                  <span className ="text-xs font-semibold text-neutral-500 mb-[-4px]">• vai querer bebida?</span>
                 {
                   item.drinks.map(drink => {
                     return (
                      <div key={drink.id} className="flex gap-2 items-center ml-2">
                        <span className="text-xs font-medium text-neutral-500">{drink.name}</span>
                        <span className="text-xs font-medium text-emerald-600">+{currencyParse(drink.price)}</span>
                      </div>
                     )
                   })
                 }
                </div>
              )}
              {!!item.accompaniment?.length && (
                <div className="flex gap-2 flex-col">
                  <span className ="text-xs font-semibold text-neutral-500 mb-[-4px]">• acompanhamentos</span>
                 {
                   item.accompaniment.map(item => {
                     return (
                      <div key={item} className="flex items-center ml-2 mb-[-4px]">
                        <span className="text-xs font-medium text-neutral-500">{item}</span>
                      </div>
                     )
                   })
                 }
                </div>
              )}
               {!!item.additional?.length && (
                <div className="flex gap-2 flex-col">
                  <span className ="text-xs font-semibold text-neutral-500 mb-[-4px]">• acompanhamentos</span>
                 {
                   item.additional.map(item => {
                     return (
                      <div key={item.name} className="flex items-center ml-2 mb-[-4px] gap-2">
                        <span className="text-xs font-medium text-neutral-500">{item.name}</span>
                        <span className="text-xs font-medium text-emerald-600">+{currencyParse(item.price)}</span>
                      </div>
                     )
                   })
                 }
                </div>
              )}
            </OrderCard.Body>
          </OrderCard.Container>
        )
      })}
    </div>
  )
}