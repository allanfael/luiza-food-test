import { ProductDetails } from "./components/product-details";
import Image from "next/image"
import food from '@/assets/images/food.svg'
import { Accompaniment } from "./components/accompaniment";
import { Drinks } from "./components/drinks";
import { Cutlery } from "./components/cutlery";
import { Additional } from "./components/additional";
import { Obs } from "./components/obs";
import { Footer } from "./components/footer";
import { PageContent } from "@/components/ui/page-content";
import { PortionSize } from "./components/portion-size";
import { FloatingButton } from "./components/floating-button";

export default function Order() {

  return (
    <PageContent>
      <Image src={food} alt="food" className="w-full" />
      <ProductDetails />
      <PortionSize />
      <Accompaniment />
      <Drinks />
      <Cutlery />
      <Additional />
      <Obs />
      <Footer />
      <FloatingButton />
     
    </PageContent>
  )
}