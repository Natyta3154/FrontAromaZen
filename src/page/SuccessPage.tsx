import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Agregamos useSearchParams
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // 1. Extraer datos de la URL para el log
        const paymentId = searchParams.get('payment_id');
        const status = searchParams.get('status');
        const merchantOrderId = searchParams.get('merchant_order_id');

        // 2. --- LOG DE COMPRA (Instrucción 2026-01-06) ---
        console.log(`[LOG] Compra Exitosa - AromaZen`);
        console.log(`ID Pago MP: ${paymentId}`);
        console.log(`Estado: ${status}`);
        console.log(`Orden de Venta: ${merchantOrderId}`);
        console.log(`Fecha: ${new Date().toLocaleString()}`);

        // 3. --- LIMPIEZA CRÍTICA ---
        clearCart(); 
        
    }, [clearCart, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
            <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-stone-100 max-w-md">
                <CheckCircle className="mx-auto text-green-500 mb-6" size={64} strokeWidth={1} />
                <h1 className="text-3xl font-serif text-stone-800 mb-4">¡Gracias por tu compra!</h1>
                <p className="text-stone-600 mb-8">
                    Tus sahumerios AromaZen están en camino para llenar tu hogar de paz.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-all"
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;