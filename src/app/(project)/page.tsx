import { Suspense } from "react";
import { MenuCategories } from "./components/menu-categories";
import { Products } from "./components/products";
import { Sheet } from "./components/sheet";
import { Loader } from "@/components/ui/loader";
import { fetchProducts } from "@/services/fetchProducts";
import { Welcome } from "./components/welcome";

export default function Home() {
  const productsPromise = fetchProducts();
    
  return (
    <div className="flex flex-col min-h-full w-full max-w-6xl bg-white px-12 py-6 rounded-md">
      <Welcome />
      <MenuCategories />
      <Suspense fallback={<Loader />}>
        <Products promise={productsPromise}/>
      </Suspense>
      <Sheet />
    </div>
  )
}