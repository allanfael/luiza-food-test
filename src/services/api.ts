import { Product } from '@/interfaces/product'
import products from './foods.json'
import storeWithProducts from './store-with-products.json'
import { StoreWithProducts } from '@/interfaces/menu'

export const api = {
  getProducts: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const data = products as Product[]
   
    return data
  },
  getStoreWithProducts: async (): Promise<StoreWithProducts> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const data = storeWithProducts as StoreWithProducts
   
    return data
  },
}