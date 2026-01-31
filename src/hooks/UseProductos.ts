import { useState, useEffect } from 'react';
import { 
    fetchProductos, 
    fetchProductosDestacados, 
    fetchCategorias, 
    type Categoria 
} from '../services/ProductoService';
import type { Producto } from '../types';

// Cambiamos p0 por soloDestacados para que sea legible
export const useProductos = (soloDestacados: boolean = false) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargarDatos = async () => {
            setLoading(true);
            try {
                if (soloDestacados) {
                    // En el Home solo queremos los favoritos, no necesitamos categorías
                    const destacadosData = await fetchProductosDestacados();
                    setProductos(destacadosData);
                } else {
                    // En el Catálogo sí necesitamos todo
                    const [productosData, categoriasData] = await Promise.all([
                        fetchProductos(),
                        fetchCategorias()
                    ]);
                    setProductos(productosData);
                    setCategorias(categoriasData);
                }
            } catch (err) {
                console.error("Error cargando datos Zen:", err);
                setError("No pudimos conectar con el templo de aromas.");
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [soloDestacados]); // Si el parámetro cambia, el hook se vuelve a ejecutar

    return { productos, categorias, loading, error };
};