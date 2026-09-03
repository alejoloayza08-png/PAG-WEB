-- ==========================================================
-- CLINIDIAB MEDICAL WEBSITE DATABASE SCHEMA FOR SUPABASE DB
-- ==========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_name VARCHAR(255) NOT NULL DEFAULT 'CLINIDIAB',
    hero_title TEXT NOT NULL,
    hero_subtitle TEXT NOT NULL,
    hero_image_url TEXT,
    logo_url TEXT,
    whatsapp_number VARCHAR(50) NOT NULL,
    whatsapp_message TEXT DEFAULT 'Hola CLINIDIAB, deseo reservar una cita médica.',
    phone_number VARCHAR(50),
    email_address VARCHAR(255),
    address_text TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT '$',
    duration VARCHAR(50),
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id VARCHAR(100) PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BUSINESS HOURS TABLE
CREATE TABLE IF NOT EXISTS public.business_hours (
    id VARCHAR(50) PRIMARY KEY,
    day_name VARCHAR(20) NOT NULL,
    is_open BOOLEAN DEFAULT true,
    morning_open VARCHAR(10),
    morning_close VARCHAR(10),
    afternoon_open VARCHAR(10),
    afternoon_close VARCHAR(10),
    display_order INT DEFAULT 1
);

-- 6. PAYMENT METHODS TABLE
CREATE TABLE IF NOT EXISTS public.payment_methods (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    icon VARCHAR(50)
);

-- 7. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
    id VARCHAR(50) PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    label VARCHAR(100),
    url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- 8. LOCATION TABLE
CREATE TABLE IF NOT EXISTS public.location (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    google_maps_url TEXT,
    map_embed_code TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Everyone can view public content)
CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Business Hours" ON public.business_hours FOR SELECT USING (true);
CREATE POLICY "Public Read Payment Methods" ON public.payment_methods FOR SELECT USING (true);
CREATE POLICY "Public Read Social Links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public Read Location" ON public.location FOR SELECT USING (true);

