import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import {enviarContacto} from '../services/ProductoService'; // Asegúrate de que esta sea tu instancia de Axios

const Contacto = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  
  // 1. Agregamos el estado para capturar lo que el usuario escribe
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: 'Consulta General',
    mensaje: ''
  });

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
        await enviarContacto(formData); //Usamos la función del servicio
        setStatus('success');
    } catch (error) {
        setStatus('idle');
    }
};

  // Función para actualizar el estado cuando escriben
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs">Contacto</span>
          <h1 className="text-5xl font-serif text-brand-stone mt-4">¿Hablamos?</h1>
          <p className="text-brand-olive mt-4 max-w-xl mx-auto">
            ¿Tienes dudas sobre un aroma o quieres una colaboración especial? Estamos aquí para escucharte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white rounded-[40px] shadow-sm overflow-hidden border border-brand-sand/30">
          
          {/* Lado Izquierdo: Información (Intacto) */}
          <div className="bg-brand-olive p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif mb-8 text-brand-gold">Información de contacto</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="text-brand-gold shrink-0" />
                  <p className="opacity-80">Calle de los Aromas 123, <br /> Buenos Aires, Argentina</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-brand-gold shrink-0" />
                  <p className="opacity-80">+54 11 1234 5678</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-brand-gold shrink-0" />
                  <p className="opacity-80">hola@aromazen.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 italic font-light">
              "Cada mensaje es una oportunidad para conectar energías."
            </div>
          </div>

          {/* Lado Derecho: Formulario */}
          <div className="p-12">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mb-6">
                  <Sparkles size={40} />
                </div>
                <h3 className="text-2xl font-serif text-brand-stone mb-2">Mensaje Recibido</h3>
                <p className="text-brand-olive">Gracias por conectar. Te responderemos en menos de 24 horas.</p>
                <button 
                  onClick={() => { setStatus('idle'); setFormData({nombre:'', email:'', asunto:'Consulta General', mensaje:''}); }}
                  className="mt-8 text-brand-gold font-bold underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-stone uppercase tracking-tighter">Nombre</label>
                    <input 
                      required
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      type="text" 
                      className="w-full bg-brand-cream/50 border-b border-brand-sand focus:border-brand-gold outline-none py-3 transition-colors"
                      placeholder="Tu nombre..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-stone uppercase tracking-tighter">Email</label>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      className="w-full bg-brand-cream/50 border-b border-brand-sand focus:border-brand-gold outline-none py-3 transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-stone uppercase tracking-tighter">Asunto</label>
                  <select 
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full bg-brand-cream/50 border-b border-brand-sand focus:border-brand-gold outline-none py-3 transition-colors"
                  >
                    <option value="Consulta General">Consulta General</option>
                    <option value="Pedido Mayorista">Pedido Mayorista</option>
                    <option value="Problema con mi envío">Problema con mi envío</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-stone uppercase tracking-tighter">Mensaje</label>
                  <textarea 
                    required
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-brand-cream/50 border-b border-brand-sand focus:border-brand-gold outline-none py-3 transition-colors resize-none"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                  />
                </div>

                <button 
                  disabled={status === 'sending'}
                  className="w-full bg-brand-gold text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {status === 'sending' ? 'Enviando calma...' : (
                    <>Enviar Mensaje <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;