import Image from "next/image"
import imageStore from "@/assets/images/matsuri-store.svg"

export const Store = () => {
  return (
    <div className="flex gap-4 items-center bg-white px-4 py-6">
      <Image src={imageStore} alt="store" className="rounded-sm w-12"/>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-neutral-500">seus itens em</p>
        <p className="font-semibold">Matsuri Consept</p>
      </div>
    </div>
  )
}