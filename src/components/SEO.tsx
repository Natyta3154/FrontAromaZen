/*¿Qué logramos con esto?
Ahora, cuando alguien busque "Sahumerios de Sándalo", Google podrá mostrar un resultado específico de tu tienda con ese título, en lugar de mostrar siempre la página de inicio.*/



import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

const SEO = ({ title, description }: SEOProps) => {
  useEffect(() => {
    // Actualiza el título de la pestaña
    document.title = `${title} | AromaZen`;

    // Actualiza la meta descripción para Google
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Esencias naturales y sahumerios artesanales para tu bienestar.');
    }
  }, [title, description]);

  return null; // Este componente no renderiza nada visual
};

export default SEO;