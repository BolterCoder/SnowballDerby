export const siteName = 'Snowball Derby Archive';
export const siteDescription =
  'Snowball Derby history, driver profiles, records, and Five Flags Speedway context in a connected archival app.';
export const defaultSocialImage = '/images/Turn 1 Shot.jpg';
export const siteLanguage = 'en-US';

export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL?.trim();

  if (configured) {
    return configured.replace(/\/+$/g, '');
  }

  return window.location.origin.replace(/\/+$/g, '');
}

export function buildSiteUrl(path = '/') {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function getOrganizationId() {
  return `${buildSiteUrl('/') }#organization`;
}

export function getWebsiteId() {
  return `${buildSiteUrl('/') }#website`;
}
