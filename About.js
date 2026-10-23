// About.html behaviour (theme toggle + icons live in theme.js)

// Scroll reveals
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Project detail modal
const modalBackdrop = document.getElementById('modalBackdrop');

function openModal() {
  if (!modalBackdrop) return;
  modalBackdrop.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalBackdrop) return;
  modalBackdrop.style.display = 'none';
  document.body.style.overflow = '';
}

modalBackdrop?.addEventListener('click', e => {
  if (e.target === modalBackdrop) closeModal();
});
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
