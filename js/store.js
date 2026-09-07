/**
 * CLINIDIAB - Data Store Layer
 * Full Supabase CRUD for all sections:
 * - site_settings
 * - doctor_bio
 * - services
 * - cases (Instagram content)
 * - academic_events (Actividad académica)
 * - testimonials
 * - business_hours
 * - payment_methods
 * - social_links
 * - location
 */

const INITIAL_SEED_DATA = {
  site_settings: {
    id: '981c28c1-1312-47e3-92d3-8ff4268f53b0',
    clinic_name: 'CLINIDIAB',
    hero_title: 'Especialistas en Diabetes y Salud Integral para tu Bienestar',
    hero_subtitle: 'Brindamos atención médica especializada, oportuna y humana para el control efectivo de la diabetes, tiroides, nutrición y medicina preventiva.',
    hero_image_url: 'assets/dr-fabricio-loayza.jpg',
    logo_url: 'assets/logo.svg',
    whatsapp_number: '593983258127',
    whatsapp_message: 'Hola, quiero agendar una cita médica.',
    phone_number: '+593983258127',
    email_address: 'consultorio@clinidiab.com',
    address_text: 'Kleber Franco entre Juan Montalvo y Páez, Machala, El Oro, Ecuador',
    hero_media_type: 'video',
    hero_youtube_url: 'https://www.youtube.com/watch?v=qEnvCBBya-s&t=41s',
    hero_video_autoplay: true,
    show_video_section: true,
    video_section_title: 'Conoce al Dr. Fabricio Loayza y CLINIDIAB',
    video_section_subtitle: 'Atención médica especializada, oportuna y humana en Machala.',
    video_section_youtube_url: 'https://www.youtube.com/watch?v=qEnvCBBya-s&t=41s'
  },
  doctor_bio: {
    id: '00000000-0000-0000-0000-000000000003',
    badge_text: 'Tu Médico',
    headline: 'Medicina que transforma, hábitos que liberan',
    description: 'CLINIDIAB es un consultorio médico dedicado a la prevención, diagnóstico y tratamiento integral de la diabetes y los trastornos metabólicos, con un enfoque en obesidad, tiroides, hormonas y alimentación saludable. Atención especializada, oportuna y humana en el centro de Machala.',
    image_url: 'https://rksgmwrpjtkgwfarbkho.supabase.co/storage/v1/object/public/clinidiab-media/doctor/1788818785131_tpvpca.png',
    card1_icon: '🩺',
    card1_title: 'Especialista en Diabetología',
    card1_subtitle: 'Diagnóstico, control glucémico y manejo de insulinas',
    card2_icon: '🧬',
    card2_title: 'Máster en Endocrinología',
    card2_subtitle: 'Tiroides, hormonas y trastornos metabólicos',
    card3_icon: '🥗',
    card3_title: 'Máster en Nutrición',
    card3_subtitle: 'Planes de alimentación y hábitos sostenibles',
    tags: 'Obesidad, Sobrepeso, Alimentación saludable, Hábitos sanos, Diabetes, Prediabetes, Colesterol, Triglicéridos, Tiroides, Hormonas'
  },
  services: [
    {
      id: '4bbdf6af-3b35-4185-91fb-b882483a8cec',
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
      id: 'c7db69de-1d76-4572-b766-ee5b35a44db0',
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
      id: '846a2ab9-29be-4bd1-b976-a297b401a231',
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
      id: '034ba0f5-98cf-44b4-a989-a4182b6b71d2',
      title: 'Evaluación de Pie Diabético & Podología Médica',
      description: 'Inspección neurológica, vascular y cuidado preventivo integral para la detección temprana de neuropatías y úlceras.',
      price: 40.00,
      currency: '$',
      duration: 'Consulta',
      image_url: 'assets/post-transformacion-3.jpg',
      is_active: true,
      display_order: 4
    }
  ],
  academic_events: [
    {
      id: '43790ab0-efa6-468d-8eb2-f81061aa21de',
      badge_text: 'Conferencista',
      title: 'Actualización Médica Continua',
      description: 'Participación activa en simposios clínicos nacionales e internacionales sobre avances en insulinoterapia y manejo de resistencia a la insulina.',
      institution: 'Sociedades Médicas del Ecuador',
      image_url: 'assets/congreso-1.jpg',
      display_order: 1,
      is_active: true
    },
    {
      id: '01a89238-5414-4237-85e5-d63d77170173',
      badge_text: 'Congreso 2026',
      title: 'XI Semana Ecuatoriana de Enfermedades Digestivas',
      description: 'Ponencia oficial del Dr. Fabricio Loayza (Diabetólogo / Nutricionista) en el encuentro de la Sociedad Ecuatoriana de Gastroenterología.',
      institution: 'Del 27 al 29 de Agosto',
      image_url: 'assets/congreso-2.jpg',
      display_order: 2,
      is_active: true
    },
    {
      id: 'c86ff572-aac8-461e-b081-3bec920ceea5',
      badge_text: 'Ponencia Magistral',
      title: 'Congreso Internacional de Ginecología',
      description: 'Charla magistral sobre abordaje farmacológico, actividad física y modulación metabólica integral para la salud femenina.',
      institution: 'Dr. Fabricio Loayza · Ponente',
      image_url: 'assets/congreso-3.jpg',
      display_order: 3,
      is_active: true
    }
  ],
  cases: [
    {
      id: 'e3bcefb3-9e57-42fc-818a-7f43ed75f952',
      tag_text: 'Transformación #6',
      title: 'Más salud, más energía, más vida',
      description: 'Recuperación de composición corporal, regulación del metabolismo y mayor vitalidad día a día.',
      image_url: 'assets/post-transformacion-1.jpg',
      instagram_url: 'https://www.instagram.com/drfabricioloayza/',
      display_order: 1,
      is_active: true
    },
    {
      id: 'e2de6fe7-bcd8-487d-9c07-810c025b257a',
      tag_text: 'Transformación #4',
      title: '66 Libras Menos y Control Glucémico Total',
      description: 'De glucemias descontroladas a energía renovada, sin dietas restrictivas ni efecto rebote.',
      image_url: 'assets/post-transformacion-2.jpg',
      instagram_url: 'https://www.instagram.com/drfabricioloayza/',
      display_order: 2,
      is_active: true
    },
    {
      id: '8512a931-78dd-4abb-8713-f2038a2be5fd',
      tag_text: 'Transformación #2',
      title: 'Recuperando el Control Metabólico',
      description: 'Control de glucosa, reducción de grasa visceral y disminución progresiva de fármacos.',
      image_url: 'assets/post-transformacion-3.jpg',
      instagram_url: 'https://www.instagram.com/drfabricioloayza/',
      display_order: 3,
      is_active: true
    }
  ],
  testimonials: [
    {
      id: '8a8b139c-48c6-43f1-b844-4861616c8052',
      patient_name: 'Carlos Mendoza',
      comment: 'Excelente atención en CLINIDIAB. Logré estabilizar mi hemoglobina glicosilada gracias a su plan médico y nutricional adaptado a mi ritmo de vida. Muy recomendados.',
      rating: 5,
      avatar_url: '',
      is_active: true,
      display_order: 1
    },
    {
      id: '9b8c240d-59d7-54f2-c955-5972727d9163',
      patient_name: 'María Elena Suárez',
      comment: 'La calidez humana de los médicos y la precisión en los exámenes me dieron mucha tranquilidad. Reservar por WhatsApp fue facilísimo.',
      rating: 5,
      avatar_url: '',
      is_active: true,
      display_order: 2
    },
    {
      id: 'ac9d351e-6ae8-6503-da66-6083838ea274',
      patient_name: 'Roberto Gómez',
      comment: 'Llevo 2 años atendiéndome con ellos. Los controles periódicos y la orientación nutricional son impecables.',
      rating: 5,
      avatar_url: '',
      is_active: true,
      display_order: 3
    }
  ],
  business_hours: [
    { id: 'b7254b79-fbdd-4c5e-9b54-9697951325fa', day_name: 'Lunes', is_open: true, morning_open: '10:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 1 },
    { id: 'd006acbe-907c-4f65-8a51-4b89d570641c', day_name: 'Martes', is_open: true, morning_open: '10:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 2 },
    { id: '796039b5-5d1b-4b8c-be6c-d8c698160885', day_name: 'Miércoles', is_open: true, morning_open: '10:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 3 },
    { id: '679c51f9-6d61-4575-86dc-5a772c4bc340', day_name: 'Jueves', is_open: true, morning_open: '10:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '19:00', display_order: 4 },
    { id: 'e3316d49-0456-4f7b-943f-46c57df5725c', day_name: 'Viernes', is_open: true, morning_open: '10:00', morning_close: '13:00', afternoon_open: '15:00', afternoon_close: '18:00', display_order: 5 },
    { id: '6422e259-aef0-429f-bdaa-af282ba8c4e2', day_name: 'Sábado', is_open: true, morning_open: '10:30', morning_close: '13:30', afternoon_open: '', afternoon_close: '', display_order: 6 },
    { id: '50dce804-4e42-4111-9ba8-b2ffa70130a4', day_name: 'Domingo', is_open: false, morning_open: '', morning_close: '', afternoon_open: '', afternoon_close: '', display_order: 7 }
  ],
  payment_methods: [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Efectivo', description: 'Pago presencial en recepción del consultorio.', is_active: true, icon: 'banknotes' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Transferencia Bancaria', description: 'Aceptamos transferencias directas a cuenta corriente.', is_active: true, icon: 'building-library' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Tarjeta de Crédito', description: 'Visa, Mastercard, American Express.', is_active: true, icon: 'credit-card' },
    { id: '44444444-4444-4444-4444-444444444444', name: 'Tarjeta de Débito', description: 'Todas las tarjetas de débito nacionales e internacionales.', is_active: true, icon: 'credit-card' }
  ],
  social_links: [
    { id: '55555555-5555-5555-5555-555555555555', platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/drfabricioloayza/', is_active: true },
    { id: '66666666-6666-6666-6666-666666666666', platform: 'facebook', label: 'Clinidiab en Facebook', url: 'https://www.facebook.com/119541705083687', is_active: true },
    { id: '77777777-7777-7777-7777-777777777777', platform: 'youtube', label: 'Doctor Loayza en YouTube', url: 'https://youtube.com/@fabricio19212', is_active: true },
    { id: '88888888-8888-8888-8888-888888888888', platform: 'tiktok', label: 'TikTok', url: 'https://tiktok.com/@clinidiab', is_active: false }
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
    this.storageKey = 'clinidiab_local_db_v8';
    this.ensureLocalStore();
  }



  ensureLocalStore() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(INITIAL_SEED_DATA));
    }
  }

  getLocalData() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey));
      return { ...INITIAL_SEED_DATA, ...data };
    } catch {
      return INITIAL_SEED_DATA;
    }
  }

  saveLocalData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      if (typeof BroadcastChannel !== 'undefined') {
        if (!this.broadcastChannel) {
          this.broadcastChannel = new BroadcastChannel('clinidiab_sync_channel');
        }
        this.broadcastChannel.postMessage({ type: 'DATA_UPDATED', data });
      }
      window.dispatchEvent(new CustomEvent('clinidiab:data-updated', { detail: data }));
    } catch (e) {
      console.warn('saveLocalData error:', e);
    }
  }

  hasSupabase() {
    return Boolean(window.supabaseManager && window.supabaseManager.hasLiveSupabase());
  }

  sb() {
    return window.supabaseManager.getClient();
  }

  ensureUUID(id) {
    if (window.Utils && typeof window.Utils.ensureUUID === 'function') {
      return window.Utils.ensureUUID(id);
    }
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (id && regex.test(id)) return id;
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // --- SITE SETTINGS ---
  async getSettings() {
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb().from('site_settings').select('*').limit(1);
        if (!error && data && data.length > 0) {
          const store = this.getLocalData();
          store.site_settings = { ...store.site_settings, ...data[0] };
          this.saveLocalData(store);
          return data[0];
        }
      } catch (err) {
        console.warn('Supabase getSettings:', err);
      }
    }
    return this.getLocalData().site_settings;
  }

  async updateSettings(newSettings) {
    const current = await this.getSettings();
    const payload = {
      ...(current || {}),
      ...newSettings,
      id: current?.id ? this.ensureUUID(current.id) : '981c28c1-1312-47e3-92d3-8ff4268f53b0',
      updated_at: new Date().toISOString()
    };

    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('site_settings').upsert(payload);
        if (error) throw error;
      } catch (err) {
        console.error('Error updating site_settings Supabase:', err);
        throw err;
      }
    }

    const store = this.getLocalData();
    store.site_settings = { ...store.site_settings, ...payload };
    this.saveLocalData(store);
    return store.site_settings;
  }

  // --- DOCTOR BIO ---
  async getDoctorBio() {
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb().from('doctor_bio').select('*').limit(1);
        if (!error && data && data.length > 0) {
          const store = this.getLocalData();
          store.doctor_bio = { ...store.doctor_bio, ...data[0] };
          this.saveLocalData(store);
          return data[0];
        }
      } catch (err) {
        console.warn('Supabase getDoctorBio:', err);
      }
    }
    return this.getLocalData().doctor_bio;
  }

  async saveDoctorBio(bioData) {
    const payload = {
      id: '00000000-0000-0000-0000-000000000003',
      ...bioData
    };

    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('doctor_bio').upsert(payload);
        if (error) throw error;
      } catch (err) {
        console.error('Error saving doctor_bio Supabase:', err);
        throw err;
      }
    }

    const store = this.getLocalData();
    store.doctor_bio = { ...store.doctor_bio, ...payload };
    this.saveLocalData(store);
    return store.doctor_bio;
  }

  // --- SERVICES ---
  async getServices(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let query = this.sb().from('services').select('*').order('display_order', { ascending: true });
        if (onlyActive) query = query.eq('is_active', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          const store = this.getLocalData();
          store.services = data;
          this.saveLocalData(store);
          return data;
        }
      } catch (err) {
        console.warn('Supabase getServices:', err);
      }
    }
    let list = this.getLocalData().services || [];
    if (onlyActive) list = list.filter(s => s.is_active);
    return list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }

  async saveService(service) {
    const servicePayload = {
      ...service,
      id: this.ensureUUID(service.id)
    };

    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('services').upsert(servicePayload);
        if (error) throw error;
      } catch (err) {
        console.error('Error saving service Supabase:', err);
        throw err;
      }
    }

    const store = this.getLocalData();
    const index = store.services.findIndex(s => s.id === servicePayload.id);
    if (index >= 0) store.services[index] = servicePayload;
    else store.services.push(servicePayload);
    this.saveLocalData(store);
    return servicePayload;
  }

  async deleteService(id) {
    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('services').delete().eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Error deleting service Supabase:', err);
        throw err;
      }
    }
    const store = this.getLocalData();
    store.services = store.services.filter(s => s.id !== id);
    this.saveLocalData(store);
    return true;
  }

  // --- ACADEMIC EVENTS ---
  async getAcademicEvents(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let query = this.sb().from('academic_events').select('*').order('display_order', { ascending: true });
        if (onlyActive) query = query.eq('is_active', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          const store = this.getLocalData();
          store.academic_events = data;
          this.saveLocalData(store);
          return data;
        }
      } catch (err) {
        console.warn('Supabase getAcademicEvents:', err);
      }
    }
    let list = this.getLocalData().academic_events || [];
    if (onlyActive) list = list.filter(e => e.is_active);
    return list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }

  async saveAcademicEvent(event) {
    const eventPayload = {
      ...event,
      id: this.ensureUUID(event.id)
    };

    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('academic_events').upsert(eventPayload);
        if (error) throw error;
      } catch (err) {
        console.error('Error saving academic_events Supabase:', err);
        throw err;
      }
    }

    const store = this.getLocalData();
    const index = (store.academic_events || []).findIndex(e => e.id === eventPayload.id);
    if (index >= 0) store.academic_events[index] = eventPayload;
    else (store.academic_events = store.academic_events || []).push(eventPayload);
    this.saveLocalData(store);
    return eventPayload;
  }

  async deleteAcademicEvent(id) {
    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('academic_events').delete().eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Error deleting academic event Supabase:', err);
        throw err;
      }
    }
    const store = this.getLocalData();
    store.academic_events = (store.academic_events || []).filter(e => e.id !== id);
    this.saveLocalData(store);
    return true;
  }

  // --- CASES (INSTAGRAM) ---
  async getCases(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let query = this.sb().from('cases').select('*').order('display_order', { ascending: true });
        if (onlyActive) query = query.eq('is_active', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          const store = this.getLocalData();
          store.cases = data;
          this.saveLocalData(store);
          return data;
        }
      } catch (err) {
        console.warn('Supabase getCases:', err);
      }
    }
    let list = this.getLocalData().cases || [];
    if (onlyActive) list = list.filter(c => c.is_active);
    return list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }

  async saveCase(caseItem) {
    const casePayload = {
      ...caseItem,
      id: this.ensureUUID(caseItem.id)
    };

    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('cases').upsert(casePayload);
        if (error) throw error;
      } catch (err) {
        console.error('Error saving case Supabase:', err);
        throw err;
      }
    }

    const store = this.getLocalData();
    const index = (store.cases || []).findIndex(c => c.id === casePayload.id);
    if (index >= 0) store.cases[index] = casePayload;
    else (store.cases = store.cases || []).push(casePayload);
    this.saveLocalData(store);
    return casePayload;
  }

  async deleteCase(id) {
    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('cases').delete().eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Error deleting case Supabase:', err);
        throw err;
      }
    }
    const store = this.getLocalData();
    store.cases = (store.cases || []).filter(c => c.id !== id);
    this.saveLocalData(store);
    return true;
  }

  // --- TESTIMONIALS ---
  async getTestimonials(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let query = this.sb().from('testimonials').select('*').order('display_order', { ascending: true });
        if (onlyActive) query = query.eq('is_active', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          const store = this.getLocalData();
          store.testimonials = data;
          this.saveLocalData(store);
          return data;
        }
      } catch (err) {
        console.warn('Supabase getTestimonials:', err);
      }
    }
    let list = this.getLocalData().testimonials || [];
    if (onlyActive) list = list.filter(t => t.is_active);
    return list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }

  async saveTestimonial(testimonial) {
    const testPayload = {
      ...testimonial,
      id: this.ensureUUID(testimonial.id)
    };

    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('testimonials').upsert(testPayload);
        if (error) throw error;
      } catch (err) {
        console.error('Error saving testimonial Supabase:', err);
        throw err;
      }
    }

    const store = this.getLocalData();
    const index = store.testimonials.findIndex(t => t.id === testPayload.id);
    if (index >= 0) store.testimonials[index] = testPayload;
    else store.testimonials.push(testPayload);
    this.saveLocalData(store);
    return testPayload;
  }

  async deleteTestimonial(id) {
    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('testimonials').delete().eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Error deleting testimonial Supabase:', err);
        throw err;
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
        const { data, error } = await this.sb().from('business_hours').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          const store = this.getLocalData();
          store.business_hours = data;
          this.saveLocalData(store);
          return data;
        }
      } catch (err) {
        console.warn('Supabase getBusinessHours:', err);
      }
    }
    return this.getLocalData().business_hours;
  }

  async saveBusinessHours(hoursList) {
    const processedHours = hoursList.map((h, index) => ({
      ...h,
      id: this.ensureUUID(h.id),
      display_order: h.display_order || (index + 1)
    }));

    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('business_hours').upsert(processedHours);
        if (error) throw error;
      } catch (err) {
        console.error('Error saving business hours Supabase:', err);
        throw err;
      }
    }
    const store = this.getLocalData();
    store.business_hours = processedHours;
    this.saveLocalData(store);
    return processedHours;
  }

  // --- PAYMENT METHODS ---
  async getPaymentMethods(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let query = this.sb().from('payment_methods').select('*').order('display_order', { ascending: true });
        if (onlyActive) query = query.eq('is_active', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          const store = this.getLocalData();
          store.payment_methods = data;
          this.saveLocalData(store);
          return data;
        }
      } catch (err) {
        console.warn('Supabase getPaymentMethods:', err);
      }
    }
    let list = this.getLocalData().payment_methods || [];
    if (onlyActive) list = list.filter(p => p.is_active);
    return list;
  }

  async savePaymentMethods(methods) {
    const processedMethods = methods.map((m, index) => ({
      ...m,
      id: this.ensureUUID(m.id),
      display_order: m.display_order || (index + 1)
    }));

    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('payment_methods').upsert(processedMethods);
        if (error) throw error;
      } catch (err) {
        console.error('Error saving payment methods Supabase:', err);
        throw err;
      }
    }
    const store = this.getLocalData();
    store.payment_methods = processedMethods;
    this.saveLocalData(store);
    return processedMethods;
  }

  // --- SOCIAL LINKS ---
  async getSocialLinks(onlyActive = false) {
    if (this.hasSupabase()) {
      try {
        let query = this.sb().from('social_links').select('*');
        if (onlyActive) query = query.eq('is_active', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          const store = this.getLocalData();
          store.social_links = data;
          this.saveLocalData(store);
          return data;
        }
      } catch (err) {
        console.warn('Supabase getSocialLinks:', err);
      }
    }
    let list = this.getLocalData().social_links || [];
    if (onlyActive) list = list.filter(s => s.is_active && s.url && s.url.trim().length > 0);
    return list;
  }

  async saveSocialLinks(links) {
    const processedLinks = links.map(l => ({
      ...l,
      id: this.ensureUUID(l.id)
    }));

    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('social_links').upsert(processedLinks);
        if (error) throw error;
      } catch (err) {
        console.error('Error saving social links Supabase:', err);
        throw err;
      }
    }
    const store = this.getLocalData();
    store.social_links = processedLinks;
    this.saveLocalData(store);
    return processedLinks;
  }

  // --- LOCATION ---
  async getLocation() {
    if (this.hasSupabase()) {
      try {
        const { data, error } = await this.sb().from('location').select('*').limit(1);
        if (!error && data && data.length > 0) {
          const store = this.getLocalData();
          store.location = { ...store.location, ...data[0] };
          this.saveLocalData(store);
          return data[0];
        }
      } catch (err) {
        console.warn('Supabase getLocation:', err);
      }
    }
    return this.getLocalData().location;
  }

  async saveLocation(locationData) {
    const current = await this.getLocation();
    const payload = {
      id: current?.id ? this.ensureUUID(current.id) : '00000000-0000-0000-0000-000000000002',
      ...locationData,
      updated_at: new Date().toISOString()
    };

    if (this.hasSupabase()) {
      try {
        const { error } = await this.sb().from('location').upsert(payload);
        if (error) throw error;
      } catch (err) {
        console.error('Error saving location Supabase:', err);
        throw err;
      }
    }

    const store = this.getLocalData();
    store.location = { ...store.location, ...payload };
    this.saveLocalData(store);
    return store.location;
  }
}

window.dataStore = new DataStore();
