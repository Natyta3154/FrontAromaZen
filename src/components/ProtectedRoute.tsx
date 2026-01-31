import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user, loading } = useAuth(); // Usamos el contexto global

    if (loading) return <div className="flex h-screen items-center justify-center font-serif">Verificando esencia...</div>;

    // Si no hay usuario en el contexto, redirigimos al login
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;