'use client'

import { OrderCard } from "@/components/ui/order-card";
import { useCartStore } from "@/store/cart-store";
import { useProduct } from "@/store/product-store";
import { useDeferredValue, useEffect, useMemo, useState } from "react"

export const Obs = () => {
  const { setObs, items } = useCartStore()
  const { product } = useProduct()

  const [value, setValue] = useState('');
  const deferredValue = useDeferredValue(value);

  const obs = useMemo(() => {
    return items.find((i) => i.id === product.id)?.obs
  }, [items, product.id])

  useEffect(() => {
    if(!value) setValue(obs || '')
  }, [obs, value])

  useEffect(() => {
    setObs(deferredValue, product.id)
  }, [deferredValue, setObs, product.id])

  return (
    <OrderCard.Container className="pb-20">
      <OrderCard.Body>
        <textarea 
          placeholder="alguma observação do item? • opcional
            ex: tirar algum ingrediente, ponto do prato
            texto do input"
          className="p-2 border border-neutral-200 rounded h-16 text-xs font-medium"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        />
      </OrderCard.Body>
    </OrderCard.Container>
  )
}