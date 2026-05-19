const opener = fragmentElement.querySelector('[data-modal-open]');
const modal = fragmentElement.querySelector('.dintel-modal');
const closers = fragmentElement.querySelectorAll('[data-modal-close]');
const confirmBtn = fragmentElement.querySelector('[data-modal-confirm]');

if (modal) {
  let lastFocus = null;

  const open = () => {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.dintel-modal__close');
    const firstBtn = modal.querySelector('.dintel-modal__btn');
    (closeBtn || firstBtn)?.focus();
  };

  const close = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };

  opener?.addEventListener('click', open);
  closers.forEach((el) => el.addEventListener('click', close));
  confirmBtn?.addEventListener('click', close);

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
