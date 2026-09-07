/**
 * CLINIDIAB - Data Store Layer
 * Bulletproof Supabase CRUD for site_settings, services, testimonials,
 * business_hours, payment_methods, social_links, location.
 * Real-time sync with user's Supabase DB + LocalStorage fallback.
 */

const INITIAL_SEED_DATA = {
  site_settings: {
    id: '00000000-0000-0000-0000-000000000001',
    clinic_name: 'CLINIDIAB',
    hero_title: 'Medicina que transforma, hábitos que liberan',
    hero_subtitle: 'CLINIDIAB es un consultorio médico dedicado a la prevención, diagnóstico y tratamiento integral de la diabetes y los trastornos metabólicos, con un enfoque en obesidad, tiroides, hormonas y alimentación saludable. Atención especializada, oportuna y humana en el centro de Machala.',
    hero_image_url: 'assets/dr-fabricio-loayza-hq.jpg',
    logo_url: 'assets/logo.svg',
    whatsapp_number: '593987654321',
    whatsapp_message: 'Hola CLINIDIAB, quisiera reservar una cita médica.',
    phone_number: '+593 99 876 5432',
    email_address: 'contacto@clinidiab.com',
    address_text: 'Kleber Franco entre Juan Montalvo y Páez, Machala, El Oro, Ecuador'
  },
  services: [
    {
      id: 'srv-1',
      title: 'Consulta Médica de Diabetología',
      description: 'Evaluación clínica especializada, control glucémico, ajuste de medicación e insulinas, y plan preventivo de complicaciones.',
      price: 45.00,
      currency: '$',
      duration: '45 min',
      image_url: 'assets/dr-fabricio-loayza-profile.jpg',
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
      image_url: 'assets/post-transformacion-1.jpg',
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
      image_url: 'assets/post-transformacion-2.jpg',
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
      image_url: 'assets/post-transformacion-3.jpg',
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
      avatar_url: '',
      is_active: true,
      display_order: 1
    },
    {
      id: 'test-2',
      patient_name: 'María Elena Suárez',
      comment: 'La calidez humana de los médicos y la precisión en los exámenes me dieron mucha tranquilidad. Reservar por WhatsApp fue facilísimo.',
      rating: 5,
      avatar_url: '',
      is_active: true,
      display_order: 2
    },
    {
      id: 'test-3',
      patient_name: 'Roberto Gómez',
      comment: 'Llevo 2 años atendiéndome con ellos. Los controles periódicos y la orientación nutricional son impecables.',
      rating: 5,
      avatar_url: '',
      is_active: true,
      display_order: 3
    }
  ],
  business_hours: [
    { id: 'bh-1', day_name: 'Lunes', is_open: true, morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 1 },
    { id: 'bh-2', day_name: 'Martes', is_open: true, morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 2 },
    { id: 'bh-3', day_name: 'Miércoles', is_open: true, morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 3 },
    { id: 'bh-4', day_name: 'Jueves', is_open: true, morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 4 },
    { id: 'bh-5', day_name: 'Viernes', is_open: true, morning_open: '08:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '18:00', display_order: 5 },
    { id: 'bh-6', day_name: 'Sábado', is_open: true, morning_open: '08:30', morning_close: '13:30', afternoon_open: '', afternoon_close: '', display_order: 6 },
    { id: 'bh-7', day_name: 'Domingo', is_open: false, morning_open: '', morning_close: '', afternoon_open: '', afternoon_close: '', display_order: 7 }
  ],
  payment_methods: [
    { id: 'pm-1', name: 'Efectivo', description: 'Pago presencial en recepción del consultorio.', is_active: true, icon: 'banknotes' },
    { id: 'pm-2', name: 'Transferencia Bancaria', description: 'Aceptamos transferencias directas a cuenta corriente.', is_active: true, icon: 'building-library' },
    { id: 'pm-3', name: 'Tarjeta de Crédito', description: 'Visa, Mastercard, American Express.', is_active: true, icon: 'credit-card' },
    { id: 'pm-4', name: 'Tarjeta de Débito', description: 'Todas las tarjetas de débito nacionales e internacionales.', is_active: true, icon: 'credit-card' }
  ],
  social_links: [
    { id: 'soc-1', platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/drfabricioloayza/', is_active: true },
    { id: 'soc-2', platform: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/593987654321', is_active: true }
  ],
  location: {
    id: '00000000-0000-0000-0000-000000000002',
    address: 'Kleber Franco entre Juan Montalvo y Páez, Machala, El Oro, Ecuador',
    latitude: -3.258824,
    longitude: -79.955500,
    google_maps_url: 'https://maps.google.com/?q=Kleber+Franco+entre+Juan+Montalvo+y+P%C3%A1ez,+Machala',
    map_embed_code: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.5627!2d-79.9588!3d-3.2586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x90330e6206019d55%3A0x1d441db1b7454941!2sMachala%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" width="100%" height="380" style="border:0; border-radius: 16px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  }
};

class DataStore {
  constructor() {
    this.storageKey = 'clinidiab_local_db_v3';
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

  hasSupabase() {
    return window.supabaseManager && window.supabaseManager.isReady();
  }

  sb() {
    return window.supabaseManager.getClient();
  }

  // --- SITE SETTINGS ---
  async getSettings() {
    if (this.hasSupabase()) {
      try {
        let { data, error } = await this.sb().from('site_settings').select('*').limit(1);
        if (error || !data || data.length === 0) {
          const res = await this.sb().from('clinidiab_configuracion_sitio').select('*').limit(1);
          data = res.data;
        }
        if (data && data.length > 0) return data[0];
      } catch (err) {
        console.warn('Supabase getSettings:', err);
      }
    }
    return this.getLocalData().site_settings;
  }

  async updateSettings(newSettings) {
    const current = await this.getSettings();
    const payload = {
      id: current?.id || '00000000-0000-0000-0000-000000000001',
      clinic_name: 'CLINIDIAB',
      ...newSettings,
      updated_at: new Date().toISOString()
    };

    if (this.hasSupabase()) {
      try {
        await this.sb().from('site_settings').upsert(payload);
        await this.sb().from('clinidiab_configuracion_sitio').upsert(payload);
      } catch (err) {
        console.error('Error updating site_settings Supabase:', err);
      }
    }

    const store = this.getLocalData();
    store.site_settings = { ...store.site_settings, ...payload };
    this.saveLocalData(store);
    return store.site_settings;
  }

  // --- SERVICES ---
  async getServices(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let query = this.sb().from('services').select('*').order('display_order', { ascending: true });
        if (onlyActive) query = query.eq('is_active', true);
        let { data, error } = await query;
        if (error || !data || data.length === 0) {
          let q2 = this.sb().from('clinidiab_servicios').select('*').order('display_order', { ascending: true });
          if (onlyActive) q2 = q2.eq('is_active', true);
          const res = await q2;
          data = res.data;
        }
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase getServices:', err);
      }
    }
    let list = this.getLocalData().services || [];
    if (onlyActive) list = list.filter(s => s.is_active);
    return list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }

  async saveService(service) {
    if (!service.id) service.id = crypto.randomUUID ? crypto.randomUUID() : 'srv-' + Date.now();
    
    if (this.hasSupabase()) {
      try {
        await this.sb().from('services').upsert(service);
        await this.sb().from('clinidiab_servicios').upsert(service);
      } catch (err) {
        console.error('Error saving service Supabase:', err);
      }
    }

    const store = this.getLocalData();
    const index = store.services.findIndex(s => s.id === service.id);
    if (index >= 0) store.services[index] = service;
    else store.services.push(service);
    this.saveLocalData(store);
    return service;
  }

  async deleteService(id) {
    if (this.hasSupabase()) {
      try {
        await this.sb().from('services').delete().eq('id', id);
        await this.sb().from('clinidiab_servicios').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting service Supabase:', err);
      }
    }
    const store = this.getLocalData();
    store.services = store.services.filter(s => s.id !== id);
    this.saveLocalData(store);
    return true;
  }

  // --- TESTIMONIALS ---
  async getTestimonials(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let query = this.sb().from('testimonials').select('*').order('display_order', { ascending: true });
        if (onlyActive) query = query.eq('is_active', true);
        let { data, error } = await query;
        if (error || !data || data.length === 0) {
          let q2 = this.sb().from('clinidiab_testimonios').select('*').order('display_order', { ascending: true });
          if (onlyActive) q2 = q2.eq('is_active', true);
          const res = await q2;
          data = res.data;
        }
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase getTestimonials:', err);
      }
    }
    let list = this.getLocalData().testimonials || [];
    if (onlyActive) list = list.filter(t => t.is_active);
    return list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }

  async saveTestimonial(testimonial) {
    if (!testimonial.id) testimonial.id = crypto.randomUUID ? crypto.randomUUID() : 'test-' + Date.now();

    if (this.hasSupabase()) {
      try {
        await this.sb().from('testimonials').upsert(testimonial);
        await this.sb().from('clinidiab_testimonios').upsert(testimonial);
      } catch (err) {
        console.error('Error saving testimonial Supabase:', err);
      }
    }

    const store = this.getLocalData();
    const index = store.testimonials.findIndex(t => t.id === testimonial.id);
    if (index >= 0) store.testimonials[index] = testimonial;
    else store.testimonials.push(testimonial);
    this.saveLocalData(store);
    return testimonial;
  }

  async deleteTestimonial(id) {
    if (this.hasSupabase()) {
      try {
        await this.sb().from('testimonials').delete().eq('id', id);
        await this.sb().from('clinidiab_testimonios').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting testimonial Supabase:', err);
      }
    }
    const store = this.getLocalData();
    store.testimonials = store.testimonials.filter(t => t.id !== id);
    this.saveLocalData(store);
    return true;
  }

  // --- BUSINESS HOURS ---
  async getBusinessHours() {
    if (this.hasSupabase()) {
      try {
        let { data, error } = await this.sb().from('business_hours').select('*').order('display_order', { ascending: true });
        if (error || !data || data.length === 0) {
          const res = await this.sb().from('clinidiab_horarios').select('*').order('display_order', { ascending: true });
          data = res.data;
        }
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase getBusinessHours:', err);
      }
    }
    return this.getLocalData().business_hours;
  }

  async saveBusinessHours(hoursList) {
    if (this.hasSupabase()) {
      try {
        await this.sb().from('business_hours').upsert(hoursList);
        await this.sb().from('clinidiab_horarios').upsert(hoursList);
      } catch (err) {
        console.error('Error saving business hours Supabase:', err);
      }
    }
    const store = this.getLocalData();
    store.business_hours = hoursList;
    this.saveLocalData(store);
    return hoursList;
  }

  // --- PAYMENT METHODS ---
  async getPaymentMethods(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let query = this.sb().from('payment_methods').select('*');
        if (onlyActive) query = query.eq('is_active', true);
        let { data, error } = await query;
        if (error || !data || data.length === 0) {
          let q2 = this.sb().from('clinidiab_formas_pago').select('*');
          if (onlyActive) q2 = q2.eq('is_active', true);
          const res = await q2;
          data = res.data;
        }
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase getPaymentMethods:', err);
      }
    }
    let list = this.getLocalData().payment_methods || [];
    if (onlyActive) list = list.filter(p => p.is_active);
    return list;
  }

  async savePaymentMethods(methods) {
    if (this.hasSupabase()) {
      try {
        await this.sb().from('payment_methods').upsert(methods);
        await this.sb().from('clinidiab_formas_pago').upsert(methods);
      } catch (err) {
        console.error('Error saving payment methods Supabase:', err);
      }
    }
    const store = this.getLocalData();
    store.payment_methods = methods;
    this.saveLocalData(store);
    return methods;
  }

  // --- SOCIAL LINKS ---
  async getSocialLinks(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let query = this.sb().from('social_links').select('*');
        if (onlyActive) query = query.eq('is_active', true);
        let { data, error } = await query;
        if (error || !data || data.length === 0) {
          let q2 = this.sb().from('clinidiab_redes_sociales').select('*');
          if (onlyActive) q2 = q2.eq('is_active', true);
          const res = await q2;
          data = res.data;
        }
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase getSocialLinks:', err);
      }
    }
    let list = this.getLocalData().social_links || [];
    if (onlyActive) list = list.filter(s => s.is_active && s.url && s.url.trim().length > 0);
    return list;
  }

  async saveSocialLinks(links) {
    if (this.hasSupabase()) {
      try {
        await this.sb().from('social_links').upsert(links);
        await this.sb().from('clinidiab_redes_sociales').upsert(links);
      } catch (err) {
        console.error('Error saving social links Supabase:', err);
      }
    }
    const store = this.getLocalData();
    store.social_links = links;
    this.saveLocalData(store);
    return links;
  }

  // --- LOCATION ---
  async getLocation() {
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb().from('location').select('*').limit(1);
        if (!error && data && data.length > 0) return data[0];
      } catch (err) {
        console.warn('Supabase getLocation:', err);
      }
    }
    return this.getLocalData().location;
  }

  async saveLocation(locationData) {
    const current = await this.getLocation();
    const payload = {
      id: current?.id || '00000000-0000-0000-0000-000000000002',
      ...locationData,
      updated_at: new Date().toISOString()
    };

    if (this.hasSupabase()) {
      try {
        await this.sb().from('location').upsert(payload);
      } catch (err) {
        console.error('Error saving location Supabase:', err);
      }
    }

    const store = this.getLocalData();
    store.location = { ...store.location, ...payload };
    this.saveLocalData(store);
    return store.location;
  }
}

window.dataStore = new DataStore();
