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

export interface UserProfile {
  id: string;
  phoneNumber?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  deliveryAddress?: string | null;
  city?: string | null;
  postalCode?: string | null;
  shopName?: string | null;
  shopAddress?: string | null;
  payoutDetails?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "CUSTOMER" | "PROVIDER";
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
  profile?: UserProfile | null;
}
