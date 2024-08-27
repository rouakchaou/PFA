import { Product } from "./product";

export class CommandLine {
  id: number;
  command: number;
  product: Product;
  size: string;
  quantity: number;

  constructor(product: Product, size: string, quantity: number) {
    this.product = product;
    this.size = size;
    this.quantity = quantity;
  }
}