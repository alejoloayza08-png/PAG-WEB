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
    renderHeroMedia(settings);

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

// =====================
// HERO MEDIA (CARD vs YOUTUBE AUTOPLAY VIDEO WITH AUDIO TOGGLE)
// =====================
let isYouTubeApiLoaded = false;
let heroYtPlayer = null;
const heroAudioState = { isMuted: true };
let sectionYtPlayer = null;
const sectionAudioState = { isMuted: true };

function ensureYouTubeApi(callback) {
  if (window.YT && window.YT.Player) {
    callback();
    return;
  }
  if (!isYouTubeApiLoaded) {
    isYouTubeApiLoaded = true;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }
  }
  const prevOnReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function() {
    if (typeof prevOnReady === 'function') prevOnReady();
    callback();
  };
}

function renderHeroMedia(settings) {
  const mediaType = settings?.hero_media_type || 'card'; // 'card' or 'video'
  const youtubeUrl = settings?.hero_youtube_url || '';
  const autoplay = settings?.hero_video_autoplay !== false;

  const cardContainer = document.getElementById('hero-card-container');
  const videoContainer = document.getElementById('hero-video-container');

  const videoId = window.Utils ? window.Utils.extractYouTubeId(youtubeUrl) : null;

  if (mediaType === 'video' && videoId) {
    if (cardContainer) cardContainer.classList.add('hidden');
    if (videoContainer) {
      videoContainer.classList.remove('hidden');
      ensureYouTubeApi(() => {
        initHeroYouTubePlayer(videoId, autoplay);
      });
    }
  } else {
    // Show Instagram Profile Card
    if (cardContainer) cardContainer.classList.remove('hidden');
    if (videoContainer) videoContainer.classList.add('hidden');
  }

  // Dedicated Presentation Video Section
  const videoSection = document.getElementById('video-section');
  const showSection = settings?.show_video_section === true;
  const sectionVideoUrl = settings?.video_section_youtube_url || settings?.hero_youtube_url;
  const sectionVideoId = window.Utils ? window.Utils.extractYouTubeId(sectionVideoUrl) : null;

  if (videoSection) {
    if (showSection && sectionVideoId) {
      videoSection.classList.remove('hidden');
      const titleEl = document.getElementById('video-section-title-el');
      if (titleEl && settings?.video_section_title) titleEl.textContent = settings.video_section_title;
      const subEl = document.getElementById('video-section-subtitle-el');
      if (subEl && settings?.video_section_subtitle) subEl.textContent = settings.video_section_subtitle;
      ensureYouTubeApi(() => {
        initSectionYouTubePlayer(sectionVideoId);
      });
    } else {
      videoSection.classList.add('hidden');
    }
  }
}

function initHeroYouTubePlayer(videoId, autoplay = true) {
  if (heroYtPlayer) {
    try { heroYtPlayer.destroy(); } catch (e) {}
  }

  const container = document.getElementById('hero-yt-player');
  if (!container) return;

  heroYtPlayer = new window.YT.Player('hero-yt-player', {
    videoId: videoId,
    playerVars: {
      autoplay: autoplay ? 1 : 0,
      mute: 1,
      loop: 1,
      playlist: videoId,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      origin: window.location.origin
    },
    events: {
      onReady: (event) => {
        if (autoplay) {
          try {
            event.target.mute();
            event.target.playVideo();
          } catch (e) {}
        }
      }
    }
  });

  setupAudioButton('hero-toggle-audio-btn', 'hero-audio-icon', 'hero-audio-text', () => heroYtPlayer, heroAudioState);
}

function initSectionYouTubePlayer(videoId) {
  if (sectionYtPlayer) {
    try { sectionYtPlayer.destroy(); } catch (e) {}
  }

  const container = document.getElementById('section-yt-player');
  if (!container) return;

  sectionYtPlayer = new window.YT.Player('section-yt-player', {
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: videoId,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      origin: window.location.origin
    },
    events: {
      onReady: (event) => {
        try {
          event.target.mute();
          event.target.playVideo();
        } catch (e) {}
      }
    }
  });

  setupAudioButton('section-toggle-audio-btn', 'section-audio-icon', 'section-audio-text', () => sectionYtPlayer, sectionAudioState);
}

