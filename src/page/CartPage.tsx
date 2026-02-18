import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { realizarCompra } from '../services/ProductoService';

const CartPage = () => {
    const { cart, removeFromCart, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


// 🛡️ EFECTO DE SEGURIDAD: Asegura que tengamos el token CSRF al cargar el carrito
    useEffect(() => {
        const prepareCheckout = async () => {
            try {
                // Hacemos una petición GET simple (por ejemplo, a categorías o productos)
                // Esto fuerza a Django a enviar el header Set-Cookie: csrftoken
                await api.get('productos/categorias/'); 
            } catch (err) {
                console.warn("No se pudo refrescar el token CSRF");
            }
        };
        prepareCheckout();
    }, []);



    const handleCheckout = async () => {
        if (!user || !user.email) {
            toast.error("Acceso denegado: Debes estar registrado y logueado.");
            navigate('/login');
            return;
        }

        setIsLoading(true);
        try {
            // 2. Formatear items para el backend
            const itemsParaBackend = cart.map(item => ({
                producto_id: item.id,
                cantidad: item.cantidad || 1
            }));

            /**
             * Enviamos la petición al backend. 
             * La cookie 'auth_token' se envía sola gracias a withCredentials en InstanceAxios.
             */
          const data = await realizarCompra({ items: itemsParaBackend });

            const { url_pago, preference_id, pedido_id } = data;

            if (data.url_pago) {
                // --- LOG DE COMPRA (Instrucción 2026-01-06) ---
                console.log(`[LOG] Pago Iniciado. Pedido: #${pedido_id} | Pref: ${preference_id}`);
                toast.success("Redirigiendo a Mercado Pago...");

                // 3. REDIRECCIÓN DIRECTA
                window.location.href = data.url_pago;
            }
        } catch (error: any) {
            console.error("Error en checkout:", error.response?.data || error.message);
            const msg = error.response?.data?.error || "Error al procesar el pago";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    // --- ESTADO: CARRITO VACÍO ---
    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fdfbf7] px-4">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-light text-stone-700 italic font-serif">Tu carrito está en paz...</h2>
                    <p className="text-stone-500">Aún no has seleccionado ningún aroma para tu hogar.</p>
                    <button
                        onClick={() => navigate('/catalogo')}
                        className="mt-6 px-8 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-all duration-300 tracking-wide"
                    >
                        Explorar Sahumerios
                    </button>
                </div>
            </div>
        );
    }

    // --- ESTADO: CARRITO CON PRODUCTOS ---
    return (
        <div className="min-h-screen bg-[#fdfbf7] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-serif font-extralight text-stone-800 mb-12 text-center tracking-tighter">
                    Tu Selección <span className="italic">AromaZen</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Lista de Productos */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                <img src={item.imagen} alt={item.nombre} className="w-24 h-24 object-cover rounded-lg bg-stone-50" />
                                <div className="ml-6 flex-1">
                                    <h3 className="text-lg font-medium text-stone-800">{item.nombre}</h3>
                                    <p className="text-stone-500 text-sm italic">
                                        Cantidad: {item.cantidad}
                                    </p>
                                    <p className="text-stone-900 font-semibold mt-1">${(item.precio).toLocaleString()}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-stone-300 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={20} strokeWidth={1.5} />
                                </button>
                            </div>
                        ))}
                        <div className="flex justify-between items-center px-2">
                            <button onClick={clearCart} className="text-stone-400 text-sm hover:text-stone-600 underline">
                                Vaciar Carrito
                            </button>
                            <button onClick={() => navigate('/catalogo')} className="text-stone-600 text-sm hover:text-stone-800 font-medium">
                                + Agregar más sahumerios
                            </button>
                        </div>
                    </div>

                    {/* Resumen de Compra */}
                    <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 h-fit sticky top-8 shadow-sm">
                        <h2 className="text-2xl font-light text-stone-800 mb-6 font-serif">Resumen</h2>

                        <div className="space-y-4 border-b border-stone-200 pb-6">
                            <div className="flex justify-between text-stone-600">
                                <span>Subtotal</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Envío</span>
                                <span className="text-green-600 text-sm font-medium italic">Bonificado</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-6">
                            <span className="text-xl font-medium text-stone-800">Total</span>
                            <span className="text-2xl font-bold text-stone-900">${total.toLocaleString()}</span>
                        </div>

                        {/* Botón de Acción Único */}
                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${isLoading
                                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                                : 'bg-stone-800 text-white hover:bg-stone-700 shadow-lg active:scale-95'
                                }`}
                        >
                            {isLoading ? (
                                <><Loader2 className="animate-spin" size={20} /> Procesando...</>
                            ) : (
                                <><ShoppingBag size={20} /> Finalizar Compra</>
                            )}
                        </button>

                        <p className="text-[10px] text-stone-400 text-center mt-4 uppercase tracking-widest">
                            Pago seguro vía Mercado Pago
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;

