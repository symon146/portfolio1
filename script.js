// =========================================================
// INTERACTIVE FEATURE: Dark / Light mode toggle
// Remembers the visitor's choice using localStorage.
// =========================================================
(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn.querySelector('.theme-icon');

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      icon.textContent = '☀️';
      toggleBtn.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      icon.textContent = '🌙';
      toggleBtn.setAttribute('aria-pressed', 'false');
    }
  }

  // On load: use saved preference, otherwise fall back to the
  // visitor's OS-level preference.
  const saved = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  toggleBtn.addEventListener('click', function () {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });
})();

// =========================================================
// Reveal each "My IT Journey" timeline step as the visitor
// scrolls to it, so the story unfolds year by year.
// =========================================================
(function () {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length || !('IntersectionObserver' in window)) return;

  // Only now do we opt items into the hidden starting state — so if this
  // script never runs (or errors out), the timeline stays fully visible.
  items.forEach((item) => item.classList.add('pre-reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));
})();