function setupAudioButton(btnId, iconId, textId, getPlayer, stateRef) {
  const btn = document.getElementById(btnId);
  const icon = document.getElementById(iconId);
  const text = document.getElementById(textId);
  if (!btn || btn.dataset.bound) return;
  btn.dataset.bound = 'true';

  btn.addEventListener('click', () => {
    const player = getPlayer();
    if (!player) return;

    if (stateRef.isMuted) {
      // Activar audio: Unmute and play from beginning with 100% volume
      try {
        if (typeof player.seekTo === 'function') player.seekTo(0, true);
        if (typeof player.unMute === 'function') player.unMute();
        if (typeof player.setVolume === 'function') player.setVolume(100);
        if (typeof player.playVideo === 'function') player.playVideo();
      } catch (err) {
        console.warn('Error activating audio:', err);
      }
      stateRef.isMuted = false;
      if (text) text.textContent = 'Silenciar audio';
      if (icon) {
        icon.className = 'flex items-center justify-center text-emerald-400';
        icon.innerHTML = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      }
      btn.classList.add('bg-emerald-950/90', 'border-emerald-400/40');
      btn.classList.remove('bg-slate-950/80', 'border-white/20');
    } else {
      // Silenciar
      try {
        if (typeof player.mute === 'function') player.mute();
      } catch (err) {
        console.warn('Error muting audio:', err);
      }
      stateRef.isMuted = true;
      if (text) text.textContent = 'Activar audio';
      if (icon) {
        icon.className = 'flex items-center justify-center text-rose-400';
        icon.innerHTML = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      }
      btn.classList.remove('bg-emerald-950/90', 'border-emerald-400/40');
      btn.classList.add('bg-slate-950/80', 'border-white/20');
    }
  });
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
      doctorHeadline.innerHTML = bio.headline.replace('transforma', '<span class="text-teal-600 font-extrabold">transforma</span>');
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

  // Crisp white SVG icons matching Claude artifact
  const getServiceSvg = (title = '', index = 0) => {
    const t = title.toLowerCase();
    if (t.includes('nutrici') || t.includes('alimentac')) {
      // 02 Water droplet
      return `
        <svg class="w-6 h-6 text-white stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
      `;
    }
    if (t.includes('laboratorio') || t.includes('metab') || t.includes('perfil')) {
      // 03 Chemistry Flask / Beaker
      return `
        <svg class="w-6 h-6 text-white stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0"/>
          <path d="M5.52 16h12.96"/>
        </svg>
      `;
    }
    if (t.includes('pie') || t.includes('podolog') || t.includes('neuropat')) {
      // 04 Foot sole / podology
      return `
        <svg class="w-6 h-6 text-white stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 16v-2.38C4 11.5 7 11 7 11l1-7c.5-1.5 2-2 3-2s2.5.5 3 2l1 7s3 .5 3 2.62V16c0 4-3.5 6-7 6s-7-2-7-6Z"/>
          <path d="M8 7h.01M11 5h.01M14 7h.01"/>
        </svg>
      `;
    }
    // 01 Diabetología: Stethoscope
    return `
      <svg class="w-6 h-6 text-white stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
        <circle cx="20" cy="10" r="2"/>
      </svg>
    `;
  };

  grid.innerHTML = services.map((service, idx) => {
    const rawPrice = parseFloat(service.price) || 0;
    const whole = Math.floor(rawPrice);
    const decimals = (rawPrice % 1).toFixed(2).substring(2);
    const waUrl = window.Utils.getWhatsAppUrl(window.currentWhatsAppNumber, 'Hola CLINIDIAB, deseo reservar una cita para: ' + service.title);
    const serviceIcon = getServiceSvg(service.title, idx);
    const numWatermark = String(idx + 1).padStart(2, '0');
    const duration = service.duration || 'Consulta';

    return `
      <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
        
        <!-- Subtle Watermark Number -->
        <span class="text-slate-100 font-black text-6xl select-none absolute right-4 bottom-2 pointer-events-none group-hover:text-teal-50 transition-colors z-0">
          ${numWatermark}
        </span>

        <div class="relative z-10">
          <!-- Top Row: Squircle Solid Teal Icon & Cyan Duration Pill -->
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-[#008ba3] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              ${serviceIcon}
            </div>
            <span class="bg-[#ccfbf1] text-[#0f766e] text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
              <svg class="w-3.5 h-3.5 text-[#0f766e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              ${window.Utils.escapeHtml(duration)}
            </span>
          </div>

          <!-- Title & Description -->
          <h3 class="text-xl sm:text-[22px] font-extrabold text-slate-900 tracking-tight leading-snug mt-5 mb-2.5 group-hover:text-[#008ba3] transition-colors">
            ${window.Utils.escapeHtml(service.title)}
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
            ${window.Utils.escapeHtml(service.description || '')}
          </p>
        </div>

        <!-- Dashed Separator + Inversión + Reservar Pill -->
        <div class="border-t border-dashed border-slate-200/90 pt-5 mt-auto flex items-end justify-between relative z-10">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">INVERSIÓN</span>
            <div class="flex items-baseline font-black leading-none">
              <span class="text-base font-extrabold text-[#008ba3] mr-0.5">$</span>
              <span class="text-3xl font-black text-slate-900 tracking-tight leading-none">${whole}</span>
              <span class="text-sm font-extrabold text-slate-700">.${decimals}</span>
            </div>
          </div>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="bg-[#008ba3] hover:bg-[#007a90] text-white px-7 py-2.5 rounded-full font-bold text-sm shadow-md shadow-cyan-900/10 hover:shadow-cyan-900/20 transition-all transform hover:-translate-y-0.5">
            Reservar
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

    scheduleContainer.innerHTML = hours.map((day) => {
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

      return `
        <div class="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl transition-colors schedule-row ${isToday ? 'bg-[#e0f7fa]' : 'hover:bg-slate-50/80'}" data-day="${window.Utils.escapeHtml(day.day_name)}">
          <div class="flex items-center gap-2.5 sm:gap-3">
            <span class="w-2 h-2 ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full flex-shrink-0"></span>
            <span class="font-bold text-slate-900 text-sm sm:text-base">${window.Utils.escapeHtml(day.day_name)}</span>
            ${isToday ? `<span class="hoy-badge bg-[#008ba3] text-white text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider">HOY</span>` : ''}
          </div>
          <span class="${isOpen ? 'text-slate-700 font-semibold' : 'text-rose-500 font-bold'} text-xs sm:text-sm tabular-nums text-right">${timeText}</span>
        </div>
      `;
    }).join('');
  }
}

function renderPaymentMethods(payments) {
  const strip = document.getElementById('payment-methods-strip');
  if (!strip || !payments || !payments.length) return;

  const activePayments = payments.filter(p => p.is_active !== false);
  if (!activePayments.length) return;

  const getPaymentIcon = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('efectivo') || n.includes('cash')) {
      return `<svg class="w-4 h-4 text-[#008ba3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`;
    }
    if (n.includes('transferencia') || n.includes('banco') || n.includes('bancaria')) {
      return `<svg class="w-4 h-4 text-[#008ba3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2 2 7h20L12 2z"/></svg>`;
    }
    if (n.includes('crédito') || n.includes('credito')) {
      return `<svg class="w-4 h-4 text-[#008ba3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`;
    }
    return `<svg class="w-4 h-4 text-[#008ba3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M6 14h2"/><path d="M10 14h.01"/><path d="M14 14h.01"/></svg>`;
  };

  strip.innerHTML = `
    <span class="font-semibold text-slate-500 text-sm mr-1">Formas de pago:</span>
    ${activePayments.map(p => `
      <div class="bg-white border border-slate-200/90 rounded-full px-4 py-2 flex items-center gap-2 shadow-xs text-sm font-semibold text-slate-700">
        ${getPaymentIcon(p.name)}
        <span>${window.Utils.escapeHtml(p.name)}</span>
      </div>
    `).join('')}
  `;
}

function renderSocialLinks(socials) {
  const container = document.getElementById('social-links-container');
  if (!container || !socials) return;

  const validSocials = socials.filter(s => s.is_active && s.url && (s.platform || '').toLowerCase() !== 'whatsapp');

  container.innerHTML = validSocials.map(s => {
    let iconSvg = '';
    const platform = (s.platform || '').toLowerCase();

    if (platform === 'instagram') {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.162 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
    } else if (platform === 'facebook') {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
    } else if (platform === 'youtube') {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>';
    } else if (platform === 'tiktok') {
      iconSvg = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>';
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
