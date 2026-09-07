/**
 * CLINIDIAB - Data Store Layer
 * Apunta a tu Supabase propio (pagina-web), tablas con prefijo clinidiab_
 * Fallback local para modo offline.
 */

const INITIAL_SEED_DATA = {
  site_settings: {
    id: '00000000-0000-0000-0000-000000000001',
    clinic_name: 'CLINIDIAB',
    hero_title: 'Medicina que transforma, hábitos que liberan',
    hero_subtitle: 'CLINIDIAB es un consultorio médico dedicado a la prevención, diagnóstico y tratamiento integral de la diabetes y los trastornos metabólicos, con un enfoque en obesidad, tiroides, hormonas y alimentación saludable. Atención especializada, oportuna y humana en el centro de Machala.',
    hero_image_url: 'assets/dr-loayza-portrait.jpg',
    logo_url: 'assets/logo.svg',
    whatsapp_number: '593987654321',
    whatsapp_message: 'Hola CLINIDIAB, quisiera reservar una cita médica.',
    phone_number: '+593 99 876 5432',
    email_address: 'contacto@clinidiab.com',
    address_text: 'Kleber Franco entre Juan Montalvo y Páez, Machala, El Oro, Ecuador'
  },
  services: [
    { id: 'srv-1', title: 'Consulta Médica de Diabetología', description: 'Evaluación clínica especializada, control glucémico, ajuste de medicación e insulinas, y plan preventivo de complicaciones.', price: 45.00, currency: '$', duration: '45 min', icon_name: 'stethoscope', is_active: true, display_order: 1 },
    { id: 'srv-2', title: 'Nutrición Clínica para Diabéticos', description: 'Planes nutricionales 100% personalizados para el control del índice glucémico, reducción de peso saludable y hábitos sostenibles.', price: 35.00, currency: '$', duration: '40 min', icon_name: 'droplet', is_active: true, display_order: 2 },
    { id: 'srv-3', title: 'Perfil Metabólico & Laboratorio', description: 'Toma de muestra y lectura de HbA1c, glucosa en ayunas, perfil lipídico y examen de función renal.', price: 60.00, currency: '$', duration: '30 min', icon_name: 'flask', is_active: true, display_order: 3 },
    { id: 'srv-4', title: 'Evaluación de Pie Diabético', description: 'Inspección neurológica, vascular y cuidado preventivo integral para la detección temprana de neuropatías y ulceraciones.', price: 40.00, currency: '$', duration: '45 min', icon_name: 'foot', is_active: true, display_order: 4 },
    { id: 'srv-5', title: 'Tiroides & Hormonas', description: 'Diagnóstico y tratamiento de hipotiroidismo, hipertiroidismo, nódulos tiroideos y desequilibrios hormonales.', price: 45.00, currency: '$', duration: '45 min', icon_name: 'activity', is_active: true, display_order: 5 },
    { id: 'srv-6', title: 'Control de Obesidad', description: 'Plan metabólico personalizado para sobrepeso, resistencia a la insulina y colesterol elevado con seguimiento continuo.', price: 45.00, currency: '$', duration: 'Consulta', icon_name: 'scale', is_active: true, display_order: 6 }
  ],
  testimonials: [
    { id: 'test-1', patient_name: 'Carlos Mendoza', comment: 'Excelente atención en CLINIDIAB. Logré estabilizar mi hemoglobina glicosilada gracias a su plan médico y nutricional. Muy recomendados.', rating: 5, avatar_url: '', is_active: true, display_order: 1 },
    { id: 'test-2', patient_name: 'María Elena Suárez', comment: 'La calidez humana de los médicos y la precisión en los exámenes me dieron mucha tranquilidad. Reservar por WhatsApp fue facilísimo.', rating: 5, avatar_url: '', is_active: true, display_order: 2 },
    { id: 'test-3', patient_name: 'Roberto Gómez', comment: 'Llevo 2 años atendiéndome con ellos. Los controles periódicos y la orientación nutricional son impecables.', rating: 5, avatar_url: '', is_active: true, display_order: 3 }
  ],
  business_hours: [
    { id: 'bh-1', day_name: 'Lunes',     is_open: true,  morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 1 },
    { id: 'bh-2', day_name: 'Martes',    is_open: true,  morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 2 },
    { id: 'bh-3', day_name: 'Miércoles', is_open: true,  morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 3 },
    { id: 'bh-4', day_name: 'Jueves',    is_open: true,  morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 4 },
    { id: 'bh-5', day_name: 'Viernes',   is_open: true,  morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '18:00', display_order: 5 },
    { id: 'bh-6', day_name: 'Sábado',    is_open: true,  morning_open: '08:00', morning_close: '12:00', afternoon_open: '',      afternoon_close: '',      display_order: 6 },
    { id: 'bh-7', day_name: 'Domingo',   is_open: false, morning_open: '',      morning_close: '',      afternoon_open: '',      afternoon_close: '',      display_order: 7 }
  ],
  payment_methods: [
    { id: 'pm-1', name: 'Efectivo',                    description: 'Pago presencial en recepción del consultorio.', is_active: true, icon_emoji: '💵' },
    { id: 'pm-2', name: 'Transferencia Bancaria',       description: 'Transferencias directas a cuenta corriente.',  is_active: true, icon_emoji: '🏦' },
    { id: 'pm-3', name: 'Tarjeta de Débito / Crédito', description: 'Visa, Mastercard, American Express.',          is_active: true, icon_emoji: '💳' },
    { id: 'pm-4', name: 'Pagos Móviles (Payphone)',     description: 'Pago rápido desde tu celular.',               is_active: true, icon_emoji: '📱' }
  ],
  social_links: [
    { id: 'soc-1', platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/drfabricioloayza/', is_active: true },
    { id: 'soc-2', platform: 'whatsapp',  label: 'WhatsApp',  url: 'https://wa.me/593987654321',                 is_active: true }
  ],
  location: {
    id: '00000000-0000-0000-0000-000000000002',
    address: 'Kleber Franco entre Juan Montalvo y Páez, Machala, El Oro, Ecuador',
    latitude: -3.258824,
    longitude: -79.955500,
    google_maps_url: 'https://maps.google.com/?q=Kleber+Franco+entre+Juan+Montalvo+y+P%C3%A1ez,+Machala',
    map_embed_code: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.5627!2d-79.9588!3d-3.2586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x90330e6206019d55%3A0x1d441db1b7454941!2sMachala%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" width="100%" height="380" style="border:0;border-radius:16px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  }
};

class DataStore {
  constructor() {
    this.storageKey = 'clinidiab_local_db_v2';
    this.prefix     = 'clinidiab_';
    this.ensureLocalStore();
  }

  ensureLocalStore() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(INITIAL_SEED_DATA));
    }
  }

  getLocalData() {
    try { return JSON.parse(localStorage.getItem(this.storageKey)) || INITIAL_SEED_DATA; }
    catch { return INITIAL_SEED_DATA; }
  }

  saveLocalData(data) { localStorage.setItem(this.storageKey, JSON.stringify(data)); }

  hasSupabase() {
    return window.supabaseManager && window.supabaseManager.isReady();
  }

  sb() { return window.supabaseManager.getClient(); }

  // ── SETTINGS ──
  async getSettings() {
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb()
          .from(`${this.prefix}configuracion_sitio`)
          .select('*').limit(1);
        if (!error && data && data.length > 0) {
          // map column names → legacy keys expected by app.js
          const r = data[0];
          return {
            ...r,
            hero_image_url: r.hero_image_url || 'assets/dr-loayza-portrait.jpg',
          };
        }
      } catch(e) { console.warn('getSettings Supabase:', e); }
    }
    return this.getLocalData().site_settings;
  }

  async updateSettings(newSettings) {
    const payload = { ...newSettings, updated_at: new Date().toISOString() };
    if (this.hasSupabase()) {
      try {
        const current = await this.getSettings();
        const { data, error } = await this.sb()
          .from(`${this.prefix}configuracion_sitio`)
          .upsert({ id: current.id, ...payload }).select();
        if (error) throw error;
        const store = this.getLocalData();
        store.site_settings = { ...store.site_settings, ...payload };
        this.saveLocalData(store);
        return data ? data[0] : payload;
      } catch(e) { console.error('updateSettings Supabase:', e); }
    }
    const store = this.getLocalData();
    store.site_settings = { ...store.site_settings, ...payload };
    this.saveLocalData(store);
    return store.site_settings;
  }

  // ── SERVICES ──
  async getServices(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let q = this.sb()
          .from(`${this.prefix}servicios`)
          .select('*').order('display_order', { ascending: true });
        if (onlyActive) q = q.eq('is_active', true);
        const { data, error } = await q;
        if (!error && data) return data;
      } catch(e) { console.warn('getServices Supabase:', e); }
    }
    let list = this.getLocalData().services || [];
    if (onlyActive) list = list.filter(s => s.is_active);
    return list.sort((a,b) => a.display_order - b.display_order);
  }

  async saveService(service) {
    if (!service.id) service.id = crypto.randomUUID ? crypto.randomUUID() : 'srv-' + Date.now();
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb()
          .from(`${this.prefix}servicios`).upsert(service).select();
        if (error) throw error;
        const store = this.getLocalData();
        const i = store.services.findIndex(s => s.id === service.id);
        i >= 0 ? store.services[i] = service : store.services.push(service);
        this.saveLocalData(store);
        return data;
      } catch(e) { console.error('saveService Supabase:', e); }
    }
    const store = this.getLocalData();
    const i = store.services.findIndex(s => s.id === service.id);
    i >= 0 ? store.services[i] = service : store.services.push(service);
    this.saveLocalData(store);
    return service;
  }

  async deleteService(id) {
    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb()
          .from(`${this.prefix}servicios`).delete().eq('id', id);
        if (error) throw error;
      } catch(e) { console.error('deleteService:', e); }
    }
    const store = this.getLocalData();
    store.services = store.services.filter(s => s.id !== id);
    this.saveLocalData(store);
    return true;
  }

  // ── TESTIMONIALS ──
  async getTestimonials(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let q = this.sb()
          .from(`${this.prefix}testimonios`)
          .select('*').order('display_order', { ascending: true });
        if (onlyActive) q = q.eq('is_active', true);
        const { data, error } = await q;
        if (!error && data) return data.map(r => ({
          ...r, patient_name: r.patient_name, avatar_url: r.avatar_url || ''
        }));
      } catch(e) { console.warn('getTestimonials Supabase:', e); }
    }
    let list = this.getLocalData().testimonials || [];
    if (onlyActive) list = list.filter(t => t.is_active);
    return list.sort((a,b) => a.display_order - b.display_order);
  }

  async saveTestimonial(testimonial) {
    if (!testimonial.id) testimonial.id = crypto.randomUUID ? crypto.randomUUID() : 'test-' + Date.now();
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb()
          .from(`${this.prefix}testimonios`).upsert(testimonial).select();
        if (error) throw error;
        const store = this.getLocalData();
        const i = store.testimonials.findIndex(t => t.id === testimonial.id);
        i >= 0 ? store.testimonials[i] = testimonial : store.testimonials.push(testimonial);
        this.saveLocalData(store);
        return data;
      } catch(e) { console.error('saveTestimonial:', e); }
    }
    const store = this.getLocalData();
    const i = store.testimonials.findIndex(t => t.id === testimonial.id);
    i >= 0 ? store.testimonials[i] = testimonial : store.testimonials.push(testimonial);
    this.saveLocalData(store);
    return testimonial;
  }

  async deleteTestimonial(id) {
    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb()
          .from(`${this.prefix}testimonios`).delete().eq('id', id);
        if (error) throw error;
      } catch(e) { console.error('deleteTestimonial:', e); }
    }
    const store = this.getLocalData();
    store.testimonials = store.testimonials.filter(t => t.id !== id);
    this.saveLocalData(store);
    return true;
  }

  // ── BUSINESS HOURS ──
  async getBusinessHours() {
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb()
          .from(`${this.prefix}horarios`)
          .select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch(e) { console.warn('getBusinessHours:', e); }
    }
    return this.getLocalData().business_hours;
  }

  async saveBusinessHours(hoursList) {
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb()
          .from(`${this.prefix}horarios`).upsert(hoursList).select();
        if (error) throw error;
        const store = this.getLocalData();
        store.business_hours = hoursList;
        this.saveLocalData(store);
        return data;
      } catch(e) { console.error('saveBusinessHours:', e); }
    }
    const store = this.getLocalData();
    store.business_hours = hoursList;
    this.saveLocalData(store);
    return hoursList;
  }

  // ── PAYMENT METHODS ──
  async getPaymentMethods(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let q = this.sb().from(`${this.prefix}formas_pago`).select('*');
        if (onlyActive) q = q.eq('is_active', true);
        const { data, error } = await q;
        if (!error && data) return data.map(r => ({
          ...r, name: r.name, description: r.description || '', icon: r.icon_emoji || '💳'
        }));
      } catch(e) { console.warn('getPaymentMethods:', e); }
    }
    let list = this.getLocalData().payment_methods || [];
    if (onlyActive) list = list.filter(p => p.is_active);
    return list;
  }

  async savePaymentMethods(methods) {
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb()
          .from(`${this.prefix}formas_pago`).upsert(methods).select();
        if (error) throw error;
        const store = this.getLocalData();
        store.payment_methods = methods;
        this.saveLocalData(store);
        return data;
      } catch(e) { console.error('savePaymentMethods:', e); }
    }
    const store = this.getLocalData();
    store.payment_methods = methods;
    this.saveLocalData(store);
    return methods;
  }

  // ── SOCIAL LINKS ──
  async getSocialLinks(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let q = this.sb().from(`${this.prefix}redes_sociales`).select('*');
        if (onlyActive) q = q.eq('is_active', true);
        const { data, error } = await q;
        if (!error && data) return data.map(r => ({
          ...r, platform: r.icon_name || r.platform, label: r.platform, url: r.url
        }));
      } catch(e) { console.warn('getSocialLinks:', e); }
    }
    let list = this.getLocalData().social_links || [];
    if (onlyActive) list = list.filter(s => s.is_active && s.url && s.url.trim().length > 0);
    return list;
  }

  async saveSocialLinks(links) {
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb()
          .from(`${this.prefix}redes_sociales`).upsert(links).select();
        if (error) throw error;
        const store = this.getLocalData();
        store.social_links = links;
        this.saveLocalData(store);
        return data;
      } catch(e) { console.error('saveSocialLinks:', e); }
    }
    const store = this.getLocalData();
    store.social_links = links;
    this.saveLocalData(store);
    return links;
  }

  // ── LOCATION (local only for now) ──
  async getLocation() {
    return this.getLocalData().location;
  }

  async saveLocation(locationData) {
    const current = await this.getLocation();
    const payload = { id: current?.id || crypto.randomUUID(), ...locationData };
    const store = this.getLocalData();
    store.location = { ...store.location, ...payload };
    this.saveLocalData(store);
    return store.location;
  }
}

window.dataStore = new DataStore();
