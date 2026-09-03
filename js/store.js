/**
 * CLINIDIAB - Data Store Layer
 * Manages Supabase DB queries and LocalStorage fallback.
 */

const INITIAL_SEED_DATA = {
  site_settings: {
    clinic_name: 'CLINIDIAB',
    hero_title: 'Especialistas en Diabetes y Salud Integral para tu Bienestar',
    hero_subtitle: 'Brindamos atención médica especializada, oportuna y humana para el control efectivo de la diabetes, nutrición y medicina preventiva.',
    hero_image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    logo_url: 'assets/logo.svg',
    whatsapp_number: '593987654321',
    whatsapp_message: 'Hola CLINIDIAB, deseo reservar una cita médica.',
    phone_number: '+593 2 234 5678',
    email_address: 'contacto@clinidiab.com',
    address_text: 'Av. República del Salvador E10-42 y Av. 6 de Diciembre, Edificio Médico Salud, Piso 4, Consultorio 402, Quito, Ecuador'
  },
  services: [
    {
      id: 'srv-1',
      title: 'Consulta Médica de Diabetología',
      description: 'Evaluación clínica especializada, control glucémico, ajuste de medicación e insulinas, y plan preventivo de complicaciones.',
      price: 45.00,
      currency: '$',
      duration: '45 min',
      image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      is_active: true,
      display_order: 1
    },
    {
      id: 'srv-2',
      title: 'Nutrición Clínica para Diabéticos',
      description: 'Planes nutricionales 100% personalizados para el control del índice glucémico, reducción de peso saludable y hábitos sostenibles.',
      price: 35.00,
      currency: '$',
      duration: '40 min',
      image_url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
      is_active: true,
      display_order: 2
    },
    {
      id: 'srv-3',
      title: 'Perfil Metabólico & Laboratorio Rápido',
      description: 'Toma de muestra y lectura de Hemoglobina Glicosilada (HbA1c), glucosa en ayunas, perfil lipídico y examen de función renal.',
      price: 60.00,
      currency: '$',
      duration: '30 min',
      image_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
      is_active: true,
      display_order: 3
    },
    {
      id: 'srv-4',
      title: 'Evaluación de Pie Diabético & Podología Médica',
      description: 'Inspección neurológica, vascular y cuidado preventivo integral para la detección temprana de neuropatías y ulceraciones.',
      price: 40.00,
      currency: '$',
      duration: '45 min',
      image_url: '', // Sin foto para probar renderizado correcto sin huecos vacíos
      is_active: true,
      display_order: 4
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      patient_name: 'Carlos Mendoza',
      comment: 'Excelente atención en CLINIDIAB. Logré estabilizar mi hemoglobina glicosilada gracias a su plan médico y nutricional adaptado a mi ritmo de vida. Muy recomendados.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      is_active: true,
      display_order: 1
    },
    {
      id: 'test-2',
      patient_name: 'María Elena Suárez',
      comment: 'La calidez humana de los médicos y la precisión en los exámenes me dieron mucha tranquilidad. Reservar por WhatsApp fue facilísimo.',
      rating: 5,
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      is_active: true,
      display_order: 2
    },
    {
      id: 'test-3',
      patient_name: 'Roberto Gómez',
      comment: 'Llevo 2 años atendiéndome con ellos. Los controles periódicos y la orientación nutricional son impecables.',
      rating: 5,
      avatar_url: '', // Sin foto para probar avatar fallback
      is_active: true,
      display_order: 3
    }
  ],
  business_hours: [
    { id: 'bh-1', day_name: 'Lunes', is_open: true, morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00' },
    { id: 'bh-2', day_name: 'Martes', is_open: true, morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00' },
    { id: 'bh-3', day_name: 'Miércoles', is_open: true, morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00' },
    { id: 'bh-4', day_name: 'Jueves', is_open: true, morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00' },
    { id: 'bh-5', day_name: 'Viernes', is_open: true, morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '18:00' },
    { id: 'bh-6', day_name: 'Sábado', is_open: true, morning_open: '08:30', morning_close: '13:30', afternoon_open: '', afternoon_close: '' },
    { id: 'bh-7', day_name: 'Domingo', is_open: false, morning_open: '', morning_close: '', afternoon_open: '', afternoon_close: '' }
  ],
  payment_methods: [
    { id: 'pm-1', name: 'Efectivo', description: 'Pago presencial en recepción del consultorio.', is_active: true, icon: 'banknotes' },
    { id: 'pm-2', name: 'Transferencia Bancaria', description: 'Aceptamos transferencias directas a cuenta corriente.', is_active: true, icon: 'building-library' },
    { id: 'pm-3', name: 'Tarjeta de Crédito', description: 'Visa, Mastercard, American Express.', is_active: true, icon: 'credit-card' },
    { id: 'pm-4', name: 'Tarjeta de Débito', description: 'Todas las tarjetas de débito nacionales e internacionales.', is_active: true, icon: 'credit-card' }
  ],
  social_links: [
    { id: 'soc-1', platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/clinidiab_med', is_active: true },
    { id: 'soc-2', platform: 'facebook', label: 'Facebook', url: 'https://facebook.com/clinidiab', is_active: true },
    { id: 'soc-3', platform: 'tiktok', label: 'TikTok', url: 'https://tiktok.com/@clinidiab_salud', is_active: true }
  ],
  location: {
    address: 'Av. República del Salvador E10-42 y Av. 6 de Diciembre, Edificio Médico Salud, Quito',
    latitude: -0.180653,
    longitude: -78.484252,
    google_maps_url: 'https://maps.google.com/?q=-0.180653,-78.484252',
    map_embed_code: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.790445657805!2d-78.48682692415174!3d-0.18065299981754922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a7a0b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sAv.%20Rep%C3%BAblica%20del%20Salvador%2C%20Quito!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" width="100%" height="380" style="border:0; border-radius: 12px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  }
};

class DataStore {
  constructor() {
    this.storageKey = 'clinidiab_local_db_v1';
    this.ensureLocalStore();
  }

  ensureLocalStore() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(INITIAL_SEED_DATA));
    }
  }

  getLocalData() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || INITIAL_SEED_DATA;
    } catch {
      return INITIAL_SEED_DATA;
    }
  }

  saveLocalData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // --- SITE SETTINGS ---
  async getSettings() {
    if (window.supabaseManager.hasLiveSupabase()) {
      const { data, error } = await window.supabaseManager.getClient()
        .from('site_settings')
        .select('*')
        .single();
      if (!error && data) return data;
    }
    return this.getLocalData().site_settings;
  }

  async updateSettings(newSettings) {
    if (window.supabaseManager.hasLiveSupabase()) {
      const { data, error } = await window.supabaseManager.getClient()
        .from('site_settings')
        .upsert(newSettings)
        .select();
      if (error) throw error;
      return data;
    }
    const store = this.getLocalData();
    store.site_settings = { ...store.site_settings, ...newSettings };
    this.saveLocalData(store);
    return store.site_settings;
  }

  // --- SERVICES ---
  async getServices(onlyActive = false) {
    if (window.supabaseManager.hasLiveSupabase()) {
      let query = window.supabaseManager.getClient()
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
      if (onlyActive) query = query.eq('is_active', true);
      const { data, error } = await query;
      if (!error && data) return data;
    }
    let list = this.getLocalData().services || [];
    if (onlyActive) list = list.filter(s => s.is_active);
    return list.sort((a, b) => a.display_order - b.display_order);
  }

  async saveService(service) {
    if (!service.id) service.id = 'srv-' + Date.now();
    if (window.supabaseManager.hasLiveSupabase()) {
      const { data, error } = await window.supabaseManager.getClient()
        .from('services')
        .upsert(service)
        .select();
      if (error) throw error;
      return data;
    }
    const store = this.getLocalData();
    const index = store.services.findIndex(s => s.id === service.id);
    if (index >= 0) store.services[index] = service;
    else store.services.push(service);
    this.saveLocalData(store);
    return service;
  }

  async deleteService(id) {
    if (window.supabaseManager.hasLiveSupabase()) {
      const { error } = await window.supabaseManager.getClient()
        .from('services')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    }
    const store = this.getLocalData();
    store.services = store.services.filter(s => s.id !== id);
    this.saveLocalData(store);
    return true;
  }

  // --- TESTIMONIALS ---
  async getTestimonials(onlyActive = false) {
    if (window.supabaseManager.hasLiveSupabase()) {
      let query = window.supabaseManager.getClient()
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });
      if (onlyActive) query = query.eq('is_active', true);
      const { data, error } = await query;
      if (!error && data) return data;
    }
    let list = this.getLocalData().testimonials || [];
    if (onlyActive) list = list.filter(t => t.is_active);
    return list.sort((a, b) => a.display_order - b.display_order);
  }

  async saveTestimonial(testimonial) {
    if (!testimonial.id) testimonial.id = 'test-' + Date.now();
    if (window.supabaseManager.hasLiveSupabase()) {
      const { data, error } = await window.supabaseManager.getClient()
        .from('testimonials')
        .upsert(testimonial)
        .select();
      if (error) throw error;
      return data;
    }
    const store = this.getLocalData();
    const index = store.testimonials.findIndex(t => t.id === testimonial.id);
    if (index >= 0) store.testimonials[index] = testimonial;
    else store.testimonials.push(testimonial);
    this.saveLocalData(store);
    return testimonial;
  }

  async deleteTestimonial(id) {
    if (window.supabaseManager.hasLiveSupabase()) {
      const { error } = await window.supabaseManager.getClient()
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    }
    const store = this.getLocalData();
    store.testimonials = store.testimonials.filter(t => t.id !== id);
    this.saveLocalData(store);
    return true;
  }

  // --- BUSINESS HOURS ---
  async getBusinessHours() {
    if (window.supabaseManager.hasLiveSupabase()) {
      const { data, error } = await window.supabaseManager.getClient()
        .from('business_hours')
        .select('*');
      if (!error && data && data.length > 0) return data;
    }
    return this.getLocalData().business_hours;
  }

  async saveBusinessHours(hoursList) {
    if (window.supabaseManager.hasLiveSupabase()) {
      const { data, error } = await window.supabaseManager.getClient()
        .from('business_hours')
        .upsert(hoursList)
        .select();
      if (error) throw error;
      return data;
    }
    const store = this.getLocalData();
    store.business_hours = hoursList;
    this.saveLocalData(store);
    return hoursList;
  }

  // --- PAYMENT METHODS ---
  async getPaymentMethods(onlyActive = false) {
    if (window.supabaseManager.hasLiveSupabase()) {
      let query = window.supabaseManager.getClient().from('payment_methods').select('*');
      if (onlyActive) query = query.eq('is_active', true);
      const { data, error } = await query;
      if (!error && data) return data;
    }
    let list = this.getLocalData().payment_methods || [];
    if (onlyActive) list = list.filter(p => p.is_active);
    return list;
  }

  async savePaymentMethods(methods) {
    if (window.supabaseManager.hasLiveSupabase()) {
      const { data, error } = await window.supabaseManager.getClient()
        .from('payment_methods')
        .upsert(methods)
        .select();
      if (error) throw error;
      return data;
    }
    const store = this.getLocalData();
    store.payment_methods = methods;
    this.saveLocalData(store);
    return methods;
  }

  // --- SOCIAL LINKS ---
  async getSocialLinks(onlyActive = false) {
    if (window.supabaseManager.hasLiveSupabase()) {
      let query = window.supabaseManager.getClient().from('social_links').select('*');
      if (onlyActive) query = query.eq('is_active', true);
      const { data, error } = await query;
      if (!error && data) return data;
    }
    let list = this.getLocalData().social_links || [];
    if (onlyActive) list = list.filter(s => s.is_active && s.url && s.url.trim().length > 0);
    return list;
  }

  async saveSocialLinks(links) {
    if (window.supabaseManager.hasLiveSupabase()) {
      const { data, error } = await window.supabaseManager.getClient()
        .from('social_links')
        .upsert(links)
        .select();
      if (error) throw error;
      return data;
    }
    const store = this.getLocalData();
    store.social_links = links;
    this.saveLocalData(store);
    return links;
  }

  // --- LOCATION ---
  async getLocation() {
    if (window.supabaseManager.hasLiveSupabase()) {
      const { data, error } = await window.supabaseManager.getClient()
        .from('location')
        .select('*')
        .single();
      if (!error && data) return data;
    }
    return this.getLocalData().location;
  }

  async saveLocation(locationData) {
    if (window.supabaseManager.hasLiveSupabase()) {
      const { data, error } = await window.supabaseManager.getClient()
        .from('location')
        .upsert(locationData)
        .select();
      if (error) throw error;
      return data;
    }
    const store = this.getLocalData();
    store.location = { ...store.location, ...locationData };
    this.saveLocalData(store);
    return store.location;
  }
}

window.dataStore = new DataStore();
