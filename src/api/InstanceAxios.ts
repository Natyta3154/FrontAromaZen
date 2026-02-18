import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL no está definida");
}

// Configuración base para todas las peticiones
const commonConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest", // Ayuda a Django a identificar peticiones AJAX
  },
};

// Instancia estándar para productos y consultas
export const api = axios.create(commonConfig);

// Instancia para autenticación (login, logout, me)
export const apiAuth = axios.create(commonConfig);

// Instancia para el Blog (si requiere base path distinto)
export const apiBlog = axios.create({
  ...commonConfig,
  baseURL: `${BASE_URL.replace(/\/$/, "")}/blog/`,
});

// Admin URL
export const ADMIN_URL = `${BASE_URL.replace(/\/api\/?$/, "")}/admin/`;
