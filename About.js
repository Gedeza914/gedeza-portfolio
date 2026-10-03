 // Initialize Lucide Icons
    lucide.createIcons();

    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    function setTheme(theme) {
      if (theme === 'dark') {
        htmlElement.classList.add('dark');
        themeIcon.setAttribute('data-lucide', 'sun');
      } else {
        htmlElement.classList.remove('dark');
        themeIcon.setAttribute('data-lucide', 'moon');
      }
      lucide.createIcons();
      localStorage.setItem('theme', theme);
    }

    // Check saved theme or preference
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlElement.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark');
    });

    // Scroll Reveal Observer
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

    // Modal Handling
    const modalBackdrop = document.getElementById('modalBackdrop');

    function openModal(projectId) {
      modalBackdrop.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalBackdrop.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // Close modal on outside click
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });