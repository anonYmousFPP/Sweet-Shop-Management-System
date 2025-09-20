import api from './config';
import { Sweet, SearchFilters } from './types';

export const sweetsAPI = {
  getAll: () => api.get<Sweet[]>('/sweets'),
  
  search: (filters: SearchFilters) =>
    api.get<Sweet[]>('/sweets/search', {
      params: filters,
    }),
  
  create: (sweet: Omit<Sweet, 'id'>) =>
    api.post<Sweet>('/sweets', sweet),
  
  update: (id: string, sweet: Partial<Sweet>) =>
    api.put<Sweet>(`/sweets/${id}`, sweet),
  
  delete: (id: string) =>
    api.delete(`/sweets/${id}`),
  
  purchase: (id: string, quantity: number = 1) =>
    api.post(`/sweets/${id}/purchase`, { quantity }),
  
  restock: (id: string, quantity: number) =>
    api.post(`/sweets/${id}/restock`, { quantity }),
};