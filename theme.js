/* ==========================================================================
   Shared theme controller (loaded in <head> on every page)
   - One localStorage key ("theme": "light" | "dark") for the whole site
   - Sets BOTH classes the stylesheets rely on:
       html.dark        -> index.css, About.css
       html.light-mode  -> Contact.css, Package.css, Project.css
   - Toggle icon always shows the mode you will SWITCH TO (sun in dark, moon in light)
   ========================================================================== */
(function () {
  var root = document.documentElement;

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) { /* storage blocked */ }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyClasses(theme) {
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light-mode', theme === 'light');
  }

  function renderToggle(theme) {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    var next = theme === 'dark' ? 'light' : 'dark';
    btn.innerHTML = '<i data-lucide="' + (theme === 'dark' ? 'sun' : 'moon') + '"></i>';
    btn.setAttribute('aria-label', 'Switch to ' + next + ' mode');
    btn.setAttribute('title', 'Switch to ' + next + ' mode');
    if (window.lucide) window.lucide.createIcons();
  }

  function setTheme(theme) {
    applyClasses(theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
    renderToggle(theme);
  }

  // Apply immediately (before first paint) to avoid a flash of the wrong theme
  applyClasses(getSavedTheme());

  document.addEventListener('DOMContentLoaded', function () {
    var theme = getSavedTheme();
    renderToggle(theme); // also creates every other Lucide icon on the page

    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        setTheme(root.classList.contains('dark') ? 'light' : 'dark');
      });
    }
  });
})();

/* ==========================================================================
   Mobile navigation menu (button injected next to the theme toggle)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelector('.nav-links');
  var controls = document.querySelector('.nav-controls');
  if (!links || !controls) return;

  var MENU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label', 'Open menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = MENU;
  controls.insertBefore(btn, controls.firstChild);

  function setOpen(open) {
    links.classList.toggle('open', open);
    btn.innerHTML = open ? CLOSE : MENU;
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', function () { setOpen(!links.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) { if (e.matches) setOpen(false); });
});
