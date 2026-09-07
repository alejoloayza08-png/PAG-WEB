# 🩺 GUÍA MAESTRA DEFINITIVA DE REPLICACIÓN DE PÁGINAS WEB MÉDICAS
### *Landing Page Médica de Alta Conversión + Panel Administrativo Full Control + Base de Datos Híbrida (Supabase + LocalStorage)*
**Versión de Producción:** 4.0 (100% Optimizada, Auditada y Verificada)  
**Autor / Arquitectura:** Antigravity Engineering & Clinidiab Tech Team  

---

## 📑 TABLA DE CONTENIDOS COMPLETA
1. [Arquitectura y Visión General del Sistema](#1-arquitectura-y-visión-general-del-sistema)
2. [Estructura del Proyecto y Archivos](#2-estructura-del-proyecto-y-archivos)
3. [Módulo de Portada (Hero): Tarjeta Instagram, Video YouTube o Ambos](#3-módulo-de-portada-hero-tarjeta-instagram-video-youtube-o-ambos)
4. [Módulo de Servicios Médicos: Edición, Creación, Eliminación y WhatsApp](#4-módulo-de-servicios-médicos-edición-creación-eliminación-y-whatsapp)
5. [Módulo de Fotografías: Subida, Previsualización, Eliminación y Sin Flash](#5-módulo-de-fotografías-subida-previsualización-eliminación-y-sin-flash)
6. [Catálogo Completo de Animaciones y Microinteracciones CSS/JS](#6-catálogo-completo-de-animaciones-y-microinteracciones-cssjs)
7. [Módulo de Horarios con Insignia Automática 'HOY'](#7-módulo-de-horarios-con-insignia-automática-hoy)
8. [Módulo de Redes Sociales: Deduplicación y Manejo de Enlaces](#8-módulo-de-redes-sociales-deduplicación-y-manejo-de-enlaces)
9. [Módulo de Mapa de Ubicación y Métodos de Pago](#9-módulo-de-mapa-de-ubicación-y-métodos-de-pago)
10. [Panel de Control Administrativo (Los 10 Módulos Explicados)](#10-panel-de-control-administrativo-los-10-módulos-explicados)
11. [Configuración de Base de Datos en Supabase (Backend en 5 min)](#11-configuración-de-base-de-datos-en-supabase-backend-en-5-min)
12. [Despliegue a Producción, Dominio Propio y Cache-Busting](#12-despliegue-a-producción-dominio-propio-y-cache-busting)
13. [Checklist Maestro de Verificación al 100% Pre-Lanzamiento](#13-checklist-maestro-de-verificación-al-100-pre-lanzamiento)

---

## 1. ARQUITECTURA Y VISIÓN GENERAL DEL SISTEMA

Este sistema fue concebido como la solución tecnológica y de marketing médico definitiva. Combina una interfaz pública ultra rápida de alta conversión para pacientes con un panel administrativo privado para el doctor.

```
+-----------------------------------------------------------------------------------------+
|                               PACIENTE / VISITANTE WEB                                  |
|                                                                                         |
|  [1. ANUNCIO SUPERIOR] -> "Consultas disponibles esta semana en Machala"                |
|  [2. NAVEGACIÓN GLASS] -> Logo + Menú + Botón de WhatsApp directo                      |
|  [3. HERO PRINCIPAL]   -> Titular de impacto + Tarjeta Instagram / Video Autoplay       |
|  [4. TU MÉDICO]        -> Biografía médica + Títulos + Foto vertical + Tags médicos     |
|  [5. STATS BANNER]     -> +10 Años, 14.4k Seguidores, 793 Posts, 6 Días de atención     |
|  [6. SERVICIOS]        -> Grid de servicios médicos + Botón WhatsApp con mensaje propio |
|  [7. VIDEO INDEPEND.]  -> (Opcional) Sección completa de video de presentación          |
|  [8. CONTENIDO & CASOS]-> Casos clínicos, educación al paciente y actividad académica   |
|  [9. HORARIOS & PAGOS] -> Horarios con badge 'HOY' + Métodos de pago + Mapa interactivo |
|  [10. FOOTER & REDES]  -> Redes sociales únicas + Botón flotante pulsante de WhatsApp   |
+-----------------------------------------------------------------------------------------+
                                             ▲
                                             │ (Sincronización en Tiempo Real)
+-----------------------------------------------------------------------------------------+
|                             MÉDICO / PANEL ADMINISTRATIVO                               |
|                                     (/admin.html)                                       |
|                                                                                         |
|  * 10 Módulos de edición visual en tiempo real sin tocar una sola línea de código       |
|  * Doble persistencia: Base de Datos Supabase Postgres en la nube + LocalStorage Fallback |
+-----------------------------------------------------------------------------------------+
```

---

## 2. ESTRUCTURA DEL PROYECTO Y ARCHIVOS

```
clinidiab/
├── index.html                # Landing Page principal para pacientes
├── admin.html                # Panel de Control Administrativo
├── GUIA_DE_REPLICACION.md    # Guía maestra de documentación (este archivo)
├── css/
│   └── styles.css            # Todas las animaciones, tipografía, botón de audio y tarjetas
├── js/
│   ├── config.js             # Credenciales de Supabase, número de WhatsApp y datos globales
│   ├── supabaseClient.js     # Conexión resiliente a Supabase con diagnóstico
│   ├── store.js              # Capa de datos híbrida (Supabase DB + LocalStorage v10 Fallback)
│   ├── utils.js              # Funciones auxiliares (formateo $, WhatsApp links, YT IDs, toasts)
│   ├── app.js                # Renderizado dinámico, eventos de video, día 'HOY', sync en vivo
│   └── admin.js              # Lógica CRUD, subida y borrado de fotos, formularios del admin
├── supabase/
│   └── schema.sql            # Script SQL DDL con 10 tablas, RLS policies y seed inicial
└── assets/
    ├── dr-fabricio-loayza.jpg # Foto cuadrada/circular (1:1) para portada/tarjeta
    ├── dr-loayza-portrait.jpg # Foto vertical (3:4) para la sección Tu Médico
    └── favicon.ico / logos   # Identidad visual
```

---

## 3. MÓDULO DE PORTADA (HERO): TARJETA INSTAGRAM, VIDEO YOUTUBE O AMBOS

El sistema permite configurar el lado derecho de la portada principal entre 3 formatos mediante interruptores visuales en el Admin:

```
                      ┌────────────────────────────────────────────────┐
                      │    ¿QUÉ FORMATO DESEA PARA LA PORTADA?         │
                      └───────────────────────┬────────────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
         [📸 TARJETA INSTAGRAM]       [🎥 VIDEO YOUTUBE]          [🔥 AMBOS A LA VEZ]
        - Anillo story animado       - Autoplay en bucle         - Tarjeta en Hero
        - Contador seguidores        - Botón "Activar audio"     - Sección independiente
        - Badges flotantes           - Desaparición al clic      de video más abajo
```

### Opción A: 📸 Tarjeta de Perfil Estilo Instagram
- **Componentes:**
  - Anillo de historia con gradiente multicolor animado (`ig-story-ring`).
  - Badge de verificación azul oficial junto al nombre del doctor.
  - Estadísticas dinámicas: *Publicaciones, Seguidores y Seguidos*.
  - Badge flotante superior de especialidades con micro-animación (`animate-badge-float`).
  - 3 botones de acción: *Contactar* (azul cielo), *Servicios* (gris elegante) y *Seguir* (gradiente de Instagram con enlace directo al perfil).

### Opción B: 🎥 Video de YouTube en Portada (Autoplay)
- **Componentes:**
  - IFrame responsivo con parámetros: `autoplay=1&mute=1&loop=1&playlist=ID&controls=1&enablejsapi=1`.
  - Botón flotante superior izquierdo oscuro: **"Activar audio"** con bocina y ondas sonoras animadas.
  - **Comportamiento al Clic (Regla de Oro):**
    1. Ejecuta llamadas al reproductor de YouTube: `seekTo(0, true)`, `unMute()`, `setVolume(100)` y `playVideo()`.
    2. El botón **desaparece de inmediato por completo** mediante estilos forzados (`display: none !important; opacity: 0; pointer-events: none;`) para que el paciente tenga pantalla limpia.

### Opción C: 🔥 Ambos a la vez (Tarjeta en Portada + Sección de Video)
- Activa la **Tarjeta Instagram** en el Hero y simultáneamente marca la casilla **"Sección Adicional de Video de Presentación"** en el Admin.
- La web mostrará la tarjeta en la parte superior y creará una sección completa más abajo con título, subtítulo y el reproductor de video con autoplay y botón de audio.

#### 🔗 Formatos de Enlace de YouTube Aceptados:
La función `extractYouTubeId` en `js/utils.js` procesa automáticamente cualquier formato de URL:
- Enlace completo: `https://www.youtube.com/watch?v=qEnvCBBya-s&t=41s`
- Enlace corto: `https://youtu.be/qEnvCBBya-s`
- YouTube Shorts: `https://www.youtube.com/shorts/qEnvCBBya-s`
- Embed directo: `https://www.youtube.com/embed/qEnvCBBya-s`
- ID puro: `qEnvCBBya-s`

---

## 4. MÓDULO DE SERVICIOS MÉDICOS: EDICIÓN, CREACIÓN, ELIMINACIÓN Y WHATSAPP

Los servicios médicos son el motor de conversión de la página.

### Estructura de Datos de un Servicio:
```json
{
  "id": "uuid-generado",
  "name": "Control Integral de Diabetes y Glucosa",
  "description": "Evaluación metabólica completa, monitoreo continuo de glucosa, ajuste de tratamiento y pautas de estilo de vida para prevenir complicaciones.",
  "duration_minutes": 45,
  "price": 50,
  "is_active": true,
  "display_order": 1
}
```

### Funcionalidades Disponibles en el Admin:
1. **➕ Crear Nuevo Servicio:**
   - Botón *"Agregar Nuevo Servicio"*.
   - Abre un modal con campos: Nombre, Descripción, Duración (minutos), Precio ($ opcional), y casilla de Activo.
   - Al guardar, se genera un UUID único y se inserta en Supabase + LocalStorage.
2. **✏️ Editar Servicio Existente:**
   - Haz clic en el botón *"Editar"* sobre la tarjeta del servicio en el Admin.
   - Modifica cualquier dato en el formulario modal y guarda los cambios al instante.
3. **⏸️ Pausar / Desactivar Servicio:**
   - Puedes desmarcar la casilla *"Activo"* para ocultar un servicio temporalmente de la página web sin necesidad de borrarlo.
4. **🗑️ Eliminar Servicio Definitivamente:**
   - Cada servicio cuenta con un botón rojo *"Eliminar"* en el panel administrativo.
   - El sistema solicita confirmación (`confirm('¿Está seguro de eliminar este servicio?')`) para evitar borrados accidentales.
   - Al confirmar, se ejecuta `dataStore.deleteService(id)` en Supabase y LocalStorage, desapareciendo de la web al instante.

### 💬 Generación Automática del Enlace a WhatsApp por Servicio:
Cuando el paciente hace clic en **"Agendar Cita"** en una tarjeta de servicio, se ejecuta:
```javascript
const message = `Hola ${config.DOCTOR_NAME}, deseo agendar una cita para el servicio de: *${service.name}*. ¿Qué horarios tienen disponibles?`;
const whatsappUrl = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
```
El paciente llega directamente a WhatsApp con el nombre del servicio ya escrito, ahorrando tiempo y aumentando las reservas.

---

## 5. MÓDULO DE FOTOGRAFÍAS: SUBIDA, PREVISUALIZACIÓN, ELIMINACIÓN Y SIN FLASH

El manejo de imágenes está diseñado para ser 100% amigable y sin fallos:

```
[📁 Seleccionar Foto desde Celular/PC] 
       │
       ▼
[Previsualización Instantánea en Admin (FileReader Base64)]
       │
       ├─► [💾 Guardar Cambios]  ──► Guarda en Supabase/LocalStorage
       │
       └─► [🗑️ Eliminar Foto]    ──► Restablece foto oficial por defecto
```

### 1. Subida de Foto del Doctor (Pestaña "Tu Médico"):
- **Botón "📁 Subir Foto del Doctor":** Abre el explorador de archivos del celular o computadora.
- Acepta formatos `.jpg`, `.jpeg`, `.png`, `.webp`.
- Lee el archivo mediante `FileReader` convirtiéndolo a Base64 o enviándolo a almacenamiento seguro.
- La foto se previsualiza inmediatamente en el recuadro del Admin para que el médico confirme cómo se ve antes de guardar.

### 2. 🗑️ Eliminación de Foto Actual:
- El Admin cuenta con un botón dedicado: **"Eliminar foto actual"**.
- Al presionarlo, el campo de foto se limpia y se restablece la foto oficial predeterminada (`assets/dr-loayza-portrait.jpg`).
- Al hacer clic en *"Guardar Cambios"*, la web pública se actualiza al instante.

### 3. Prevención del Efecto Flash (Parpadeo de Foto Antigua):
- **Problema común:** Al cargar la página, se veía una foto antigua por un segundo antes de que JavaScript cargara la foto de la base de datos.
- **Solución implementada:** En `index.html`, la etiqueta `<img>` de la biografía médica y de la portada tiene directamente en su HTML estático la ruta de la foto oficial:
  ```html
  <img id="doctor-bio-photo" 
       src="assets/dr-loayza-portrait.jpg?v=4.0" 
       alt="Dr. Fabricio Loayza" 
       class="w-full h-full object-cover object-top rounded-3xl"
       loading="eager" 
       fetchpriority="high">
  ```
- Al recargar la página, la foto real aparece en 0 milisegundos sin ningún parpadeo.

### 📐 Dimensiones y Relaciones de Aspecto Recomendadas:
| Foto | Ubicación | Proporción | Tamaño Recomendado |
| :--- | :--- | :--- | :--- |
| **Foto de Portada / Perfil** | Tarjeta Hero Instagram | 1:1 (Cuadrada/Circular) | 800 x 800 px (JPG/WebP) |
| **Foto Oficial de Biografía** | Sección "Tu Médico" | 3:4 (Vertical) | 900 x 1200 px (JPG/WebP) |
| **Casos / Testimonios** | Transformaciones | 16:9 o 4:3 | 800 x 600 px |

---

## 6. CATÁLOGO COMPLETO DE ANIMACIONES Y MICROINTERACCIONES CSS/JS

Todas las animaciones están centralizadas en `css/styles.css` con aceleración por hardware (`transform`, `opacity`) para garantizar 60 FPS incluso en celulares de gama media o baja:

### 1. `animate-float-card` (Efecto Flotante de la Tarjeta Instagram)
```css
@keyframes floatCard {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4);
  }
  50% {
    transform: translateY(-8px) rotate(0.3deg);
    box-shadow: 0 30px 50px -15px rgba(0, 0, 0, 0.5);
  }
}
.animate-float-card {
  animation: floatCard 6s ease-in-out infinite;
}
```

### 2. `animate-badge-float` (Insignia Flotante de Especialidades)
```css
@keyframes badgeFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-badge-float {
  animation: badgeFloat 4s ease-in-out infinite;
}
```

### 3. `ig-story-ring` (Anillo Gradiente de Instagram)
```css
.ig-story-ring {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  padding: 3px;
  border-radius: 9999px;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(220, 39, 67, 0.35);
}
```

### 4. `mutePulse` y `audioPulse` (Animaciones del Botón de Audio)
```css
/* Pulso de la línea roja diagonal de silenciado */
@keyframes mutePulse {
  0%, 100% { transform: translate(-50%, -50%) rotate(35deg) scale(1); }
  50% { transform: translate(-50%, -50%) rotate(35deg) scale(1.18); }
}
/* Pulso de las ondas sonoras blancas */
@keyframes audioPulse {
  0%, 100% { transform: scale(0.85); opacity: 0.5; }
  50% { transform: scale(1.3); opacity: 1; }
}
```

### 5. `whatsapp-pulse` (Pulso del Botón Flotante de WhatsApp)
```css
@keyframes whatsappPulse {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
  70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}
.whatsapp-pulse {
  animation: whatsappPulse 2s infinite;
}
```

### 6. `marqueeScroll` (Cinta Deslizante Continua)
```css
@keyframes marqueeScroll {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  display: flex;
  width: max-content;
  animation: marqueeScroll 25s linear infinite;
}
.animate-marquee:hover {
  animation-play-state: paused;
}
```

---

## 7. MÓDULO DE HORARIOS CON INSIGNIA AUTOMÁTICA 'HOY'

La sección de horarios cuenta con detección inteligente del día actual:

### Funcionamiento:
1. Los horarios se guardan para cada día de la semana (`Lunes` a `Domingo`).
2. En `js/app.js`, se calcula el día local del paciente:
   ```javascript
   const daysMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
   const currentDayName = daysMap[new Date().getDay()];
   ```
3. La fila correspondiente al día actual recibe automáticamente:
   - Una insignia oscura con texto en mayúsculas: **`HOY`**.
   - Resaltado de fondo suave (`bg-teal-50/50`) y borde visible.
   - Indicador de punto verde esmeralda si está abierto, o punto rojo si está cerrado.

---

## 8. MÓDULO DE REDES SOCIALES: DEDUPLICACIÓN Y MANEJO DE ENLACES

Para evitar que se repitan íconos en el pie de página o en la portada:

### 1. Plataformas Soportadas:
- 📸 **Instagram** (`platform: 'instagram'`) -> Ícono oficial con hover gradiente Instagram.
- 📘 **Facebook** (`platform: 'facebook'`) -> Ícono oficial con hover azul Facebook (`#1877F2`).
- 🎥 **YouTube** (`platform: 'youtube'`) -> Ícono oficial con hover rojo YouTube (`#FF0000`).
- 🎵 **TikTok** (`platform: 'tiktok'`) -> Ícono oficial con hover negro TikTok.

### 2. Algoritmo de Deduplicación en Frontend (`js/app.js`):
```javascript
function renderSocialLinks(socials) {
  const container = document.getElementById('social-links-container');
  if (!container || !socials) return;

  const validSocials = socials.filter(s => s && s.is_active && s.url && (s.platform || '').toLowerCase() !== 'whatsapp');

  // Garantizar exactamente 1 enlace por plataforma
  const seenPlatforms = new Set();
  const uniqueSocials = [];
  for (const s of validSocials) {
    const p = (s.platform || '').toLowerCase();
    if (!seenPlatforms.has(p)) {
      seenPlatforms.add(p);
      uniqueSocials.push(s);
    }
  }

  container.innerHTML = uniqueSocials.map(s => {
    // Genera el HTML con el SVG y color correspondiente
  }).join('');
}
```

---

## 9. MÓDULO DE MAPA DE UBICACIÓN Y MÉTODOS DE PAGO

### Google Maps Interactivo:
1. En la pestaña **Ubicación** del Admin, se ingresa la dirección, el enlace para abrir en la app de Google Maps y el código embed `<iframe>`.
2. Si el médico no ingresa un código embed, `js/store.js` cuenta con un fallback seguro que muestra la ubicación predeterminada de Machala sin romper la página.
3. El botón **"Cómo llegar"** en la web abre la ruta en Google Maps directamente en el celular del paciente con un solo toque.

### Formas de Pago Aceptadas:
- Pestaña **Formas de Pago** en el Admin con interruptores de activación para:
  - 💵 **Efectivo:** Pago presencial en recepción del consultorio.
  - 🏦 **Transferencia Bancaria:** Banco Pichincha, Guayaquil, Pacífico, etc.
  - 💳 **Tarjeta de Crédito:** Visa, Mastercard, American Express.
  - 💳 **Tarjeta de Débito:** Redes nacionales e internacionales.

---

## 10. PANEL DE CONTROL ADMINISTRATIVO (LOS 10 MÓDULOS EXPLICADOS)

El panel administrativo (`admin.html`) permite gestionar el 100% de la web:

| # | Pestaña | ¿Qué se puede hacer? |
| :-: | :--- | :--- |
| **1** | **📊 Dashboard** | Vista panorámica de servicios activos, testimonios, estado de conexión a Supabase y accesos rápidos a edición. |
| **2** | **🚀 Portada Principal** | Cambiar título principal, subtítulo, elegir entre Tarjeta Instagram o Video YouTube, ingresar URL de YouTube y activar/desactivar la Sección Adicional de Video. |
| **3** | **🩺 Tu Médico** | Editar nombre del doctor, titular, biografía completa, subir foto vertical desde el dispositivo, eliminar foto actual y definir tarjetas de especialidad. |
| **4** | **✨ Servicios Médicos** | Crear nuevos servicios, editar textos/precios/duraciones, pausar servicios y eliminarlos con botón rojo de confirmación. |
| **5** | **🎓 Actividad Académica** | Agregar posgrados, maestrías, conferencias, congresos y diplomados del médico. |
| **6** | **🌟 Casos de Éxito** | Publicar historias clínicas de éxito, descripciones del progreso del paciente y testimonios de transformación. |
| **7** | **💬 Testimonios** | Agregar reseñas de pacientes con puntuación en estrellas (1 a 5), nombre y fecha. |
| **8** | **⏰ Contacto y Horarios** | Ajustar horarios de atención matutinos y vespertinos para cada día de la semana, teléfono de contacto y correo. |
| **9** | **💳 Formas de Pago** | Activar o pausar métodos de pago disponibles en recepción. |
| **10**| **🌐 Redes Sociales** | Configurar los enlaces a Instagram, Facebook, YouTube y TikTok con interruptores individuales de visibilidad. |
| **11**| **📍 Ubicación** | Actualizar la dirección física del consultorio, el enlace directo a Google Maps y el iframe interactivo. |

---

## 11. CONFIGURACIÓN DE BASE DE DATOS EN SUPABASE (BACKEND EN 5 MIN)

1. Regístrate en [Supabase](https://supabase.com) y crea un proyecto nuevo (Plan Gratuito).
2. Abre la pestaña **SQL Editor**.
3. Copia y pega todo el contenido de `supabase/schema.sql` y presiona **RUN**.
4. Ve a **Project Settings -> API** y copia la **URL** y la clave **anon public**.
5. Pega estas credenciales en `js/config.js`:
   ```javascript
   window.APP_CONFIG = {
     APP_NAME: 'CLINIDIAB · Consultorio Médico',
     CLINIC_NAME: 'CLINIDIAB',
     DOCTOR_NAME: 'Dr. Fabricio Loayza',
     WHATSAPP_NUMBER: '593987654321',
     SUPABASE_URL: 'https://TU_PROYECTO.supabase.co',
     SUPABASE_ANON_KEY: 'eyJhbGciOi...',
     ENABLE_ANALYTICS: false
   };
   ```

---

## 12. DESPLIEGUE A PRODUCCIÓN, DOMINIO PROPIO Y CACHE-BUSTING

### 1. Subir a GitHub:
```bash
git init
git add .
git commit -m "feat: launch medical landing page"
git branch -M main
git remote add origin https://github.com/usuario/nombre-proyecto.git
git push -u origin main
```

### 2. Conectar a Vercel / GitHub Pages / Hostinger:
- **En Vercel:** Importa el repositorio de GitHub con 1 clic. Despliegue en 30 segundos con certificado SSL HTTPS automático gratuito.
- **En GitHub Pages:** Ve a *Settings -> Pages -> Branch main -> Save*.

### 3. Conectar Dominio Propio (ej. `clinidiab.com`):
- Agrega un registro DNS de tipo **CNAME** (`cname.vercel-dns.com`) o registro **A** (`76.76.21.21`).

### 4. ⚡ Regla de Cache-Busting:
Cada vez que subas cambios a `css/styles.css` o archivos `.js`, incrementa el número de versión en `index.html` y `admin.html`:
```html
<link rel="stylesheet" href="css/styles.css?v=4.1">
<script src="js/app.js?v=4.1"></script>
```
Esto fuerza a los navegadores de los pacientes a descargar los cambios de inmediato sin quedarse con versiones antiguas en caché.

---

## 13. CHECKLIST MAESTRO DE VERIFICACIÓN AL 100% PRE-LANZAMIENTO

Antes de entregar la página al médico, verifica cada ítem:

- [x] **Branding General:** El nombre del consultorio y del médico están actualizados en toda la página y en la pestaña del navegador.
- [x] **Portada (Hero):** La tarjeta de Instagram o el video de YouTube cargan con nitidez y el botón de audio desaparece al hacer clic.
- [x] **Sección de Video Opcional:** Si está habilitada, el video carga centrado con controles limpios.
- [x] **Tu Médico:** La foto vertical del doctor carga al instante sin parpadeos ni imágenes antiguas.
- [x] **Servicios Médicos:** Se pueden crear, editar, pausar y eliminar servicios; el botón "Agendar Cita" abre WhatsApp con el mensaje personalizado.
- [x] **Horarios con 'HOY':** La fila del día actual tiene la etiqueta destacada `HOY`.
- [x] **Redes Sociales:** Se muestra un único ícono por cada plataforma activa (sin duplicados).
- [x] **Mapa y Contacto:** El mapa interactivo funciona y el botón "Cómo llegar" abre la app de navegación.
- [x] **Panel de Control:** Todos los formularios guardan en Supabase y notifican con mensajes Toast verdes de confirmación.
- [x] **Subida y Borrado de Fotos:** Se pueden subir fotos desde celular/PC y se pueden eliminar para restablecer la oficial.
- [x] **Adaptabilidad Móvil:** La página se ve perfecta en iPhone, Android, tablets y pantallas de escritorio.
- [x] **Cache-Busting:** Las rutas de scripts y hojas de estilo tienen la versión actualizada (`?v=4.0`).

---

*Esta guía representa el estándar de ingeniería médica de Clinidiab. Guárdala como plantilla maestra para todas tus futuras implementaciones médicas.*
