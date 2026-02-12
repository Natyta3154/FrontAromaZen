import { useState, useEffect } from 'react';
import { fetchBlog, fetchTestimonios } from '../services/ProductoService'; // Asegúrate de que la ruta al service sea correcta
import type { Testimonio } from '../types';

export const useHomeData = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Usamos las funciones del service que ya tienen las URLs corregidas
        const [postsData, testimoniosData] = await Promise.all([
          fetchBlog(),
          fetchTestimonios()
        ]);

        // Manejo de datos (DRF puede devolver .results si hay paginación)
        const finalPosts = Array.isArray(postsData) ? postsData : postsData.results || [];
        const finalTestimonios = Array.isArray(testimoniosData) ? testimoniosData : testimoniosData.results || [];

        setPosts(finalPosts.slice(0, 3));
        setTestimonios(finalTestimonios);
        
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