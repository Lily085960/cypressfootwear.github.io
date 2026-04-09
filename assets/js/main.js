/* ================================================================
   main.js — Cypress Shoes Website
   Interactive behaviors: navbar scroll, mobile menu, animations,
   contact form handling, AI chat widget
   ================================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     1. NAVBAR — add .scrolled class on scroll
     ---------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load


  /* ----------------------------------------------------------------
     2. MOBILE HAMBURGER MENU
     ---------------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate hamburger → X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
      spans[1].style.cssText = 'opacity:0';
      spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => (s.style.cssText = ''));
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => (s.style.cssText = ''));
    });
  });


  /* ----------------------------------------------------------------
     3. SCROLL-TRIGGERED FADE-IN ANIMATIONS
     ---------------------------------------------------------------- */
  const fadeTargets = document.querySelectorAll(
    '.product-card, .why-card, .highlight-item, .gallery-item, ' +
    '.contact-method, .stat, .about-img, .hero-badge, .products-cta'
  );

  fadeTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeTargets.forEach(function (el) {
    observer.observe(el);
  });


  /* ----------------------------------------------------------------
     4. CONTACT FORM — local validation + success state
     (For production: wire to Formspree / EmailJS / Netlify Forms)
     ---------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = contactForm.querySelector('[name="name"]').value.trim();
      const email   = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        showFormError('Please fill in all required fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormError('Please enter a valid email address.');
        return;
      }

      // ----- Simulate form submission (replace with real endpoint) -----
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Fake async delay
      setTimeout(function () {
        const wrap = document.querySelector('.contact-form-wrap');
        wrap.innerHTML = `
          <div class="form-success">
            <div class="success-icon">🎉</div>
            <h3>Inquiry Sent Successfully!</h3>
            <p>Thank you, <strong>${escapeHtml(name)}</strong>! We've received your message and will reply to <strong>${escapeHtml(email)}</strong> within 24 hours.</p>
            <p style="margin-top:14px">Or reach us directly on WhatsApp:<br/>
              <a href="https://wa.me/8615347090384" style="color:#1a56db;font-weight:600">+86 153 4709 0384 (Lily)</a>
            </p>
          </div>`;
      }, 800);
    });
  }

  function showFormError(msg) {
    let existing = document.querySelector('.form-error');
    if (!existing) {
      existing = document.createElement('p');
      existing.className = 'form-error';
      existing.style.cssText = 'color:#ef4444;font-size:.875rem;margin-top:-10px;margin-bottom:12px;';
      const btn = contactForm.querySelector('[type="submit"]');
      contactForm.insertBefore(existing, btn);
    }
    existing.textContent = msg;
    setTimeout(() => existing && existing.remove(), 4000);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }


  /* ----------------------------------------------------------------
     5. AI CHAT WIDGET
     Simple rule-based FAQ chatbot for common buyer questions.
     Can be swapped out for a real AI API call.
     ---------------------------------------------------------------- */
  const aiToggle  = document.getElementById('aiToggle');
  const aiChatBox = document.getElementById('aiChatBox');
  const aiClose   = document.getElementById('aiClose');
  const aiInput   = document.getElementById('aiInput');
  const aiSend    = document.getElementById('aiSend');
  const aiMsgs    = document.getElementById('aiMessages');

  if (aiToggle) {
    aiToggle.addEventListener('click', function () {
      aiChatBox.classList.toggle('open');
      if (aiChatBox.classList.contains('open')) {
        aiInput.focus();
      }
    });
    aiClose.addEventListener('click', function () {
      aiChatBox.classList.remove('open');
    });

    aiSend.addEventListener('click', sendAIMessage);
    aiInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendAIMessage();
      }
    });
  }

  function sendAIMessage() {
    const text = aiInput.value.trim();
    if (!text) return;

    appendMsg(text, 'user');
    aiInput.value = '';

    setTimeout(function () {
      appendMsg(getBotReply(text), 'bot');
    }, 500);
  }

  function appendMsg(text, role) {
    const div = document.createElement('div');
    div.className = 'ai-msg ' + role;
    div.textContent = text;
    aiMsgs.appendChild(div);
    aiMsgs.scrollTop = aiMsgs.scrollHeight;
  }

  /* Simple keyword-matching FAQ engine */
  const FAQ = [
    {
      keys: ['moq', 'minimum', 'order quantity', 'min order'],
      ans: 'Our standard MOQ is 600–800 pairs per style. For premium leather or high-end styles, we can accommodate 300–500 pairs. Feel free to discuss your specific needs with us!'
    },
    {
      keys: ['sample', 'sampling', 'proto'],
      ans: 'Sampling takes 15–20 days after confirmation of design and materials. We can arrange express sampling for urgent projects.'
    },
    {
      keys: ['price', 'cost', 'fob', 'quote', 'quotation'],
      ans: 'Pricing depends on style complexity, materials, and quantity. Please contact Lily directly at lily@tzcypress.com or WhatsApp +86 153 4709 0384 for a detailed quote.'
    },
    {
      keys: ['delivery', 'lead time', 'shipping', 'production time'],
      ans: 'Production lead time is typically 45–60 days after order confirmation and deposit. We ship via sea freight (FOB Ningbo/Shanghai) or air freight.'
    },
    {
      keys: ['oem', 'custom', 'logo', 'brand', 'private label'],
      ans: 'Yes! We offer full OEM/ODM services — custom logo, colors, materials, and packaging. Our development team can work from your designs or help create new styles.'
    },
    {
      keys: ['kids', 'children', 'child'],
      ans: 'Our kids sport shoes are available in EU 25–37 / US 8C–5Y. Lightweight EVA soles, breathable mesh uppers. Great for wholesale and retail brands targeting children\'s footwear.'
    },
    {
      keys: ['men', 'man', 'male', "men's"],
      ans: "Men's sport shoes are available in EU 39–46 / US 6–12. We offer running, casual sport, and lifestyle styles with mesh, knit, or leather uppers."
    },
    {
      keys: ['women', 'woman', 'female', "women's", 'lady', 'ladies'],
      ans: "Women's sport shoes are available in EU 35–41 / US 5–10. Available in knit, mesh, and suede uppers with various sole options."
    },
    {
      keys: ['quality', 'qc', 'inspection', 'aql'],
      ans: 'We have an in-house QC team that follows AQL 4.0 standards. Inspection is done at multiple stages — raw materials, inline, and pre-shipment — to ensure product quality.'
    },
    {
      keys: ['factory', 'production', 'capacity', 'workers'],
      ans: 'We work with 7–8 partner factories with a combined workforce of 45 stitching workers and 65 cementing workers. This gives us strong and stable production capacity.'
    },
    {
      keys: ['contact', 'whatsapp', 'email', 'phone', 'reach', 'lily'],
      ans: 'You can reach Lily directly:\n📞 +86 153 4709 0384 (WhatsApp/Phone)\n✉️ lily@tzcypress.com\nWe typically respond within a few hours during business hours (China time).'
    },
    {
      keys: ['catalog', 'catalogue', 'new styles', 'collection'],
      ans: 'We develop 100+ new styles every season! Please contact us at lily@tzcypress.com to request our latest catalog with current styles and prices.'
    }
  ];

  function getBotReply(input) {
    const lower = input.toLowerCase();
    for (const item of FAQ) {
      if (item.keys.some(k => lower.includes(k))) {
        return item.ans;
      }
    }
    return "Thanks for your question! For detailed answers, please contact Lily directly:\n💬 WhatsApp: +86 153 4709 0384\n✉️ lily@tzcypress.com\nShe'll get back to you quickly!";
  }


  /* ----------------------------------------------------------------
     6. SMOOTH SCROLL for all anchor links
     ---------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });


  /* ----------------------------------------------------------------
     7. ACTIVE NAV LINK on scroll
     ---------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveNav() {
    let current = '';
    sections.forEach(function (sec) {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = '#' + sec.id;
      }
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === current);
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });

})();
