'use client'

import { Button } from "@/components/ui/button";
import { Product } from "@/interfaces/product";
import { useCartStore } from "@/store/cart-store";
import { currencyParse } from "@/utils/currency-parse";
import { Star } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { toast } from "sonner"

interface Props {
  item: Product
}

export const ProductCard = ({ item }: Props) => {
  const { addItem } = useCartStore()

  const handleToCart = useCallback((item: Product) => {
    addItem(item)
    toast.success('Item adicionado ao carrinho')
  },[addItem])

  return (
    <div className="flex w-56 flex-col h-96 gap-2 rounded-lg bg-white p-4 shadow-md inset-shadow-sm shadow-gray-500/10">
      <div className="flex flex-col gap-2">
        <Image className="rounded-sm self-center" src={item.image} width={140} height={100} alt={item.title} />
        <h2 className="text-lg font-semibold text-purple-950">{item.title}</h2>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      <div className="flex flex-1 justify-end flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-sm font-semibold text-purple-950">{currencyParse(item.value)}</p>
          <p className="text-xs font-medium text-purple-950 flex gap-1">
            <Star size={14} className="text-yellow-500"/>
            {item.rate}
          </p>
        </div>    
        <Button onClick={() => handleToCart(item)}>Adicionar</Button>
      </div>
    </div>
  )
}