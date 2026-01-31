// src/types/index.ts

/**
 * Representa la estructura de un producto en AromaZen.
 * Esta interfaz asegura que el autocompletado funcione en todo el proyecto.
 */
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria_nombre: string;
  imagen: string;
  descripcion: string;
  categoria: number;
  // Propiedades opcionales para el QuickView y filtros
  rating?: number;
  stock?: number;
  destacado?: boolean;
  promedio_estrellas?: number;
  total_reseñas: number; 
  // Detalles técnicos que podrían venir de la API en el futuro
  sku?: string;
  peso?: string; // Ej: "50g", "100ml"
  reseñas?: Reseña[];
}

/**
 * Tipo útil si manejas las categorías como un conjunto cerrado de strings
 */
export type CategoriaAroma = "Todos" | "Exclusivo" | "Velas" | "Resinas" | "Accesorios" | "Sahumerios";

/**
 * Interfaz para la respuesta de la API si necesitas paginación en el futuro
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
// También asegúrate de tener la interfaz de Categoría si no la tienes
export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}
//Interface para los testimonios
export interface Testimonio {
  id: number;
  usuario_nombre: string; 
  puntuacion: number;    
  comentario: string;    
  fecha: string;
}

export interface Reseña {
  id: number;
  usuario_nombre: string; 
  puntuacion: number;    
  comentario: string;    
  fecha: string;
}

// src/types/index.ts

export interface Usuario {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    is_staff?: boolean;
    // Añade aquí campos extra que envíe tu Django (ej. avatar, bio)
}

export interface AuthResponse {
    authenticated: boolean;
    user: Usuario | null;
}

// Interfaz para el login (lo que devuelve Django al loguearte)
export interface LoginResponse {
    token?: string; // Si usas JWT
    user: Usuario;
    message?: string;
}