import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { realizarCompra } from '../services/ProductoService';
import { api } from '../api/InstanceAxios';

const CartPage = () => {
    const { cart, removeFromCart, total } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // ✅ POSICIÓN CORRECTA: Los Hooks siempre en la raíz del componente
    useEffect(() => {
        const prepareCheckout = async () => {
            try {
                // Ping preventivo para asegurar que el backend entregue el csrftoken
                await api.get('productos/categorias/'); 
            } catch (err) {
                console.warn("Aviso: No se pudo refrescar el token CSRF preventivamente.");
            }
        };
        
        if (cart.length > 0) {
            prepareCheckout();
        }
    }, [cart.length]); // Se ejecuta al cargar o si el carrito cambia

    const handleCheckout = async () => {
        if (!user || !user.email) {
            toast.error("Acceso denegado: Debes estar registrado y logueado.");
            navigate('/login');
            return;
        }

        setIsLoading(true);
        try {
            const itemsParaBackend = cart.map(item => ({
                producto_id: item.id,
                cantidad: item.cantidad || 1
            }));

            // Llamada al servicio
            const data = await realizarCompra({ items: itemsParaBackend });
            const { url_pago, preference_id, pedido_id } = data;

            if (url_pago) {
                // 📝 LOG DE COMPRA (Instrucción 2026-01-06)
                console.log(`[LOG] Pago Iniciado. Pedido: #${pedido_id} | Pref: ${preference_id}`);
                
                toast.success("Redirigiendo a Mercado Pago...");
                window.location.href = url_pago;
            }
        } catch (error: any) {
            console.error("Error en checkout:", error.response?.data || error.message);
            const msg = error.response?.data?.error || "Error al procesar el pago";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    // --- RENDERIZADO (Se mantiene igual) ---
    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fdfbf7] px-4">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-light text-stone-700 italic font-serif">Tu carrito está en paz...</h2>
                    <p className="text-stone-500">Aún no has seleccionado ningún aroma para tu hogar.</p>
                    <button
                        onClick={() => navigate('/catalogo')}
                        className="mt-6 px-8 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-all duration-300"
                    >
                        Explorar Sahumerios
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fdfbf7] py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-serif font-extralight text-stone-800 mb-12 text-center">
                    Tu Selección <span className="italic">AromaZen</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                <img src={item.imagen} alt={item.nombre} className="w-24 h-24 object-cover rounded-lg" />
                                <div className="ml-6 flex-1">
                                    <h3 className="text-lg font-medium text-stone-800">{item.nombre}</h3>
                                    <p className="text-stone-500 text-sm">Cantidad: {item.cantidad}</p>
                                    <p className="text-stone-900 font-semibold">${item.precio.toLocaleString()}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="p-2 text-stone-300 hover:text-red-400">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 h-fit sticky top-8">
                        <h2 className="text-2xl font-light mb-6 font-serif">Resumen</h2>
                        <div className="flex justify-between items-center py-6 border-t border-stone-200">
                            <span className="text-xl font-medium">Total</span>
                            <span className="text-2xl font-bold">${total.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 ${
                                isLoading ? 'bg-stone-300 text-stone-500' : 'bg-stone-800 text-white hover:bg-stone-700'
                            }`}
                        >
                            {isLoading ? <><Loader2 className="animate-spin" /> Procesando...</> : <><ShoppingBag /> Finalizar Compra</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;