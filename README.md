# Frontend - Million Project

Este proyecto es el **frontend** de la aplicación Million, desarrollado con **React 18 + Vite + TypeScript**.

---

## 🛠 Requisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Un navegador moderno (Chrome, Edge, Firefox)

---

## ⚡ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/frontend-million.git
cd frontend-million
```

2. Instala las dependencias:

`npm install o yarn install`

3. Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto:

### URL de tu backend (asegúrate que sea HTTPS en producción)

VITE_API_URL=http://localhost:5110/api

## 🚀 Ejecutar en desarrollo

`npm run dev o yarn dev`

## Build para producción

`npm run build o yarn build`

## 📋 Descripción de Carpetas

#### `_api/`

Configuración de endpoints y fetchers para consumir APIs externas.

#### `_feature/`

Módulos de funcionalidades específicas de la aplicación, organizados por característica.

#### `_layouts/`

Oulet de la aplicación.

#### `_models/`

Definición de modelos de datos y estructuras utilizadas en la aplicación con zod.

#### `_pages/`

Componentes de página principal que representan las diferentes rutas de la aplicación.

#### `_services/`

Servicios de negocio, clientes HTTP y lógica de comunicación con APIs.

#### `_types/`

Definiciones de tipos e interfaces de TypeScript compartidas.

#### `_ui/`

Biblioteca de componentes UI reutilizables (botones, inputs, cards, etc.).

#### `_utils/`

Funciones auxiliares y utilidades generales (helpers, formatters, validators, etc.).

#### `assets/`

Recursos estáticos como imágenes, iconos, fuentes y otros archivos multimedia.

---

### 🚀 Archivos Principales

- **`main.tsx`**: Punto de entrada de la aplicación
- **`App.tsx`**: Componente raíz que contiene la estructura principal
- **`App.css`** / **`index.css`**: Estilos globales y base de la aplicación
- **`swiper.d.ts`**: Declaraciones de tipos adicionales para librerías externas
