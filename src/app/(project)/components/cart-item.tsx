import { Product } from "@/interfaces/product"
import { currencyParse } from "@/utils/currency-parse"
import { Quantity } from "./quantity"
import Image from "next/image"

interface Props {
  item: Product
  onAdd: (item: Product) => void
  onRemove: (item: Product) => void
  quantity: number
}

export const CartItem = ({ item, onAdd, onRemove, quantity }: Props) => {

  return (
    <div className="flex justify-between gap-4 items-center">
      <Image className="rounded-sm self-center" src={item.image} width={60} height={60} alt={item.title} />
      <div className="flex gap-2 flex-col">
        <span className="font-semibold text-purple-950 text-sm">{item.title}</span>
        <span className="text-xs text-purple-950">{item.description}</span>
      
        <Quantity 
          onAdd={() => onAdd(item)} 
          onRemove={() => onRemove(item)} 
          quantity={quantity} />
      </div>
      <span className="font-semibold text-purple-950">{currencyParse(item.value)}</span>
    </div>
  )
}