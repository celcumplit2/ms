(() => {
  const searchForms = document.querySelectorAll('.tag-cloud-module-scss-module__h48nIa__form');
  searchForms.forEach((form) => {
    const input = form.querySelector('input[name="search"]');
    const list = form.parentElement?.querySelector('.tag-cloud-module-scss-module__h48nIa__list');
    if (!input || !list) return;
    const items = Array.from(list.querySelectorAll('li'));
    const sync = () => {
      const query = input.value.trim().toLowerCase();
      items.forEach((item) => {
        const haystack = (item.textContent || '').toLowerCase();
        const match = query.length === 0 || haystack.includes(query);
        item.hidden = false;
        item.style.display = match ? '' : 'none';
        item.setAttribute('aria-hidden', match ? 'false' : 'true');
      });
    };
    input.addEventListener('input', sync);
    sync();
  });
})();
