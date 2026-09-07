-- =========================================================
-- CLINIDIAB - Complete Supabase Database Schema & Storage
-- =========================================================

-- 1. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_name TEXT DEFAULT 'CLINIDIAB',
  hero_title TEXT DEFAULT 'Medicina que transforma, hábitos que liberan',
  hero_subtitle TEXT,
  hero_image_url TEXT,
  logo_url TEXT,
  whatsapp_number TEXT DEFAULT '593987654321',
  whatsapp_message TEXT DEFAULT 'Hola CLINIDIAB, quisiera reservar una cita médica.',
  phone_number TEXT,
  email_address TEXT,
  address_text TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Doctor Bio (Tu Médico)
CREATE TABLE IF NOT EXISTS doctor_bio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_text TEXT DEFAULT 'Tu Médico',
  headline TEXT DEFAULT 'Medicina que transforma, hábitos que liberan',
  description TEXT,
  image_url TEXT,
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
  duration TEXT,
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
  is_active BOOLEAN DEFAULT true
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

-- Enable RLS and create public policies
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
