const field = fragmentElement.querySelector('.dintel-textarea__field');
const counter = fragmentElement.querySelector('.dintel-textarea__counter-current');

if (field && counter) {
  const update = () => { counter.textContent = String(field.value.length); };
  field.addEventListener('input', update);
  update();
}
