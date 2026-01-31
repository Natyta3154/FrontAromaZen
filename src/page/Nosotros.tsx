
import { Heart, Compass, ShieldCheck, Users } from 'lucide-react';

const Nosotros = () => {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero de Sección - Minimalista */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden bg-brand-olive text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=2000"
            alt="Humo de incienso"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Nuestra Esencia</h1>
          <p className="text-xl opacity-90 leading-relaxed font-light italic">
            "No solo creamos aromas; diseñamos portales hacia tu paz interior."
          </p>
        </div>
      </section>

      {/* La Historia con Imagen de Lado */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000"
              alt="Manos artesanas"
              className="rounded-2xl shadow-2xl relative z-10 w-full h-[500px] object-cover"
            />
          </div>
          <div className="space-y-6">
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm">Desde 2020</span>
            <h2 className="text-4xl font-serif text-brand-stone">El origen de un ritual</h2>
            <p className="text-brand-olive leading-relaxed text-lg">
              AromaZen nació en un pequeño taller familiar buscando la armonía perfecta entre la
              naturaleza y el hogar. Creíamos que los sahumerios industriales habían perdido su alma,
              así que decidimos volver a las raíces.
            </p>
            <p className="text-brand-olive leading-relaxed text-lg">
              Cada vara de incienso que sale de nuestras manos está cargada de intención, utilizando
              resinas naturales, flores secas y aceites esenciales puros, sin químicos que alteren
              tu energía.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestros Pilares - Tarjetas Flotantes */}
      <section className="py-20 bg-white/50 border-y border-brand-sand/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-brand-stone">Valores que nos guían</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Heart,
                title: "Hecho con Amor",
                desc: "Cada producto es moldeado a mano siguiendo técnicas ancestrales de secado natural."
              },
              {
                Icon: Compass,
                title: "Sustentabilidad",
                desc: "Respetamos la tierra. Nuestros empaques son 100% compostables y libres de plástico."
              },
              {
                Icon: ShieldCheck,
                title: "Calidad Pura",
                desc: "Certificamos el origen de cada resina, asegurando una combustión limpia y saludable."
              }
            ].map((pilar, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-brand-sand/20 hover:shadow-xl transition-all duration-300 group">
                <div className="bg-brand-cream w-16 h-16 rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                  <pilar.Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-stone mb-4">{pilar.title}</h3>
                <p className="text-brand-olive/80 leading-relaxed">{pilar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo / Comunidad */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-2 bg-brand-gold/10 rounded-full mb-6 text-brand-gold">
            <Users size={32} />
          </div>
          <h2 className="text-4xl font-serif text-brand-stone mb-8">Más que un equipo, una comunidad</h2>
          <p className="text-xl text-brand-olive font-light leading-relaxed mb-12">
            Somos artesanos, meditadores y amantes de la naturaleza unidos por un mismo propósito:
            ayudarte a crear un santuario en tu propio hogar.
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-sand border-2 border-white shadow-md"></div>
            <div className="w-16 h-16 rounded-full bg-brand-olive/30 border-2 border-white shadow-md"></div>
            <div className="w-16 h-16 rounded-full bg-brand-gold/30 border-2 border-white shadow-md"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;