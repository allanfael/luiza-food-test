import { Trash2 } from "lucide-react"
import Image from "next/image"
import addIcon from "@/assets/images/add.svg"

interface Props {
  totalItems: number
  onIncrement: () => void
  onDecrement: () => void
}

export const AddQuantity = ({ totalItems, onIncrement, onDecrement }: Props) => {
  return (
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