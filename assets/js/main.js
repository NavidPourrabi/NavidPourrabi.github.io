// ==========================================================================
// Theme toggle (light / dark) — persisted in memory only for this session,
// respects the visitor's OS preference on first load.
// ==========================================================================
(function initTheme() {
  const root = document.documentElement;
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = prefersDark ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateToggleIcons(theme);

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
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
// Mobile nav toggle
// ==========================================================================
(function initNav() {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const body = document.body;

  if (!navToggle) return;

  navToggle.addEventListener('click', () => {
    body.classList.toggle('nav-open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => body.classList.remove('nav-open'));
  });
})();

// ==========================================================================
// Scroll reveal — fades/slides elements in as they enter the viewport.
// ==========================================================================
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    // No JS-driven animation support — leave elements in their default,
    // fully-visible state (see .reveal vs .reveal-init in style.css).
    return;
  }

  // Opt into the hidden starting state only once we know JS + IntersectionObserver
  // both work, so content never gets stuck invisible.
  items.forEach((el) => el.classList.add('reveal-init'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => observer.observe(el));

  // Safety net: if anything is somehow still hidden after load (e.g. a
  // layout edge case), reveal it rather than leave it permanently blank.
  window.addEventListener('load', () => {
    setTimeout(() => {
      items.forEach((el) => el.classList.add('is-visible'));
    }, 2000);
  });
})();

// ==========================================================================
// Active nav link highlighting based on current page
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
  const el = document.querySelector('[data-year]');
  if (el) el.textContent = new Date().getFullYear();
})();
