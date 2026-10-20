/**
 * شركة أصول لنقل العفش بالرياض - ملف التفاعلات الرئيسي (Vanilla JavaScript)
 * كود نقي، خفيف، متوافق مع معايير إمكانية الوصول والأداء
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. الإعدادات المركزية لبيانات الشركة (Central Company Configuration)
  // ==========================================
  const COMPANY_CONFIG = {
    name: 'شركة أصول لنقل العفش بالرياض',
    domain: 'https://osoolmove.com',
    phoneDisplay: '01210568977',
    phoneTel: '+201210568977',
    whatsappNumber: '201210568977',
    city: 'الرياض، المملكة العربية السعودية',
  };

  // ==========================================
  // 2. تفعيل / تعطيل أزرار الاتصال حسب توفر الأرقام الحقيقية
  // ==========================================
  function syncContactElements() {
    const phoneElements = document.querySelectorAll('[data-contact="phone"]');
    const whatsappElements = document.querySelectorAll('[data-contact="whatsapp"]');

    // التعامل مع عناصر الهاتف
    phoneElements.forEach((el) => {
      if (COMPANY_CONFIG.phoneTel && COMPANY_CONFIG.phoneDisplay) {
        const link = el.tagName === 'A' ? el : el.querySelector('a');
        if (link) {
          link.href = `tel:${COMPANY_CONFIG.phoneTel}`;
        }
        const textTarget = el.querySelector('[data-contact-text="phone"]');
        if (textTarget) {
          textTarget.textContent = COMPANY_CONFIG.phoneDisplay;
        }
        el.classList.remove('hidden');
        if (el.classList.contains('items-center') && !el.classList.contains('flex') && !el.classList.contains('inline-flex')) {
          el.classList.add('inline-flex');
        }
        el.removeAttribute('aria-disabled');
      } else {
        // إخفاء أو تعطيل العنصر مؤقتاً لعدم وجود رقم حقيقي
        el.classList.add('hidden');
        el.setAttribute('aria-disabled', 'true');
      }
    });

    // التعامل مع عناصر واتساب
    whatsappElements.forEach((el) => {
      if (COMPANY_CONFIG.whatsappNumber) {
        const link = el.tagName === 'A' ? el : el.querySelector('a');
        if (link) {
          link.href = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}`;
        }
        el.classList.remove('hidden');
        if (el.classList.contains('items-center') && !el.classList.contains('flex') && !el.classList.contains('inline-flex')) {
          el.classList.add('inline-flex');
        }
        el.removeAttribute('aria-disabled');
      } else {
        // إخفاء أو تعطيل العنصر مؤقتاً لعدم وجود رقم حقيقي
        el.classList.add('hidden');
        el.setAttribute('aria-disabled', 'true');
      }
    });
  }

  syncContactElements();

  // ==========================================
  // 3. إدارة القائمة المتنقلة للجوال (Mobile Navigation Drawer & Focus Trap)
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileMenuDrawer || !mobileMenuBackdrop || !mobileMenuBtn) return;
    mobileMenuDrawer.classList.remove('translate-x-full');
    mobileMenuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    mobileMenuBackdrop.classList.add('opacity-100', 'pointer-events-auto');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // إدارة التركيز: نقل التركيز إلى زر الإغلاق داخل القائمة
    if (closeMobileMenuBtn) {
      setTimeout(() => closeMobileMenuBtn.focus(), 100);
    }
  }

  function closeMobileMenu() {
    if (!mobileMenuDrawer || !mobileMenuBackdrop || !mobileMenuBtn) return;
    mobileMenuDrawer.classList.add('translate-x-full');
    mobileMenuBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
    mobileMenuBackdrop.classList.add('opacity-0', 'pointer-events-none');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // إعادة التركيز إلى زر فتح القائمة لضمان سهولة التنقل بلوحة المفاتيح
    mobileMenuBtn.focus();
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  }

  // إغلاق القائمة عند النقر على أي رابط داخلي
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // إغلاق القائمة عند الضغط على مفتاح Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuBtn && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
    }
  });

  // ==========================================
  // 4. تأثير التمرير على الهيدر (Header Sticky Shadow)
  // ==========================================
  const mainHeader = document.getElementById('mainHeader');
  if (mainHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        mainHeader.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
        mainHeader.classList.remove('bg-white');
      } else {
        mainHeader.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-md');
        mainHeader.classList.add('bg-white');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ==========================================
  // 5. نموذج طلب عرض السعر والتحقق المحلي (Quote Request Form)
  // ==========================================
  const quoteForm = document.getElementById('quoteForm');
  const quoteFeedback = document.getElementById('quoteFeedback');
  const requestSummaryContainer = document.getElementById('requestSummaryContainer');
  const requestSummaryText = document.getElementById('requestSummaryText');
  const copySummaryBtn = document.getElementById('copySummaryBtn');
  const whatsappActionContainer = document.getElementById('whatsappActionContainer');
  const whatsappSendBtn = document.getElementById('whatsappSendBtn');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('customerName');
      const phoneInput = document.getElementById('customerPhone');
      const serviceInput = document.getElementById('serviceType');
      const pickupInput = document.getElementById('pickupLocation');
      const dropoffInput = document.getElementById('dropoffLocation');
      const dateInput = document.getElementById('moveDate');
      const detailsInput = document.getElementById('additionalDetails');

      // تفريغ أخطاء التحقق السابقة
      let firstInvalidInput = null;
      let hasError = false;
      const errorElements = quoteForm.querySelectorAll('.field-error');
      errorElements.forEach((el) => el.remove());

      const showError = (inputElement, message) => {
        hasError = true;
        inputElement.classList.add('border-red-500', 'focus:ring-red-500');
        const err = document.createElement('p');
        err.className = 'field-error text-xs sm:text-sm text-red-600 mt-1 font-semibold';
        err.textContent = message;
        inputElement.parentNode.appendChild(err);
        if (!firstInvalidInput) {
          firstInvalidInput = inputElement;
        }
      };

      const clearError = (inputElement) => {
        inputElement.classList.remove('border-red-500', 'focus:ring-red-500');
      };

      // 1. التحقق من الاسم
      clearError(nameInput);
      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        showError(nameInput, 'يرجى إدخال اسم صحيح مكون من 3 أحرف على الأقل.');
      }

      // 2. التحقق من رقم الجوال
      clearError(phoneInput);
      const phoneVal = phoneInput.value.trim().replace(/\s+/g, '');
      const validPhoneRegex = /^(05[0-9]{8}|5[0-9]{8}|\+9665[0-9]{8}|9665[0-9]{8}|01[0-9]{9}|\+201[0-9]{9}|201[0-9]{9}|[0-9]{9,14})$/;
      if (!phoneVal) {
        showError(phoneInput, 'يرجى إدخال رقم الجوال للتواصل.');
      } else if (!validPhoneRegex.test(phoneVal)) {
        showError(phoneInput, 'يرجى إدخال رقم جوال صحيح للتواصل (مثال: 0512345678 أو 01210568977).');
      }

      // 3. التحقق من نوع الخدمة
      clearError(serviceInput);
      if (!serviceInput.value) {
        showError(serviceInput, 'يرجى اختيار نوع الخدمة المطلوبة من القائمة.');
      }

      if (hasError) {
        if (quoteFeedback) {
          quoteFeedback.className = 'p-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200 mt-4 block';
          quoteFeedback.textContent = 'يرجى مراجعة الحقول المشار إليها باللون الأحمر وتصحيحها لاستكمال تجهيز الطلب.';
        }
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // إعداد ملخص الطلب
      const serviceName = serviceInput.options[serviceInput.selectedIndex].text;
      const lines = [
        `*طلب عرض سعر نقل عفش - ${COMPANY_CONFIG.name}*`,
        `─────────────────────────`,
        `👤 *الاسم:* ${nameInput.value.trim()}`,
        `📞 *الجوال:* ${phoneVal}`,
        `📦 *الخدمة:* ${serviceName}`,
        pickupInput.value.trim() ? `📍 *موقع الانطلاق:* ${pickupInput.value.trim()}` : null,
        dropoffInput.value.trim() ? `🎯 *موقع الوصول:* ${dropoffInput.value.trim()}` : null,
        dateInput.value ? `📅 *الموعد المقترح:* ${dateInput.value}` : null,
        detailsInput.value.trim() ? `📝 *تفاصيل إضافية:* ${detailsInput.value.trim()}` : null,
        `─────────────────────────`,
        `المصدر: نموذج طلب التسعير في الموقع الإلكتروني`,
      ].filter(Boolean);

      const formattedSummary = lines.join('\n');

      // عرض بطاقة التأكيد المحلية (دون ادعاء إرسال إلى خادم)
      if (quoteFeedback) {
        quoteFeedback.className = 'p-5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 mt-5 block';
        quoteFeedback.innerHTML = `
          <div class="flex items-start gap-3">
            <svg class="w-6 h-6 text-teal-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <p class="font-bold text-base text-teal-950">تم تجهيز ملخص بيانات طلبك بنجاح!</p>
              <p class="text-sm text-teal-800 mt-1">
                تم ترتيب بيانات منقولاتك بالكامل. يمكنك مراجعة الملخص أدناه أو نسخه للتواصل.
              </p>
            </div>
          </div>
        `;
      }

      // عرض مربع الملخص المكتمل
      if (requestSummaryContainer && requestSummaryText) {
        requestSummaryText.value = formattedSummary;
        requestSummaryContainer.classList.remove('hidden');
      }

      // تفعيل زر واتساب فقط في حال توفر رقم معتمد
      if (COMPANY_CONFIG.whatsappNumber) {
        if (whatsappActionContainer && whatsappSendBtn) {
          const encodedMsg = encodeURIComponent(formattedSummary);
          whatsappSendBtn.href = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodedMsg}`;
          whatsappActionContainer.classList.remove('hidden');
        }
      } else {
        if (whatsappActionContainer) {
          whatsappActionContainer.classList.add('hidden');
        }
      }

      // التمرير السلس إلى مربع الملخص
      if (quoteFeedback) {
        quoteFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // نسخ ملخص الطلب إلى الحافظة
  if (copySummaryBtn && requestSummaryText) {
    copySummaryBtn.addEventListener('click', () => {
      const textToCopy = requestSummaryText.value;
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = copySummaryBtn.textContent;
          copySummaryBtn.textContent = 'تم نسخ الملخص بنجاح! ✓';
          copySummaryBtn.classList.add('bg-emerald-700');
          setTimeout(() => {
            copySummaryBtn.textContent = originalText;
            copySummaryBtn.classList.remove('bg-emerald-700');
          }, 3000);
        }).catch(() => {
          requestSummaryText.select();
        });
      } else {
        requestSummaryText.select();
        document.execCommand('copy');
      }
    });
  }

  // ==========================================
  // 6. إدارة عناصر الأسئلة الشائعة (FAQ Accordion)
  // ==========================================
  const faqDetailsList = document.querySelectorAll('details.faq-item');
  faqDetailsList.forEach((details) => {
    details.addEventListener('toggle', () => {
      if (details.open) {
        faqDetailsList.forEach((other) => {
          if (other !== details && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
});
