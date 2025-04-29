import { Store } from "@/interfaces/store"
import heart from '@/assets/images/heart.svg'
import share from '@/assets/images/share.svg'
import Image from "next/image"
import imageStore from "@/assets/images/matsuri-store.svg"
import { ChevronRight } from "lucide-react"
import moto from "@/assets/images/moto.svg"
import { currencyParse } from "@/utils/currency-parse"
import star from "@/assets/images/star.svg"

interface Props {
  store: Store | undefined
}

export const Details = ({ store }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full p-6 bg-white">
      <div className="flex gap-4 items-center">
        <Image src={imageStore} alt="store" className="rounded-sm w-12"/>
        <h1 className="text-xl font-semibold">{store?.storeName}</h1>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-6">
          <Image src={share} alt="share" />
          <Image src={heart} alt="heart" />
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-semibold text-xs text-emerald-600">mais infos</span>
          <ChevronRight size={14} className="text-emerald-600" />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <Image src={moto} alt="moto" />
          <span className="font-semibold text-purple-800">{currencyParse(store?.deliveryPrice)}</span>
          <ChevronRight size={14} className="text-purple-800" />
        </div>

        <div className="flex gap-2 items-center">
          <span className='text-neutral-400'>•</span>
          <span className="font-semibold text-xs text-neutral-500">
            hoje, {store?.deliveryTime.min}-{store?.deliveryTime.max} min
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <span className='text-neutral-400'>•</span>
          <span className="font-semibold text-xs text-neutral-500">
            {store?.distance}km
          </span>
        </div>
      </div>

      <div className="py-2 bg-teal-300/10 rounded w-fit px-3">
        <span className="font-semibold text-xs text-teal-700">
          entrega grátis acima de {currencyParse(35)}
        </span>
      </div>

      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <Image src={star} alt="star" />
          <span className="font-semibold text-xs text-neutral-500">{store?.rate} de 5</span>
          <ChevronRight size={14} className="text-neutral-500" />
        </div>

        <div className="flex gap-2 items-center">
          <span className='text-neutral-400'>•</span>
          <span className="font-semibold text-xs text-emerald-600">Fecha às {store?.closeAt}</span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <span className="font-semibold text-xs text-neutral-500">
          pedido mínimo:
        </span>
        <span className="font-semibold text-[14px] text-neutral-500">
          {currencyParse(store?.minOrder)}
        </span>
      </div>
    </div>
  )
}