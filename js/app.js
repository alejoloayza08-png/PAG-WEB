/**
 * CLINIDIAB - Public Web Application Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🩺 CLINIDIAB Public App Initialized');

  // Initialize UI components
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

    // Close menu when clicking links
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }
}

async function loadPublicContent() {
  try {
    // 1. Fetch data from store
    const [settings, services, testimonials, hours, payments, socials, location] = await Promise.all([
      window.dataStore.getSettings(),
      window.dataStore.getServices(true), // Only active
      window.dataStore.getTestimonials(true), // Only active
      window.dataStore.getBusinessHours(),
      window.dataStore.getPaymentMethods(true),
      window.dataStore.getSocialLinks(true),
      window.dataStore.getLocation()
    ]);

    // 2. Render Hero & Branding
    renderBrandingAndHero(settings);

    // 3. Render WhatsApp Links
    setupWhatsAppButtons(settings);

    // 4. Render Services
    renderServices(services);

    // 5. Render Testimonials
    renderTestimonials(testimonials);

    // 6. Render Contact & Business Hours
    renderContactAndHours(settings, hours);

    // 7. Render Payment Methods
    renderPaymentMethods(payments);

    // 8. Render Social Links
    renderSocialLinks(socials);

    // 9. Render Location & Google Maps
    renderLocation(location);

  } catch (error) {
    console.error('Error loading public content:', error);
  }
}

function renderBrandingAndHero(settings) {
  if (!settings) return;

  // Clinic name
  document.querySelectorAll('.brand-name').forEach(el => {
    el.textContent = settings.clinic_name || 'CLINIDIAB';
  });

  // Hero fields
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle && settings.hero_title) heroTitle.textContent = settings.hero_title;

  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle && settings.hero_subtitle) heroSubtitle.textContent = settings.hero_subtitle;

  const heroImg = document.getElementById('hero-image');
  if (heroImg && settings.hero_image_url) {
    heroImg.src = settings.hero_image_url;
    heroImg.alt = settings.clinic_name || 'CLINIDIAB';
  }

  // Logo
  if (settings.logo_url) {
    document.querySelectorAll('.brand-logo-img').forEach(img => {
      img.src = settings.logo_url;
    });
  }
}

function setupWhatsAppButtons(settings) {
  const number = settings?.whatsapp_number || '593987654321';
  const message = settings?.whatsapp_message || 'Hola CLINIDIAB, quisiera agendar una cita.';
  window.currentWhatsAppNumber = number;
  const waUrl = window.Utils.getWhatsAppUrl(number, message);

  // Apply to all reserve buttons
  document.querySelectorAll('.whatsapp-reserve-btn').forEach(btn => {
    btn.href = waUrl;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
  });

  // Floating button
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

    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-medical hover:shadow-xl transition-custom flex flex-col h-full group">
        ${hasImage ? `
          <div class="h-48 w-full overflow-hidden bg-slate-100 relative">
            <img src="${window.Utils.escapeHtml(service.image_url)}" alt="${window.Utils.escapeHtml(service.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-custom" loading="lazy">
            ${service.duration ? `
              <span class="absolute bottom-3 right-3 bg-slate-900/75 backdrop-blur-md color-white text-white text-xs font-semibold px-3 py-1 rounded-full">
                ⏱️ ${window.Utils.escapeHtml(service.duration)}
              </span>
            ` : ''}
          </div>
        ` : ''}
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-3 mb-2">
              <h3 class="font-bold text-xl text-slate-900 group-hover:text-sky-600 transition-colors">
                ${window.Utils.escapeHtml(service.title)}
              </h3>
            </div>
            <p class="text-slate-600 text-sm mb-4 leading-relaxed">
              ${window.Utils.escapeHtml(service.description || '')}
            </p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
            <div>
              <span class="text-xs text-slate-400 font-medium block">Inversión:</span>
              <span class="text-2xl font-extrabold text-sky-700">${formattedPrice}</span>
            </div>
            <a href="${window.Utils.getWhatsAppUrl(window.currentWhatsAppNumber, 'Hola CLINIDIAB, solicito información para: ' + service.title)}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white transition-custom">
              Reservar
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
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
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-medical flex flex-col justify-between h-full">
        <div>
          <div class="mb-4">${starsHtml}</div>
          <p class="text-slate-700 italic text-sm leading-relaxed mb-6">
            "${window.Utils.escapeHtml(item.comment)}"
          </p>
        </div>
        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
          ${hasAvatar ? `
            <img src="${window.Utils.escapeHtml(item.avatar_url)}" alt="${window.Utils.escapeHtml(item.patient_name)}" class="w-11 h-11 rounded-full object-cover border-2 border-sky-100">
          ` : `
            <div class="w-11 h-11 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-base">
              ${initial}
            </div>
          `}
          <div>
            <h4 class="font-bold text-sm text-slate-900">${window.Utils.escapeHtml(item.patient_name)}</h4>
            <span class="text-xs text-emerald-600 font-medium flex items-center gap-1">
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

  // Business hours table/list
  const hoursContainer = document.getElementById('business-hours-list');
  if (hoursContainer && hours) {
    hoursContainer.innerHTML = hours.map(day => {
      let timeText = '';
      if (!day.is_open) {
        timeText = '<span class="text-rose-500 font-semibold">Cerrado</span>';
      } else {
        const morning = day.morning_open && day.morning_close ? `${day.morning_open} - ${day.morning_close}` : '';
        const afternoon = day.afternoon_open && day.afternoon_close ? `${day.afternoon_open} - ${day.afternoon_close}` : '';
        if (morning && afternoon) {
          timeText = `<span class="text-slate-700 font-medium">${morning}</span> <span class="text-slate-400 mx-1">|</span> <span class="text-slate-700 font-medium">${afternoon}</span>`;
        } else if (morning) {
          timeText = `<span class="text-slate-700 font-medium">${morning}</span>`;
        } else if (afternoon) {
          timeText = `<span class="text-slate-700 font-medium">${afternoon}</span>`;
        } else {
          timeText = '<span class="text-emerald-600 font-semibold">Abierto</span>';
        }
      }

      return `
        <div class="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0 text-sm">
          <span class="font-bold text-slate-800">${window.Utils.escapeHtml(day.day_name)}</span>
          <div class="text-right">${timeText}</div>
        </div>
      `;
    }).join('');
  }
}

function renderPaymentMethods(payments) {
  const container = document.getElementById('payment-methods-grid');
  if (!container) return;

  if (!payments || payments.length === 0) {
    container.innerHTML = `<p class="text-slate-400 text-sm">Consulte formas de pago disponibles en recepción.</p>`;
    return;
  }

  container.innerHTML = payments.map(item => `
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex items-start gap-3">
      <div class="p-2.5 bg-white text-sky-600 rounded-lg shadow-sm border border-slate-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
      </div>
      <div>
        <h4 class="font-bold text-sm text-slate-900">${window.Utils.escapeHtml(item.name)}</h4>
        ${item.description ? `<p class="text-xs text-slate-500 mt-0.5">${window.Utils.escapeHtml(item.description)}</p>` : ''}
      </div>
    </div>
  `).join('');
}

function renderSocialLinks(socials) {
  const container = document.getElementById('social-links-container');
  if (!container) return;

  if (!socials || socials.length === 0) {
    container.innerHTML = '';
    return;
  }

  const icons = {
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>`,
    tiktok: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.36 1.49-1.41 2.49-.09 1.34.61 2.67 1.76 3.32.96.55 2.14.6 3.19.16.89-.37 1.59-1.14 1.86-2.07.16-.54.19-1.11.18-1.67.02-5.38.01-10.76.01-16.14z"/></svg>`
  };

  container.innerHTML = socials.map(soc => `
    <a href="${window.Utils.escapeHtml(soc.url)}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-600 flex items-center justify-center transition-custom" aria-label="${window.Utils.escapeHtml(soc.label || soc.platform)}">
      ${icons[soc.platform] || '🔗'}
    </a>
  `).join('');
}

function renderLocation(location) {
  if (!location) return;

  const addressEl = document.getElementById('map-address');
  if (addressEl && location.address) {
    addressEl.textContent = location.address;
  }

  const mapFrameContainer = document.getElementById('google-map-container');
  if (mapFrameContainer && location.map_embed_code) {
    mapFrameContainer.innerHTML = location.map_embed_code;
  }

  const directionsBtn = document.getElementById('directions-btn');
  if (directionsBtn) {
    const mapsUrl = location.google_maps_url || (location.latitude && location.longitude ? `https://maps.google.com/?q=${location.latitude},${location.longitude}` : '#');
    directionsBtn.href = mapsUrl;
    directionsBtn.target = '_blank';
  }
}
