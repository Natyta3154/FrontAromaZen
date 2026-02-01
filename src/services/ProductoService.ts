import { api, apiBlog } from '../api/InstanceAxios';
import type { Categoria, Producto } from '../types/index';

// --- PRODUCTOS (Usan 'api' que apunta a /api/) ---
export const fetchProductos = async (): Promise<Producto[]> => {
  const { data } = await api.get<Producto[]>('lista/');
  return data;
};

export const fetchProductosDestacados = async (): Promise<Producto[]> => {
  // Ahora Django lo encontrará en /api/destacados/
  const response = await api.get<Producto[]>('destacados/');
  return response.data;
};

export const fetchCategorias = async (): Promise<Categoria[]> => {
    const { data } = await api.get<Categoria[]>('categorias/');
    return data;
};

// --- CONTACTO ---
export const enviarContacto = async (datos: any) => {
    // Django lo encontrará en /api/consultas/
    const response = await api.post('consultas/', datos);
    return response.data;
};

// --- COMPRAS (Para generar tus LOGS) ---
export const realizarCompra = async (carrito: any) => {
    // Esta es la ruta que activa el CompraLog solicitado el 2026-01-06
    const { data } = await api.post('comprar/', carrito);
    return data;
};


// Si apiBlog ya tiene el prefijo '/api/blog/', las rutas deben ser relativas:
export const fetchBlog = () => 
    apiBlog.get('').then(r => r.data); // Obtiene /api/blog/

export const fetchPostPorSlug = (slug: string) =>
    apiBlog.get(`${slug}/`).then(r => r.data); // Obtiene /api/blog/slug/

export const fetchTestimonios = () =>
    apiBlog.get('testimonios/').then(r => r.data); // Obtiene /api/blog/testimonios/