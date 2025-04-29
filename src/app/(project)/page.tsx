import { PageContent } from "@/components/ui/page-content";
import banner from '@/assets/images/banner.svg'
import Image from "next/image";
import { Store } from "./components/store";

export default function Home() {
    
  return (
    <PageContent className="bg-white">
      <Image src={banner} alt="banner" className="w-full" />
      <div className="flex flex-col px-4 py-8 gap-6">
        <strong className="text-xl font-semibold text-purple-800">abertos</strong>
        <Store />
      </div>
    </PageContent>
  )
}