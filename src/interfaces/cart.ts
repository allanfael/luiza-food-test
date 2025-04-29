export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  isPortion: boolean
  portionSize?: string
  fullName?: string
  initialPrice?: number
  discountPrice?: number
  description?: string
}

export type Drink = {
  id: number
  name: string
  price: number
  quantity: number
}

export type Cutlery = {
  name: string
  price: number
}

export type Additional = {
  name: string
  price: number
}