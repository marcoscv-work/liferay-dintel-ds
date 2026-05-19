const accordion = fragmentElement.querySelector('.dintel-accordion');
const exclusive = accordion && accordion.dataset.exclusive === 'true';
const triggers = fragmentElement.querySelectorAll('.dintel-accordion__trigger');

triggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const panelId = trigger.getAttribute('aria-controls');
    const panel = fragmentElement.getElementById ? fragmentElement.getElementById(panelId) : document.getElementById(panelId);
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

    if (exclusive && !isExpanded) {
      triggers.forEach(t => {
        const pid = t.getAttribute('aria-controls');
        const p = document.getElementById(pid);
        t.setAttribute('aria-expanded', 'false');
        if (p) p.hidden = true;
      });
    }

    trigger.setAttribute('aria-expanded', String(!isExpanded));
    if (panel) panel.hidden = isExpanded;
  });
});
