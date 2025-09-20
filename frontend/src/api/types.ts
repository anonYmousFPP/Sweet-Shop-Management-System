// API Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}