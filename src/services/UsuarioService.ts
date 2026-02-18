// src/services/UsuarioService.ts
import { apiAuth } from '../api/InstanceAxios';

export const loginRequest = async (email: string, pass: string) => {
    // Forzamos que esta petición use credenciales
    const { data } = await apiAuth.post('usuarios/login/', 
        { email, password: pass }
    );
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