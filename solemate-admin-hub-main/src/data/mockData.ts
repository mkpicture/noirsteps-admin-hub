export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  status: "active" | "draft" | "out_of_stock";
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  date: string;
}

export const products: Product[] = [];

export const orders: Order[] = [];

export const revenueData = [
  { month: "Sep", revenue: 0 },
  { month: "Oct", revenue: 0 },
  { month: "Nov", revenue: 0 },
  { month: "Déc", revenue: 0 },
  { month: "Jan", revenue: 0 },
  { month: "Fév", revenue: 0 },
];
