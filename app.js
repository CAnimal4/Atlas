(() => {
  const button = document.getElementById('navMoreButton');
  const menu = document.getElementById('navMoreMenu');
  if (!button || !menu) return;
  const close = () => { menu.hidden = true; button.setAttribute('aria-expanded', 'false'); };
  button.addEventListener('click', () => { menu.hidden = !menu.hidden; button.setAttribute('aria-expanded', String(!menu.hidden)); });
  document.addEventListener('click', (event) => { if (!event.target.closest('.nav-menu-wrap')) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { close(); button.focus(); } });
})();
