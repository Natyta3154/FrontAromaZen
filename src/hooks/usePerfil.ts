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
        // 1. Preparamos el payload (copia limpia)
        const payload = { ...formData };
        
        // 2. Limpieza de campos: quitamos password si está vacío 
        // y nos aseguramos de no enviar el username si el backend no permite cambiarlo
        if (!payload.password) delete (payload as any).password;

        const response = await apiAuth.put('usuarios/actualizar-perfil/', payload);
        
      
        // Si Django devuelve el objeto usuario directamente en data, lo mezclamos.
        // Usamos { ...user } para no perder datos que el backend no devuelve (como el token o ID si no vienen)
        const updatedData = response.data;
        
        setUser({ 
            ...user, 
            ...updatedData, 
            authenticated: true // Nos aseguramos de mantener el estado de login
        });

        setIsEditing(false);
        
        // Limpiamos el campo de password del formulario por seguridad
        setFormData(prev => ({ ...prev, password: '' }));
        
        return { success: true };
    } catch (error: any) {
        console.error("Error en saveProfile:", error);
        return { 
            success: false, 
            error: error.response?.data?.error || "No se pudo actualizar el perfil" 
        };
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