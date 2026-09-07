/**
 * CLINIDIAB - Configuration File
 * Production Supabase credentials for project "pagina-web" (rksgmwrpjtkgwfarbkho)
 */

const CONFIG = {
  // Supabase Configuration — Active Production Project
  SUPABASE_URL: 'https://rksgmwrpjtkgwfarbkho.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrc2dtd3JwanRrZ3dmYXJia2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTM3NjIsImV4cCI6MjA3OTgyOTc2Mn0.FK5cbeeue8VOH-TDzz7qJBNs8c_9VTsQTwZZA_dbRZY',
  
  // Storage Bucket
  STORAGE_BUCKET: 'clinidiab-media',

  // Image upload limits
  MAX_IMAGE_SIZE_MB: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],

  // App Metadata
  APP_NAME: 'CLINIDIAB',
  ADMIN_EMAIL_DEFAULT: 'admin@clinidiab.com'
};

// Expose globally
window.CONFIG = CONFIG;
