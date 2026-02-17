import { api, apiBlog } from '../api/InstanceAxios';
import type { Categoria, Producto } from '../types/index';

// --- PRODUCTOS (Usan 'api' que apunta a /api/) ---
export const fetchProductos = async (): Promise<Producto[]> => {
  const { data } = await api.get<Producto[]>('productos/lista/');
  return data;
};

export const fetchProductosDestacados = async (): Promise<Producto[]> => {
  // Ahora Django lo encontrará en /api/destacados/
  const response = await api.get<Producto[]>('productos/destacados/');
  return response.data;
};

export const fetchCategorias = async (): Promise<Categoria[]> => {
    const { data } = await api.get<Categoria[]>('productos/categorias/');
    return data;
};

// --- CONTACTO ---
export const enviarContacto = async (datos: any) => {
    // Django lo encontrará en /api/consultas/
    const response = await api.post('productos/consultas/', datos);
    return response.data;
};

// --- COMPRAS (Para generar tus LOGS) ---
export const realizarCompra = async (carrito: any) => {
    // Esta es la ruta que activa el CompraLog solicitado el 2026-01-06
    const { data } = await api.post('productos/comprar/', carrito);
    return data;
};


// --- BLOG (Usan 'apiBlog' que apunta a /api/blog/) ---

// 1. Obtiene la lista de todos los posts (Correcto, usa la raíz del blog)
export const fetchBlog = () => 
    apiBlog.get('posts/').then(r => r.data); 

// 2. Detalle del post
// En tu urls.py pusiste: path('<slug:slug>/', ...) SIN la palabra 'posts/'
export const fetchPostPorSlug = (slug: string) =>
    apiBlog.get(`posts/${slug}/`).then(r => r.data);

// 3. Testimonios (Correcto)
export const fetchTestimonios = () =>
    apiBlog.get('testimonios/').then(r => r.data);

// 4. Nueva Reseña
// En tu urls.py de Django pusiste: path('reseñas/crear/<int:producto_id>/', ...)
export const postReseña = (productoId: number, data: {puntuacion: number, comentario: string}) =>
    apiBlog.post(`reseñas/crear/${productoId}/`, data).then(r => r.data);