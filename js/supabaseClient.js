/**
 * CLINIDIAB - Supabase Client Manager
 */

class SupabaseManager {
  constructor() {
    this.client = null;
    this.isConfigured = false;
    this.init();
  }

  init() {
    const url = window.CONFIG.SUPABASE_URL;
    const key = window.CONFIG.SUPABASE_ANON_KEY;

    if (url && key && typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
      try {
        this.client = window.supabase.createClient(url, key, {
          auth: { autoRefreshToken: true, persistSession: true }
        });
        this.isConfigured = true;
        console.log('✅ Supabase CLINIDIAB conectado:', url);
      } catch (e) {
        console.error('❌ Error iniciando Supabase:', e);
      }
    } else {
      console.warn('⚠️ Supabase no disponible — usando datos locales');
    }
  }

  getClient() { return this.client; }
  isReady()   { return this.isConfigured && this.client !== null; }
}

window.supabaseManager = new SupabaseManager();
