import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Flower2, LogOut, ShieldCheck, ChevronDown, Settings } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ADMIN_URL } from '../api/InstanceAxios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuth();
  const { cart } = useCart(); // Accedemos al carrito real

  // Calculamos la cantidad total sumando las cantidades de cada item
  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/nosotros', label: 'Nosotros' },
    { to: '/contacto', label: 'Contacto' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-24 flex items-center ${scrolled ? 'bg-brand-cream/95 backdrop-blur-xl shadow-md border-b border-brand-sand' : 'bg-brand-cream border-b border-brand-sand/50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between h-20 items-center">

            {/* 1. IZQUIERDA: Logo */}
            <div className="flex-shrink-0 lg:w-1/4">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative bg-brand-gold p-2 rounded-xl transform group-hover:scale-105 transition-transform shadow-sm">
                  <Flower2 className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-brand-stone tracking-tight">AromaZen</span>
                  <span className="text-[10px] text-brand-olive tracking-widest uppercase font-medium">Esencias Naturales</span>
                </div>
              </Link>
            </div>

            {/* 2. CENTRO: Menú Desktop */}
            <div className="hidden lg:flex flex-grow justify-center">
              <div className="flex space-x-1 items-center bg-brand-sand/20 px-2 py-1.5 rounded-2xl border border-brand-sand/30">
                {navLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="px-5 py-2 text-brand-stone font-medium text-sm hover:text-brand-gold transition-all rounded-xl hover:bg-white/50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. DERECHA: Usuario y Carrito */}
            <div className="hidden lg:flex items-center justify-end space-x-4 lg:w-1/4">

              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 px-4 py-2 bg-white border border-brand-sand rounded-2xl hover:shadow-md transition-all active:scale-95"
                  >
                    <div className="w-7 h-7 bg-brand-olive/10 rounded-full flex items-center justify-center">
                      <User size={14} className="text-brand-olive" />
                    </div>
                    <span className="font-bold text-brand-stone text-sm">
                      {user.first_name ? `Hola, ${user.first_name}` : user.username}
                    </span>
                    <ChevronDown size={14} className={`text-brand-olive/50 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-[2rem] shadow-xl border border-brand-sand overflow-hidden py-2 z-[60] animate-in slide-in-from-top-2 duration-200">
                      <div className="px-5 py-3 border-b border-brand-sand/50 mb-1">
                        <p className="text-[10px] text-brand-olive uppercase tracking-widest font-bold">Sesión activa</p>
                        <p className="text-sm text-brand-stone truncate font-medium">{user.email}</p>
                      </div>

                      {user.is_staff && (
                        <a href={ADMIN_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-5 py-3 text-sm text-brand-gold hover:bg-brand-gold/5 transition-colors font-bold">
                          <ShieldCheck size={18} /> Panel Admin
                        </a>
                      )}

                      <Link to="/perfil" className="flex items-center gap-3 px-5 py-3 text-sm text-brand-stone hover:bg-brand-cream transition-colors" onClick={() => setShowUserMenu(false)}>
                        <Settings size={18} className="text-brand-olive" /> Mi Perfil
                      </Link>

                      <hr className="my-1 border-brand-sand/50" />

                      <button onClick={() => { logout(); setShowUserMenu(false); }} className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium">
                        <LogOut size={18} /> Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="px-5 py-2 bg-brand-olive text-white rounded-xl font-bold hover:bg-brand-gold transition-all text-sm shadow-sm">
                  Iniciar Sesión
                </Link>
              )}

              {/* CARRITO DINÁMICO */}
              <Link
                to="/carrito"
                className="relative p-2.5 bg-brand-stone text-white rounded-xl hover:scale-105 transition-all shadow-lg shadow-brand-stone/20 inline-flex items-center justify-center"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-brand-cream animate-in fade-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Menú Móvil */}
            <div className="lg:hidden flex items-center space-x-4">
              <Link to="/carrito" className="relative p-2 text-brand-stone">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-gold text-white text-[8px] rounded-full h-4 w-4 flex items-center justify-center border border-brand-cream font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-brand-stone">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Overlay Móvil */}
        <div className={`lg:hidden absolute top-24 left-0 right-0 overflow-hidden transition-all duration-500 bg-brand-cream border-b border-brand-sand ${isOpen ? 'max-h-[600px] shadow-2xl' : 'max-h-0'}`}>
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setIsOpen(false)} className="block px-4 py-3 text-brand-stone hover:bg-brand-sand/20 rounded-xl font-medium">
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-brand-sand/50 space-y-2">
              {user ? (
                <>
                  <Link to="/perfil" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-3 bg-brand-sand/30 text-brand-stone rounded-xl font-bold italic">Mi Perfil</Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="w-full py-3 bg-red-50 text-red-500 rounded-xl font-bold">Cerrar Sesión</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-3 bg-brand-gold text-white rounded-xl font-bold uppercase tracking-wider">Entrar</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;