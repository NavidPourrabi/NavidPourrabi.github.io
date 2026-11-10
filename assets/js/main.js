// Navid Pourrabi — portfolio
// Kept small on purpose: theme toggle, mobile menu, header border, footer year.
// The only animation (the playhead in the hero) is pure CSS and respects reduced motion.

document.documentElement.classList.add('js');

// Theme: light by default, a visitor's own choice is remembered.
(function () {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('[data-theme-toggle]');
  let theme = 'light';
  try { if (localStorage.getItem('theme') === 'dark') theme = 'dark'; } catch (e) {}

  function apply() {
    root.setAttribute('data-theme', theme);
    buttons.forEach((b) => {
      b.textContent = theme === 'dark' ? '☀' : '☾';
      b.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', theme); } catch (e) {}
      apply();
    })
  );
  apply();
})();

// Mobile menu
(function () {
  const toggle = document.querySelector('[data-nav-toggle]');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-links a').forEach((a) =>
    a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
})();

// Header gets a hairline once the page scrolls
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// On narrow screens the timeline scrolls sideways; start it at "now", not at 2020.
document.querySelectorAll('.edit-scroll').forEach((el) => {
  if (el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth;
});
