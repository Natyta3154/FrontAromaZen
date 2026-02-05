import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { loginRequest, logoutRequest, checkSessionRequest } from '../services/UsuarioService';
import type { Usuario } from '../types';

// 1. Definimos la interfaz del Contexto
interface AuthContextType {
    user: Usuario | null;
    setUser: (user: Usuario | null) => void; 
    login: (email: string, pass: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

// 2. Inicializamos el Contexto (¡Esto faltaba!)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setInternalUser] = useState<Usuario | null>(() => {
        const saved = localStorage.getItem('user');
        // Manejamos el parseo con cuidado
        try {
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });
    const [loading, setLoading] = useState(true);

    // 3. Corregimos el tipo de userData de 'any' a 'Usuario | null'
    const setUser = (userData: Usuario | null) => {
        if (userData) {
            const updatedUser = { ...userData };
            setInternalUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
            setInternalUser(null);
            localStorage.removeItem('user');
        }
    };

   useEffect(() => {
    const checkSession = async () => {
        try {
            const data = await checkSessionRequest();
            
            // Ajuste: En tu backend corregido, 'data' ya contiene 
            // 'username', 'first_name', etc., si 'authenticated' es true.
            if (data.authenticated) {
                // Pasamos 'data' completo porque ahí están los nombres
                setUser(data); 
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    checkSession();
}, []);

    const login = async (email: string, pass: string) => {
        const data = await loginRequest(email, pass);
        // Asumiendo que loginRequest devuelve el objeto Usuario directamente o dentro de .user
        const userToLogin = data.user ? data.user : data;
        setUser(userToLogin);
    };

    const logout = async () => {
        try {
            await logoutRequest();
        } catch (error) {
            console.error("Error en servidor, procediendo a limpieza manual");
        } finally {
            setUser(null);
            localStorage.clear();
            window.location.replace('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {/* Solo renderizamos los hijos cuando terminó de chequear la sesión */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};