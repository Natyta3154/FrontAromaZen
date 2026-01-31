import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Wind, Sparkles, Quote } from 'lucide-react';
import { useHomeData } from '../hooks/PostTestimonios';
import { useProductos } from '../hooks/UseProductos';
import { ProductSkeleton, BlogSkeleton } from '../components/common/Skeleton';
import { ProductCard } from '../components/products/ProductCard';

const Home = () => {
  // 1. Datos de Blog y Testimonios
  const { posts, testimonios, loading: loadingHome } = useHomeData();

  // 2. Datos de Productos Destacados (desde DB vía Hook parametrizado)
  const { productos: destacados, loading: loadingProductos } = useProductos(true);

  return (
    <div className="relative overflow-hidden bg-brand-cream">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-20"
            alt="Fondo zen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-olive/50 to-brand-olive"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl pt-20">
          <div className="flex justify-center mb-6">
            <span className="bg-brand-sand text-brand-olive px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              <Sparkles size={16} /> Artesanía en cada aroma
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-stone mb-6 leading-tight">
            Eleva tu energía con <span className="text-brand-gold">AromaZen</span>
          </h1>
          <p className="text-lg md:text-xl text-black mb-10 max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra colección exclusiva de sahumerios artesanales creados para transformar tu espacio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogo" className="bg-brand-gold text-white px-8 py-4 rounded-2xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 group">
              Explorar Catálogo <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 bg-white border-y border-brand-sand/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { Icon: Leaf, title: "100% Natural", desc: "Sin químicos sintéticos." },
            { Icon: Wind, title: "Aromas Duraderos", desc: "Más de 60 min de intensidad." },
            { Icon: Sparkles, title: "Hecho a Mano", desc: "Cada vara es artesanal." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-brand-cream p-4 rounded-2xl text-brand-gold mb-4 border border-brand-sand/50">
                <item.Icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-stone">{item.title}</h3>
              <p className="text-brand-olive opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Productos Destacados - CONEXIÓN CON DB */}
      <section className="py-20 bg-brand-olive">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif text-center text-brand-stone mb-12">Nuestros Favoritos</h2>

          {loadingProductos ? (
            <ProductSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.isArray(destacados) && destacados.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  showDescription={true}
                  compact={true}
                />
              ))}

            </div>
          )}
        </div>
      </section>

      {/* Blog Feed con Skeleton integrado */}
      <section className="py-20 bg-brand-cream border-y border-brand-sand/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif text-center text-brand-stone mb-12">Blog y Rituales Zen</h2>

          {loadingHome ? (
            <BlogSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.isArray(posts) && posts.map((post) => (
                <div key={post.id} className="bg-brand-cream rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row border border-brand-sand/50 group hover:shadow-md transition-shadow">
                  <div className="w-full md:w-1/2 h-60 overflow-hidden">
                    <img
                      src={post.imagen}
                      alt={post.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 md:w-1/2 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-brand-olive opacity-50 uppercase tracking-widest">
                        {post.fecha_publicacion ? new Date(post.fecha_publicacion).toLocaleDateString() : 'Reciente'}
                      </span>
                      <h3 className="text-2xl font-bold text-brand-stone mt-2 line-clamp-2">{post.titulo}</h3>
                      <p className="text-brand-olive opacity-70 mt-3 line-clamp-3">
                        {post.contenido?.replace(/<[^>]*>?/gm, '')}
                      </p>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-brand-gold font-semibold mt-4 hover:text-brand-olive transition-colors group/link"
                    >
                      Leer más
                      <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonios Dinámicos */}
      <section className="py-20 bg-brand-olive text-brand-cream">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Quote size={48} className="mx-auto mb-6 text-brand-gold opacity-50" />
          <h2 className="text-4xl font-serif text-white mb-10">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {Array.isArray(testimonios) && testimonios.map((testimonio) => (
              <div key={testimonio.id} className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="text-lg italic mb-4 opacity-90">"{testimonio.comentario}"</p>
                <div className="flex justify-center items-center mb-2">
                  {[...Array(testimonio.puntuacion)].map((_, i) => (
                    <Quote key={i} size={20} fill="#D4AF37" stroke="none" className="mx-0.5" />
                  ))}
                </div>
                <p className="font-bold text-brand-gold">— {testimonio.usuario_nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-brand-cream text-center">
        <h2 className="text-4xl font-serif text-brand-stone mb-6">¿Listo para un viaje sensorial?</h2>
        <Link to="/catalogo" className="bg-brand-gold text-white px-10 py-5 rounded-2xl font-bold text-xl hover:brightness-110 shadow-2xl shadow-brand-gold/20">
          Comprar Ahora
        </Link>
      </section>
    </div>
  );
};

export default Home;
