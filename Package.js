// Package.html behaviour (theme toggle + icons live in theme.js)
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabSections = document.querySelectorAll('.tab-section');

  function activateTab(button) {
    const targetId = button.dataset.target;

    tabButtons.forEach(btn => {
      const isActive = btn === button;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
      btn.tabIndex = isActive ? 0 : -1;
    });

    tabSections.forEach(section => {
      section.classList.toggle('active', section.id === targetId);
    });
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(button));

    // Arrow-key navigation between tabs (standard tablist behaviour)
    button.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const step = e.key === 'ArrowRight' ? 1 : -1;
      const next = tabButtons[(index + step + tabButtons.length) % tabButtons.length];
      next.focus();
      activateTab(next);
    });
  });
});
