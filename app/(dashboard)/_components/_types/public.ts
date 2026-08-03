export type Review = {
  id: string;
  rating: number;
  comment: string;
  customerId: string;
  gearId: string;
  createdAt: string;
  updatedAt: string;
};

export type Gear = {
  id: string;
  title: string;
  description: string;
  brand: string;
  specifications: Record<string, string>;
  pricePerDay: number;
  stock: number;
  isAvailable: boolean;
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  images?: string[];

  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };

  reviews?: Review[];
};
