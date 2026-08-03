export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export type PaymentStatus = "PAID" | "FAILED" | "PENDING" | "REFUNDED";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Gear {
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
}

export interface OrderItem {
  id: string;
  quantity: number;
  priceAtRent: number;
  startDate: string;
  endDate: string;
  orderId: string;
  gearId: string;
  gear: Gear;
}

export interface Order {
  id: string;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  transactionId: string | null;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  items: OrderItem[];
  payment: unknown | null;
}

export interface ProviderOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Order[];
}
