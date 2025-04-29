'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Food, Product } from "@/interfaces/menu"
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import money from '@/assets/images/money.svg'
import Image from "next/image";
import { currencyParse } from "@/utils/currency-parse";
import { useProduct } from "@/store/product-store";
import { useRouter } from "next/navigation";


interface Props {
  product: Product | undefined
}

export const Expandable = ({ product }: Props) => {
  const [open, setOpen] = useState(false);

  const { setProduct } = useProduct()

  const navigate = useRouter()

  const onAdd = (food: Food, item: Product) => {
    if(item.isPortion) {
      setProduct({
        id: food.id,
        isPortion: true,
        name: item.fullName || item.name,
        portionSize: food.name,
        price: food.price || 0,
        quantity: 1,
        fullName: item.fullName,
        initialPrice: food.initialPrice,
        discountPrice: food.discountPrice,
        description: food.description
      })

      navigate.push('/order')

      return
    }

    setProduct({
      id: food.id,
      isPortion: false,
      name: food.fullName || food.name,
      price: food.price || 0,
      quantity: 1,
      initialPrice: food.initialPrice,
      discountPrice: food.discountPrice,
      description: food.description
    })

    navigate.push('/order')

    setOpen(false)
  }

  const prices = (item: Food) => {
    if (item.discountPrice) {
      return (
        <div className="flex gap-1 flex-col items-end flex-1">
          <span className="text-sm font-medium text-neutral-500 line-through">{currencyParse(item.price)}</span>
          <div className="flex gap-1">
            <Image src={money} alt="discount" width={12} height={12} />
            <span className="text-sm font-semibold text-emerald-600">{currencyParse(item.discountPrice)}</span>
          </div>
        </div>
      )
    }

    if (item.initialPrice) {
      return (
        <div className="flex gap-1 flex-col items-end flex-1">
          <span className="text-xs font-semibold text-neutral-500">a partir de</span>
          <span className="text-sm font-semibold text-purple-800">{currencyParse(item.initialPrice)}</span>
        </div>
      )
    }

    return (
      <span className="text-sm font-semibold text-purple-800">{currencyParse(item.price)}</span>
    )
  }
    

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="min-w-full bg-white">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1 items-start">
            <h2 className="text-lg font-semibold flex gap-2">
              {product?.name}
              {!!product?.foods?.find(item => item.discountPrice) &&  <Image src={money} alt="discount" width={16} height={16} />}
            </h2>
            <span className="font-medium text-start text-xs text-neutral-500">{product?.description}</span>
          </div>

          <ChevronDown size={20} className={open ? 'rotate-180 duration-300 text-neutral-500' : 'duration-300 text-neutral-500'} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {
          product?.foods?.map((food) => (
            <div key={food.name} className="flex justify-between py-3 items-center hover:bg-gray-50 hover:ease-in duration-300 rounded" onClick={() => onAdd(food, product)}>
              <div className="flex flex-col gap-1 pl-2 flex-1">
                <span className="text-sm font-medium">{food.name}</span>
                <span className="text-xs font-medium text-neutral-500">{food.description}</span>
              </div>

              {prices(food)}
            </div>
          ))
        }
      </CollapsibleContent>
    </Collapsible>
  )
}