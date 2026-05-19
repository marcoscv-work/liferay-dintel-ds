const notification = fragmentElement.querySelector('.dintel-notification');
const closeBtn = fragmentElement.querySelector('[data-notif-close]');

if (notification) {
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      notification.style.display = 'none';
    });
  }
  if (notification.dataset.autoDismiss === 'true') {
    setTimeout(() => { notification.style.display = 'none'; }, 5000);
  }
}
