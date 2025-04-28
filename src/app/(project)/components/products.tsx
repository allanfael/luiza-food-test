'use client'

import { use, useMemo } from "react"
import { ProductCard } from "./product"
import { useFilter } from "@/store/filter-store"
import { Product } from "@/interfaces/product"

export const Products = ({ promise }: { promise: Promise<Product[]> }) => {
  const { filter, orderBy } = useFilter();
  const data = use(promise);

  const dataFiltered = useMemo(() => {
    if (filter === 'all') return data;
    if (filter === 'hamburger') return data.filter((item) => item.type === 'hamburger');
    return data.filter((item) => item.type === 'pizza');
  }, [data, filter]);

  const pizzaList = useMemo(() => {
    const filtered = dataFiltered.filter((item) => item.type === 'pizza');
    
    if (orderBy === 'best') return filtered.sort((a, b) => b.rate - a.rate);
    return filtered.sort((a, b) => a.value - b.value);
  }, [dataFiltered, orderBy])
  
  const hamburgerList = useMemo(() => {
    const filtered = dataFiltered.filter((item) => item.type === 'hamburger');

    if (orderBy === 'best') return filtered.sort((a, b) => b.rate - a.rate);
    return filtered.sort((a, b) => a.value - b.value);
  }, [dataFiltered, orderBy])

  return (
    <div className="flex flex-col mt-16">
      {!!hamburgerList.length && (
        <div test-id="hamburger-list">
          <h2 className="text-lg font-semibold text-purple-950 mt-8">Hamburguers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-4">
            {hamburgerList?.map((item) => (
              <ProductCard key={item.description} item={item} />
            ))}
          </div>
        </div>
      )}

      {!!pizzaList.length && (
        <div test-id="pizza-list">
          <h2 className="text-lg font-semibold text-purple-950 mt-8">Pizzas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-4">
            {pizzaList?.map((item) => (
              <ProductCard key={item.description} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}