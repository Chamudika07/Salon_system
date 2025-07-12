import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function apiRequest<T = unknown>(path: string, options?: Parameters<typeof api.get>[1]) {
  const response = await api.get<T>(path, options);
  return response.data;
} 