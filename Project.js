document.addEventListener("DOMContentLoaded", () => {
    const rootHTML = document.documentElement;
    const themeToggleBtn = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const modal = document.getElementById("project-modal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const launchButtons = document.querySelectorAll(".btn-launch");

    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);

    // Theme Toggle Handler
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = rootHTML.classList.contains("light-mode") ? "light" : "dark";
            const newTheme = currentTheme === "light" ? "dark" : "light";
            applyTheme(newTheme);
        });
    }

    function applyTheme(theme) {
        if (theme === "light") {
            rootHTML.classList.add("light-mode");
            localStorage.setItem("theme", "light");
            updateThemeIcon("moon");
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute("aria-label", "Switch to dark mode");
                themeToggleBtn.setAttribute("title", "Switch to dark mode");
            }
        } else {
            rootHTML.classList.remove("light-mode");
            localStorage.setItem("theme", "dark");
            updateThemeIcon("sun");
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute("aria-label", "Switch to light mode");
                themeToggleBtn.setAttribute("title", "Switch to light mode");
            }
        }
    }

    function updateThemeIcon(iconName) {
        if (!themeIcon) return;
        themeIcon.setAttribute("data-lucide", iconName);
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    // Modal Events
    launchButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const url = button.getAttribute("data-url");
            if (url) openModal(url);
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal();
        });
    }

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModal();
    });
});

function openModal(url) {
    const modal = document.getElementById("project-modal");
    const iframe = document.getElementById("project-frame");
    if (!modal || !iframe) return;

    iframe.src = url;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("project-modal");
    const iframe = document.getElementById("project-frame");
    if (!modal || !iframe) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    iframe.src = "about:blank";
    document.body.style.overflow = "";
}