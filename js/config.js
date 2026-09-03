/**
 * CLINIDIAB - Configuration File
 * Contains Supabase connection credentials and application constants.
 */

const CONFIG = {
  // Supabase Configuration
  SUPABASE_URL: window.localStorage.getItem('clinidiab_supabase_url') || 'https://szsloepwydrxyxkciyyw.supabase.co',
  SUPABASE_ANON_KEY: window.localStorage.getItem('clinidiab_supabase_key') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6c2xvZXB3eWRyeHl4a2NpeXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDczODEsImV4cCI6MjEwNDAyMzM4MX0.uDHP5w0gn8gSfjkZIpNWLR0FVmDw6ZDziDh9bYLO6F0',
  
  // Storage Bucket
  STORAGE_BUCKET: 'clinidiab-media',

  // Image upload limits
  MAX_IMAGE_SIZE_MB: 5,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],

  // App Metadata
  APP_NAME: 'CLINIDIAB',
  ADMIN_EMAIL_DEFAULT: 'admin@clinidiab.com'
};

// Expose globally
window.CONFIG = CONFIG;
