export type Store = {
  storeName: string;
  deliveryPrice: number;
  deliveryTime: {
    min: number;
    max: number;
  };
  distance: string;
  rate: number;
  closeAt: string;
  minOrder: number;
};