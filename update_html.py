import re

with open("/Users/carlosmaruri/Pictures/clinidiab/index.html", "r") as f:
    content = f.read()

# We need to replace Section 2 completely, add STATS BANNER, keep 3,4,5,6, replace 7, keep 8 onwards.

# Extract up to Section 2
head_to_hero = content.split("<!-- SECTION 2: DR. LOAYZA")[0]

# Extract Section 3 to Section 7
sec3_to_7_regex = r"(<!-- SECTION 3: SERVICIOS MÉDICOS -->.*?)(?=<!-- SECTION 7: HORARIOS Y DATOS DE CONTACTO -->)"
match_3_to_7 = re.search(sec3_to_7_regex, content, flags=re.DOTALL)
if not match_3_to_7:
    print("Could not find section 3 to 7")
    exit(1)
sections_3_4_5_6 = match_3_to_7.group(1)

# Extract Section 8 to end
sec8_to_end_regex = r"(<!-- SECTION 8: UBICACIÓN & MAPA -->.*)"
match_8_to_end = re.search(sec8_to_end_regex, content, flags=re.DOTALL)
if not match_8_to_end:
    print("Could not find section 8 to end")
    exit(1)
section_8_to_end = match_8_to_end.group(1)

new_section_2_and_stats = """<!-- SECTION 2: DR. LOAYZA / TU MÉDICO -->
    <section id="dr-loayza" class="bg-white py-20 border-y border-slate-200/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <!-- LEFT COLUMN -->
          <div class="relative flex justify-center">
            <!-- Decorative dot grid -->
            <div class="absolute -top-6 -left-6 w-24 h-24 bg-[radial-gradient(#14b8a6_2px,transparent_2px)] [background-size:12px_12px] opacity-30 z-0"></div>
            <div class="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white w-full max-w-md aspect-[3/4]">
              <img src="assets/dr-loayza-portrait.jpg" alt="Dr. Fabricio Loayza" class="w-full h-full object-cover">
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent p-6 pt-12">
                <h4 class="font-bold text-white text-xl">Dr. Fabricio Loayza T.</h4>
                <p class="text-slate-300 text-sm mt-1">Diabetes · Tiroides · Obesidad · Endocrinología</p>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN -->
          <div class="space-y-6">
            <div class="inline-flex items-center gap-3">
              <span class="w-8 h-[2px] bg-teal-500"></span>
              <span class="text-teal-700 text-xs font-extrabold tracking-widest uppercase">Tu Médico</span>
            </div>
            <h2 class="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Medicina que <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">transforma</span>, hábitos que liberan
            </h2>
            <p class="text-slate-600 text-base leading-relaxed">
              CLINIDIAB es un consultorio médico dedicado a la prevención, diagnóstico y tratamiento integral de la diabetes y los trastornos metabólicos, con un enfoque en obesidad, tiroides, hormonas y alimentación saludable. Atención especializada, oportuna y humana en el centro de Machala.
            </p>

            <!-- Credential cards -->
            <div class="space-y-3 pt-2">
              <div class="bg-slate-50 rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl flex-shrink-0">🩺</div>
                <div>
                  <h4 class="font-bold text-slate-900 text-sm">Especialista en Diabetología</h4>
                  <p class="text-xs text-slate-500 mt-0.5">Diagnóstico, control glucémico y manejo de insulinas</p>
                </div>
              </div>
              <div class="bg-slate-50 rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl flex-shrink-0">🧬</div>
                <div>
                  <h4 class="font-bold text-slate-900 text-sm">Máster en Endocrinología</h4>
                  <p class="text-xs text-slate-500 mt-0.5">Tiroides, hormonas y trastornos metabólicos</p>
                </div>
              </div>
              <div class="bg-slate-50 rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl flex-shrink-0">🥗</div>
                <div>
                  <h4 class="font-bold text-slate-900 text-sm">Máster en Nutrición</h4>
                  <p class="text-xs text-slate-500 mt-0.5">Planes de alimentación y hábitos sostenibles</p>
                </div>
              </div>
            </div>

            <!-- Tag pills -->
            <div class="flex flex-wrap gap-2 pt-3">
              <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">Obesidad</span>
              <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">Sobrepeso</span>
              <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">Alimentación saludable</span>
              <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">Hábitos sanos</span>
              <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">Diabetes</span>
              <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">Prediabetes</span>
              <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">Colesterol</span>
              <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">Triglicéridos</span>
              <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">Tiroides</span>
              <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">Hormonas</span>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- SECTION: STATS BANNER -->
    <section class="bg-gradient-to-r from-teal-600 via-teal-700 to-slate-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-5xl md:text-6xl font-extrabold text-white">+10</div>
            <div class="text-sm text-teal-200 mt-2 font-medium">Años de experiencia</div>
          </div>
          <div class="text-center">
            <div class="text-5xl md:text-6xl font-extrabold text-white">14,4 mil</div>
            <div class="text-sm text-teal-200 mt-2 font-medium">Seguidores en Instagram</div>
          </div>
          <div class="text-center">
            <div class="text-5xl md:text-6xl font-extrabold text-white">793</div>
            <div class="text-sm text-teal-200 mt-2 font-medium">Publicaciones educativas</div>
          </div>
          <div class="text-center">
            <div class="text-5xl md:text-6xl font-extrabold text-white">6</div>
            <div class="text-sm text-teal-200 mt-2 font-medium">Días de atención a la semana</div>
          </div>
        </div>
      </div>
    </section>

"""

