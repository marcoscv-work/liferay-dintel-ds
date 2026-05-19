const toggle = fragmentElement.querySelector('.dintel-header-of__mobile-toggle');
const nav = fragmentElement.querySelector('.dintel-header-of__nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}
