interface Props {
  onAdd: () => void
  onRemove: () => void
  quantity: number
}

export const Quantity = ({ onAdd, onRemove, quantity }: Props) => {
  return (
    <div className="border w-28 gap-4 rounded-2xl items-center justify-center flex px-2">
      <button
        onClick={onRemove}
        className="flex items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-100"
      >
        <span className="font-semibold text-xl">-</span>
      </button>
  
      <span className="text-xs font-semibold mx-2">{quantity}</span>
      
      <button
        onClick={onAdd}
        className="flex items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-100"
      >
        <span className="font-semibold text-xl">+</span>
      </button>
    </div>

  )
}