new_section_7 = """<!-- SECTION 7: HORARIOS Y CONTACTO -->
    <section id="horarios" class="bg-white py-20 border-t border-slate-200/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Horarios Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <!-- LEFT COLUMN -->
          <div class="space-y-6">
            <div class="inline-flex items-center gap-3">
              <span class="text-teal-700 text-xs font-extrabold tracking-wider uppercase">── Atención Presencial</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Horarios de <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">atención</span>
            </h2>
            <p class="text-slate-600 text-base leading-relaxed">
              Te esperamos en el consultorio de lunes a sábado. Para asegurar tu turno, escríbenos por WhatsApp y confirmamos disponibilidad al instante.
            </p>
            
            <div class="bg-sky-50 border border-sky-100 rounded-2xl p-4 flex items-start gap-4">
              <div class="text-sky-600 text-xl flex-shrink-0">⏱️</div>
              <p class="text-sm text-sky-800 font-medium">La duración de cada cita varía según el servicio (30 – 45 min). Llega 10 minutos antes de tu hora.</p>
            </div>

            <div class="pt-2">
              <a href="#" class="whatsapp-reserve-btn inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white px-7 py-4 rounded-xl font-bold text-base shadow-lg shadow-emerald-500/25 transition-all">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                Consultar disponibilidad
              </a>
            </div>
          </div>
          
          <!-- RIGHT COLUMN -->
          <div>
            <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
              <div class="space-y-4" id="schedule-list">
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 schedule-row" data-day="Lunes">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span class="font-bold text-slate-900">Lunes</span>
                    <span class="hoy-badge hidden bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">HOY</span>
                  </div>
                  <span class="text-slate-600 text-sm font-medium">08:00 – 13:00 · 15:00 – 19:00</span>
                </div>
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 schedule-row" data-day="Martes">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span class="font-bold text-slate-900">Martes</span>
                    <span class="hoy-badge hidden bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">HOY</span>
                  </div>
                  <span class="text-slate-600 text-sm font-medium">08:00 – 13:00 · 15:00 – 19:00</span>
                </div>
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 schedule-row" data-day="Miércoles">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span class="font-bold text-slate-900">Miércoles</span>
                    <span class="hoy-badge hidden bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">HOY</span>
                  </div>
                  <span class="text-slate-600 text-sm font-medium">08:00 – 13:00 · 15:00 – 19:00</span>
                </div>
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 schedule-row" data-day="Jueves">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span class="font-bold text-slate-900">Jueves</span>
                    <span class="hoy-badge hidden bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">HOY</span>
                  </div>
                  <span class="text-slate-600 text-sm font-medium">08:00 – 13:00 · 15:00 – 19:00</span>
                </div>
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 schedule-row" data-day="Viernes">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span class="font-bold text-slate-900">Viernes</span>
                    <span class="hoy-badge hidden bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">HOY</span>
                  </div>
                  <span class="text-slate-600 text-sm font-medium">08:00 – 13:00 · 15:00 – 18:00</span>
                </div>
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 schedule-row" data-day="Sábado">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span class="font-bold text-slate-900">Sábado</span>
                    <span class="hoy-badge hidden bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">HOY</span>
                  </div>
                  <span class="text-slate-600 text-sm font-medium">08:30 – 13:30</span>
                </div>
                <div class="flex items-center justify-between schedule-row" data-day="Domingo">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 bg-rose-500 rounded-full"></span>
                    <span class="font-bold text-slate-900">Domingo</span>
                    <span class="hoy-badge hidden bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">HOY</span>
                  </div>
                  <span class="text-rose-500 text-sm font-bold">Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Info Below -->
        <div class="pt-12 border-t border-slate-100">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="space-y-6">
              <div>
                <h3 class="text-2xl font-extrabold text-slate-900">Información de Contacto</h3>
                <p class="text-slate-600 mt-2 text-sm">Comunícate con nosotros para más información sobre nuestros servicios o ubicación.</p>
              </div>
              <div class="space-y-4">
                <div class="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div class="p-3 bg-sky-600 text-white rounded-xl shadow-sm flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 text-sm">Dirección en Machala</h4>
                    <p id="contact-address" class="text-sm text-slate-600 mt-0.5 leading-relaxed">Cargando dirección...</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <div class="p-3 bg-sky-600 text-white rounded-xl shadow-sm flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-400 text-[11px] uppercase">Teléfono</h4>
                      <a id="contact-phone" href="#" class="text-sm font-bold text-slate-900 hover:text-sky-600">Cargando...</a>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <div class="p-3 bg-sky-600 text-white rounded-xl shadow-sm flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-400 text-[11px] uppercase">Correo</h4>
                      <a id="contact-email" href="#" class="text-xs font-bold text-slate-900 hover:text-sky-600 truncate block">Cargando...</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                💳 Formas de Pago Aceptadas
              </h3>
              <div id="payment-methods-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <!-- Rendered by js/app.js -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
"""

# Include script injection before closing body
script_addition = """
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const today = days[new Date().getDay()];
      const rows = document.querySelectorAll('.schedule-row');
      rows.forEach(row => {
        if (row.getAttribute('data-day') === today) {
          const badge = row.querySelector('.hoy-badge');
          if (badge) badge.classList.remove('hidden');
        }
      });
    });
  </script>
</body>"""

# Make sure section 8 does not accidentally replace </body> twice
section_8_to_end = section_8_to_end.replace("</body>", script_addition)

final_content = head_to_hero + new_section_2_and_stats + sections_3_4_5_6 + new_section_7 + section_8_to_end

with open("/Users/carlosmaruri/Pictures/clinidiab/index.html", "w") as f:
    f.write(final_content)

print("Update complete")
