# 💝 Valentines - Experiencia Interactiva de San Valentín

Una aplicación web interactiva de San Valentín creada con Next.js, que incluye mini-juegos divertidos, mensajes de amor personalizados y animaciones hermosas.

## ✨ Características

- 🎮 **Mini-juegos Interactivos**:
  - Cuestionario del Amor
  - Juego de Atrapar Corazones
  - Juego de Memoria con Emojis
  
- 💌 **Mensajes Románticos**: Tarjetas animadas con mensajes de amor especiales
- 🎨 **Diseño Visual Atractivo**: Gradientes, animaciones y efectos flotantes
- 📱 **Responsive**: Se adapta perfectamente a todos los dispositivos
- 🚀 **Optimizado para Producción**: Listo para desplegar en Vercel

## 🚀 Inicio Rápido

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 📦 Despliegue en Vercel

### Opción 1: Desde la Interfaz de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "Add New Project"
4. Importa este repositorio desde GitHub
5. Vercel detectará automáticamente Next.js
6. Haz clic en "Deploy"

### Opción 2: Usando Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Configuración Recomendada para Vercel

- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🎯 Estructura del Proyecto

```
valentines/
├── app/
│   ├── components/
│   │   ├── ValentineCard.tsx    # Tarjeta de mensaje animada
│   │   ├── HeartCatcher.tsx     # Juego de atrapar corazones
│   │   ├── MemoryGame.tsx       # Juego de memoria
│   │   ├── LoveQuiz.tsx         # Cuestionario del amor
│   │   └── FloatingHearts.tsx   # Efectos de fondo
│   ├── globals.css              # Estilos globales y animaciones
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página principal
├── public/                       # Archivos estáticos
├── package.json
└── README.md
```

## 🎨 Tecnologías Utilizadas

- **Next.js 16**: Framework de React para aplicaciones web
- **TypeScript**: Tipado estático para JavaScript
- **Tailwind CSS**: Framework de CSS utilitario
- **React Hooks**: Para manejo de estado y efectos

## 🎮 Cómo Jugar

1. **Página de Bienvenida**: Haz clic en "¡Comenzar!"
2. **Cuestionario del Amor**: Responde las preguntas sobre el amor
3. **Atrapa los Corazones**: Haz clic en los corazones que caen
4. **Juego de Memoria**: Encuentra las parejas de emojis
5. **Mensajes Especiales**: Lee los mensajes de amor
6. **Final**: ¡Disfruta del mensaje final!

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Crear build de producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar ESLint
```

## 💡 Personalización

Puedes personalizar fácilmente:

- **Mensajes de amor**: Edita el array `loveMessages` en [page.tsx](app/page.tsx)
- **Colores**: Modifica las variables CSS en [globals.css](app/globals.css)
- **Preguntas del quiz**: Cambia el array `questions` en [LoveQuiz.tsx](app/components/LoveQuiz.tsx)

## 📝 Licencia

Este proyecto está creado con fines educativos y de demostración.

## ❤️ Hecho con Amor

Creado especialmente para San Valentín 2026

---

**¡Disfruta de esta experiencia romántica e interactiva! 💕**

