// index.html behaviour (theme toggle lives in theme.js)

// --- 1. Typing animation ---
const textElement = document.getElementById('animated-text');
if (textElement) {
  const text = 'SFUNDO MNYANDU';
  let charIdx = 0;

  (function type() {
    charIdx++;
    textElement.textContent = text.substring(0, charIdx);
    if (charIdx < text.length) setTimeout(type, 120);
  })();
}

// --- 2. Scroll reveals ---
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- 3. Project modal ---
const modal = document.getElementById('project-modal');
const frame = document.getElementById('project-frame');
const closeModalBtn = document.querySelector('.close-modal');

function openModal(url) {
  if (!modal) return;
  if (frame && url) frame.src = url;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.style.display = 'none';
  if (frame) frame.src = 'about:blank';
  document.body.style.overflow = '';
}

document.querySelectorAll('.projected').forEach(card => {
  card.addEventListener('click', () => {
    const targetUrl = card.getAttribute('data-url');
    if (targetUrl) openModal(targetUrl);
  });
});

closeModalBtn?.addEventListener('click', closeModal);
window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
