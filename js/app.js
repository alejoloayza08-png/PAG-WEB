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
    let titleHtml = settings.hero_title;
    if (titleHtml.includes('Diabetes') && !titleHtml.includes('text-teal-600')) {
      titleHtml = titleHtml.replace('Diabetes', '<span class="text-teal-600 font-extrabold">Diabetes</span>');
    }
    if (titleHtml.includes('Bienestar') && !titleHtml.includes('font-serif')) {
      titleHtml = titleHtml.replace('Bienestar', '<span class="italic font-serif font-normal text-slate-800">Bienestar</span>');
    }
    heroTitle.innerHTML = titleHtml;
  }

  // Hero Subtitle
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle && settings.hero_subtitle) {
    heroSubtitle.textContent = settings.hero_subtitle;
  }

  // Hero Image (instant load, zero flicker)
  const heroImg = document.getElementById('hero-image');
  if (heroImg) {
    const targetUrl = settings?.hero_image_url || 'assets/dr-fabricio-loayza.jpg';
    const currentSrc = heroImg.getAttribute('src') || '';
    if (!currentSrc.includes(targetUrl) && !heroImg.src.endsWith(targetUrl)) {
      heroImg.src = targetUrl;
    }
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

  // Medical SVG icons dictionary for services
  const getServiceSvg = (title = '', index = 0) => {
    const t = title.toLowerCase();
    if (t.includes('nutrici') || t.includes('alimentac')) {
      return `
        <svg class="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      `;
    }
    if (t.includes('laboratorio') || t.includes('metab') || t.includes('perfil')) {
      return `
        <svg class="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0"/>
          <path d="M5.52 16h12.96"/>
        </svg>
      `;
    }
    if (t.includes('pie') || t.includes('podolog') || t.includes('neuropat')) {
      return `
        <svg class="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      `;
    }
    // Default / Diabetología: Stethoscope
    return `
      <svg class="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
        <circle cx="20" cy="10" r="2"/>
      </svg>
    `;
  };

  grid.innerHTML = services.map((service, idx) => {
    const formattedPrice = window.Utils.formatCurrency(service.price, service.currency || '$');
    const waUrl = window.Utils.getWhatsAppUrl(window.currentWhatsAppNumber, 'Hola CLINIDIAB, deseo reservar una cita para: ' + service.title);
    const serviceIcon = getServiceSvg(service.title, idx);
    const numWatermark = String(idx + 1).padStart(2, '0');
    const duration = service.duration || 'Consulta';

    return `
      <div class="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
        <!-- Watermark Number -->
        <span class="text-slate-100 font-black text-6xl select-none absolute top-4 right-6 pointer-events-none group-hover:text-teal-100/70 transition-colors z-0">
          ${numWatermark}
        </span>

        <div class="relative z-10 space-y-4">
          <!-- Top Row: Icon & Duration pill -->
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 border border-teal-100/80 shadow-xs">
              ${serviceIcon}
            </div>
            <span class="bg-slate-100 text-slate-600 text-xs font-bold px-3.5 py-1.5 rounded-full border border-slate-200/60">
              ${window.Utils.escapeHtml(duration)}
            </span>
          </div>

          <!-- Title & Description -->
          <div>
            <h3 class="text-slate-900 font-extrabold text-xl group-hover:text-teal-700 transition-colors tracking-tight">
              ${window.Utils.escapeHtml(service.title)}
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed mt-2">
              ${window.Utils.escapeHtml(service.description || '')}
            </p>
          </div>
        </div>

        <!-- Bottom Row: Inversión + Reservar button -->
        <div class="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
          <div>
            <span class="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">INVERSIÓN:</span>
            <span class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">${formattedPrice}</span>
          </div>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white transition-all shadow-xs group-hover:bg-teal-600 group-hover:text-white">
            Reservar
            <span class="font-bold">→</span>
          </a>
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

  const getPaymentIcon = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('efectivo') || n.includes('cash')) {
      return `
        <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="12" x="2" y="6" rx="2"/>
            <circle cx="12" cy="12" r="2"/>
            <path d="M6 12h.01M18 12h.01"/>
          </svg>
        </div>
      `;
    }
    if (n.includes('transferencia') || n.includes('banco') || n.includes('bancaria')) {
      return `
        <div class="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 border border-sky-100">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2 2 7h20L12 2z"/>
          </svg>
        </div>
      `;
    }
    if (n.includes('crédito') || n.includes('credito')) {
      return `
        <div class="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 border border-purple-100">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2"/>
            <line x1="2" x2="22" y1="10" y2="10"/>
          </svg>
        </div>
      `;
    }
    // Débito / default
    return `
      <div class="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 border border-teal-100">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <path d="M6 14h2"/>
          <path d="M10 14h.01"/>
          <path d="M14 14h.01"/>
        </svg>
      </div>
    `;
  };

  container.innerHTML = payments.map(p => `
    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5 hover:border-slate-300 transition-colors">
      ${getPaymentIcon(p.name)}
      <div class="min-w-0">
        <h4 class="font-extrabold text-slate-900 text-sm leading-tight">${window.Utils.escapeHtml(p.name)}</h4>
        ${p.description ? `<p class="text-xs text-slate-500 mt-0.5 leading-snug">${window.Utils.escapeHtml(p.description)}</p>` : ''}
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
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.162 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
    } else if (platform === 'facebook') {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
    } else if (platform === 'youtube') {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>';
    } else if (platform === 'whatsapp') {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
    } else {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>';
    }

    return `
      <a href="${window.Utils.escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm" aria-label="${window.Utils.escapeHtml(s.label || s.platform)}">
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
