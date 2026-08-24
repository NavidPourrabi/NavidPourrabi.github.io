// ==========================================================================
// Navid Pourrabi — portfolio behaviour
// Light is the default theme for everyone; the OS preference is deliberately
// ignored on a first visit. A visitor's explicit choice is remembered.
// ==========================================================================

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==========================================================================
// Theme toggle
// ==========================================================================
(function initTheme() {
  const root = document.documentElement;
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

  function readStored() {
    try {
      return localStorage.getItem('theme');
    } catch (err) {
      // Private mode / blocked storage — fall back to session-only behaviour.
      return null;
    }
  }

  function store(value) {
    try {
      localStorage.setItem('theme', value);
    } catch (err) {
      /* non-fatal */
    }
  }

  let theme = readStored() === 'dark' ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateToggleIcons(theme);

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      store(theme);
      updateToggleIcons(theme);
    });
  });

  function updateToggleIcons(current) {
    toggleButtons.forEach((btn) => {
      btn.setAttribute('aria-label', current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.textContent = current === 'dark' ? '☀' : '☾';
    });
  }
})();

// ==========================================================================
// Hero headline — slide each line up once the fonts have settled
// ==========================================================================
(function initHero() {
  const run = () => document.body.classList.add('is-loaded');
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(run);
    // Never let a font that fails to load leave the headline hidden.
    setTimeout(run, 1200);
  } else {
    run();
  }
})();

// ==========================================================================
// Mobile nav
// ==========================================================================
(function initNav() {
  const navToggle = document.querySelector('[data-nav-toggle]');
  if (!navToggle) return;

  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => document.body.classList.remove('nav-open'));
  });
})();

// ==========================================================================
// Scroll reveal, staggered within each group
// ==========================================================================
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length || REDUCED || !('IntersectionObserver' in window)) return;

  items.forEach((el) => el.classList.add('reveal-init'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Stagger siblings that enter together, capped so a long list
        // never leaves the last item waiting a noticeable amount of time.
        const siblings = [...entry.target.parentElement.children].filter((el) =>
          el.classList.contains('reveal')
        );
        const index = siblings.indexOf(entry.target);
        entry.target.style.setProperty('--reveal-delay', Math.min(index, 5) * 80 + 'ms');

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  items.forEach((el) => observer.observe(el));

  // Safety net: never leave content permanently invisible.
  window.addEventListener('load', () => {
    setTimeout(() => items.forEach((el) => el.classList.add('is-visible')), 2500);
  });
})();

// ==========================================================================
// Counters — numbers count up the first time they're seen
// ==========================================================================
(function initCounters() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length || REDUCED || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  nums.forEach((el) => observer.observe(el));

  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (!isFinite(target)) return;

    const duration = 1100;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }
})();

// ==========================================================================
// Magnetic buttons — the button leans toward the cursor
// ==========================================================================
(function initMagnetic() {
  if (REDUCED || window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
    });

    const reset = () => { btn.style.transform = ''; };
    btn.addEventListener('pointerleave', reset);
    btn.addEventListener('blur', reset);
  });
})();

// ==========================================================================
// Parallax — elements drift gently against the scroll
// ==========================================================================
(function initParallax() {
  const items = document.querySelectorAll('[data-parallax]');
  if (!items.length || REDUCED) return;

  let ticking = false;

  function update() {
    const viewportH = window.innerHeight;

    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewportH) return;

      const speed = parseFloat(el.dataset.parallax) || 0.08;
      // -1 → element entering from below, 1 → leaving at the top
      const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
      el.style.transform = `translate3d(0, ${progress * speed * -100}px, 0)`;
    });

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );

  update();
})();

// ==========================================================================
// Marquee — duplicate the track so the loop has no visible seam
// ==========================================================================
(function initMarquee() {
  document.querySelectorAll('.marquee').forEach((marquee) => {
    const track = marquee.querySelector('.marquee-track');
    if (!track) return;
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    marquee.appendChild(clone);
  });
})();

// ==========================================================================
// Active nav link
// ==========================================================================
(function highlightActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ==========================================================================
// Footer year
// ==========================================================================
(function setYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
