// Project.html behaviour (theme toggle + icons live in theme.js)
const modal = document.getElementById('project-modal');
const frame = document.getElementById('project-frame');

function openModal(url) {
  if (!modal || !frame) return;
  frame.src = url;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal || !frame) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  frame.src = 'about:blank';
  document.body.style.overflow = '';
}

document.querySelectorAll('.btn-launch').forEach(button => {
  button.addEventListener('click', () => {
    const url = button.getAttribute('data-url');
    if (url) openModal(url);
  });
});

document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
