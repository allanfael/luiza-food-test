import { Product } from "@/interfaces/menu"
import { Expandable } from "./expandable"

interface Props {
  products: Product[] | undefined 
}

export const Menu = ({ products }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {products?.map((product) => (
        <div key={product.name} className="flex flex-col px-6 bg-white py-4">
          <Expandable product={product} />
        </div>
      ))}
    </div>
  )
}