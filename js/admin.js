/**
 * CLINIDIAB - Admin Panel SPA Engine
 * Full admin with Supabase Auth, CRUD for all content sections,
 * and instant save + refresh to public page.
 */

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🔒 CLINIDIAB Admin Engine Initialized');
  window.adminApp = new AdminApp();
  await window.adminApp.init();
});

class AdminApp {
  constructor() {
    this.isAuthenticated = false;
    this.currentTab = 'dashboard';
    this.editingServiceId = null;
    this.editingTestimonialId = null;
  }

  async init() {
    await this.checkAuth();
    this.setupEventListeners();
  }

  async checkAuth() {
    if (window.supabaseManager.hasLiveSupabase()) {
      try {
        const { data: { session } } = await window.supabaseManager.getClient().auth.getSession();
        if (session) this.isAuthenticated = true;
      } catch (e) {
        console.warn('Auth session check failed:', e);
      }
    } else {
      const localToken = localStorage.getItem('clinidiab_admin_session');
      if (localToken === 'active_session') this.isAuthenticated = true;
    }
    this.renderAuthView();
  }

  renderAuthView() {
    const authScreen = document.getElementById('admin-auth-screen');
    const appScreen = document.getElementById('admin-app-screen');
    if (!authScreen || !appScreen) return;

    if (this.isAuthenticated) {
      authScreen.classList.add('hidden');
      appScreen.classList.remove('hidden');
      this.switchTab(this.currentTab);
    } else {
      authScreen.classList.remove('hidden');
      appScreen.classList.add('hidden');
    }
  }

