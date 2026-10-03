document.addEventListener('DOMContentLoaded', () => {
            // Initialize Lucide Icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Theme Management System
            const themeToggleBtn = document.getElementById('themeToggle');
            const htmlElement = document.documentElement;

            function setTheme(theme) {
                if (theme === 'light') {
                    htmlElement.classList.add('light-mode');
                    htmlElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                    updateThemeIcon('sun');
                } else {
                    htmlElement.classList.remove('light-mode');
                    htmlElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                    updateThemeIcon('moon');
                }
            }

            function updateThemeIcon(iconName) {
                const iconContainer = document.getElementById('themeToggle');
                iconContainer.innerHTML = `<i data-lucide="${iconName}"></i>`;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }

            const savedTheme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            setTheme(savedTheme);

            themeToggleBtn.addEventListener('click', () => {
                const isLight = htmlElement.classList.contains('light-mode');
                setTheme(isLight ? 'dark' : 'light');
            });

            // Asynchronous AJAX Formspree Dispatcher
            const contactForm = document.getElementById('contactForm');
            const submitBtn = document.getElementById('submitBtn');
            const statusDiv = document.getElementById('status');

            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Transmitting...`;
                statusDiv.className = 'form-status';
                statusDiv.style.display = 'none';

                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        statusDiv.className = 'form-status success';
                        statusDiv.innerHTML = `<i class="fas fa-check-circle"></i> Message dispatched successfully! I will respond shortly.`;
                        contactForm.reset();
                    } else {
                        const data = await response.json();
                        statusDiv.className = 'form-status error';
                        if (Object.hasOwn(data, 'errors')) {
                            statusDiv.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            statusDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Transmission failed. Please try again or use direct email.`;
                        }
                    }
                } catch (error) {
                    statusDiv.className = 'form-status error';
                    statusDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Network error. Please verify connection and retry.`;
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Send Message`;
                    statusDiv.style.display = 'block';
                }
            });
        });