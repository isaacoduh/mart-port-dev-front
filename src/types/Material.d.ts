export interface IMaterial {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  price: number;
  isArchived: boolean;
}

export interface IMaterialStock {
  id: number;
  material: IMaterial;
  availableQuantity: number;
  idealQuantity: number;
}
