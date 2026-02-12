import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPostPorSlug } from '../services/ProductoService'; // Debes crear esta función

const PostDetalle = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        if (slug) {
            fetchPostPorSlug(slug)
            .then(setPost)
            .catch(() => console.error("Ritual no encontrado"));
        }
    }, [slug]);

    if (!post) return <div className="py-20 text-center">Cargando ritual...</div>;

    return (
        <div className="bg-brand-cream min-h-screen pt-28 pb-20">
            <article className="max-w-3xl mx-auto px-4">
                <img src={post.imagen} alt={post.titulo} className="w-full h-[400px] object-cover rounded-3xl shadow-lg mb-10" />
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-stone mb-6">{post.titulo}</h1>
                <div className="flex items-center gap-4 text-brand-olive opacity-60 mb-10 border-b border-brand-sand pb-6">
                    <span>{new Date(post.fecha_publicacion).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Lectura de 5 min</span>
                </div>
                {/* Usamos dangerouslySetInnerHTML porque Django envía HTML del editor de texto */}
                <div 
                    className="prose prose-stone lg:prose-xl text-brand-stone leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.contenido }} 
                />
            </article>
        </div>
    );
};

export default PostDetalle;