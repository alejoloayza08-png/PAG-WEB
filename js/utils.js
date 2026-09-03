/**
 * CLINIDIAB - Utility Functions
 */

const Utils = {
  /**
   * Generates a clean WhatsApp web/api link
   */
  getWhatsAppUrl(phone, defaultMsg = 'Hola CLINIDIAB, me gustaría reservar una cita médica.') {
    if (!phone) return '#';
    const cleanNumber = phone.replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(defaultMsg);
    return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
  },

  /**
   * Formats numbers into currency strings
   */
  formatCurrency(price, currency = '$') {
    const num = parseFloat(price) || 0;
    return `${currency}${num.toFixed(2)}`;
  },

  /**
   * Renders star icons HTML based on rating (1-5)
   */
  renderStars(rating = 5) {
    const total = 5;
    const numRating = Math.min(Math.max(parseInt(rating) || 5, 1), 5);
    let html = '<div class="star-rating" aria-label="Calificación de ' + numRating + ' de 5 estrellas">';
    for (let i = 1; i <= total; i++) {
      if (i <= numRating) {
        html += `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-amber-400 stroke-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      } else {
        html += `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-slate-200 stroke-slate-300" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      }
    }
    html += '</div>';
    return html;
  },

  /**
   * Show Toast Notification
   */
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';

    toast.innerHTML = `<span>${icon}</span> <span>${this.escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  /**
   * Validates uploaded image file
   */
  validateImage(file) {
    if (!file) return { valid: false, error: 'No se seleccionó ningún archivo.' };
    
    const allowed = window.CONFIG.ALLOWED_IMAGE_TYPES;
    if (!allowed.includes(file.type)) {
      return { valid: false, error: 'Formato no permitido. Utiliza JPG, PNG, WEBP o SVG.' };
    }

    const maxSize = window.CONFIG.MAX_IMAGE_SIZE_MB * 1024 * 1024;
    if (file.size > maxSize) {
      return { valid: false, error: `El archivo supera el tamaño máximo permitido de ${window.CONFIG.MAX_IMAGE_SIZE_MB}MB.` };
    }

    return { valid: true };
  },

  /**
   * Uploads image file to Supabase Storage if configured, or converts to base64 Data URL
   */
  async uploadImage(file, folder = 'uploads') {
    const validation = this.validateImage(file);
    if (!validation.valid) throw new Error(validation.error);

    // If Supabase Storage is active
    if (window.supabaseManager.hasLiveSupabase()) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const client = window.supabaseManager.getClient();
        
        const { data, error } = await client.storage
          .from(window.CONFIG.STORAGE_BUCKET)
          .upload(fileName, file, { cacheControl: '3600', upsert: true });

        if (error) throw error;

        const { data: publicUrlData } = client.storage
          .from(window.CONFIG.STORAGE_BUCKET)
          .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
      } catch (supabaseErr) {
        console.warn('Supabase storage upload failed, falling back to base64 encoding:', supabaseErr);
      }
    }

    // Fallback to Data URL for instant local editing
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  },

  /**
   * Escapes HTML string to prevent XSS
   */
  escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};

window.Utils = Utils;
