import { useState } from 'react';
import { Search } from 'lucide-react';
import type { Producto } from '../types';
import { useProductos } from '../hooks/UseProductos';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { ProductSkeleton } from '../components/common/Skeleton';
import { ProductCard } from '../components/products/ProductCard';
import { QuickViewModal } from '../components/products/QuickViewModal';

const Catalogo = () => {
    // 1. CAMBIO VITAL: Usar 'false' para obtener TODOS los productos y las categorías
    const { productos, categorias, loading, error } = useProductos(false);

    const { addToCart } = useCart();
    const [categoriaActiva, setCategoriaActiva] = useState<number | "Todos">("Todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

    const handleAddQuick = (p: Producto) => {
        addToCart(p);
        toast.success(`${p.nombre} añadido al carrito`, {
            style: { borderRadius: '1rem', background: '#333', color: '#fff', fontFamily: 'serif' },
            iconTheme: { primary: '#D4AF37', secondary: '#FFF' },
        });
    };

    // --- FILTRADO REFORZADO ---
    const filteredProducts = productos.filter((p) => {
        // Filtro de búsqueda por nombre (limpio)
        const cumpleBusqueda = p.nombre.toLowerCase().includes(searchTerm.trim().toLowerCase());

        // Filtro de categoría: Forzamos a Number para que la comparación sea exacta
        const cumpleCategoria =
            categoriaActiva === "Todos" ||
            Number(p.categoria) === Number(categoriaActiva);

        return cumpleCategoria && cumpleBusqueda;
    });

    if (error) return <div className="min-h-screen bg-brand-cream flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-brand-cream pb-10">
            {/* Header */}
            <header className="py-12 px-8 bg-white border-b border-brand-sand/50">
                <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-brand-stone">Catálogo Completo</h1>
                        <p className="text-brand-olive opacity-70 mt-2">Explora nuestra selección artesanal.</p>
                    </div>
                    <div className="relative flex-grow max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={20} />
                        <input
                            type="text"
                            placeholder="Busca por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-brand-cream/50 rounded-2xl border border-brand-sand focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                        />
                    </div>
                </div>
            </header>

            <div className="w-full px-4 sm:px-8 mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-72 shrink-0">
                        <div className="bg-white p-6 rounded-3xl border border-brand-sand/50 shadow-sm sticky top-24">
                            <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-4 px-4">Categorías</h3>
                            <ul className="space-y-1">
                                <li>
                                    <button
                                        onClick={() => setCategoriaActiva("Todos")}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${categoriaActiva === "Todos" ? 'bg-brand-olive text-white shadow-md' : 'text-brand-stone hover:bg-brand-sand/40'}`}
                                    >
                                        Todos los productos
                                    </button>
                                </li>

                                {categorias.map((cat) => (
                                    <li key={cat.id}>
                                        <button
                                            onClick={() => setCategoriaActiva(cat.id)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${categoriaActiva === cat.id ? 'bg-brand-olive text-white shadow-md' : 'text-brand-stone hover:bg-brand-sand/40'}`}
                                        >
                                            {cat.nombre}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <main className="flex-grow">
                        {loading ? (
                            <ProductSkeleton />
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((p) => (
                                    <ProductCard
                                        key={p.id}
                                        producto={p}
                                        onQuickView={setSelectedProduct}
                                        onAddToCart={handleAddQuick}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-brand-sand">
                                <p className="text-brand-olive font-serif text-xl">No encontramos productos en esta armonía.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
            {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
        </div>
    );
};

export default Catalogo;
