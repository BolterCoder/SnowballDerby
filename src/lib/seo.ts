import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultSocialImage, getOrganizationId, getWebsiteId, buildSiteUrl, siteDescription, siteLanguage, siteName } from './site';

type StructuredData = Record<string, unknown>;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface PageMetadataInput {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  robots?: string;
  keywords?: string[];
  breadcrumbs?: BreadcrumbItem[];
  schema?: StructuredData | StructuredData[];
}

function ensureMetaTag(selector: string, attribute: 'name' | 'property', value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  return element;
}

function setMeta(attribute: 'name' | 'property', value: string, content: string) {
  const selector = `meta[${attribute}="${value}"]`;
  const element = ensureMetaTag(selector, attribute, value);
  element.setAttribute('content', content);
}

function removeMeta(attribute: 'name' | 'property', value: string) {
  document.head.querySelector(`meta[${attribute}="${value}"]`)?.remove();
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', url);
}

function withContext(schema: StructuredData) {
  if (schema['@context']) {
    return schema;
  }

  return {
    '@context': 'https://schema.org',
    ...schema,
  };
}

function withoutContext(schema: StructuredData) {
  const { ['@context']: _context, ...rest } = schema;
  return rest;
}

function setStructuredData(id: string, schema?: StructuredData) {
  const selector = `script[data-structured-data="${id}"]`;
  let element = document.head.querySelector<HTMLScriptElement>(selector);

  if (!schema) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.dataset.structuredData = id;
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema);
}

function normalizeSchema(schema?: StructuredData | StructuredData[], breadcrumbs?: BreadcrumbItem[]) {
  const entries = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  const withBreadcrumbs = breadcrumbs?.length
    ? [...entries, createBreadcrumbSchema(breadcrumbs)]
    : entries;

  if (!withBreadcrumbs.length) {
    return undefined;
  }

  if (withBreadcrumbs.length === 1) {
    return withContext(withBreadcrumbs[0]);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': withBreadcrumbs.map((entry) => withoutContext(withContext(entry))),
  };
}

export function buildAbsoluteUrl(path: string) {
  return buildSiteUrl(path);
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]): StructuredData {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}

export function createOrganizationSchema(): StructuredData {
  return {
    '@type': 'SportsOrganization',
    '@id': getOrganizationId(),
    name: siteName,
    url: buildAbsoluteUrl('/'),
    description: siteDescription,
    sport: 'Auto racing',
    areaServed: 'US',
    knowsAbout: ['Snowball Derby', 'Five Flags Speedway', 'Late model racing', 'Short track racing'],
  };
}

export function createWebSiteSchema(): StructuredData {
  return {
    '@type': 'WebSite',
    '@id': getWebsiteId(),
    name: siteName,
    url: buildAbsoluteUrl('/'),
    description: siteDescription,
    inLanguage: siteLanguage,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${buildAbsoluteUrl('/races')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

interface WebPageSchemaInput {
  name: string;
  description: string;
  path: string;
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage';
  image?: string;
  keywords?: string[];
  about?: StructuredData | StructuredData[];
  mainEntity?: StructuredData;
}

export function createWebPageSchema({
  name,
  description,
  path,
  type = 'WebPage',
  image,
  keywords,
  about,
  mainEntity,
}: WebPageSchemaInput): StructuredData {
  return {
    '@type': type,
    name,
    description,
    url: buildAbsoluteUrl(path),
    isPartOf: { '@id': getWebsiteId() },
    about,
    image: image ? buildAbsoluteUrl(image) : undefined,
    keywords: keywords?.join(', '),
    mainEntity,
  };
}

interface ArticleSchemaInput {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  keywords?: string[];
  about?: StructuredData | StructuredData[];
  mainEntity?: StructuredData;
}

export function createArticleSchema({
  headline,
  description,
  path,
  image,
  datePublished,
  keywords,
  about,
  mainEntity,
}: ArticleSchemaInput): StructuredData {
  return {
    '@type': 'Article',
    headline,
    description,
    url: buildAbsoluteUrl(path),
    mainEntityOfPage: buildAbsoluteUrl(path),
    image: image ? [buildAbsoluteUrl(image)] : undefined,
    datePublished,
    author: { '@id': getOrganizationId() },
    publisher: { '@id': getOrganizationId() },
    isPartOf: { '@id': getWebsiteId() },
    about,
    keywords: keywords?.join(', '),
    mainEntity,
  };
}

interface ProfileSchemaInput {
  name: string;
  description: string;
  path: string;
  image?: string;
  person: StructuredData;
}

export function createProfilePageSchema({ name, description, path, image, person }: ProfileSchemaInput): StructuredData {
  return {
    '@type': 'ProfilePage',
    name,
    description,
    url: buildAbsoluteUrl(path),
    mainEntity: {
      '@type': 'Person',
      ...person,
      image: image ? buildAbsoluteUrl(image) : person.image,
      mainEntityOfPage: buildAbsoluteUrl(path),
    },
    isPartOf: { '@id': getWebsiteId() },
  };
}

export function createItemList(items: Array<{ name: string; path: string }>) {
  return {
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: buildAbsoluteUrl(item.path),
    })),
  };
}

export function createFAQSchema(items: Array<{ question: string; answer: string }>): StructuredData {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function useStructuredData(id: string, schema?: StructuredData | StructuredData[]) {
  const normalized = normalizeSchema(schema);

  useEffect(() => {
    setStructuredData(id, normalized);

    return () => {
      setStructuredData(id);
    };
  }, [id, normalized ? JSON.stringify(normalized) : '']);
}

export function usePageMetadata({
  title,
  description = siteDescription,
  image = defaultSocialImage,
  type = 'website',
  robots = 'index,follow',
  keywords,
  breadcrumbs,
  schema,
}: PageMetadataInput) {
  const location = useLocation();

  useEffect(() => {
    const resolvedTitle = `${title} | ${siteName}`;
    const canonicalUrl = buildAbsoluteUrl(`${location.pathname}${location.search}`);
    const imageUrl = buildAbsoluteUrl(image);
    const normalizedSchema = normalizeSchema(schema, breadcrumbs);

    document.title = resolvedTitle;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    setMeta('name', 'application-name', siteName);
    setMeta('name', 'theme-color', '#0f1116');
    setMeta('property', 'og:site_name', siteName);
    setMeta('property', 'og:title', resolvedTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:locale', 'en_US');
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', resolvedTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);

    if (keywords?.length) {
      setMeta('name', 'keywords', keywords.join(', '));
    } else {
      removeMeta('name', 'keywords');
    }

    setCanonical(canonicalUrl);
    setStructuredData('route', normalizedSchema);

    return () => {
      setStructuredData('route');
    };
  }, [breadcrumbs ? JSON.stringify(breadcrumbs) : '', description, image, keywords ? keywords.join(',') : '', location.pathname, location.search, robots, schema ? JSON.stringify(schema) : '', title, type]);
}
