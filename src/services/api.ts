import { Product } from '@/interfaces/product'
import products from './foods.json'

export const api = {
  getProducts: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const data = products as Product[]
   
    return data
  },
}