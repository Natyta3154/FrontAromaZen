import React from 'react';
import { Star, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Producto } from '../../types';

interface ProductCardProps {
    producto: Producto;
    onQuickView?: (producto: Producto) => void;
    onAddToCart?: (producto: Producto) => void;
    showDescription?: boolean;
    compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    producto,
    onQuickView,
    onAddToCart,
    showDescription = true,
    compact = false
}) => {
    const isOutOfStock = !producto.stock || producto.stock <= 0;

    return (
        <div className={`bg-white rounded-[2rem] border border-brand-sand/50 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 group`}>
            <div
                className={`relative overflow-hidden cursor-pointer ${compact ? 'h-56' : 'h-72'}`}
                onClick={() => onQuickView?.(producto)}
            >
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-brand-stone">
                    <Star size={12} className="text-brand-gold fill-brand-gold" />
                    {producto.promedio_estrellas || producto.rating || 0}
                </div>
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-white px-4 py-2 rounded-full text-brand-stone font-bold shadow-sm">Sin Stock</span>
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-tighter mb-1">
                    {producto.categoria_nombre || 'Artesanal'}
                </span>
                <h3 className={`font-bold text-brand-stone mb-1 ${compact ? 'text-lg' : 'text-xl'}`}>{producto.nombre}</h3>

                {showDescription && (
                    <p className="text-sm text-brand-olive/60 mb-4 line-clamp-2">{producto.descripcion}</p>
                )}

                <div className="mt-auto flex items-center justify-between gap-4">
                    <span className={`font-serif font-bold text-brand-stone ${compact ? 'text-xl' : 'text-2xl'}`}>
                        ${producto.precio}
                    </span>

                    {onAddToCart ? (
                        <button
                            onClick={() => onAddToCart(producto)}
                            disabled={isOutOfStock}
                            className={`px-5 py-3 rounded-xl cursor-pointer text-xs font-bold transition-all flex items-center gap-2 ${!isOutOfStock ? 'bg-brand-gold text-white hover:bg-brand-stone' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                            <Plus size={14} /> {!isOutOfStock ? 'Añadir' : 'Agotado'}
                        </button>
                    ) : (
                        <Link
                            to={`/catalogo`}
                            className="bg-brand-gold text-white p-2 rounded-full hover:brightness-110 transition-all"
                        >
                            <ArrowRight size={18} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
