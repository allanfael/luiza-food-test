import { Additional, CartItem, Cutlery, Drink } from '@/interfaces/cart'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Cart {
  id: number
  product: CartItem
  accompaniment: string[]
  drinks: Drink[]
  cutlery: Cutlery
  additional: Additional[]
  obs?: string
}

interface CartState {
  items: Cart[]
  totalItems: number
  addItem: (item: CartItem) => void
  removeItem: (item: CartItem) => void
  onHandleAccompaniment: (item: string, productId: number) => void
  onHandleCutlery: (item: Cutlery, productId: number) => void
  onHandleAdditional: (item: Additional, productId: number) => void
  onAddDrink: (item: Drink, productId: number) => void
  onRemoveDrink: (item: Drink, productId: number) => void
  setObs: (obs: string, productId: number) => void
  totalValue: number
  totalItemsValue: number
  reset: () => void
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [] as Cart[],
        totalItems: 0,
        totalValue: 0,
        totalItemsValue: 0,
        accompaniments: [],
        addItem(item) {
          const items = get().items
          const alreadyExists = items.find((i) => i.id === item.id)

          const price = item?.discountPrice || item.price

          if (alreadyExists) {
            const updatedItems = items.map((i) =>
              i.id === item.id
                ? { ...i, product: { ...i.product, quantity: i.product.quantity + 1 } }
                : i
            );
          
            set((state) => ({
              items: updatedItems,
              totalItems: state.totalItems + 1,
              totalValue: state.totalValue + price,
              totalItemsValue: state.totalValue + price,
            }));
            return 
          } 

          const newOrder = {
            id: item.id,
            product: item,
            accompaniment: [],
            drinks: [],
            cutlery: {
              name: 'hashi',
              price: 0
            },
            additional: [],
            obs: ''
          }
      
          set((state) => ({
            items: [...state.items, newOrder],
            totalItems: state.totalItems + 1,
            totalValue: state.totalValue + price,
            totalItemsValue: state.totalValue + price
          }))
        },
        removeItem(selectedItem) {
          const items = get().items
          const existingItem = items.find((i) => i.id === selectedItem.id)
        
          if (!existingItem) return
        
          const price = selectedItem?.discountPrice || selectedItem.price
        
          if (existingItem.product.quantity === 1) {
            set((state) => ({
              items: state.items.filter((i) => i.id !== selectedItem.id),
              totalItems: state.totalItems - 1,
              totalValue: state.totalValue - price,
              totalItemsValue: state.totalItemsValue - price
            }))
            return
          }
        
          set((state) => ({
            items: state.items.map((i) =>
              i.id === selectedItem.id
                ? {
                    ...i,
                    product: {
                      ...i.product,
                      quantity: i.product.quantity - 1,
                    },
                  }
                : i
            ),
            totalItems: state.totalItems - 1,
            totalValue: state.totalValue - price,
            totalItemsValue: state.totalItemsValue - price
          }))
        },
        onHandleAccompaniment(item, productId) {
          const accompaniments = get().items.find((i) => i.id === productId)?.accompaniment || []

          if(accompaniments.includes(item)) {
            set(() => ({
              items: get().items.map((i) => i.id === productId 
                ? {...i, accompaniment: accompaniments.filter((acc) => acc !== item)} 
                : i
              ),
            }))
            return
          }

          set(() => ({
            items: get().items.map((i) => i.id === productId 
              ? {...i, accompaniment: [...accompaniments, item]} 
              : i
            ),
          }))
        },
        onAddDrink(item, productId) {
          const cartItems = get().items;
          const product = cartItems.find((i) => i.id === productId);

          if (!product) return; 

          const drinks = product.drinks || [];
          const alreadyExists = drinks.find((d) => d.name === item.name);

          if (alreadyExists) {
            alreadyExists.quantity += 1;

            const newCartItems = cartItems.map((i) =>
              i.id === productId ? { ...i, drinks: [...drinks] } : i
            );

            set(() => ({
              items: newCartItems,
              totalItemsValue: get().totalItemsValue + item.price
            }));
          } else {
            const newDrink = {
              ...item,
              quantity: 1,
            };

            const newCartItems = cartItems.map((i) =>
              i.id === productId ? { ...i, drinks: [...drinks, newDrink] } : i
            );

            set(() => ({
              items: newCartItems,
              totalItemsValue: get().totalItemsValue + item.price
            }));
          }
        },
        onRemoveDrink(item, productId) {
          const cartItems = get().items;
          const product = cartItems.find((i) => i.id === productId);

          if (!product) return; 

          const drinks = product.drinks || [];
          const drinkToRemove = drinks.find((d) => d.name === item.name);

          if (!drinkToRemove) return; 

          let newDrinks;

          if (drinkToRemove.quantity > 1) {
            newDrinks = drinks.map((d) =>
              d.name === item.name ? { ...d, quantity: d.quantity - 1 } : d
            );
          } else {
            newDrinks = drinks.filter((d) => d.name !== item.name);
          }

          const newCartItems = cartItems.map((i) =>
            i.id === productId ? { ...i, drinks: newDrinks } : i
          );

          set(() => ({
            items: newCartItems,
            totalItemsValue: get().totalItemsValue - item.price
          }));
        },
        onHandleCutlery(item, productId) {
          const cutlery = get().items.find((i) => i.id === productId)?.cutlery || {} as Cutlery


          if(cutlery.name === item.name) {
            set(() => ({
              items: get().items.map((i) => i.id === productId 
                ? {...i, cutlery: item} 
                : i
              ),
              totalItemsValue: get().totalItemsValue - cutlery.price
            }))
            return
          }

          set(() => ({
            items: get().items.map((i) => i.id === productId 
              ? {...i, cutlery: item} 
              : i
            ),
            totalItemsValue: get().totalItemsValue + item.price
          }))
        },
        onHandleAdditional(item, productId) {
          const additional = get().items.find((i) => i.id === productId)?.additional || []
          const alreadyExists = additional.find((acc) => acc.name === item.name)


          if(alreadyExists) {
            set(() => ({
              items: get().items.map((i) => i.id === productId 
                ? {...i, additional: additional.filter((acc) => acc.name !== item.name)} 
                : i
              ),
              totalItemsValue: get().totalItemsValue - alreadyExists.price
            }))
            return
          }

          if (additional.length === 2) {
            return
          }

          set(() => ({
            items: get().items.map((i) => i.id === productId 
              ? {...i, additional: [...additional, item]} 
              : i
            ),
            totalItemsValue: get().totalItemsValue + item.price
          }))
        },
        setObs(obs, productId) {
          set(() => ({
            items: get().items.map((i) => i.id === productId 
              ? {...i, obs} 
              : i
            ),
          }))
        },
        reset() {
          set(() => ({
            items: [],
            totalItems: 0,
            totalValue: 0,
          }))
        },
      }),
      { name: 'cart-store' },
    ),
  )
)
