# 🩺 GUÍA MAESTRA DE REPLICACIÓN DE PÁGINAS WEB MÉDICAS
### *Landing Page Médica de Alta Conversión + Panel Administrativo Full Control + Base de Datos Híbrida (Supabase + LocalStorage)*
**Versión de Producción:** 4.0 (Optimizada y Verificada al 100%)  
**Autor / Arquitectura:** Antigravity Engineering & Clinidiab Tech Team  

---

## 📑 TABLA DE CONTENIDOS
1. [Visión General y Propósito del Sistema](#1-visión-general-y-propósito-del-sistema)
2. [Estructura del Proyecto y Archivos](#2-estructura-del-proyecto-y-archivos)
3. [Guía Paso a Paso para Crear una Web para un Nuevo Médico](#3-guía-paso-a-paso-para-crear-una-web-para-un-nuevo-médico)
   - [Paso 1: Clonar la Plantilla y Configurar Branding](#paso-1-clonar-la-plantilla-y-configurar-branding)
   - [Paso 2: Configurar la Base de Datos en Supabase](#paso-2-configurar-la-base-de-datos-en-supabase)
   - [Paso 3: Configurar Credenciales y Configuración Global](#paso-3-configurar-credenciales-y-configuración-global)
   - [Paso 4: Fotos y Multimedia del Médico (Sin Parpadeos)](#paso-4-fotos-y-multimedia-del-médico-sin-parpadeos)
   - [Paso 5: Sistema de Video YouTube en Autoplay y Botón de Audio](#paso-5-sistema-de-video-youtube-en-autoplay-y-botón-de-audio)
   - [Paso 6: Servicios Médicos y Captación de Pacientes por WhatsApp](#paso-6-servicios-médicos-y-captación-de-pacientes-por-whatsapp)
   - [Paso 7: Horarios de Atención con Insignia Automática 'HOY'](#paso-7-horarios-de-atención-con-insignia-automática-hoy)
   - [Paso 8: Redes Sociales y Prevención de Duplicados](#paso-8-redes-sociales-y-prevención-de-duplicados)
   - [Paso 9: Mapa de Ubicación y Métodos de Pago](#paso-9-mapa-de-ubicación-y-métodos-de-pago)
   - [Paso 10: Despliegue en Producción y Dominio Personalizado](#paso-10-despliegue-en-producción-y-dominio-personalizado)
4. [Módulos del Panel Administrativo (Admin Dashboard)](#4-módulos-del-panel-administrativo-admin-dashboard)
5. [Reglas Técnicas de Oro y Prevención de Errores](#5-reglas-técnicas-de-oro-y-prevención-de-errores)
6. [Checklist de Verificación al 100% Pre-Lanzamiento](#6-checklist-de-verificación-al-100-pre-lanzamiento)

---

## 1. VISIÓN GENERAL Y PROPÓSITO DEL SISTEMA

Este sistema fue desarrollado con el estándar más alto de la industria médica privada para lograr dos objetivos fundamentales:
1. **Máxima Conversión de Pacientes:** Generar confianza médica instantánea mediante diseño profesional estilo Instagram/Lafesana, credenciales verificadas, video de presentación y botones directos a WhatsApp con mensajes preconfigurados según el servicio que el paciente consulta.
2. **Autonomía Total para el Médico (Sin depender de un programador):** A través del Panel Administrativo (`/admin.html`), el médico o su secretaria pueden cambiar fotos, títulos, precios, horarios, activar/desactivar videos de YouTube, editar formas de pago y actualizar redes sociales con sincronización en vivo entre pestañas y respaldo en la nube (Supabase) + almacenamiento local ultra rápido.

```
+-----------------------------------------------------------------------+
|                         PACIENTE / VISITANTE                          |
|                                                                       |
|  [Hero: Tarjeta Instagram / Video Autoplay]                           |
|  [Tu Médico: Bio + Especialidades + Foto vertical oficial]            |
|  [Servicios Médicos + Botón de WhatsApp dinámico por servicio]       |
|  [Horarios de Atención + Insignia 'HOY' calculada automáticamente]   |
|  [Ubicación Google Maps + Métodos de Pago + Redes Sociales únicas]   |
+-----------------------------------------------------------------------+
                                  ▲
                                  │ (Sincronización en Tiempo Real)
+-----------------------------------------------------------------------+
|                   MÉDICO / PANEL ADMINISTRATIVO                       |
|                          (/admin.html)                                |
|                                                                       |
|  Edición de 10 Módulos -> Respaldo en Supabase Cloud + LocalStorage   |
+-----------------------------------------------------------------------+
```

---

## 2. ESTRUCTURA DEL PROYECTO Y ARCHIVOS

Cada proyecto médico debe contar exactamente con esta estructura de archivos organizada y limpia:

```
├── index.html                # Landing Page principal para los pacientes
├── admin.html                # Panel de Control Administrativo para el médico
├── GUIA_DE_REPLICACION.md    # Esta guía maestra de documentación y replicación
├── css/
│   └── styles.css            # Estilos personalizados, animaciones, badges y botón de audio
├── js/
│   ├── config.js             # Configuración de URLs y credenciales de Supabase
│   ├── supabaseClient.js     # Inicializador del cliente Supabase con diagnóstico
│   ├── store.js              # Capa de datos híbrida (Supabase DB + LocalStorage Fallback)
│   ├── utils.js              # Funciones auxiliares (formateo, WhatsApp links, YT IDs, toasts)
│   ├── app.js                # Lógica de renderizado dinámico de la Landing Page
│   └── admin.js              # Lógica de gestión, formularios y CRUD del Admin
├── supabase/
│   └── schema.sql            # Script SQL DDL con tablas, políticas RLS y datos iniciales
└── assets/
    ├── dr-fabricio-loayza.jpg # Foto cuadrada/circular para perfil o tarjeta
    ├── dr-loayza-portrait.jpg # Foto vertical 3:4 para la biografía médica
    └── favicon.ico / logos   # Logotipo del consultorio médico
```

---

## 3. GUÍA PASO A PASO PARA CREAR UNA WEB PARA UN NUEVO MÉDICO

### PASO 1: Clonar la Plantilla y Configurar Branding
1. Duplica la carpeta del proyecto y renómbrala con el nombre del nuevo consultorio o médico (ej. `dr-perez-pediatria` o `cardiomedic`).
2. En `index.html` y `admin.html`, actualiza los elementos `<title>` y los elementos con clase `.brand-name` con el nombre del nuevo médico/clínica.
3. Elige la paleta de colores de la especialidad:
   - **Teal / Esmeralda (`teal-600` / `emerald-500`):** Diabetes, Endocrinología, Nutrición, Medicina General.
   - **Azul Médico (`sky-600` / `blue-600`):** Cardiología, Urología, Traumatología.
   - **Rosa / Magenta / Violeta (`rose-500` / `purple-600`):** Ginecología, Dermatología, Estética.
   - **Verde Menta (`teal-500` / `cyan-500`):** Odontología, Fisioterapia.

---

### PASO 2: Configurar la Base de Datos en Supabase
1. Ingresa a [https://supabase.com](https://supabase.com) y crea un nuevo proyecto (gratuito).
2. Asigna un nombre al proyecto (ej. `dr-perez-db`) y una contraseña segura para la base de datos.
3. Ve a la pestaña **SQL Editor** en el panel de Supabase.
4. Abre el archivo `supabase/schema.sql` de este proyecto, copia todo su contenido y pégalo en el SQL Editor de Supabase.
5. Haz clic en **RUN**. Esto creará automáticamente las 9 tablas con sus políticas de seguridad (RLS):
   - `site_settings` (Configuración general, títulos, videos, conmutador de portada).
   - `doctor_bio` (Biografía médica, títulos, foto, especialidades).
   - `services` (Servicios médicos, precios, duraciones).
   - `testimonials` (Testimonios de pacientes y calificaciones).
   - `academic_activity` (Títulos, congresos, maestrías).
   - `success_cases` (Casos de éxito y transformaciones).
   - `business_hours` (Horarios de atención por día).
   - `payment_methods` (Formas de pago aceptadas).
   - `social_links` (Enlaces a redes sociales).
   - `location` (Dirección, coordenadas, iframe de Google Maps).

---

### PASO 3: Configurar Credenciales y Configuración Global
1. En el panel de Supabase del nuevo proyecto, ve a **Project Settings -> API**.
2. Copia la **Project URL** (ej. `https://xyzcompany.supabase.co`) y la clave pública **anon public** (`eyJhbGciOi...`).
3. Abre el archivo `js/config.js` y actualiza las constantes:

```javascript
window.APP_CONFIG = {
  APP_NAME: 'Dr. Nombre Apellido - Especialidad',
  CLINIC_NAME: 'NOMBRE CONSULTORIO',
  DOCTOR_NAME: 'Dr. Nombre Apellido',
  SPECIALTY: 'Especialidad Principal',
  CITY: 'Ciudad, País',
  WHATSAPP_NUMBER: '593999999999', // Código de país + número sin espacios
  SUPABASE_URL: 'https://TU_PROYECTO.supabase.co',
  SUPABASE_ANON_KEY: 'TU_CLAVE_ANON_PUBLICA',
  ENABLE_ANALYTICS: false
};
```

---

### PASO 4: Fotos y Multimedia del Médico (Sin Parpadeos)
Para evitar que se vea una foto antigua durante el primer segundo de carga (efecto flash):
1. **Coloca las fotos oficiales en la carpeta `assets/`:**
   - `assets/dr-fabricio-loayza.jpg` o `assets/doctor-profile.jpg` (Foto 1:1 para la tarjeta/portada).
   - `assets/dr-loayza-portrait.jpg` o `assets/doctor-portrait.jpg` (Foto vertical 3:4 para la sección "Tu Médico").
2. **Establece la ruta directamente en el HTML inicial de `index.html`:**
   - En el `<img id="hero-image">`, define `src="assets/dr-fabricio-loayza.jpg?v=4.0"` con los atributos `loading="eager"` y `fetchpriority="high"`.
   - En el `<img id="doctor-bio-photo">`, define `src="assets/dr-loayza-portrait.jpg?v=4.0"` con `loading="lazy"`.
3. Cuando el médico suba una nueva foto desde el Panel Administrativo, la función `renderDoctorBio` actualizará el elemento inmediatamente y guardará la imagen en Base64 o URL en Supabase.

---

### PASO 5: Sistema de Video YouTube en Autoplay y Botón de Audio
El sistema cuenta con un reproductor de YouTube optimizado estilo *Lafesana* con reproducción automática silenciosa y activación limpia de audio:

#### ¿Cómo funciona?
1. El Iframe de YouTube se inicializa silenciado (`mute=1`), con autoplay (`autoplay=1`), en bucle (`loop=1&playlist=VIDEO_ID`) y con la API de JS habilitada (`enablejsapi=1`).
2. Encima del video flota un botón oscuro elegante que dice **"Activar audio"** con una animación de bocina y onda sonora.
3. **Comportamiento al hacer clic (Regla de Oro):**
   - El reproductor desmutea el video (`unMute()`), sube el volumen al 100% (`setVolume(100)`), reinicia el video desde el segundo 0 (`seekTo(0, true)`) y comienza a reproducir (`playVideo()`).
   - El botón **desaparece por completo inmediatamente** (`btn.style.display = 'none'; btn.style.opacity = '0'; btn.style.pointerEvents = 'none'; btn.classList.add('hidden');`) para que el paciente pueda ver el video y los controles de YouTube sin ningún elemento molesto que tape la pantalla ni botones invasivos de silenciar.

#### Formato de Portada en Admin:
El médico puede elegir en el Admin entre:
- **📸 Tarjeta Perfil Instagram:** Muestra el avatar con story ring, contador de publicaciones, seguidores y botones de acción.
- **🎥 Video YouTube (Autoplay):** Muestra el video de YouTube en la portada principal derecha con el botón flotante de audio.
- **Sección Adicional de Video:** Posibilidad de activar una sección completa independiente de video de presentación más abajo en la página.

---

### PASO 6: Servicios Médicos y Captación de Pacientes por WhatsApp
1. Cada servicio médico registrado en el panel de administración cuenta con:
   - Título del servicio (ej. *Control Glucémico Integral*, *Ecografía Tiroidea*, *Plan Nutricional Metabólico*).
   - Descripción detallada orientada a beneficios del paciente.
   - Duración estimada (ej. *45 min*, *30 min*).
   - Precio (ej. *$40*, *$60* o dejar en blanco).
   - Botón directo de reserva: **"Agendar Cita"**.
2. Al hacer clic en **"Agendar Cita"**, se abre automáticamente WhatsApp con el mensaje personalizado codificado:
   > *"Hola Dr. Fabricio Loayza, deseo agendar una consulta para el servicio de: [Nombre del Servicio]. ¿Qué horarios tienen disponibles?"*

---

### PASO 7: Horarios de Atención con Insignia Automática 'HOY'
1. En la sección de horarios, los días de atención se muestran en un listado limpio de Lunes a Domingo.
2. Un script en `js/app.js` detecta automáticamente el día actual de la semana mediante `new Date().getDay()` (0 = Domingo, 1 = Lunes, ..., 6 = Sábado) y añade dinámicamente la etiqueta **`HOY`** con fondo oscuro en la fila correspondiente al día actual.
3. Si el consultorio está cerrado el día de hoy, el estado lo refleja claramente sin causar confusiones al paciente.

---

### PASO 8: Redes Sociales y Prevención de Duplicados
Para evitar que aparezcan íconos repetidos (ej. múltiples botones de Instagram o Facebook):
1. **Modelo de Plataforma Única:** El sistema solo admite una fila activa por plataforma (`instagram`, `facebook`, `youtube`, `tiktok`).
2. **Deduplicación en Frontend:** La función `renderSocialLinks()` en `js/app.js` utiliza un `Set` de plataformas vistas (`seenPlatforms`) para garantizar que **solo se dibuje un único botón por cada red social**, independientemente de lo que haya en la base de datos.
3. **Deduplicación en Store:** El método `getSocialLinks()` en `js/store.js` filtra registros repetidos antes de guardarlos en el almacenamiento local.

---

### PASO 9: Mapa de Ubicación y Métodos de Pago
1. **Google Maps:**
   - Ve a Google Maps, busca la dirección del consultorio, haz clic en **Compartir -> Insertar un mapa** y copia el código HTML `<iframe>`.
   - Pégalo en el campo "Código Embed de Google Maps" en la pestaña **Ubicación** del Admin.
   - Si no se configura un mapa, el sistema cuenta con un fallback predeterminado para evitar contenedores vacíos.
2. **Formas de Pago:**
   - Activa o desactiva con un interruptor las formas de pago aceptadas: *Efectivo, Transferencia Bancaria, Tarjeta de Crédito, Tarjeta de Débito*.

---

### PASO 10: Despliegue en Producción y Dominio Personalizado
1. **Subir a Repositorio GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: initial launch of medical landing page"
   git branch -M main
   git remote add origin https://github.com/usuario/nombre-repositorio.git
   git push -u origin main
   ```
2. **Activar GitHub Pages / Vercel / Netlify:**
   - **GitHub Pages:** En GitHub -> *Settings -> Pages*, selecciona la rama `main` y la carpeta `/ (root)`.
   - **Vercel / Netlify:** Conecta el repositorio de GitHub y se desplegará de forma automática en 30 segundos.
3. **Configurar Dominio Propio (ej. `clinidiab.com` o `drloayza.com`):**
   - En tu proveedor de dominio (Cloudflare, Namecheap, GoDaddy, Hostinger), crea un registro CNAME o A apuntando a los servidores de Vercel/GitHub Pages.
4. **Cache Busting (Regla Vital para Actualizaciones):**
   - Siempre que realices cambios en código CSS o JS, incrementa el número de versión en los tags de `index.html` y `admin.html` (ej. `css/styles.css?v=4.1`, `js/app.js?v=4.1`) para forzar a los teléfonos y computadoras de los pacientes a descargar la versión nueva de inmediato.

---

## 4. MÓDULOS DEL PANEL ADMINISTRATIVO (ADMIN DASHBOARD)

El panel administrativo (`admin.html`) contiene 10 pestañas especializadas:

| Pestaña | Funcionalidad | Campos Editables |
| :--- | :--- | :--- |
| **📊 Dashboard** | Vista general y accesos rápidos | Estadísticas de servicios activos, testimonios, estado de Supabase y enlaces directos. |
| **🚀 Portada Principal (Hero)** | Control visual de la cabecera | Título principal, subtítulo, conmutador (Tarjeta Instagram vs Video YouTube), URL de YouTube, Sección Adicional de Video. |
| **🩺 Tu Médico** | Biografía y credenciales oficiales | Nombre, titular, biografía detallada, subida de foto vertical, 3 tarjetas de especialidad y etiquetas médicas. |
| **✨ Servicios Médicos** | Catálogo de atención clínica | Crear, editar, eliminar servicios, definir precios, tiempos de consulta y activar/desactivar. |
| **🎓 Actividad Académica** | Formación continua y docencia | Títulos de posgrado, maestrías, conferencias, congresos y certificaciones médicas. |
| **🌟 Casos de Éxito** | Testimonios y transformaciones | Historias clínicas de éxito, descripciones del antes/después y métricas de mejora. |
| **💬 Testimonios** | Reseñas de pacientes | Nombre del paciente, comentario, estrellas (1 a 5) y fecha de atención. |
| **⏰ Contacto y Horarios** | Horarios de atención y citas | Horarios matutinos y vespertinos para cada día de la semana (Lunes a Domingo), teléfono y dirección. |
| **💳 Formas de Pago** | Métodos de pago en recepción | Activar o pausar Efectivo, Transferencias Bancarias, Tarjetas de Débito y Crédito. |
| **🌐 Redes Sociales** | Enlaces oficiales del médico | URLs de Instagram, Facebook, YouTube y TikTok con interruptores individuales de activación. |
| **📍 Ubicación** | Geolocalización del consultorio | Dirección exacta, enlace a Google Maps y código `<iframe>` embebido interactivo. |

---

## 5. REGLAS TÉCNICAS DE ORO Y PREVENCIÓN DE ERRORES

A continuación, los aprendizajes críticos que garantizan que el sistema funcione siempre al 100%:

### 1. Desaparición del Botón de Audio de YouTube
> **Regla:** El botón flotante de audio NUNCA debe transformarse en un botón verde de "Silenciar audio". Debe desaparecer completamente al hacer clic (`display: none !important; opacity: 0; pointer-events: none;`) para que el paciente disfrute del video sin obstrucciones.

### 2. Prevención de Flash de Foto Antigua
> **Regla:** En el archivo `index.html`, la etiqueta `<img>` de la biografía y de la portada debe tener predefinida la ruta de la foto oficial del médico (`assets/dr-loayza-portrait.jpg?v=4.0`) con `loading="eager"` y `fetchpriority="high"`. Nunca dejes una foto genérica por defecto si ya existe la foto real del doctor.

### 3. Sincronización en Tiempo Real entre Pestañas
> **Regla:** La función `applyLiveSettingsSync` en `js/app.js` escucha eventos `storage` sobre la clave de base de datos local. Cuando el médico guarda cambios en el Admin, la pestaña de la Landing Page abierta en el mismo navegador se actualiza en tiempo real sin requerir recargar la página.

### 4. Respaldo Híbrido (Supabase + LocalStorage)
> **Regla:** Si la conexión a Supabase se interrumpe o el médico trabaja sin internet temporalmente, `js/store.js` lee y escribe en `localStorage` con la clave `clinidiab_local_db_v10`. La página web nunca se quedará en blanco ni mostrará pantallas de error al paciente.

### 5. Deduplicación de Redes Sociales
> **Regla:** Antes de inyectar HTML en `#social-links-container`, filtrar los enlaces para que cada plataforma (`instagram`, `facebook`, `youtube`, `tiktok`) aparezca exactamente una sola vez.

---

## 6. CHECKLIST DE VERIFICACIÓN AL 100% PRE-LANZAMIENTO

Antes de entregar la web al médico o publicarla oficialmente, verifica cada uno de los siguientes puntos:

- [x] **Branding:** El nombre del consultorio y médico están actualizados en toda la página y en la pestaña del navegador.
- [x] **Botón WhatsApp:** Al hacer clic en "Reservar cita" o "Agendar Cita", se abre el chat de WhatsApp con el número correcto y el texto predeterminado.
- [x] **Video YouTube:** Si está activo el modo Video, el video inicia automáticamente silenciado y al pulsar "Activar audio" el sonido comienza desde el segundo 0 y el botón desaparece por completo.
- [x] **Tarjeta Instagram:** Si está activo el modo Tarjeta Instagram, los contadores de publicaciones, seguidores y la foto cargan con nitidez.
- [x] **Biografía:** La foto vertical del doctor no parpadea ni muestra fotos antiguas al recargar.
- [x] **Insignia 'HOY':** En la sección de horarios, la fila del día correspondiente a hoy tiene la etiqueta `HOY`.
- [x] **Servicios:** Todos los servicios médicos se visualizan correctamente con su descripción y duración.
- [x] **Redes Sociales:** Los íconos del pie de página son únicos (sin duplicados) y abren las cuentas oficiales del médico en una nueva pestaña.
- [x] **Mapa:** El mapa de Google Maps carga interactivo y el botón "Cómo llegar" abre la app de navegación en celulares.
- [x] **Admin:** El panel administrativo guarda cambios correctamente en Supabase y notifica con un mensaje verde de éxito (Toast).
- [x] **Responsive Mobile:** La web se adapta fluidamente a pantallas de iPhone, Android, iPad y computadoras de escritorio.
- [x] **Caché:** Los scripts y estilos tienen su parámetro de versión actualizado (`?v=4.0`).

---

*Documento generado y optimizado para la replicación instantánea de sitios web médicos profesionales.*
