import React, { useState } from 'react';
import { X, Plus, Minus, Star, ShoppingBag } from 'lucide-react';
import type { Producto } from '../../types';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

interface QuickViewModalProps {
    product: Producto;
    onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCartModal = () => {
        addToCart(product, quantity);
        toast.success(`${quantity} x ${product.nombre} añadido(s)`, {
            style: { borderRadius: '1rem', background: '#333', color: '#fff', fontFamily: 'serif' },
            iconTheme: { primary: '#D4AF37', secondary: '#FFF' },
        });
        onClose();
    };

    const isOutOfStock = !product.stock || product.stock <= 0;

    return (
        <div className="fixed inset-0 bg-brand-stone/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn flex flex-col lg:flex-row gap-6">
                <button onClick={onClose} className="absolute top-4 right-4 text-brand-stone hover:text-brand-gold p-2 rounded-full bg-brand-sand/50 transition-colors">
                    <X size={24} />
                </button>

                <div className="lg:w-1/2 flex-shrink-0">
                    <img src={product.imagen} alt={product.nombre} className="w-full h-80 lg:h-full object-cover rounded-2xl border border-brand-sand/50" />
                </div>

                <div className="lg:w-1/2 flex flex-col justify-between space-y-4">
                    <div>
                        <span className="text-sm font-bold text-brand-gold uppercase tracking-widest">{product.categoria_nombre || 'Artesanal'}</span>
                        <h2 className="text-3xl font-serif font-bold text-brand-stone mt-2 mb-2">{product.nombre}</h2>
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    fill={i < Math.round(product.promedio_estrellas || product.rating || 0) ? "#D4AF37" : "none"}
                                    stroke={i < Math.round(product.promedio_estrellas || product.rating || 0) ? "#D4AF37" : "#E2E2E2"}
                                />
                            ))}
                            <span className="text-sm text-brand-olive opacity-60 ml-2">({product.total_reseñas || 0} reseñas)</span>
                        </div>
                        <p className="text-brand-olive text-base leading-relaxed mb-4">{product.descripcion}</p>
                        <p className={`font-bold text-lg mb-2 ${!isOutOfStock ? 'text-brand-stone' : 'text-red-500'}`}>
                            Stock: <span className="text-brand-gold">{product.stock || 0}</span> unidades disponibles
                        </p>
                    </div>

                    <div className="border-t border-brand-sand pt-4 mt-auto">
                        <p className="text-4xl font-serif font-bold text-brand-stone mb-4">${product.precio}</p>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center border border-brand-sand rounded-xl bg-brand-cream">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    className="p-3 hover:text-brand-gold transition-colors"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="px-5 py-3 text-brand-stone font-bold text-lg min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(prev => (prev < (product.stock ?? 0)) ? prev + 1 : prev)}
                                    disabled={quantity >= (product.stock ?? 0)}
                                    className="p-3 hover:text-brand-gold transition-colors disabled:opacity-30"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handleAddToCartModal}
                            disabled={isOutOfStock}
                            className={`w-full px-6 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all ${!isOutOfStock ? 'bg-brand-gold text-white hover:brightness-110 shadow-lg shadow-brand-gold/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                            <ShoppingBag size={20} /> {!isOutOfStock ? 'Añadir al carrito' : 'Sin Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
