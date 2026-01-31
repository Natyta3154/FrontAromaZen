import { Link } from 'react-router-dom';
import { Flower2, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-olive text-brand-sand pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Branding y Esencia */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-brand-gold p-2 rounded-lg">
                <Flower2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                Aroma<span className="text-brand-gold">Zen</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-brand-sand/70">
              Transformando espacios y energías a través de sahumerios artesanales premium. Hechos a mano con ingredientes 100% naturales.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-sand hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-brand-sand hover:text-brand-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-brand-sand hover:text-brand-gold transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-brand-gold font-bold mb-6 uppercase text-xs tracking-widest">Navegación</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/catalogo" className="hover:text-brand-gold transition-colors">Catálogo Completo</Link></li>
              <li><Link to="/nosotros" className="hover:text-brand-gold transition-colors">Nuestra Historia</Link></li>
              <li><Link to="/contacto" className="hover:text-brand-gold transition-colors">Contacto</Link></li>
              <li><Link to="/login" className="hover:text-brand-gold transition-colors">Mi Cuenta</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto Directo */}
          <div>
            <h3 className="text-brand-gold font-bold mb-6 uppercase text-xs tracking-widest">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-brand-gold" />
                <span>Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-gold" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-brand-gold" />
                <span>hola@aromazen.com</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Newsletter */}
          <div>
            <h3 className="text-brand-gold font-bold mb-6 uppercase text-xs tracking-widest">Suscríbete</h3>
            <p className="text-sm text-brand-sand/70 mb-4">Recibe ofertas exclusivas y rituales energéticos.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="w-full bg-brand-olive/20 border border-brand-olive/30 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-sand/30"
              />
              <button className="absolute right-2 top-2 bg-brand-gold p-1.5 rounded-lg hover:bg-brand-olive transition-colors shadow-lg">
                <ArrowRight size={18} className="text-white" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-brand-olive/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-sand/50 uppercase tracking-widest font-medium">
          <p>© {currentYear} AromaZen Sahumerios. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-brand-gold transition-colors">Términos</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;