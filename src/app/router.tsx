import { Link, createBrowserRouter } from 'react-router-dom';
import { AppShell } from './AppShell';
import { createWebPageSchema, usePageMetadata } from '../lib/seo';
import { DriverProfilePage } from '../pages/DriverProfilePage';
import { DriversPage } from '../pages/DriversPage';
import { EventPage } from '../pages/EventPage';
import { HomePage } from '../pages/HomePage';
import { LegendsPage } from '../pages/LegendsPage';
import { RaceDetailPage } from '../pages/RaceDetailPage';
import { RacesPage } from '../pages/RacesPage';
import { RecordsPage } from '../pages/RecordsPage';
import { TimelinePage } from '../pages/TimelinePage';

function NotFoundPage() {
  usePageMetadata({
    title: 'Page Not Found',
    description: 'The requested Snowball Derby archive page does not exist.',
    robots: 'noindex,nofollow',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Not Found', path: '/404' },
    ],
    schema: createWebPageSchema({
      name: 'Snowball Derby page not found',
      description: 'The requested Snowball Derby archive page does not exist.',
      path: '/404',
    }),
  });

  return (
    <section className="page-section">
      <div className="container page-stack">
        <p className="eyebrow">Not Found</p>
        <h1 className="page-title">This route is off the racing line.</h1>
        <p className="page-intro">
          The page you asked for is not in the archive. Use the race index or head back home.
        </p>
        <div className="empty-state-actions">
          <Link className="button button-primary" to="/races">
            Return to archive
          </Link>
          <Link className="button button-secondary" to="/">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'races', element: <RacesPage /> },
      { path: 'races/:year', element: <RaceDetailPage /> },
      { path: 'drivers', element: <DriversPage /> },
      { path: 'drivers/:slug', element: <DriverProfilePage /> },
      { path: 'legends', element: <LegendsPage /> },
      { path: 'records', element: <RecordsPage /> },
      { path: 'timeline', element: <TimelinePage /> },
      { path: 'event', element: <EventPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
