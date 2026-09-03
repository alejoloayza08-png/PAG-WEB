# CLINIDIAB - Página Web Médica Profesional

Página web médica profesional, moderna, elegante y completamente responsive para el consultorio médico **CLINIDIAB** (Especialistas en Diabetes y Salud Integral), construida con tecnologías web modernas y respaldada por **Supabase** (Database, Storage y Auth).

---

## 🌟 Características Principales

### 1. Página Web Pública (`index.html`)
- **Menú de navegación responsive**: Inicio, Servicios, Testimonios, Contactos.
- **Botón destacado "Reservar ahora"**: Incluye el icono oficial de WhatsApp y abre el chat directamente con el número configurado desde el administrador.
- **Sección Inicio (Hero)**: Título, subtítulo, logo de CLINIDIAB y fotografía editable desde el panel de control.
- **Sección Servicios Médicos**: Tarjetas responsivas con fotos, precios, duración, ordenamiento personalizable y adaptación elegante si no tienen imagen.
- **Sección Testimonios**: Opiniones de pacientes con foto opcional, calificación de 1 a 5 estrellas y estado activo/inactivo.
- **Horarios de Atención**: Configuración por día (Lunes a Domingo) con soporte para jornadas continuas o divididas (ej. 08:00 - 13:00 / 15:00 - 18:00).
- **Formas de Pago**: Métodos aceptados configurables (Efectivo, Transferencia, Tarjeta de Crédito, Débito).
- **Redes Sociales**: Iconos dinámicos de Instagram, Facebook y TikTok (se ocultan automáticamente si se desactivan).
- **Ubicación & Google Maps**: Mapa interactivo embebido y botón **"Cómo llegar"** que abre Google Maps directamente.

### 2. Panel Administrativo Privado (`admin.html` / `/admin`)
- **Protección de acceso**: Inicie sesión seguro mediante **Supabase Auth**.
- **Acceso Administrativo Privado**: Sin formularios públicos de registro, sin opción de crear cuentas libres ni recuperación pública.
- **Gestor completo de contenidos (No Code)**: Modifique textos del Hero, lista de servicios, testimonios, horarios, métodos de pago, redes sociales y coordenadas sin tocar el código fuente.
- **Gestión de imágenes**: Subida directa de fotos a **Supabase Storage** con previsualización y validación de tipos/tamaños.
- **Modo Resiliencia Local Fallback**: Permite probar y utilizar toda la aplicación localmente sin conexión inmediata a Supabase mediante almacenamiento local sincronizado.

---

## 📁 Estructura del Proyecto

```
Pagina web/
├── index.html                   # Página principal pública de CLINIDIAB
├── admin.html                   # Panel administrativo privado (/admin)
├── assets/
│   ├── logo.svg                 # Logo vectorial oficial de CLINIDIAB
│   └── favicon.svg              # Favicon médico de la pestaña
├── css/
│   └── styles.css               # Estilos personalizados y utilidades médicas
├── js/
│   ├── config.js                # Configuración de credenciales de Supabase
│   ├── supabaseClient.js        # Cliente de Supabase con fallback local
│   ├── store.js                 # Capa de datos y consultas CRUD
│   ├── utils.js                 # Helpers (WhatsApp, formato moneda, toasts)
│   ├── app.js                   # Lógica de renderizado de la página pública
│   └── admin.js                 # Lógica del SPA Panel Administrativo
├── supabase/
│   └── schema.sql               # Script SQL para Supabase DB, RLS y Storage
└── README.md                    # Manual de uso y configuración
```

---

## 🛠️ Ejecución Local

Para ejecutar el proyecto en tu computadora:

1. **Abrir directamente**: Haz doble clic sobre el archivo `index.html` para ver la página pública o `admin.html` para el panel administrativo.
2. **Servidor Local (Recomendado)**: Puedes utilizar cualquier extensión como *Live Server* en VS Code o Antigravity, o un servidor estático HTTP.

---

## ⚡ Configuración de Supabase (Paso a Paso)

### 1. Crear Proyecto en Supabase
1. Ingresa a [supabase.com](https://supabase.com) y crea un nuevo proyecto gratuito.
2. Ve a **Project Settings -> API** y copia:
   - **Project URL**
   - **Anon Public API Key**

### 2. Ejecutar el Script de Base de Datos
1. En el panel de Supabase, ve al **SQL Editor**.
2. Abre el archivo `supabase/schema.sql` incluido en este proyecto, copia todo su contenido y ejecútalo (**Run**).
3. Esto creará automáticamente las tablas (`site_settings`, `services`, `testimonials`, `business_hours`, `payment_methods`, `social_links`, `location`), las políticas de seguridad **RLS** y los datos iniciales de demostración.

### 3. Crear el Usuario Administrador Privado
1. En Supabase, ve a la pestaña **Authentication -> Users**.
2. Haz clic en **Add User -> Create User**.
3. Ingresa el correo electrónico del administrador (ejemplo: `admin@clinidiab.com`) y una contraseña segura.

### 4. Conectar la Web con Supabase
1. Abre el sitio en tu navegador e ingresa al **Panel Administrativo** (`admin.html`).
2. En el menú lateral, selecciona **⚡ Supabase & Config**.
3. Pega la **Supabase URL** y la **Anon Key** y haz clic en **Guardar Credenciales**.
4. ¡Listo! Todo el contenido editado en el panel se guardará y sincronizará en tiempo real con tu base de datos en la nube.

---

## 🔒 Seguridad
- No se exponen claves secretas (`service_role`) en el cliente.
- Las políticas RLS permiten únicamente la **lectura pública** de contenidos activos y restringen las acciones de **creación, edición y eliminación** a usuarios autenticados como administrador.
- El formulario de inicio de sesión no permite autoregistro ni creación pública de usuarios.
