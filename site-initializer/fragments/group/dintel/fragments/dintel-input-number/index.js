const field = fragmentElement.querySelector('.dintel-input-number__field');
const btns = fragmentElement.querySelectorAll('.dintel-input-number__btn');

if (field) {
  const step = Number(field.step) || 1;
  const min = field.hasAttribute('min') ? Number(field.min) : -Infinity;
  const max = field.hasAttribute('max') ? Number(field.max) : Infinity;

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = Number(field.value) || 0;
      const next = btn.dataset.action === 'increment' ? current + step : current - step;
      field.value = Math.max(min, Math.min(max, next));
      field.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
}
