export interface IProductVariant {
  type: string; // e.g., "size", "color"
  value: string; // e.g., "Small", "Red"
}

export interface IInventory {
  quantity: number;
  inStock: boolean;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IProductVariant[];
  inventory: IInventory;
}
