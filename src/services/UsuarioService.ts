// src/services/UsuarioService.ts
import { apiAuth } from '../api/InstanceAxios';

export const loginRequest = async (email: string, pass: string) => {
    const { data } = await apiAuth.post('usuarios/login/', { email, password: pass });
    
    // 🔍 Esto nos dirá qué está mandando Django exactamente
   // console.log("Respuesta completa de Django:", data);

    // Intentamos capturar cualquier variante común de nombre de token
    const token = data.token || data.key || data.access || data.auth_token;
    
    if (token) {
        localStorage.setItem('auth_token', token);
        //console.log("✅ Token guardado en LocalStorage:", token.substring(0, 5) + "...");
    } else {
        //console.warn("⚠️ El login fue exitoso (200 OK) pero no se encontró un campo de token en la respuesta JSON.");
       // console.log("Campos recibidos:", Object.keys(data));
    }
    
    return data;
};

export const logoutRequest = async () => {
    return await apiAuth.post('usuarios/logout/');
};

export const checkSessionRequest = async () => {
    // Esta es la que nos dirá la verdad: ¿Django nos reconoce?
    const { data } = await apiAuth.get('usuarios/me/'); 
    return data;
};