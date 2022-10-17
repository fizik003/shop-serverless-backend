export interface Product {
  description: string;
  id: string;
  price: number;
  title: string;
}

export type ProductData = Omit<Product, 'id'>;
