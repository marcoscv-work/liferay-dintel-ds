const mobileMenuBtn = fragmentElement.querySelector('.dintel-header__mobile-menu');
const nav = fragmentElement.querySelector('.dintel-header__nav');

if (mobileMenuBtn && nav) {
  mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
    nav.style.display = isExpanded ? 'none' : 'block';
  });
}
