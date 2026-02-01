import { useState, useEffect } from 'react';
import { api } from '../api/InstanceAxios';
import type { Testimonio } from '../types';

export const useHomeData = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Añadimos estado de error

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Promise.all es excelente para la carga inicial paralela
        const [postsRes, testimoniosRes] = await Promise.all([
          api.get('blog/'), // Nota: Quitamos el ?limit=3 si prefieres manejarlo en el map o en Django
          api.get('blog/testimonios/')
        ]);

        // Manejo de datos flexible (soporta DRF paginado o listas simples)
        const postsData = Array.isArray(postsRes.data) ? postsRes.data : postsRes.data.results || [];
        const testimoniosData = Array.isArray(testimoniosRes.data) ? testimoniosRes.data : testimoniosRes.data.results || [];

        // Si solo quieres 3 posts en el Home, los cortamos aquí por seguridad
        setPosts(postsData.slice(0, 3));
        setTestimonios(testimoniosData);
        
      } catch (err: any) {
        console.error("❌ Error cargando datos del Home:", err);
        setError("No pudimos conectar con AromaZen. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { posts, testimonios, loading, error };
};