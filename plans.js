(() => {
  const params = new URLSearchParams(window.location.search);
  const appName = ({ atlas: 'Atlas', claro: 'Claro', vertex: 'Vertex', meridian: 'Meridian' })[params.get('app_name')] || params.get('app_name') || 'Atlas';
  const source = params.get('source') || 'atlas_plans';
  const fallbackReturn = new URL(window.location.href);
  fallbackReturn.searchParams.set('atlas_notice', 'premium_request_submitted');
  const returnTo = params.get('return_to') || fallbackReturn.toString();

  const formUrl = (base, plan, notice) => {
    const url = new URL(base);
    url.searchParams.set('form_type', plan === 'moderator' ? 'moderator_application' : 'premium_access_request');
    url.searchParams.set('app_name', appName);
    url.searchParams.set('plan', plan);
    url.searchParams.set('source', source);
    url.searchParams.set('page_url', returnTo.replace('premium_request_submitted', notice));
    return url.toString();
  };

  document.querySelector('[data-plan="premium"]')?.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.assign(formUrl('https://tally.so/r/OD68ap', 'premium', 'premium_request_submitted'));
  });
  document.querySelector('[data-plan="moderator"]')?.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.assign(formUrl('https://tally.so/r/EkpBb2', 'moderator', 'moderator_application_submitted'));
  });
})();