  setupEventListeners() {
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));

    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => this.handleLogout());

    document.querySelectorAll('.admin-nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabName = e.currentTarget.getAttribute('data-tab');
        if (tabName) this.switchTab(tabName);
      });
    });

    const heroForm = document.getElementById('hero-settings-form');
    if (heroForm) heroForm.addEventListener('submit', (e) => this.saveHeroSettings(e));

    const hoursForm = document.getElementById('business-hours-form');
    if (hoursForm) hoursForm.addEventListener('submit', (e) => this.saveHoursAndContact(e));

    const paymentsForm = document.getElementById('payments-form');
    if (paymentsForm) paymentsForm.addEventListener('submit', (e) => this.savePayments(e));

    const socialsForm = document.getElementById('socials-form');
    if (socialsForm) socialsForm.addEventListener('submit', (e) => this.saveSocials(e));

    const locationForm = document.getElementById('location-form');
    if (locationForm) locationForm.addEventListener('submit', (e) => this.saveLocation(e));

    const configForm = document.getElementById('config-settings-form');
    if (configForm) configForm.addEventListener('submit', (e) => this.saveSupabaseConfig(e));

    const newServiceBtn = document.getElementById('btn-new-service');
    if (newServiceBtn) newServiceBtn.addEventListener('click', () => this.openServiceModal());

    const serviceForm = document.getElementById('service-form');
    if (serviceForm) serviceForm.addEventListener('submit', (e) => this.saveService(e));

    const newTestimonialBtn = document.getElementById('btn-new-testimonial');
    if (newTestimonialBtn) newTestimonialBtn.addEventListener('click', () => this.openTestimonialModal());

    const testimonialForm = document.getElementById('testimonial-form');
    if (testimonialForm) testimonialForm.addEventListener('submit', (e) => this.saveTestimonial(e));

    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => this.closeModals());
    });

    // Image preview handlers
    const heroFileInput = document.getElementById('hero-file-input');
    if (heroFileInput) {
      heroFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const preview = document.getElementById('hero-image-preview');
            if (preview) {
              preview.src = ev.target.result;
              preview.classList.remove('hidden');
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error-msg');
    const submitBtn = document.getElementById('login-submit-btn');

    errorEl.classList.add('hidden');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verificando...';

    try {
      if (window.supabaseManager.hasLiveSupabase()) {
        const { data, error } = await window.supabaseManager.getClient().auth.signInWithPassword({ email, password });
        if (error) throw error;
        this.isAuthenticated = true;
      } else {
        if (password.length >= 6) {
          localStorage.setItem('clinidiab_admin_session', 'active_session');
          this.isAuthenticated = true;
        } else {
          throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }
      }
      window.Utils.showToast('¡Bienvenido al Panel CLINIDIAB!', 'success');
      this.renderAuthView();
    } catch (err) {
      errorEl.textContent = err.message || 'Credenciales no válidas.';
      errorEl.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Iniciar Sesión';
    }
  }

  async handleLogout() {
    if (window.supabaseManager.hasLiveSupabase()) {
      await window.supabaseManager.getClient().auth.signOut();
    }
    localStorage.removeItem('clinidiab_admin_session');
    this.isAuthenticated = false;
    window.Utils.showToast('Sesión cerrada correctamente.', 'info');
    this.renderAuthView();
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    document.querySelectorAll('.admin-nav-item').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('bg-sky-700', 'text-white');
        btn.classList.remove('text-slate-300', 'hover:bg-slate-800');
      } else {
        btn.classList.remove('bg-sky-700', 'text-white');
        btn.classList.add('text-slate-300', 'hover:bg-slate-800');
      }
    });

    document.querySelectorAll('.admin-tab-panel').forEach(panel => panel.classList.add('hidden'));

    const targetPanel = document.getElementById(`panel-${tabName}`);
    if (targetPanel) targetPanel.classList.remove('hidden');

    this.loadTabData(tabName);
  }

  async loadTabData(tabName) {
    switch (tabName) {
      case 'dashboard': await this.loadDashboardStats(); break;
      case 'hero': await this.loadHeroForm(); break;
      case 'services': await this.loadServicesTable(); break;
      case 'testimonials': await this.loadTestimonialsTable(); break;
      case 'contact-hours': await this.loadHoursAndContactForm(); break;
      case 'payments': await this.loadPaymentsForm(); break;
      case 'socials': await this.loadSocialsForm(); break;
      case 'location': await this.loadLocationForm(); break;
      case 'config': await this.loadConfigForm(); break;
    }
  }

  // =====================
  // DASHBOARD
  // =====================
  async loadDashboardStats() {
    try {
      const [services, testimonials, settings] = await Promise.all([
        window.dataStore.getServices(),
        window.dataStore.getTestimonials(),
        window.dataStore.getSettings()
      ]);

      const svcEl = document.getElementById('stat-services-count');
      const actEl = document.getElementById('stat-active-services');
      const tstEl = document.getElementById('stat-testimonials-count');
      const waEl = document.getElementById('stat-whatsapp-num');

      if (svcEl) svcEl.textContent = services.length;
      if (actEl) actEl.textContent = services.filter(s => s.is_active).length;
      if (tstEl) tstEl.textContent = testimonials.length;
      if (waEl) waEl.textContent = settings?.whatsapp_number || 'No configurado';

      const liveBadge = document.getElementById('stat-supabase-status');
      if (liveBadge) {
        liveBadge.innerHTML = window.supabaseManager.hasLiveSupabase()
          ? `<span class="badge-status badge-active">✅ Conectado a Supabase DB en la nube</span>`
          : `<span class="badge-status badge-inactive">⚡ Modo de datos locales activo</span>`;
      }
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
    }
  }

  // =====================
  // HERO / INICIO
  // =====================
  async loadHeroForm() {
    try {
      const settings = await window.dataStore.getSettings();
      document.getElementById('hero-field-title').value = settings.hero_title || '';
      document.getElementById('hero-field-subtitle').value = settings.hero_subtitle || '';
      document.getElementById('hero-field-whatsapp').value = settings.whatsapp_number || '';
      document.getElementById('hero-field-image-url').value = settings.hero_image_url || '';
      document.getElementById('hero-field-logo-url').value = settings.logo_url || '';
      document.getElementById('hero-field-clinic-name').value = settings.clinic_name || 'CLINIDIAB';

      const preview = document.getElementById('hero-image-preview');
      if (preview && settings.hero_image_url) {
        preview.src = settings.hero_image_url;
        preview.classList.remove('hidden');
      }
    } catch (err) {
      console.error('Error loading hero form:', err);
    }
  }

  async saveHeroSettings(e) {
    e.preventDefault();
    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Guardando...'; btn.disabled = true;
    try {
      const heroImgFile = document.getElementById('hero-file-input').files[0];
      const logoImgFile = document.getElementById('logo-file-input').files[0];

      let heroImageUrl = document.getElementById('hero-field-image-url').value.trim();
      let logoUrl = document.getElementById('hero-field-logo-url').value.trim();

      if (heroImgFile) {
        window.Utils.showToast('Subiendo imagen de portada...', 'info');
        heroImageUrl = await window.Utils.uploadImage(heroImgFile, 'hero');
      }
      if (logoImgFile) {
        window.Utils.showToast('Subiendo logo...', 'info');
        logoUrl = await window.Utils.uploadImage(logoImgFile, 'brand');
      }

      const updated = {
        clinic_name: document.getElementById('hero-field-clinic-name').value.trim(),
        hero_title: document.getElementById('hero-field-title').value.trim(),
        hero_subtitle: document.getElementById('hero-field-subtitle').value.trim(),
        whatsapp_number: document.getElementById('hero-field-whatsapp').value.trim(),
        hero_image_url: heroImageUrl,
        logo_url: logoUrl
      };

      await window.dataStore.updateSettings(updated);
      window.Utils.showToast('✅ Sección Inicio actualizada correctamente', 'success');
      await this.loadHeroForm();
    } catch (err) {
      window.Utils.showToast('❌ Error al guardar: ' + err.message, 'error');
    } finally {
      btn.textContent = 'Guardar Cambios de Inicio'; btn.disabled = false;
    }
  }

  // =====================
  // SERVICIOS
  // =====================
  async loadServicesTable() {
    try {
      const services = await window.dataStore.getServices();
      const tbody = document.getElementById('admin-services-tbody');
      if (!tbody) return;

      if (!services.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400">No hay servicios. Haz clic en "Nuevo Servicio".</td></tr>`;
        return;
      }

      tbody.innerHTML = services.map(s => `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
          <td class="px-4 py-3">
            <div class="flex items-center gap-3">
              ${s.image_url ? `<img src="${window.Utils.escapeHtml(s.image_url)}" class="w-10 h-10 rounded-lg object-cover border border-slate-100">` : `<div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-xs">📷</div>`}
              <span class="font-semibold text-slate-900 text-sm">${window.Utils.escapeHtml(s.title)}</span>
            </div>
          </td>
          <td class="px-4 py-3 font-bold text-sky-700">${window.Utils.formatCurrency(s.price, s.currency)}</td>
          <td class="px-4 py-3 text-slate-500 text-xs">${window.Utils.escapeHtml(s.duration || '—')}</td>
          <td class="px-4 py-3 text-center">
            <span class="badge-status ${s.is_active ? 'badge-active' : 'badge-inactive'}">${s.is_active ? 'Activo' : 'Inactivo'}</span>
          </td>
          <td class="px-4 py-3 text-center text-slate-500 text-xs font-mono">${s.display_order || 0}</td>
          <td class="px-4 py-3 text-right space-x-2">
            <button onclick="window.adminApp.editService('${s.id}')" class="px-2.5 py-1 text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-md">Editar</button>
            <button onclick="window.adminApp.deleteService('${s.id}')" class="px-2.5 py-1 text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md">Eliminar</button>
          </td>
        </tr>
      `).join('');
    } catch (err) {
      console.error('Error loading services table:', err);
    }
  }

  openServiceModal(service = null) {
    this.editingServiceId = service ? service.id : null;
    document.getElementById('service-modal-title').textContent = service ? 'Editar Servicio' : 'Nuevo Servicio Médico';
    document.getElementById('srv-title').value = service?.title || '';
    document.getElementById('srv-description').value = service?.description || '';
    document.getElementById('srv-price').value = service?.price || '';
    document.getElementById('srv-currency').value = service?.currency || '$';
    document.getElementById('srv-duration').value = service?.duration || '';
    document.getElementById('srv-order').value = service?.display_order || 1;
    document.getElementById('srv-active').checked = service ? service.is_active : true;
    document.getElementById('srv-image-url').value = service?.image_url || '';
    document.getElementById('srv-file-input').value = '';
    document.getElementById('service-modal').classList.add('active');
  }

  async editService(id) {
    const services = await window.dataStore.getServices();
    const item = services.find(s => s.id === id);
    if (item) this.openServiceModal(item);
  }

  async deleteService(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este servicio?')) return;
    try {
      await window.dataStore.deleteService(id);
      window.Utils.showToast('Servicio eliminado', 'info');
      await this.loadServicesTable();
    } catch (err) {
      window.Utils.showToast('Error al eliminar: ' + err.message, 'error');
    }
  }

  async saveService(e) {
    e.preventDefault();
    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Guardando...'; btn.disabled = true;
    try {
      const file = document.getElementById('srv-file-input').files[0];
      let imageUrl = document.getElementById('srv-image-url').value.trim();
      if (file) {
        window.Utils.showToast('Subiendo foto del servicio...', 'info');
        imageUrl = await window.Utils.uploadImage(file, 'services');
      }

      const serviceData = {
        id: this.editingServiceId || ('srv-' + Date.now()),
        title: document.getElementById('srv-title').value.trim(),
        description: document.getElementById('srv-description').value.trim(),
        price: parseFloat(document.getElementById('srv-price').value) || 0,
        currency: document.getElementById('srv-currency').value,
        duration: document.getElementById('srv-duration').value.trim(),
        display_order: parseInt(document.getElementById('srv-order').value) || 1,
        is_active: document.getElementById('srv-active').checked,
        image_url: imageUrl
      };

      await window.dataStore.saveService(serviceData);
      window.Utils.showToast('✅ Servicio guardado exitosamente', 'success');
      this.closeModals();
      await this.loadServicesTable();
    } catch (err) {
      window.Utils.showToast('❌ Error: ' + err.message, 'error');
    } finally {
      btn.textContent = 'Guardar Servicio'; btn.disabled = false;
    }
  }

  // =====================
  // TESTIMONIOS
  // =====================
  async loadTestimonialsTable() {
    try {
      const list = await window.dataStore.getTestimonials();
      const tbody = document.getElementById('admin-testimonials-tbody');
      if (!tbody) return;

      if (!list.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-slate-400">No hay testimonios. Haz clic en "Nuevo Testimonio".</td></tr>`;
        return;
      }

      tbody.innerHTML = list.map(t => `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
          <td class="px-4 py-3 font-semibold text-slate-900 text-sm">${window.Utils.escapeHtml(t.patient_name)}</td>
          <td class="px-4 py-3 text-slate-600 text-xs max-w-xs truncate">${window.Utils.escapeHtml(t.comment)}</td>
          <td class="px-4 py-3">${window.Utils.renderStars(t.rating)}</td>
          <td class="px-4 py-3 text-center">
            <span class="badge-status ${t.is_active ? 'badge-active' : 'badge-inactive'}">${t.is_active ? 'Activo' : 'Inactivo'}</span>
          </td>
          <td class="px-4 py-3 text-right space-x-2">
            <button onclick="window.adminApp.editTestimonial('${t.id}')" class="px-2.5 py-1 text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-md">Editar</button>
            <button onclick="window.adminApp.deleteTestimonial('${t.id}')" class="px-2.5 py-1 text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md">Eliminar</button>
          </td>
        </tr>
      `).join('');
    } catch (err) {
      console.error('Error loading testimonials table:', err);
    }
  }

  openTestimonialModal(testimonial = null) {
    this.editingTestimonialId = testimonial ? testimonial.id : null;
    document.getElementById('tst-modal-title').textContent = testimonial ? 'Editar Testimonio' : 'Nuevo Testimonio de Paciente';
    document.getElementById('tst-name').value = testimonial?.patient_name || '';
    document.getElementById('tst-comment').value = testimonial?.comment || '';
    document.getElementById('tst-rating').value = testimonial?.rating || 5;
    document.getElementById('tst-order').value = testimonial?.display_order || 1;
    document.getElementById('tst-active').checked = testimonial ? testimonial.is_active : true;
    document.getElementById('tst-avatar-url').value = testimonial?.avatar_url || '';
    document.getElementById('tst-file-input').value = '';
    document.getElementById('testimonial-modal').classList.add('active');
  }

  async editTestimonial(id) {
    const list = await window.dataStore.getTestimonials();
    const item = list.find(t => t.id === id);
    if (item) this.openTestimonialModal(item);
  }

  async deleteTestimonial(id) {
    if (!confirm('¿Deseas eliminar este testimonio?')) return;
    try {
      await window.dataStore.deleteTestimonial(id);
      window.Utils.showToast('Testimonio eliminado', 'info');
      await this.loadTestimonialsTable();
    } catch (err) {
      window.Utils.showToast('Error al eliminar: ' + err.message, 'error');
    }
  }

  async saveTestimonial(e) {
    e.preventDefault();
    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Guardando...'; btn.disabled = true;
    try {
      const file = document.getElementById('tst-file-input').files[0];
      let avatarUrl = document.getElementById('tst-avatar-url').value.trim();
      if (file) {
        window.Utils.showToast('Subiendo foto del paciente...', 'info');
        avatarUrl = await window.Utils.uploadImage(file, 'patients');
      }

      const itemData = {
        id: this.editingTestimonialId || ('test-' + Date.now()),
        patient_name: document.getElementById('tst-name').value.trim(),
        comment: document.getElementById('tst-comment').value.trim(),
        rating: parseInt(document.getElementById('tst-rating').value) || 5,
        display_order: parseInt(document.getElementById('tst-order').value) || 1,
        is_active: document.getElementById('tst-active').checked,
        avatar_url: avatarUrl
      };

      await window.dataStore.saveTestimonial(itemData);
      window.Utils.showToast('✅ Testimonio guardado con éxito', 'success');
      this.closeModals();
      await this.loadTestimonialsTable();
    } catch (err) {
      window.Utils.showToast('❌ Error: ' + err.message, 'error');
    } finally {
      btn.textContent = 'Guardar Testimonio'; btn.disabled = false;
    }
  }

  // =====================
  // HORARIOS Y CONTACTOS
  // =====================
  async loadHoursAndContactForm() {
    try {
      const [hours, settings] = await Promise.all([
        window.dataStore.getBusinessHours(),
        window.dataStore.getSettings()
      ]);

      document.getElementById('contact-field-address').value = settings.address_text || '';
      document.getElementById('contact-field-phone').value = settings.phone_number || '';
      document.getElementById('contact-field-email').value = settings.email_address || '';
      document.getElementById('contact-field-whatsapp-msg').value = settings.whatsapp_message || 'Hola CLINIDIAB, deseo reservar una cita médica.';

      const container = document.getElementById('admin-hours-rows');
      if (!container || !hours) return;

      container.innerHTML = hours.map(day => `
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-6 gap-3 items-center" data-day-id="${day.id}">
          <div class="md:col-span-1 font-bold text-slate-800 flex items-center gap-2">
            <input type="checkbox" class="day-is-open rounded text-sky-600 focus:ring-sky-500 w-4 h-4" ${day.is_open ? 'checked' : ''}>
            <span class="text-sm">${day.day_name}</span>
          </div>
          <div class="md:col-span-2 grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] text-slate-400 font-semibold uppercase mb-1">Apertura 1</label>
              <input type="time" class="day-morning-open w-full text-xs p-1.5 border border-slate-200 rounded-lg" value="${day.morning_open || ''}">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-semibold uppercase mb-1">Cierre 1</label>
              <input type="time" class="day-morning-close w-full text-xs p-1.5 border border-slate-200 rounded-lg" value="${day.morning_close || ''}">
            </div>
          </div>
          <div class="md:col-span-2 grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] text-slate-400 font-semibold uppercase mb-1">Apertura 2 (Opcional)</label>
              <input type="time" class="day-afternoon-open w-full text-xs p-1.5 border border-slate-200 rounded-lg" value="${day.afternoon_open || ''}">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-semibold uppercase mb-1">Cierre 2 (Opcional)</label>
              <input type="time" class="day-afternoon-close w-full text-xs p-1.5 border border-slate-200 rounded-lg" value="${day.afternoon_close || ''}">
            </div>
          </div>
          <div class="md:col-span-1 text-right">
            <span class="text-xs px-2 py-1 rounded-full ${day.is_open ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}">${day.is_open ? 'Abierto' : 'Cerrado'}</span>
          </div>
        </div>
      `).join('');
    } catch (err) {
      console.error('Error loading hours form:', err);
    }
  }

  async saveHoursAndContact(e) {
    e.preventDefault();
    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Guardando...'; btn.disabled = true;
    try {
      const updatedSettings = {
        address_text: document.getElementById('contact-field-address').value.trim(),
        phone_number: document.getElementById('contact-field-phone').value.trim(),
        email_address: document.getElementById('contact-field-email').value.trim(),
        whatsapp_message: document.getElementById('contact-field-whatsapp-msg').value.trim()
      };
      await window.dataStore.updateSettings(updatedSettings);

      const rows = document.querySelectorAll('#admin-hours-rows > div');
      const updatedHours = Array.from(rows).map(row => ({
        id: row.getAttribute('data-day-id'),
        day_name: row.querySelector('span').textContent.trim(),
        is_open: row.querySelector('.day-is-open').checked,
        morning_open: row.querySelector('.day-morning-open').value,
        morning_close: row.querySelector('.day-morning-close').value,
        afternoon_open: row.querySelector('.day-afternoon-open').value,
        afternoon_close: row.querySelector('.day-afternoon-close').value
      }));

      await window.dataStore.saveBusinessHours(updatedHours);
      window.Utils.showToast('✅ Horarios y contacto actualizados', 'success');
    } catch (err) {
      window.Utils.showToast('❌ Error: ' + err.message, 'error');
    } finally {
      btn.textContent = 'Guardar Horarios y Contactos'; btn.disabled = false;
    }
  }

  // =====================
  // FORMAS DE PAGO
  // =====================
  async loadPaymentsForm() {
    try {
      const list = await window.dataStore.getPaymentMethods();
      const container = document.getElementById('admin-payments-list');
      if (!container) return;

      container.innerHTML = list.map(item => `
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="pm-chk-${item.id}" class="pm-is-active rounded text-sky-600 w-5 h-5" ${item.is_active ? 'checked' : ''} data-pm-id="${item.id}">
              <span class="font-bold text-slate-900">${window.Utils.escapeHtml(item.name)}</span>
            </label>
          </div>
          <input type="text" class="pm-desc w-full text-xs text-slate-700 p-2 border border-slate-200 rounded-lg" value="${window.Utils.escapeHtml(item.description || '')}" placeholder="Descripción (opcional)">
        </div>
      `).join('');
    } catch (err) {
      console.error('Error loading payments form:', err);
    }
  }

  async savePayments(e) {
    e.preventDefault();
    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Guardando...'; btn.disabled = true;
    try {
      const existing = await window.dataStore.getPaymentMethods();
      const updated = existing.map(item => {
        const chk = document.querySelector(`.pm-is-active[data-pm-id="${item.id}"]`);
        const descInput = chk?.closest('div.p-4')?.querySelector('.pm-desc');
        return {
          ...item,
          is_active: chk ? chk.checked : item.is_active,
          description: descInput ? descInput.value.trim() : item.description
        };
      });

      await window.dataStore.savePaymentMethods(updated);
      window.Utils.showToast('✅ Formas de pago actualizadas', 'success');
    } catch (err) {
      window.Utils.showToast('❌ Error: ' + err.message, 'error');
    } finally {
      btn.textContent = 'Guardar Formas de Pago'; btn.disabled = false;
    }
  }

  // =====================
  // REDES SOCIALES
  // =====================
  async loadSocialsForm() {
    try {
      const links = await window.dataStore.getSocialLinks();
      const getSocial = (platform) => links.find(s => s.platform === platform) || { url: '', is_active: false };

      const ig = getSocial('instagram');
      document.getElementById('soc-ig-url').value = ig.url || '';
      document.getElementById('soc-ig-active').checked = ig.is_active;

      const fb = getSocial('facebook');
      document.getElementById('soc-fb-url').value = fb.url || '';
      document.getElementById('soc-fb-active').checked = fb.is_active;

      const tt = getSocial('tiktok');
      document.getElementById('soc-tt-url').value = tt.url || '';
      document.getElementById('soc-tt-active').checked = tt.is_active;
    } catch (err) {
      console.error('Error loading socials form:', err);
    }
  }

  async saveSocials(e) {
    e.preventDefault();
    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Guardando...'; btn.disabled = true;
    try {
      const links = [
        { id: 'soc-1', platform: 'instagram', label: 'Instagram', url: document.getElementById('soc-ig-url').value.trim(), is_active: document.getElementById('soc-ig-active').checked },
        { id: 'soc-2', platform: 'facebook', label: 'Facebook', url: document.getElementById('soc-fb-url').value.trim(), is_active: document.getElementById('soc-fb-active').checked },
        { id: 'soc-3', platform: 'tiktok', label: 'TikTok', url: document.getElementById('soc-tt-url').value.trim(), is_active: document.getElementById('soc-tt-active').checked }
      ];

      await window.dataStore.saveSocialLinks(links);
      window.Utils.showToast('✅ Redes sociales guardadas', 'success');
    } catch (err) {
      window.Utils.showToast('❌ Error: ' + err.message, 'error');
    } finally {
      btn.textContent = 'Guardar Redes Sociales'; btn.disabled = false;
    }
  }

  // =====================
  // UBICACIÓN
  // =====================
  async loadLocationForm() {
    try {
      const loc = await window.dataStore.getLocation();
      document.getElementById('loc-address').value = loc.address || '';
      document.getElementById('loc-lat').value = loc.latitude || '';
      document.getElementById('loc-lng').value = loc.longitude || '';
      document.getElementById('loc-maps-url').value = loc.google_maps_url || '';
      document.getElementById('loc-embed-code').value = loc.map_embed_code || '';
    } catch (err) {
      console.error('Error loading location form:', err);
    }
  }

  async saveLocation(e) {
    e.preventDefault();
    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Guardando...'; btn.disabled = true;
    try {
      const locData = {
        address: document.getElementById('loc-address').value.trim(),
        latitude: parseFloat(document.getElementById('loc-lat').value) || 0,
        longitude: parseFloat(document.getElementById('loc-lng').value) || 0,
        google_maps_url: document.getElementById('loc-maps-url').value.trim(),
        map_embed_code: document.getElementById('loc-embed-code').value.trim()
      };

      await window.dataStore.saveLocation(locData);
      window.Utils.showToast('✅ Ubicación guardada con éxito', 'success');
    } catch (err) {
      window.Utils.showToast('❌ Error: ' + err.message, 'error');
    } finally {
      btn.textContent = 'Guardar Ubicación'; btn.disabled = false;
    }
  }

  // =====================
  // CONFIGURACIÓN SUPABASE
  // =====================
  async loadConfigForm() {
    document.getElementById('cfg-supabase-url').value = window.CONFIG.SUPABASE_URL || '';
    document.getElementById('cfg-supabase-key').value = window.CONFIG.SUPABASE_ANON_KEY || '';
  }

  async saveSupabaseConfig(e) {
    e.preventDefault();
    const btn = e.target.querySelector('[type="submit"]');
    btn.textContent = 'Conectando...'; btn.disabled = true;
    try {
      const url = document.getElementById('cfg-supabase-url').value.trim();
      const key = document.getElementById('cfg-supabase-key').value.trim();

      const success = window.supabaseManager.updateCredentials(url, key);

      if (success) {
        window.Utils.showToast('✅ ¡Conectado exitosamente a Supabase DB!', 'success');
      } else {
        window.Utils.showToast('ℹ️ Operando en modo local. Verifica las credenciales.', 'info');
      }

      await this.loadDashboardStats();
    } catch (err) {
      window.Utils.showToast('❌ Error: ' + err.message, 'error');
    } finally {
      btn.textContent = 'Guardar Credenciales Supabase'; btn.disabled = false;
    }
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    this.editingServiceId = null;
    this.editingTestimonialId = null;
  }
}
