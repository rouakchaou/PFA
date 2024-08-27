export class Product {
    id:number;
    name: string;
    price: number;
    promotion: number;
    fcategory_id: number;
    scategory_id: number;
    image_name: string[];
    sizeQuantityMap: { [key: string]: number };
  }