-- ADMIN WRITE POLICIES (Only authenticated Supabase Auth users can edit)
CREATE POLICY "Admin All Site Settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Business Hours" ON public.business_hours FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Payment Methods" ON public.payment_methods FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Social Links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Location" ON public.location FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==========================================================
-- SUPABASE STORAGE BUCKET CONFIGURATION
-- ==========================================================
-- Run in Supabase Storage UI or SQL:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('clinidiab-media', 'clinidiab-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Media" ON storage.objects FOR SELECT USING (bucket_id = 'clinidiab-media');
CREATE POLICY "Admin Upload Media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'clinidiab-media');
CREATE POLICY "Admin Update Media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'clinidiab-media');
CREATE POLICY "Admin Delete Media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'clinidiab-media');

-- ==========================================================
-- INITIAL DEMO SEED DATA
-- ==========================================================

INSERT INTO public.site_settings (clinic_name, hero_title, hero_subtitle, hero_image_url, logo_url, whatsapp_number, whatsapp_message, phone_number, email_address, address_text)
VALUES (
  'CLINIDIAB',
  'Especialistas en Diabetes y Salud Integral para tu Bienestar',
  'Brindamos atención médica especializada, oportuna y humana para el control efectivo de la diabetes, nutrición y medicina preventiva.',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
  'assets/logo.svg',
  '593987654321',
  'Hola CLINIDIAB, deseo reservar una cita médica.',
  '+593 2 234 5678',
  'contacto@clinidiab.com',
  'Av. República del Salvador E10-42 y Av. 6 de Diciembre, Edificio Médico Salud, Piso 4, Consultorio 402, Quito, Ecuador'
) ON CONFLICT DO NOTHING;

INSERT INTO public.services (id, title, description, price, currency, duration, image_url, is_active, display_order)
VALUES 
('srv-1', 'Consulta Médica de Diabetología', 'Evaluación clínica especializada, control glucémico, ajuste de medicación e insulinas, y plan preventivo de complicaciones.', 45.00, '$', '45 min', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80', true, 1),
('srv-2', 'Nutrición Clínica para Diabéticos', 'Planes nutricionales 100% personalizados para el control del índice glucémico, reducción de peso saludable y hábitos sostenibles.', 35.00, '$', '40 min', 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80', true, 2),
('srv-3', 'Perfil Metabólico & Laboratorio Rápido', 'Toma de muestra y lectura de Hemoglobina Glicosilada (HbA1c), glucosa en ayunas, perfil lipídico y examen de función renal.', 60.00, '$', '30 min', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80', true, 3),
('srv-4', 'Evaluación de Pie Diabético & Podología Médica', 'Inspección neurológica, vascular y cuidado preventivo integral para la detección temprana de neuropatías y ulceraciones.', 40.00, '$', '45 min', '', true, 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.testimonials (id, patient_name, comment, rating, avatar_url, is_active, display_order)
VALUES
('test-1', 'Carlos Mendoza', 'Excelente atención en CLINIDIAB. Logré estabilizar mi hemoglobina glicosilada gracias a su plan médico y nutricional adaptado a mi ritmo de vida. Muy recomendados.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', true, 1),
('test-2', 'María Elena Suárez', 'La calidez humana de los médicos y la precisión en los exámenes me dieron mucha tranquilidad. Reservar por WhatsApp fue facilísimo.', 5, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', true, 2),
('test-3', 'Roberto Gómez', 'Llevo 2 años atendiéndome con ellos. Los controles periódicos y la orientación nutricional son impecables.', 5, '', true, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.business_hours (id, day_name, is_open, morning_open, morning_close, afternoon_open, afternoon_close, display_order)
VALUES
('bh-1', 'Lunes', true, '08:00', '13:00', '15:00', '19:00', 1),
('bh-2', 'Martes', true, '08:00', '13:00', '15:00', '19:00', 2),
('bh-3', 'Miércoles', true, '08:00', '13:00', '15:00', '19:00', 3),
('bh-4', 'Jueves', true, '08:00', '13:00', '15:00', '19:00', 4),
('bh-5', 'Viernes', true, '08:00', '13:00', '15:00', '18:00', 5),
('bh-6', 'Sábado', true, '08:30', '13:30', '', '', 6),
('bh-7', 'Domingo', false, '', '', '', '', 7)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.payment_methods (id, name, description, is_active, icon)
VALUES
('pm-1', 'Efectivo', 'Pago presencial en recepción del consultorio.', true, 'cash'),
('pm-2', 'Transferencia Bancaria', 'Aceptamos transferencias directas a cuenta corriente.', true, 'bank'),
('pm-3', 'Tarjeta de Crédito', 'Visa, Mastercard, American Express.', true, 'card'),
('pm-4', 'Tarjeta de Débito', 'Todas las tarjetas de débito nacionales e internacionales.', true, 'card')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.social_links (id, platform, label, url, is_active)
VALUES
('soc-1', 'instagram', 'Instagram', 'https://instagram.com/clinidiab_med', true),
('soc-2', 'facebook', 'Facebook', 'https://facebook.com/clinidiab', true),
('soc-3', 'tiktok', 'TikTok', 'https://tiktok.com/@clinidiab_salud', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.location (address, latitude, longitude, google_maps_url, map_embed_code)
VALUES (
  'Av. República del Salvador E10-42 y Av. 6 de Diciembre, Edificio Médico Salud, Quito',
  -0.180653,
  -78.484252,
  'https://maps.google.com/?q=-0.180653,-78.484252',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.790445657805!2d-78.48682692415174!3d-0.18065299981754922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a7a0b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sAv.%20Rep%C3%BAblica%20del%20Salvador%2C%20Quito!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" width="100%" height="380" style="border:0; border-radius: 12px;" allowfullscreen="" loading="lazy"></iframe>'
) ON CONFLICT DO NOTHING;
