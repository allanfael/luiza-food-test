'use client'

import Image from "next/image";
import imageStore from "@/assets/images/matsuri-store.svg"
import moto from "@/assets/images/moto-green.svg"
import star from "@/assets/images/star.svg"
import { useRouter } from "next/navigation";

export const Store = () => {
  const navigate = useRouter()

  return (
    <div onClick={() => navigate.push('/store')} className="flex gap-4 h-20 rounded-md items-center bg-neutral-50">
      <Image src={imageStore} alt="store" height={80} className="rounded-l-sm"/>
      <div className="flex flex-col gap-1">
        <p className="font-medium">Matsuri Consept</p>
        <div className="flex gap-3">
          <span className="flex gap-1 text-teal-600 text-sm font-medium items-center">
            <Image src={moto} alt="moto bg-gray-100" />
            gratis
          </span>
          <span className="font-semibold text-sm items-center flex gap-1 text-neutral-500">
          <Image src={star} alt="star" width={18} height={18} />
             4.7
          </span>
        </div>
      </div>
    </div>
  )
}