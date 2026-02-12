import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importante para la navegación fluida
import {apiAuth} from '../api/InstanceAxios';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    
    const { login } = useAuth(); 
    const navigate = useNavigate(); // Hook para redirigir sin recargar

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // El contexto ahora se encarga de guardar en localStorage y estado
                await login(formData.email, formData.password);
            } else {
                // REGISTRO
                await apiAuth.post('usuarios/registro/', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });
                // Logueo automático tras registro exitoso
                await login(formData.email, formData.password);
            }
            
            // REDIRECCIÓN FLUIDA
            // Usamos navigate para mantener el estado de React vivo
            navigate('/catalogo');
            
        } catch (error: any) {
            // Log detallado para depuración
            console.error("Error en la autenticación:", error.response?.data);
            
            // Mensaje amigable para el usuario
            const errorMsg = error.response?.data?.error || "Ocurrió un error inesperado. Inténtalo de nuevo.";
            alert("Atención: " + errorMsg);
        }
    };

    return (
        <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[3rem] shadow-xl border border-brand-sand p-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-serif font-bold text-brand-stone">
                        {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
                    </h2>
                    <p className="text-brand-olive/60 mt-2 text-sm uppercase tracking-widest">
                        {isLogin ? 'Esencia & Armonía' : 'Únete a nuestra comunidad'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                            <input 
                                type="text" 
                                placeholder="Nombre de usuario"
                                className="w-full pl-12 pr-6 py-4 bg-brand-cream/30 rounded-2xl border border-brand-sand outline-none focus:ring-2 focus:ring-brand-gold/20 text-brand-stone"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                required
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                        <input 
                            type="email" 
                            placeholder="Tu Email"
                            className="w-full pl-12 pr-6 py-4 bg-brand-cream/30 rounded-2xl border border-brand-sand outline-none focus:ring-2 focus:ring-brand-gold/20 text-brand-stone"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                        <input 
                            type="password" 
                            placeholder="Contraseña"
                            className="w-full pl-12 pr-6 py-4 bg-brand-cream/30 rounded-2xl border border-brand-sand outline-none focus:ring-2 focus:ring-brand-gold/20 text-brand-stone"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-brand-olive text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-gold transition-all shadow-lg hover:-translate-y-1">
                        {isLogin ? 'Entrar' : 'Registrarme'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-brand-olive/70">
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="hover:text-brand-gold transition-colors underline decoration-brand-sand underline-offset-4"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;