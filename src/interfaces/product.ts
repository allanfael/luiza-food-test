export type FoodType = 'hamburger' | 'pizza';

export type Product = {
  id: string;
  image: string;
  title: string;
  description: string;
  value: number;
  type: FoodType
  rate: number;
};
