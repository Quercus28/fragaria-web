import { Product } from "./product.interface";

export interface Order {
    product: Product;
    quantity: number;
  }