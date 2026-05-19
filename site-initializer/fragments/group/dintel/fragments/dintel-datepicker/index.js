const field = fragmentElement.querySelector('.dintel-datepicker__field');
const icon = fragmentElement.querySelector('.dintel-datepicker__icon');

if (field && icon) {
  icon.style.pointerEvents = 'auto';
  icon.style.cursor = 'pointer';
  icon.addEventListener('click', () => {
    if (typeof field.showPicker === 'function') {
      try { field.showPicker(); } catch (e) { field.focus(); }
    } else {
      field.focus();
    }
  });
}
