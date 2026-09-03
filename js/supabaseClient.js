/**
 * CLINIDIAB - Supabase Client Manager
 * Handles Supabase SDK initialization and fallback detection.
 */

class SupabaseManager {
  constructor() {
    this.client = null;
    this.isConfigured = false;
    this.init();
  }

  init() {
    const url = window.CONFIG.SUPABASE_URL || localStorage.getItem('clinidiab_supabase_url');
    const key = window.CONFIG.SUPABASE_ANON_KEY || localStorage.getItem('clinidiab_supabase_key');

    if (url && key && window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        this.client = window.supabase.createClient(url, key);
        this.isConfigured = true;
        console.log('✅ Supabase client initialized successfully.');
      } catch (err) {
        console.warn('⚠️ Error initializing Supabase client:', err);
        this.client = null;
        this.isConfigured = false;
      }
    } else {
      console.log('ℹ️ Supabase credentials not set or SDK not loaded. Operating in Local Data Mode.');
      this.client = null;
      this.isConfigured = false;
    }
  }

  getClient() {
    return this.client;
  }

  hasLiveSupabase() {
    return this.isConfigured && this.client !== null;
  }

  updateCredentials(url, key) {
    if (url) localStorage.setItem('clinidiab_supabase_url', url);
    else localStorage.removeItem('clinidiab_supabase_url');

    if (key) localStorage.setItem('clinidiab_supabase_key', key);
    else localStorage.removeItem('clinidiab_supabase_key');

    window.CONFIG.SUPABASE_URL = url || '';
    window.CONFIG.SUPABASE_ANON_KEY = key || '';
    
    this.init();
  }
}

window.supabaseManager = new SupabaseManager();
