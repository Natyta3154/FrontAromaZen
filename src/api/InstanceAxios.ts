import axios from "axios";
import { getCookie } from '../utils/cookies.ts';

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL no está definida");
}

const commonConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
};

// 1. Definimos las instancias
export const api = axios.create(commonConfig);
export const apiAuth = axios.create(commonConfig);
export const apiBlog = axios.create({
  ...commonConfig,
  baseURL: `${BASE_URL.replace(/\/$/, "")}/blog/`,
});

export const ADMIN_URL = `${BASE_URL.replace(/\/api\/?$/, "")}/admin/`;

// 2. Lógica de interceptores mejorada para Token Auth
const setupInterceptors = (instance: any) => {
  instance.interceptors.request.use((config: any) => {
    // 1. CSRF (Sigue leyéndose de la cookie porque no suele ser HttpOnly)
    const csrftoken = getCookie('csrftoken');
    if (csrftoken) {
      config.headers['X-CSRFToken'] = csrftoken;
    }

    // 2. Auth Token (Ahora desde LocalStorage)
    const authToken = localStorage.getItem('auth_token');
    
    if (authToken) {
      config.headers['Authorization'] = `Token ${authToken}`;
      console.log("🔑 Token inyectado desde LocalStorage");
    } else {
      console.warn("⚠️ No se encontró auth_token en LocalStorage");
    }

    return config;
  });
};
// 3. Aplicamos los interceptores
setupInterceptors(api);
setupInterceptors(apiAuth);
setupInterceptors(apiBlog);