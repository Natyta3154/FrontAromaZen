import axios from "axios";

// ⚠️ Sin fallback: si no está la env, debe fallar
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL no está definida");
}

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth (si lo necesitás)
export const apiAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// CSRF (solo si usás sesión/cookies)
api.defaults.xsrfCookieName = "csrftoken";
api.defaults.xsrfHeaderName = "X-CSRFToken";
apiAuth.defaults.xsrfCookieName = "csrftoken";
apiAuth.defaults.xsrfHeaderName = "X-CSRFToken";

// Admin
export const ADMIN_URL = `${BASE_URL.replace(/\/api\/?$/, "")}/admin/`;
