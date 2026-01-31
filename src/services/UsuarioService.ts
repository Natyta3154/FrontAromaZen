// src/services/UsuarioService.ts
import { apiAuth } from '../api/InstanceAxios';

export const loginRequest = async (email: string, pass: string) => {
    const { data } = await apiAuth.post('login/', { email, password: pass });
    return data;
};

// 👇 ASEGÚRATE DE QUE ESTA FUNCIÓN ESTÉ ESCRITA ASÍ:
export const logoutRequest = async () => {
    return await apiAuth.get('logout/', { withCredentials: true });
};

export const checkSessionRequest = async () => {
    const { data } = await apiAuth.get('me/');
    return data;
};