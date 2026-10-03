
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize Lucide Icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Theme Management
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

            // Initialize Theme Preference
            const savedTheme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            setTheme(savedTheme);

            themeToggleBtn.addEventListener('click', () => {
                const isLight = htmlElement.classList.contains('light-mode');
                setTheme(isLight ? 'dark' : 'light');
            });

            // Accessible Tab Management System
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabSections = document.querySelectorAll('.tab-section');

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetId = button.dataset.target;

                    // Update Tab Buttons State
                    tabButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-selected', 'false');
                    });
                    button.classList.add('active');
                    button.setAttribute('aria-selected', 'true');

                    // Update Panels
                    tabSections.forEach(section => {
                        if (section.id === targetId) {
                            section.classList.add('active');
                        } else {
                            section.classList.remove('active');
                        }
                    });
                });
            });
        });
    