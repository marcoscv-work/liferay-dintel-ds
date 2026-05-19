const trigger = fragmentElement.querySelector('.dintel-search__trigger');
const dialog = fragmentElement.querySelector('.dintel-search__dialog');

if (trigger && dialog) {
  const input = dialog.querySelector('.dintel-search__input');
  const closers = dialog.querySelectorAll('[data-search-close]');

  const open = () => {
    dialog.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (input) setTimeout(() => input.focus(), 50);
  };

  const close = () => {
    dialog.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    trigger.focus();
  };

  trigger.addEventListener('click', open);
  closers.forEach((el) => el.addEventListener('click', close));
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
