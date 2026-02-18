import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './page/Home';
import Footer from './components/Footer';
import Catalogo from './page/Catalogo';
import AuthPage from './page/loginRegistro'; // Tu nuevo login/registro
import ProtectedRoute from './components/ProtectedRoute'; // El que creamos antes
import { AuthProvider } from './context/AuthContext';
import PerfilPage from './page/PerfilPage';
import CartPage from './page/CartPage';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Nosotros from './page/Nosotros';
import Contacto from './page/Contacto';
import PostDetalle from './page/PostDetalle';
import SuccessPage from './page/SuccessPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Este componente permite que los mensajes se vean */}
          <Toaster position="bottom-right" reverseOrder={false} />
          <div className="min-h-screen bg-[#fdfbf7] flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                {/* LA RUTA DEL CARRITO */}
                <Route path="/carrito" element={<CartPage />} />
                {/* Esta es la clave para limpiar el carrito */}
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/contacto" element={<Contacto />} /><Route path="/blog/:slug" element={<PostDetalle />} />
                {/* El :slug es una variable que React capturará */}



                {/* Rutas Protegidas: Solo entran si hay Cookie */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/perfil" element={<PerfilPage />} />
                  <Route path="/success" element={<SuccessPage />} />
                </Route>
                {/* Redirección automática si la ruta no existe */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
