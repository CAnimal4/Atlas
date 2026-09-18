(() => {
  const params = new URLSearchParams(window.location.search);
  const appKey = ['claro', 'vertex', 'meridian'].includes(params.get('app_name')) ? params.get('app_name') : '';
  const appNames = { claro: 'Claro', vertex: 'Vertex', meridian: 'Meridian' };
  const source = params.get('source') || 'atlas_plans';
  const fallbackReturn = new URL(window.location.href);
  fallbackReturn.searchParams.set('atlas_notice', 'premium_request_submitted');
  const returnTo = params.get('return_to') || fallbackReturn.toString();

  const target = document.getElementById('appTarget');
  if (target && appKey) target.value = appKey;

  const selectedApp = () => target?.value || '';
  const showTargetError = () => {
    if (!target) return;
    target.focus();
    target.setCustomValidity('Choose the app this request is for.');
    target.reportValidity();
    window.setTimeout(() => target.setCustomValidity(''), 1500);
  };

  const formUrl = (base, plan, notice) => {
    const selected = selectedApp();
    if (!selected) { showTargetError(); return ''; }
    const url = new URL(base);
    url.searchParams.set('form_type', plan === 'moderator' ? 'moderator_application' : 'premium_access_request');
    url.searchParams.set('app_name', appNames[selected]);
    url.searchParams.set('plan', plan);
    url.searchParams.set('source', source);
    url.searchParams.set('page_url', returnTo.replace('premium_request_submitted', notice));
    return url.toString();
  };

  document.querySelector('[data-plan="premium"]')?.addEventListener('click', (event) => {
    event.preventDefault();
    const url = formUrl('https://tally.so/r/OD68ap', 'premium', 'premium_request_submitted');
    if (url) window.location.assign(url);
  });
  document.querySelector('[data-plan="moderator"]')?.addEventListener('click', (event) => {
    event.preventDefault();
    const url = formUrl('https://tally.so/r/EkpBb2', 'moderator', 'moderator_application_submitted');
    if (url) window.location.assign(url);
  });
})();
