import { PageContent } from "@/components/ui/page-content";
import { Products } from "./products";
import { Store } from "./store";
import { Subtotal } from "./subtotal";

export default function Checkout() {
  return (
    <PageContent>
      <Store />
      <Products />
      <Subtotal />
    </PageContent>
  )
}