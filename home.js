(() => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#nav');
  if (menu && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    };
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
        menu.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
    });
    window.addEventListener('pageshow', closeMenu);
    matchMedia('(max-width: 1000px)').addEventListener('change', closeMenu);
  }
  const service = document.querySelector('#enquiry-service');
  const choices = {
    'it-support': 'IT support',
    wifi: 'Networks & WiFi',
    cameras: 'Networks & WiFi',
    automation: 'AI automation',
    'ai-phone': 'AI phone agents',
    other: 'Other'
  };
  const requested = choices[new URLSearchParams(location.search).get('service')];
  if (service && requested) service.value = requested;
})();
