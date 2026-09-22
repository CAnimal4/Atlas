(() => {
  const track = (eventName, data = {}) => {
    if (typeof window.umami?.track === 'function') window.umami.track(eventName, data);
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.href || '';
    const text = link.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);
    const appMatch = href.match(/https:\/\/([a-z]+)(?:math|spanish|history)\.vercel\.app/);
    if (appMatch) {
      track('app_opened', { app: appMatch[1], location: window.location.pathname });
      track('practice_session_started', { app: appMatch[1], source: 'atlas' });
    } else if (href.includes('tally.so')) {
      track('feedback_or_access_request_clicked', { text, location: window.location.pathname });
    } else if (link.closest('.nav-more-menu')) {
      track('navigation_link_clicked', { text, location: window.location.pathname });
    }
  });

  const releaseBanner = document.getElementById('releaseBanner');
  const releaseBannerClose = document.getElementById('releaseBannerClose');
  const releaseBannerCookie = 'atlas_release_banner_dismissed';
  const hasReleaseBannerCookie = document.cookie.split('; ').some((part) => part.startsWith(`${releaseBannerCookie}=`));
  const dismissReleaseBanner = () => {
    document.documentElement.classList.add('release-banner-dismissed');
    releaseBanner?.remove();
  };
  if (hasReleaseBannerCookie) dismissReleaseBanner();
  releaseBannerClose?.addEventListener('click', () => {
    document.cookie = `${releaseBannerCookie}=1; max-age=31536000; path=/; SameSite=Lax`;
    track('release_banner_dismissed');
    dismissReleaseBanner();
  });

  const notice = new URLSearchParams(window.location.search).get('atlas_notice');
  const messages = {
    feedback_submitted: 'Feedback submitted — thanks for helping improve Atlas.',
    premium_request_submitted: 'Premium request submitted — we’ll get in touch soon.',
    moderator_application_submitted: 'Moderator application submitted — we’ll review it soon.'
  };
  if (messages[notice]) {
    const banner = document.createElement('div');
    banner.className = 'return-notice';
    banner.setAttribute('role', 'status');
    banner.textContent = messages[notice];
    document.querySelector('.shell')?.prepend(banner);
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('atlas_notice');
    window.history.replaceState({}, '', cleanUrl);
  }
  const button = document.getElementById('navMoreButton');
  const menu = document.getElementById('navMoreMenu');
  if (!button || !menu) return;
  const close = () => { menu.hidden = true; button.setAttribute('aria-expanded', 'false'); };
  button.addEventListener('click', () => { menu.hidden = !menu.hidden; button.setAttribute('aria-expanded', String(!menu.hidden)); });
  document.addEventListener('click', (event) => { if (!event.target.closest('.nav-menu-wrap')) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { close(); button.focus(); } });
})();
