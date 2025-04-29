import { cn } from "@/lib/utils"
import { currencyParse } from "@/utils/currency-parse"

const RemoveDrink = ({ onClick, quantity }: { onClick: () => void, quantity: number }) => {
  return (
    <button 
      onClick={onClick}
      className={cn('flex items-center justify-center cursor-pointer mr-2 w-6 h-6 rounded-full border border-teal-400', quantity === 0 && 'bg-neutral-100 border-none')}>
      <span className={cn('font-semibold text-sm text-teal-400', quantity === 0 && 'text-neutral-400')}>-</span>
    </button>
  )
}

const AddDrink = ({ onClick }: { onClick: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className={cn('flex items-center justify-center cursor-pointer ml-2 w-5 h-5 rounded-full border border-teal-400')}>
      <span className={cn('font-semibold text-sm text-teal-400')}>+</span>
    </button>
  )
}

interface Props {
  onAdd: () => void
  onRemove: () => void
  quantity: number
  text: string
  price: number
}

export const AddDrinks = ({ onAdd, onRemove, quantity, text, price }: Props) => {
  return (
    <div className="flex justify-between items-center w-full mb-2">
      <div className="flex relative gap-2 items-center">
        <RemoveDrink onClick={onRemove} quantity={quantity} />
        <span className="text-sm font-medium">{quantity}</span>
        <AddDrink onClick={onAdd} />
        <span className="text-sm font-medium text-neutral-500">{text}</span>
      </div>
      <p className="text-sm font-semibold text-purple-800">+{currencyParse(price)}</p>
    </div>
  )
}