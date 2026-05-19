const trigger = fragmentElement.querySelector('.dintel-dropdown__trigger');
const menu = fragmentElement.querySelector('.dintel-dropdown__menu');

if (trigger && menu) {
  const close = () => {
    trigger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  };

  const open = () => {
    trigger.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    const first = menu.querySelector('.dintel-dropdown__item');
    if (first) first.focus();
  };

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) close(); else open();
  });

  document.addEventListener('click', (e) => {
    if (!fragmentElement.contains(e.target)) close();
  });

  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { close(); trigger.focus(); }
  });
}
