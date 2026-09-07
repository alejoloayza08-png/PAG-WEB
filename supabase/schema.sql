-- =========================================================
-- COMPLETE SUPABASE DATABASE SCHEMA & SEED FOR MEDICAL SITES
-- (Landing Page + Admin Dashboard + Full RLS Policies)
-- =========================================================

-- 1. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_name TEXT DEFAULT 'CLINIDIAB',
  hero_title TEXT DEFAULT 'Especialistas en Diabetes y Salud Integral para tu Bienestar',
  hero_subtitle TEXT DEFAULT 'Brindamos atención médica especializada, oportuna y humana para el control efectivo de la diabetes, tiroides, nutrición y medicina preventiva.',
  hero_image_url TEXT DEFAULT 'assets/dr-fabricio-loayza.jpg',
  logo_url TEXT DEFAULT 'assets/logo.svg',
  whatsapp_number TEXT DEFAULT '593983258127',
  whatsapp_message TEXT DEFAULT 'Hola, quiero agendar una cita médica.',
  phone_number TEXT DEFAULT '+593983258127',
  email_address TEXT DEFAULT 'consultorio@clinidiab.com',
  address_text TEXT DEFAULT 'Kleber Franco entre Juan Montalvo y Páez, Machala, El Oro, Ecuador',
  hero_media_type TEXT DEFAULT 'card',
  hero_youtube_url TEXT DEFAULT 'https://www.youtube.com/watch?v=qEnvCBBya-s&t=41s',
  hero_video_autoplay BOOLEAN DEFAULT true,
  show_video_section BOOLEAN DEFAULT false,
  video_section_title TEXT DEFAULT 'Conoce al Dr. Fabricio Loayza y CLINIDIAB',
  video_section_subtitle TEXT DEFAULT 'Atención médica especializada, oportuna y humana en Machala.',
  video_section_youtube_url TEXT DEFAULT 'https://www.youtube.com/watch?v=qEnvCBBya-s&t=41s',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Doctor Bio (Tu Médico)
CREATE TABLE IF NOT EXISTS doctor_bio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_text TEXT DEFAULT 'Tu Médico',
  headline TEXT DEFAULT 'Medicina que transforma, hábitos que liberan',
  description TEXT DEFAULT 'CLINIDIAB es un consultorio médico dedicado a la prevención, diagnóstico y tratamiento integral de la diabetes y los trastornos metabólicos, con un enfoque en obesidad, tiroides, hormonas y alimentación saludable. Atención especializada, oportuna y humana en el centro de Machala.',
  image_url TEXT DEFAULT 'assets/dr-loayza-portrait.jpg',
  card1_icon TEXT DEFAULT '🩺',
  card1_title TEXT DEFAULT 'Especialista en Diabetología',
  card1_subtitle TEXT DEFAULT 'Diagnóstico, control glucémico y manejo de insulinas',
  card2_icon TEXT DEFAULT '🧬',
  card2_title TEXT DEFAULT 'Máster en Endocrinología',
  card2_subtitle TEXT DEFAULT 'Tiroides, hormonas y trastornos metabólicos',
  card3_icon TEXT DEFAULT '🥗',
  card3_title TEXT DEFAULT 'Máster en Nutrición',
  card3_subtitle TEXT DEFAULT 'Planes de alimentación y hábitos sostenibles',
  tags TEXT DEFAULT 'Obesidad, Sobrepeso, Alimentación saludable, Hábitos sanos, Diabetes, Prediabetes, Colesterol, Triglicéridos, Tiroides, Hormonas',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Medical Services
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC DEFAULT 0,
  currency TEXT DEFAULT '$',
  duration TEXT DEFAULT '45 min',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Academic Events (Actividad Académica)
