/**
 * CLINIDIAB - Supabase Client Manager
 * Handles Supabase SDK initialization and active production client.
 */

class SupabaseManager {
  constructor() {
    this.client = null;
    this.isConfigured = false;
    this.init();
  }

  init() {
    // Clear any stale legacy localStorage URLs from previous tests
    try {
      const storedUrl = localStorage.getItem('clinidiab_supabase_url');
      if (storedUrl && !storedUrl.includes('rksgmwrpjtkgwfarbkho')) {
        localStorage.removeItem('clinidiab_supabase_url');
        localStorage.removeItem('clinidiab_supabase_key');
      }
    } catch (e) {}

    const url = window.CONFIG.SUPABASE_URL;
    const key = window.CONFIG.SUPABASE_ANON_KEY;

    if (url && key && typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
      try {
        this.client = window.supabase.createClient(url, key, {
          auth: {
            autoRefreshToken: true,
            persistSession: true
          }
        });
        this.isConfigured = true;
        console.log('✅ Supabase client initialized successfully:', url);
      } catch (err) {
        console.warn('⚠️ Error initializing Supabase client:', err);
        this.client = null;
        this.isConfigured = false;
      }
    } else {
      console.log('ℹ️ Supabase credentials or SDK not found. Operating in fallback mode.');
      this.client = null;
      this.isConfigured = false;
    }
  }

  getClient() {
    return this.client;
  }

  hasLiveSupabase() {
    return Boolean(this.isConfigured && this.client !== null);
  }

  isReady() {
    return this.hasLiveSupabase();
  }

  updateCredentials(url, key) {
    if (url) localStorage.setItem('clinidiab_supabase_url', url);
    else localStorage.removeItem('clinidiab_supabase_url');

    if (key) localStorage.setItem('clinidiab_supabase_key', key);
    else localStorage.removeItem('clinidiab_supabase_key');

    window.CONFIG.SUPABASE_URL = url || 'https://rksgmwrpjtkgwfarbkho.supabase.co';
    window.CONFIG.SUPABASE_ANON_KEY = key || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrc2dtd3JwanRrZ3dmYXJia2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTM3NjIsImV4cCI6MjA3OTgyOTc2Mn0.FK5cbeeue8VOH-TDzz7qJBNs8c_9VTsQTwZZA_dbRZY';

    this.init();
    return this.isConfigured;
  }
}

window.supabaseManager = new SupabaseManager();
