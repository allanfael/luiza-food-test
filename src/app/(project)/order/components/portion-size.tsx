'use client'

import { OrderCard } from "@/components/ui/order-card"
import { useProduct } from "@/store/product-store"
import { currencyParse } from "@/utils/currency-parse"


export const PortionSize = () => {
  const { product } = useProduct()

  if(!product?.isPortion) return null

  return (
    <OrderCard.Container>
      <OrderCard.Header>
        <div className="flex flex-col">
          <OrderCard.Title title="Qual o tamanho?" />
        </div>
      </OrderCard.Header>
      <OrderCard.Body className="flex flex-row min-w-full justify-between">
        <p className="text-sm text-neutral-500">{product.portionSize}</p>

        {!!product.discountPrice ? (
           <div className="flex">
           <p className="text-sm text-neutral-500">de {currencyParse(product.price)} por</p>
           <span className="text-sm font-semibold text-green-500 ml-1">{currencyParse(product.discountPrice)}</span>
         </div>
        ) : (
          <span className="text-sm font-semibold text-purple-800">{currencyParse(product.price)}</span>
        )}
      </OrderCard.Body>
    </OrderCard.Container>
  )
}