'use client'

import { fetchStoreWithProducts } from "@/services/fetch-store";
import { Details } from "./components/details";
import { useEffect, useState } from "react";
import { StoreWithProducts } from "@/interfaces/menu";
import { Menu } from "./components/menu";
import { PageContent } from "@/components/ui/page-content";
import { Loader } from "@/components/ui/loader";

export default function Store() {
  const [store, setStore] = useState<StoreWithProducts>();

  useEffect(() => {
    fetchStoreWithProducts().then(setStore)
  }, [])

  if (!store) return (
    <PageContent>
      <Loader />
    </PageContent>
  )

  return(
    <PageContent>
      <Details store={store?.store} />
      <Menu products={store?.products}/>
    </PageContent>
  )
}