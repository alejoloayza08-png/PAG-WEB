/**
 * CLINIDIAB - Public Web Application Engine
 * Dynamic rendering for all sections from Supabase / DataStore:
 * - Branding & Hero
 * - Tu Médico / Doctor Bio
 * - Servicios Médicos
 * - Contenido / Transformaciones (Instagram)
 * - Actividad Académica
 * - Testimonios
 * - Horarios y Contacto
 * - Formas de Pago
 * - Redes Sociales
 * - Ubicación & Mapa
 */

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🩺 CLINIDIAB Public App Initialized');
  setupMobileMenu();
  await loadPublicContent();
});

function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }
}

async function loadPublicContent() {
  try {
    const [settings, doctorBio, services, casesList, academicList, testimonials, hours, payments, socials, location] = await Promise.all([
      window.dataStore.getSettings(),
      window.dataStore.getDoctorBio ? window.dataStore.getDoctorBio() : null,
      window.dataStore.getServices(true),
      window.dataStore.getCases ? window.dataStore.getCases(true) : null,
      window.dataStore.getAcademicEvents ? window.dataStore.getAcademicEvents(true) : null,
      window.dataStore.getTestimonials(true),
      window.dataStore.getBusinessHours(),
      window.dataStore.getPaymentMethods(true),
      window.dataStore.getSocialLinks(true),
      window.dataStore.getLocation()
    ]);

    window.currentWhatsAppNumber = settings?.whatsapp_number || '593987654321';
    window.currentWhatsAppMessage = settings?.whatsapp_message || 'Hola CLINIDIAB, quisiera agendar una cita médica.';

    // 1. Branding & Hero
    renderBrandingAndHero(settings);

    // 2. Doctor Bio / Tu Médico
    renderDoctorBio(doctorBio);

    // 3. WhatsApp buttons
    setupWhatsAppButtons(settings);

    // 4. Servicios Médicos
    renderServices(services);

    // 5. Casos / Transformaciones
    if (casesList) renderCases(casesList);

    // 6. Actividad Académica
    if (academicList) renderAcademicEvents(academicList);

    // 7. Testimonios
    renderTestimonials(testimonials);

    // 8. Contacto & Horarios
    renderContactAndHours(settings, hours);

    // 9. Formas de Pago
    renderPaymentMethods(payments);

    // 10. Redes Sociales
    renderSocialLinks(socials);

    // 11. Ubicación & Mapa
    renderLocation(location);

  } catch (error) {
    console.error('Error loading public content:', error);
  }
}

function renderBrandingAndHero(settings) {
  if (!settings) return;

  const clinicName = settings.clinic_name || 'CLINIDIAB';

  // Clinic name in all brand placeholders
  document.querySelectorAll('.brand-name').forEach(el => {
    el.textContent = clinicName;
  });

  // Document title
  document.title = `${clinicName} · Dr. Fabricio Loayza — Diabetes, Tiroides y Obesidad en Machala`;

  // Hero Title
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle && settings.hero_title) {
    if (settings.hero_title.includes('Diabetes') && !settings.hero_title.includes('<span')) {
      heroTitle.innerHTML = settings.hero_title.replace('Diabetes', '<span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700">Diabetes</span>');
    } else {
      heroTitle.innerHTML = settings.hero_title;
    }
  }

  // Hero Subtitle
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle && settings.hero_subtitle) {
    heroSubtitle.textContent = settings.hero_subtitle;
  }

  // Hero Image
  const heroImg = document.getElementById('hero-image');
  if (heroImg) {
    if (settings.hero_image_url) {
      heroImg.src = settings.hero_image_url;
    }
    heroImg.alt = 'Dr. Fabricio Loayza';
    heroImg.onerror = function() {
      if (!this.dataset.triedFallback) {
        this.dataset.triedFallback = '1';
        this.src = 'assets/dr-fabricio-loayza.jpg';
      }
    };
  }

  // Logo
  if (settings.logo_url) {
    document.querySelectorAll('.brand-logo-img').forEach(img => {
      img.src = settings.logo_url;
    });
  }
}

function renderDoctorBio(bio) {
  if (!bio) return;

  const doctorPhoto = document.getElementById('doctor-bio-photo');
  if (doctorPhoto && bio.image_url) {
    doctorPhoto.src = bio.image_url;
  }

  const doctorHeadline = document.getElementById('doctor-bio-headline');
  if (doctorHeadline && bio.headline) {
    if (bio.headline.includes('transforma') && !bio.headline.includes('<span')) {
      doctorHeadline.innerHTML = bio.headline.replace('transforma', '<span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">transforma</span>');
    } else {
      doctorHeadline.innerHTML = bio.headline;
    }
  }

  const doctorDesc = document.getElementById('doctor-bio-description');
  if (doctorDesc && bio.description) {
    doctorDesc.textContent = bio.description;
  }
}