CREATE TABLE IF NOT EXISTS academic_events (
  id TEXT PRIMARY KEY,
  badge_text TEXT DEFAULT 'Conferencista',
  title TEXT NOT NULL,
  description TEXT,
  institution TEXT,
  image_url TEXT,
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Cases & Transformations (Instagram)
CREATE TABLE IF NOT EXISTS cases (
  id TEXT PRIMARY KEY,
  tag_text TEXT DEFAULT 'Transformación',
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  instagram_url TEXT DEFAULT 'https://www.instagram.com/drfabricioloayza/',
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  patient_name TEXT NOT NULL,
  comment TEXT NOT NULL,
  rating INT DEFAULT 5,
  avatar_url TEXT,
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Business Hours
CREATE TABLE IF NOT EXISTS business_hours (
  id TEXT PRIMARY KEY,
  day_name TEXT NOT NULL,
  is_open BOOLEAN DEFAULT true,
  morning_open TEXT,
  morning_close TEXT,
  afternoon_open TEXT,
  afternoon_close TEXT,
  display_order INT DEFAULT 1
);

-- 8. Payment Methods
CREATE TABLE IF NOT EXISTS payment_methods (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true
);

-- 9. Social Links
CREATE TABLE IF NOT EXISTS social_links (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL,
  label TEXT,
  url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 1
);

-- 10. Location
CREATE TABLE IF NOT EXISTS location (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  google_maps_url TEXT,
  map_embed_code TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_bio ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE location ENABLE ROW LEVEL SECURITY;

-- Public RLS Policies (Read and Write)
CREATE POLICY "Public Read/Write site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write doctor_bio" ON doctor_bio FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write academic_events" ON academic_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write cases" ON cases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write business_hours" ON business_hours FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write payment_methods" ON payment_methods FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write social_links" ON social_links FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write location" ON location FOR ALL USING (true) WITH CHECK (true);

-- =========================================================
-- SEED INITIAL DATA (Template Ready for Any Medical Practice)
-- =========================================================

-- Seed site_settings
INSERT INTO site_settings (id, clinic_name, hero_title, hero_subtitle, hero_image_url, logo_url, whatsapp_number, whatsapp_message, phone_number, email_address, address_text, hero_media_type, hero_youtube_url, hero_video_autoplay, show_video_section, video_section_title, video_section_subtitle, video_section_youtube_url)
VALUES ('981c28c1-1312-47e3-92d3-8ff4268f53b0', 'CLINIDIAB', 'Especialistas en Diabetes y Salud Integral para tu Bienestar', 'Brindamos atención médica especializada, oportuna y humana para el control efectivo de la diabetes, tiroides, nutrición y medicina preventiva.', 'assets/dr-fabricio-loayza.jpg', 'assets/logo.svg', '593983258127', 'Hola, quiero agendar una cita médica.', '+593983258127', 'consultorio@clinidiab.com', 'Kleber Franco entre Juan Montalvo y Páez, Machala, El Oro, Ecuador', 'card', 'https://www.youtube.com/watch?v=qEnvCBBya-s&t=41s', true, false, 'Conoce al Dr. Fabricio Loayza y CLINIDIAB', 'Atención médica especializada, oportuna y humana en Machala.', 'https://www.youtube.com/watch?v=qEnvCBBya-s&t=41s')
ON CONFLICT (id) DO NOTHING;

-- Seed doctor_bio
INSERT INTO doctor_bio (id, badge_text, headline, description, image_url, card1_icon, card1_title, card1_subtitle, card2_icon, card2_title, card2_subtitle, card3_icon, card3_title, card3_subtitle, tags)
VALUES ('00000000-0000-0000-0000-000000000003', 'Tu Médico', 'Medicina que transforma, hábitos que liberan', 'CLINIDIAB es un consultorio médico dedicado a la prevención, diagnóstico y tratamiento integral de la diabetes y los trastornos metabólicos, con un enfoque en obesidad, tiroides, hormonas y alimentación saludable. Atención especializada, oportuna y humana en el centro de Machala.', 'assets/dr-loayza-portrait.jpg', '🩺', 'Especialista en Diabetología', 'Diagnóstico, control glucémico y manejo de insulinas', '🧬', 'Máster en Endocrinología', 'Tiroides, hormonas y trastornos metabólicos', '🥗', 'Máster en Nutrición', 'Planes de alimentación y hábitos sostenibles', 'Obesidad, Sobrepeso, Alimentación saludable, Hábitos sanos, Diabetes, Prediabetes, Colesterol, Triglicéridos, Tiroides, Hormonas')
ON CONFLICT (id) DO NOTHING;

-- Seed services
INSERT INTO services (id, title, description, price, currency, duration, is_active, display_order)
VALUES 
('4bbdf6af-3b35-4185-91fb-b882483a8cec', 'Consulta Médica de Diabetología', 'Evaluación clínica especializada, control glucémico, ajuste de medicación e insulinas, y plan preventivo de complicaciones.', 45.00, '$', '45 min', true, 1),
('c7db69de-1d76-4572-b766-ee5b35a44db0', 'Nutrición Clínica para Diabéticos', 'Planes nutricionales 100% personalizados para el control del índice glucémico, reducción de peso saludable y hábitos sostenibles.', 35.00, '$', '40 min', true, 2),
('846a2ab9-29be-4bd1-b976-a297b401a231', 'Perfil Metabólico & Laboratorio Rápido', 'Toma de muestra y lectura de Hemoglobina Glicosilada (HbA1c), glucosa en ayunas, perfil lipídico y examen de función renal.', 60.00, '$', '30 min', true, 3),
('034ba0f5-98cf-44b4-a989-a4182b6b71d2', 'Evaluación de Pie Diabético & Podología Médica', 'Inspección neurológica, vascular y cuidado preventivo integral para la detección temprana de neuropatías y úlceras.', 40.00, '$', 'Consulta', true, 4)
ON CONFLICT (id) DO NOTHING;

-- Seed academic_events
INSERT INTO academic_events (id, badge_text, title, description, institution, display_order, is_active)
VALUES
('43790ab0-efa6-468d-8eb2-f81061aa21de', 'Conferencista', 'Actualización Médica Continua', 'Participación activa en simposios clínicos nacionales e internacionales sobre avances en insulinoterapia y manejo de resistencia a la insulina.', 'Sociedades Médicas del Ecuador', 1, true),
('01a89238-5414-4237-85e5-d63d77170173', 'Congreso 2026', 'XI Semana Ecuatoriana de Enfermedades Digestivas', 'Ponencia oficial del Dr. Fabricio Loayza (Diabetólogo / Nutricionista) en el encuentro de la Sociedad Ecuatoriana de Gastroenterología.', 'Del 27 al 29 de Agosto', 2, true),
('c86ff572-aac8-461e-b081-3bec920ceea5', 'Ponencia Magistral', 'Congreso Internacional de Ginecología', 'Charla magistral sobre abordaje farmacológico, actividad física y modulación metabólica integral para la salud femenina.', 'Dr. Fabricio Loayza · Ponente', 3, true)
ON CONFLICT (id) DO NOTHING;

-- Seed cases
INSERT INTO cases (id, tag_text, title, description, instagram_url, display_order, is_active)
VALUES
('e3bcefb3-9e57-42fc-818a-7f43ed75f952', 'Transformación #6', 'Más salud, más energía, más vida', 'Recuperación de composición corporal, regulación del metabolismo y mayor vitalidad día a día.', 'https://www.instagram.com/drfabricioloayza/', 1, true),
('e2de6fe7-bcd8-487d-9c07-810c025b257a', 'Transformación #4', '66 Libras Menos y Control Glucémico Total', 'De glucemias descontroladas a energía renovada, sin dietas restrictivas ni efecto rebote.', 'https://www.instagram.com/drfabricioloayza/', 2, true),
('8512a931-78dd-4abb-8713-f2038a2be5fd', 'Transformación #2', 'Recuperando el Control Metabólico', 'Control de glucosa, reducción de grasa visceral y disminución progresiva de fármacos.', 'https://www.instagram.com/drfabricioloayza/', 3, true)
ON CONFLICT (id) DO NOTHING;

-- Seed testimonials
INSERT INTO testimonials (id, patient_name, comment, rating, display_order, is_active)
VALUES
('8a8b139c-48c6-43f1-b844-4861616c8052', 'Carlos Mendoza', 'Excelente atención en CLINIDIAB. Logré estabilizar mi hemoglobina glicosilada gracias a su plan médico y nutricional adaptado a mi ritmo de vida. Muy recomendados.', 5, 1, true),
('9b8c240d-59d7-54f2-c955-5972727d9163', 'María Elena Suárez', 'La calidez humana de los médicos y la precisión en los exámenes me dieron mucha tranquilidad. Reservar por WhatsApp fue facilísimo.', 5, 2, true),
('ac9d351e-6ae8-6503-da66-6083838ea274', 'Roberto Gómez', 'Llevo 2 años atendiéndome con ellos. Los controles periódicos y la orientación nutricional son impecables.', 5, 3, true)
ON CONFLICT (id) DO NOTHING;

-- Seed business_hours
INSERT INTO business_hours (id, day_name, is_open, morning_open, morning_close, afternoon_open, afternoon_close, display_order)
VALUES
('b7254b79-fbdd-4c5e-9b54-9697951325fa', 'Lunes', true, '10:00', '13:00', '15:00', '19:00', 1),
('d006acbe-907c-4f65-8a51-4b89d570641c', 'Martes', true, '10:00', '13:00', '15:00', '19:00', 2),
('796039b5-5d1b-4b8c-be6c-d8c698160885', 'Miércoles', true, '10:00', '13:00', '15:00', '19:00', 3),
('679c51f9-6d61-4575-86dc-5a772c4bc340', 'Jueves', true, '10:00', '13:00', '15:00', '19:00', 4),
('e3316d49-0456-4f7b-943f-46c57df5725c', 'Viernes', true, '10:00', '13:00', '15:00', '18:00', 5),
('6422e259-aef0-429f-bdaa-af282ba8c4e2', 'Sábado', true, '10:30', '13:30', '', '', 6),
('50dce804-4e42-4111-9ba8-b2ffa70130a4', 'Domingo', false, '', '', '', '', 7)
ON CONFLICT (id) DO NOTHING;

-- Seed payment_methods
INSERT INTO payment_methods (id, name, description, icon, is_active)
VALUES
('11111111-1111-1111-1111-111111111111', 'Efectivo', 'Pago presencial en recepción del consultorio.', 'banknotes', true),
('22222222-2222-2222-2222-222222222222', 'Transferencia Bancaria', 'Aceptamos transferencias directas a cuenta corriente.', 'building-library', true),
('33333333-3333-3333-3333-333333333333', 'Tarjeta de Crédito', 'Visa, Mastercard, American Express.', 'credit-card', true),
('44444444-4444-4444-4444-444444444444', 'Tarjeta de Débito', 'Todas las tarjetas de débito nacionales e internacionales.', 'credit-card', true)
ON CONFLICT (id) DO NOTHING;

-- Seed social_links
INSERT INTO social_links (id, platform, label, url, is_active, display_order)
VALUES
('55555555-5555-5555-5555-555555555555', 'instagram', 'Instagram', 'https://www.instagram.com/drfabricioloayza/', true, 1),
('66666666-6666-6666-6666-666666666666', 'facebook', 'Clinidiab en Facebook', 'https://www.facebook.com/119541705083687', true, 2),
('77777777-7777-7777-7777-777777777777', 'youtube', 'Doctor Loayza en YouTube', 'https://youtube.com/@fabricio19212', true, 3),
('88888888-8888-8888-8888-888888888888', 'tiktok', 'TikTok', 'https://tiktok.com/@clinidiab', false, 4)
ON CONFLICT (id) DO NOTHING;

-- Seed location
INSERT INTO location (id, address, latitude, longitude, google_maps_url, map_embed_code)
VALUES
('00000000-0000-0000-0000-000000000002', 'Kleber Franco entre Juan Montalvo y Páez, Machala, El Oro, Ecuador', -3.258824, -79.955500, 'https://maps.google.com/?q=Kleber+Franco+entre+Juan+Montalvo+y+P%C3%A1ez,+Machala', '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.5627!2d-79.9588!3d-3.2586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x90330e6206019d55%3A0x1d441db1b7454941!2sMachala%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" width="100%" height="380" style="border:0; border-radius: 16px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>')
ON CONFLICT (id) DO NOTHING;
