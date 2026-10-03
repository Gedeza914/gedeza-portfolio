// --- 1. Typing Animation (Fixed Last-Letter Render Bug) ---
const textElement = document.getElementById("animated-text");
if (textElement) {
  const phrases = ["SFUNDO MNYANDU"];
  let phraseIdx = 0, charIdx = 0;

  function type() {
    const current = phrases[phraseIdx];
    textElement.textContent = current.substring(0, charIdx);

    if (charIdx < current.length) {
      charIdx++;
      setTimeout(type, 120);
    }
  }
  type();
}

// --- 2. Theme Toggle & Dynamic Lucide Icons ---
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') {
    htmlElement.classList.add('dark');
    themeIcon?.setAttribute('data-lucide', 'sun');
  } else {
    htmlElement.classList.remove('dark');
    themeIcon?.setAttribute('data-lucide', 'moon');
  }
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  localStorage.setItem('theme', theme);
}

// Initialize Theme
const savedTheme = localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggleBtn?.addEventListener('click', () => {
  const isDark = htmlElement.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

// --- 3. Intersection Observer for Scroll Reveals ---
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- 4. Unified & Safe Project Modal Controller ---
const modal = document.getElementById("project-modal");
const frame = document.getElementById("project-frame");
const closeModalBtn = document.querySelector(".close-modal");

function openModal(url) {
  if (!modal) return;
  if (frame && url) frame.src = url;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.style.display = 'none';
  if (frame) frame.src = '';
  document.body.style.overflow = 'auto';
}

// Attach Project Card Click Events
document.querySelectorAll(".projected").forEach(card => {
  card.addEventListener('click', () => {
    const targetUrl = card.getAttribute("data-url");
    if (targetUrl) openModal(targetUrl);
  });
});

// Close Modal Binding Handlers
closeModalBtn?.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});