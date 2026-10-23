
/* ==========================================
   ABOUT.JS
   SM Gedeza Dev - About Page
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       1. INITIALIZE LUCIDE ICONS
       ====================================== */

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    /* ======================================
       2. AUTOMATIC FOOTER COPYRIGHT YEAR
       ====================================== */

    const yearElement = document.getElementById("footer-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* ======================================
       3. SCROLL REVEAL ANIMATIONS
       ====================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        document.querySelectorAll(".reveal").forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        // Display reveal elements on browsers without IntersectionObserver.
        document.querySelectorAll(".reveal").forEach((element) => {
            element.classList.add("visible");
        });

    }

    /* ======================================
       4. PROJECT DETAIL MODAL
       ====================================== */

    const modalBackdrop = document.getElementById("modalBackdrop");

    if (modalBackdrop) {

        // Close the modal when clicking outside its content.
        modalBackdrop.addEventListener("click", (event) => {

            if (event.target === modalBackdrop) {
                closeModal();
            }

        });

    }

    /* ======================================
       5. KEYBOARD SUPPORT
       ====================================== */

    window.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeModal();
        }

    });

});


/* ==========================================
   6. OPEN PROJECT MODAL
   ========================================== */

function openModal() {

    const modalBackdrop = document.getElementById("modalBackdrop");

    if (!modalBackdrop) {
        return;
    }

    modalBackdrop.style.display = "flex";
    modalBackdrop.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


/* ==========================================
   7. CLOSE PROJECT MODAL
   ========================================== */

function closeModal() {

    const modalBackdrop = document.getElementById("modalBackdrop");

    if (!modalBackdrop) {
        return;
    }

    modalBackdrop.style.display = "none";
    modalBackdrop.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


/* ==========================================
   8. MAKE MODAL FUNCTIONS AVAILABLE TO HTML
   ========================================== */

// Allows HTML buttons using onclick="openModal()"
// and onclick="closeModal()" to call these functions.

window.openModal = openModal;
window.closeModal = closeModal;
