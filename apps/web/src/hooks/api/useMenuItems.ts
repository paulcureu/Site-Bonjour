// src/hooks/api/useMenuItems.ts
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/apiClient'; // Importăm instanța default

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'STARTER' | 'MAIN' | 'DESSERT' | 'DRINK';
}

// Funcția de fetch care folosește Axios
const fetchMenuItems = async () => {
  const response = await apiClient.get<MenuItem[]>('/api/v1/menu-items');
  return response.data; // Axios pune răspunsul în proprietatea `data`
};

export function useMenuItems() {
  return useQuery<MenuItem[]>({
    queryKey: ['menuItems'],
    queryFn: fetchMenuItems, // Folosim funcția de mai sus
  });
}
