import { Button } from "@/components/ui/button"
import { currencyParse } from "@/utils/currency-parse"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import addIcon from "@/assets/images/add.svg"

interface Props {
  onAdd: () => void
  onIncrement: () => void
  onDecrement: () => void
  total: number
  totalItems: number
}
export const AddQuantity = ({ onAdd, onIncrement, onDecrement, total, totalItems = 0 }: Props) => {
  return (
    <div className="flex justify-between items-center mt-8">
      <div className="flex gap-2 flex-col">
        <span className="text-xs font-semibold">quantos?</span>
        <div className="flex gap-1 items-center">
          <span className="text-xs font-semibold text-neutral-500">total</span>
          <span className="text-xs font-semibold">{currencyParse(total)}</span>
        </div>
      </div>
     
      {
        totalItems > 0 && (
          <div className="flex gap-5 items-center">
            <button onClick={onDecrement}>
              <Trash2 className="text-teal-400" width={20} height={20}/>
            </button>
            <span className="text-sm font-semibold">{totalItems}</span>
            <button onClick={onIncrement}>
              <Image src={addIcon} alt="add" width={22} height={22} className="text-teal-400"/>
            </button>
          </div>
        )
      }
      {
        totalItems === 0 && (
          <Button onClick={onAdd} className="bg-neutral-500">Adicionar</Button>
        )
      }
    </div>
  )
}