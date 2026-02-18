// src/services/UsuarioService.ts
import { apiAuth } from '../api/InstanceAxios';

export const loginRequest = async (email: string, pass: string) => {
    const { data } = await apiAuth.post('usuarios/login/', { email, password: pass });
    
    // Si el backend te devuelve el token en la respuesta (data.token o data.key)
    if (data.token || data.key) {
        localStorage.setItem('auth_token', data.token || data.key);
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