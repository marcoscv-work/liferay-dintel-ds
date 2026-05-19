const tabs = fragmentElement.querySelectorAll('.dintel-tabs__tab');
const panels = fragmentElement.querySelectorAll('.dintel-tabs__panel');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
      t.classList.remove('dintel-tabs__tab--active');
    });
    panels.forEach(p => { p.hidden = true; });

    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.classList.add('dintel-tabs__tab--active');
    if (panels[index]) panels[index].hidden = false;
  });

  tab.addEventListener('keydown', (e) => {
    const isVertical = fragmentElement.querySelector('.dintel-tabs--vertical');
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    const tabsArr = Array.from(tabs);

    if (e.key === nextKey) {
      e.preventDefault();
      const next = tabsArr[(index + 1) % tabsArr.length];
      next.focus();
      next.click();
    } else if (e.key === prevKey) {
      e.preventDefault();
      const prev = tabsArr[(index - 1 + tabsArr.length) % tabsArr.length];
      prev.focus();
      prev.click();
    }
  });
});
