// Contact.html behaviour (theme toggle + icons live in theme.js)
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusDiv = document.getElementById('status');
  if (!contactForm || !submitBtn || !statusDiv) return;

  const sendLabel = submitBtn.innerHTML;

  function showStatus(type, iconClass, message) {
    statusDiv.className = 'form-status ' + type;
    statusDiv.replaceChildren();
    const icon = document.createElement('i');
    icon.className = iconClass;
    statusDiv.append(icon, ' ', message); // textContent-safe: server messages are never parsed as HTML
    statusDiv.style.display = 'block';
  }

  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';
    statusDiv.style.display = 'none';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        showStatus('success', 'fas fa-check-circle', 'Message dispatched successfully! I will respond shortly.');
        contactForm.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        const detail = Array.isArray(data.errors) ? data.errors.map(err => err.message).join(', ') : '';
        showStatus('error', 'fas fa-exclamation-triangle',
          detail || 'Transmission failed. Please try again or use direct email.');
      }
    } catch (error) {
      showStatus('error', 'fas fa-exclamation-triangle', 'Network error. Please verify your connection and retry.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = sendLabel;
    }
  });
});
