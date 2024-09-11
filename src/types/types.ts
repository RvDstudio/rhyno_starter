// components/types.ts-
 export interface Product {
  id: string;
  name: string;
  regular_price: number;
  images: { src: string }[];
  stock_status: "instock" | "outofstock";
}

 export interface Zuivel {
  id: string;
  name: string;
  images: { src: string }[];
  regular_price: string;
  stock_status: string;
}
 export interface Kaas {
  id: string;
  name: string;
  images: { src: string }[];
  regular_price: string;
  stock_status: string;
}

 export interface Vlees {
  id: string;
  name: string;
  images: { src: string }[];
  regular_price: string;
  stock_status: string;
}
 export interface User {
  id: string;
  name?: string;
  email: string;
  password?: string;
  emailVerified?: Date;
  image?: string;
  role: string;
  isAdmin: boolean; // 0 for false, 1 for true
}
 export interface Session {
    user: {
      id: string;
    email: string;
    name: string;
    isAdmin: boolean; // Ensure this is included
    role?: string; // Add this line to include the role property
    }
  }

