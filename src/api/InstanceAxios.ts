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

// 1. Definimos las instancias PRIMERO
export const api = axios.create(commonConfig);
export const apiAuth = axios.create(commonConfig);
export const apiBlog = axios.create({
  ...commonConfig,
  baseURL: `${BASE_URL.replace(/\/$/, "")}/blog/`,
});

export const ADMIN_URL = `${BASE_URL.replace(/\/api\/?$/, "")}/admin/`;

// 2. Definimos la lógica de los interceptores
const setupInterceptors = (instance: any) => {
  instance.interceptors.request.use((config: any) => {
    const csrftoken = getCookie('csrftoken');
    if (csrftoken) {
      config.headers['X-CSRFToken'] = csrftoken;
    }
    return config;
  });
};

// 3. Aplicamos los interceptores DESPUÉS de haber creado las instancias
setupInterceptors(api);
setupInterceptors(apiAuth);
setupInterceptors(apiBlog);