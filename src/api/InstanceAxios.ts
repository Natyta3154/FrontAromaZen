import axios from "axios";

// 1. Definimos la base con el fallback que mencionaste
const BASE_URL = import.meta.env.VITE_API_URL || "aromazen.up.railway.app";

// 2. Limpiamos la URL para asegurar que siempre termine en una barra "/"
const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

// Instancia para Productos y General
export const api = axios.create({
    // Usamos la base limpia + el prefijo de tu API
    baseURL: `${cleanBaseUrl}api/productos/`, 
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

// Instancia para Usuarios
export const apiAuth = axios.create({
    baseURL: `${cleanBaseUrl}api/usuarios/`,
    withCredentials: true,
});

// Configuración de CSRF
api.defaults.xsrfCookieName = 'csrftoken';
api.defaults.xsrfHeaderName = 'X-CSRFToken';
apiAuth.defaults.xsrfCookieName = 'csrftoken';
apiAuth.defaults.xsrfHeaderName = 'X-CSRFToken';

// Exportamos la URL del Admin para tus botones
export const ADMIN_URL = `${cleanBaseUrl}admin/`;