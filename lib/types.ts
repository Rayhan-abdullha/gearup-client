export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GearItem {
  id: string;
  title: string;
  description: string;
  brand: string;
  specifications: {
    [key: string]: string;
  };
  pricePerDay: number;
  stock: number;
  isAvailable: boolean;
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface RentalOrder {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  transactionId: string | null;
  customerId: string;
  createdAt: string;
  updatedAt: string;

  items: RentalItem[];
}

export interface RentalItem {
  id: string;
  quantity: number;
  priceAtRent: number;
  startDate: string;
  endDate: string;
  orderId: string;
  gearId: string;

  gear: {
    title: string;
    brand: string;
  };
}
