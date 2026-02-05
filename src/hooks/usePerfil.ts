import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiAuth } from '../api/InstanceAxios';

export const usePerfil = () => {
    const { user, setUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                password: ''
            });
        }
    }, [user]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const saveProfile = async () => {
        setLoading(true);
        try {
            // No enviamos password si está vacío
            const payload = { ...formData };
            if (!payload.password) delete (payload as any).password;

            const response = await apiAuth.put('usuarios/actualizar-perfil/', payload);
            // Actualizamos el estado global para que el resto de la app vea los cambios
            setUser({ ...user, ...response.data });
            setIsEditing(false);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.response?.data?.error || "Error al actualizar" };
        } finally {
            setLoading(false);
        }
    };

    const toggleEdit = () => {
        if (isEditing && user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                password: ''
            });
        }
        setIsEditing(!isEditing);
    };

    return { formData, isEditing, loading, handleInputChange, saveProfile, toggleEdit, user };
};