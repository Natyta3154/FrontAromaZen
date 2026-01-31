# AromaZen - Tienda de Sahumerios Artesanales 🌿✨

**AromaZen** es una plataforma de comercio electrónico moderna y minimalista dedicada a la venta de sahumerios artesanales, inciensos y productos para la armonización de espacios. Diseñada con un enfoque zen, busca ofrecer una experiencia de compra tranquila y sensorial.

## 🚀 Características

- **Diseño Premium & Zen**: Interfaz cuidada con una estética artesanal y relajante.
- **Catálogo Dinámico**: Filtrado por categorías y búsqueda en tiempo real.
- **Carrito de Compras**: Gestión suave de productos con persistencia local.
- **Quick View**: Vista rápida de productos para una experiencia más ágil.
- **Blog & Rituales**: Sección dedicada a compartir conocimientos sobre bienestar y aromas.
- **Integración con Checkout**: Lista para pasarelas de pago (MercadoPago).
- **Responsive Design**: Totalmente optimizado para dispositivos móviles y escritorio.

## 🛠️ Tecnologías

Este proyecto está construido con lo último en desarrollo web:

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Notificaciones**: [React Hot Toast](https://react-hot-toast.com/)
- **Servicios**: [Axios](https://axios-http.com/) para comunicación con API Django.

## 📦 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tienda-sahumerios.git
   cd tienda-sahumerios
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar el entorno:**
   Crea un archivo `.env` en la raíz y configura la URL de tu API:
   ```env
   VITE_API_URL=http://localhost:8000/api/
   ```

4. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

## 🏗️ Estructura del Proyecto

- `src/components`: Componentes reutilizables (Card, Modal, Skeleton).
- `src/context`: Gestión de estado global (Autenticación y Carrito).
- `src/hooks`: Lógica de negocio extraída en hooks personalizados.
- `src/page`: Páginas principales (Home, Catálogo, Perfil, etc.).
- `src/services`: Capa de servicios para consumo de API.
- `src/types`: Definiciones de tipos TypeScript para todo el proyecto.

## 🧘 Contribución

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la armonía de AromaZen, siéntete libre de abrir un PR o un issue.

---
Hecho con ❤️ por [Tu Nombre]
