import { useEffect, useState } from 'react';
import { NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { createOrganizationSchema, createWebSiteSchema, useStructuredData } from '../lib/seo';

const navigation = [
  { to: '/', label: 'Home', end: true },
  { to: '/races', label: 'Races' },
  { to: '/drivers', label: 'Drivers' },
  { to: '/legends', label: 'Legends' },
  { to: '/records', label: 'Records' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/event', label: 'Event' },
];

const themeStorageKey = 'snowball-derby-theme';

export function AppShell() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    return window.localStorage.getItem(themeStorageKey) === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useStructuredData('sitewide', [createOrganizationSchema(), createWebSiteSchema()]);

  const activeNavLabel =
    navigation.find((item) =>
      item.end ? location.pathname === item.to : location.pathname.startsWith(item.to),
    )?.label ?? 'Archive';

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-row">
          <NavLink className="brand" to="/">
            <span className="brand-top">Snowball</span>
            <span className="brand-bottom">Derby</span>
          </NavLink>

          <div className="header-actions">
            <div className="header-status" aria-label="Current section">
              <span className="header-status-label">Now Viewing</span>
              <span className="header-status-value">{activeNavLabel}</span>
            </div>

            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>

            <button
              className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className="container">
          <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`}>
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) => `site-nav-link${isActive ? ' is-active' : ''}`}
                end={item.end}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
      <ScrollRestoration />

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <p className="eyebrow">Five Flags Speedway</p>
            <p className="footer-title">A living Snowball Derby archive.</p>
          </div>
          <div className="footer-copy">
            <p>Built around race stories, driver profiles, records, timeline turns, and Derby weekend context.</p>
            <p>The goal is simple: make the event&apos;s history easier to move through, compare, and keep expanding.</p>
          </div>
          <div className="footer-links">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) => `footer-link${isActive ? ' is-active' : ''}`}
                end={item.end}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
