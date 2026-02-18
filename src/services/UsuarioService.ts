// src/services/UsuarioService.ts
import { apiAuth } from '../api/InstanceAxios';

// Agregamos 'usuarios/' antes de login
export const loginRequest = async (email: string, pass: string) => {
    const { data } = await apiAuth.post('usuarios/login/', { email, password: pass });
    return data;
};

export const logoutRequest = async () => {
    // Agregamos 'usuarios/' antes de logout
    return await apiAuth.post('usuarios/logout/', { 
        //withCredentials: true 
    });
};

export const checkSessionRequest = async () => {
    // Quitamos la barra inicial si tu InstanceAxios ya tiene '/api/' 
    // y nos aseguramos de que sea 'usuarios/me/'
    const { data } = await apiAuth.get('usuarios/me/'); 
    return data;
};