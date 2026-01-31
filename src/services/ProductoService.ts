import { api } from '../api/InstanceAxios';
import type { Producto } from '../types/index';

// --- Productos ---
export const fetchProductos = async (): Promise<Producto[]> => {
  const { data } = await api.get<Producto[]>('lista/'); // Agregué la / al final por Django
  return data;
};

export const fetchProductoPorId = async (id: number): Promise<Producto> => {
  const { data } = await api.get<Producto>(`lista/${id}/`);
  return data;
};

export const fetchProductosDestacados = async (): Promise<Producto[]> => {
  const response = await api.get<Producto[]>('destacados/');
  return response.data;
};

// --- Blog ---
export const getPost = async (limit = 3) => {
    const response = await api.get(`blog/?limit=${limit}`);
    return response.data;
};

/**
 * OBTIENE UN POST ESPECÍFICO (Para la página de "Leer más")
 * Se usa el slug que viene de la URL de React
 */
export const fetchPostPorSlug = async (slug: string) => {
    // Importante la / final para Django
    const { data } = await api.get(`blog/${slug}/`); 
    return data;
};

// --- CONTACTO (Nueva función para tu formulario) ---
export const enviarContacto = async (datos: any) => {
    const response = await api.post('consultas/', datos);
    return response.data;
};

// src/services/productoService.ts

export interface Categoria {
    id: number;
    nombre: string;
}

export const fetchCategorias = async (): Promise<Categoria[]> => {
    const { data } = await api.get<Categoria[]>('categorias/'); // Ajusta según tu URL de Django
    return data;
};