function setupWhatsAppButtons(settings) {
  const phone = settings?.whatsapp_number || '593987654321';
  const msg = settings?.whatsapp_message || 'Hola CLINIDIAB, deseo reservar una cita médica.';
  const waUrl = window.Utils.getWhatsAppUrl(phone, msg);

  document.querySelectorAll('.whatsapp-reserve-btn').forEach(btn => {
    btn.href = waUrl;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
  });

  const floatBtn = document.getElementById('whatsapp-float-btn');
  if (floatBtn) {
    floatBtn.href = waUrl;
  }
}

function renderServices(services) {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  if (!services || services.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-500">
        <p>No hay servicios activos disponibles en este momento.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = services.map(service => {
    const hasImage = service.image_url && service.image_url.trim().length > 0;
    const formattedPrice = window.Utils.formatCurrency(service.price, service.currency || '$');
    const waUrl = window.Utils.getWhatsAppUrl(window.currentWhatsAppNumber, 'Hola CLINIDIAB, solicito información para el servicio: ' + service.title);

    return `
      <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
        ${hasImage ? `
          <div class="h-48 sm:h-52 w-full overflow-hidden bg-slate-100 relative">
            <img src="${window.Utils.escapeHtml(service.image_url)}" alt="${window.Utils.escapeHtml(service.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
            ${service.duration ? `
              <span class="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                ⏱️ ${window.Utils.escapeHtml(service.duration)}
              </span>
            ` : ''}
          </div>
        ` : ''}
        <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 class="font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
              ${window.Utils.escapeHtml(service.title)}
            </h3>
            <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
              ${window.Utils.escapeHtml(service.description || '')}
            </p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
            <div>
              <span class="text-[11px] text-slate-400 font-bold uppercase block">Inversión:</span>
              <span class="text-2xl font-extrabold text-teal-700">${formattedPrice}</span>
            </div>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white transition-all shadow-sm">
              Reservar
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCases(casesList) {
  const container = document.getElementById('cases-grid');
  if (!container) return;

  if (!casesList || casesList.length === 0) return;

  container.innerHTML = casesList.map(item => `
    <div class="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 flex flex-col group hover:-translate-y-1 transition-all duration-300">
      <div class="relative overflow-hidden bg-slate-950 aspect-[4/3]">
        <img src="${window.Utils.escapeHtml(item.image_url)}" alt="${window.Utils.escapeHtml(item.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <span class="absolute top-3 left-3 bg-white/95 text-slate-900 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
          ${window.Utils.escapeHtml(item.tag_text || 'Transformación')}
        </span>
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between text-left space-y-3">
        <div>
          <h3 class="font-extrabold text-white text-base">${window.Utils.escapeHtml(item.title)}</h3>
          <p class="text-xs text-slate-400 mt-1 leading-relaxed">
            ${window.Utils.escapeHtml(item.description || '')}
          </p>
        </div>
        <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span class="text-[11px] font-semibold text-teal-400">Caso Clínico Real</span>
          <a href="${window.Utils.escapeHtml(item.instagram_url || 'https://www.instagram.com/drfabricioloayza/')}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1">
            Ver post ↗
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

function renderAcademicEvents(academicList) {
  const container = document.getElementById('academic-grid');
  if (!container) return;

  if (!academicList || academicList.length === 0) return;

  container.innerHTML = academicList.map(item => `
    <div class="bg-slate-800/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/80 flex flex-col group hover:border-teal-500/50 transition-all duration-300">
      <div class="relative overflow-hidden aspect-[4/3] bg-slate-950">
        <img src="${window.Utils.escapeHtml(item.image_url)}" alt="${window.Utils.escapeHtml(item.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        <span class="absolute top-3 left-3 bg-teal-500 text-slate-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
          ${window.Utils.escapeHtml(item.badge_text || 'Conferencista')}
        </span>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 class="font-bold text-white text-lg">${window.Utils.escapeHtml(item.title)}</h3>
          <p class="text-xs text-slate-400 mt-1.5 leading-relaxed">
            ${window.Utils.escapeHtml(item.description || '')}
          </p>
        </div>
        <div class="pt-3 border-t border-slate-700/60 text-[11px] font-semibold text-teal-400">
          ${window.Utils.escapeHtml(item.institution || 'Sociedades Médicas del Ecuador')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderTestimonials(testimonials) {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  if (!testimonials || testimonials.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-400">
        <p>No hay testimonios disponibles en este momento.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = testimonials.map(item => {
    const starsHtml = window.Utils.renderStars(item.rating);
    const hasAvatar = item.avatar_url && item.avatar_url.trim().length > 0;
    const initial = (item.patient_name || 'P')[0].toUpperCase();

    return `
      <div class="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
        <div>
          <div class="mb-4">${starsHtml}</div>
          <p class="text-slate-700 italic text-sm leading-relaxed mb-6">
            "${window.Utils.escapeHtml(item.comment)}"
          </p>
        </div>
        <div class="flex items-center gap-3.5 pt-4 border-t border-slate-100">
          ${hasAvatar ? `
            <img src="${window.Utils.escapeHtml(item.avatar_url)}" alt="${window.Utils.escapeHtml(item.patient_name)}" class="w-11 h-11 rounded-full object-cover border-2 border-teal-100">
          ` : `
            <div class="w-11 h-11 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              ${initial}
            </div>
          `}
          <div>
            <h4 class="font-bold text-sm text-slate-900">${window.Utils.escapeHtml(item.patient_name)}</h4>
            <span class="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              Paciente verificado
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderContactAndHours(settings, hours) {
  // Contact details
  if (settings) {
    const addressEl = document.getElementById('contact-address');
    if (addressEl && settings.address_text) addressEl.textContent = settings.address_text;

    const phoneEl = document.getElementById('contact-phone');
    if (phoneEl && settings.phone_number) {
      phoneEl.textContent = settings.phone_number;
      phoneEl.href = `tel:${settings.phone_number.replace(/\s+/g, '')}`;
    }

    const emailEl = document.getElementById('contact-email');
    if (emailEl && settings.email_address) {
      emailEl.textContent = settings.email_address;
      emailEl.href = `mailto:${settings.email_address}`;
    }
  }

  // Dynamic schedule list
  const scheduleContainer = document.getElementById('schedule-list') || document.getElementById('business-hours-list');
  if (scheduleContainer && hours && hours.length > 0) {
    const daysInSpanish = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const todayIndex = new Date().getDay();
    const todayName = daysInSpanish[todayIndex];

    scheduleContainer.innerHTML = hours.map((day, idx) => {
      const isToday = day.day_name && day.day_name.trim().toLowerCase() === todayName.toLowerCase();
      let timeText = 'Cerrado';
      if (day.is_open) {
        if (day.morning_open && day.morning_close && day.afternoon_open && day.afternoon_close) {
          timeText = `${day.morning_open} – ${day.morning_close} · ${day.afternoon_open} – ${day.afternoon_close}`;
        } else if (day.morning_open && day.morning_close) {
          timeText = `${day.morning_open} – ${day.morning_close}`;
        } else if (day.morning_open) {
          timeText = `${day.morning_open} – ${day.morning_close || '18:00'}`;
        }
      }

      const isOpen = day.is_open;
      const isLast = idx === hours.length - 1;

      return `
        <div class="flex items-center justify-between ${!isLast ? 'pb-4 border-b border-slate-100' : ''} schedule-row ${isToday ? 'bg-teal-50/70 p-2.5 rounded-2xl border border-teal-200 shadow-sm' : ''}" data-day="${window.Utils.escapeHtml(day.day_name)}">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full"></span>
            <span class="font-bold text-slate-900 text-sm sm:text-base">${window.Utils.escapeHtml(day.day_name)}</span>
            ${isToday ? `<span class="bg-teal-700 text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">HOY</span>` : ''}
          </div>
          <span class="${isOpen ? 'text-slate-700 font-semibold' : 'text-rose-500 font-bold'} text-xs sm:text-sm">${timeText}</span>
        </div>
      `;
    }).join('');
  }
}

function renderPaymentMethods(payments) {
  const container = document.getElementById('payment-methods-grid');
  if (!container || !payments) return;

  container.innerHTML = payments.map(p => `
    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
        💳
      </div>
      <div>
        <h4 class="font-bold text-slate-900 text-sm">${window.Utils.escapeHtml(p.name)}</h4>
        ${p.description ? `<p class="text-xs text-slate-500 mt-0.5">${window.Utils.escapeHtml(p.description)}</p>` : ''}
      </div>
    </div>
  `).join('');
}

function renderSocialLinks(socials) {
  const container = document.getElementById('social-links-container');
  if (!container || !socials) return;

  container.innerHTML = socials.map(s => {
    let iconSvg = '';
    const platform = (s.platform || '').toLowerCase();

    if (platform === 'instagram') {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
    } else if (platform === 'whatsapp') {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>';
    } else {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>';
    }

    return `
      <a href="${window.Utils.escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-all" aria-label="${window.Utils.escapeHtml(s.label || s.platform)}">
        ${iconSvg}
      </a>
    `;
  }).join('');
}

function renderLocation(location) {
  if (!location) return;

  const mapContainer = document.getElementById('google-map-container');
  if (mapContainer && location.map_embed_code) {
    mapContainer.innerHTML = location.map_embed_code;
  }

  const mapAddress = document.getElementById('map-address');
  if (mapAddress && location.address) {
    mapAddress.textContent = location.address;
  }

  const directionsBtn = document.getElementById('directions-btn');
  if (directionsBtn && location.google_maps_url) {
    directionsBtn.href = location.google_maps_url;
  }
}
