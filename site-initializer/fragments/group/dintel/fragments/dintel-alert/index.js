const closeBtn = fragmentElement.querySelector('.dintel-alert__close');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    const alert = fragmentElement.querySelector('.dintel-alert');
    if (alert) {
      alert.style.display = 'none';
    }
  });
}
