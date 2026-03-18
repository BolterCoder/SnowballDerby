import { ContinueExploring } from '../components/ContinueExploring';
import { useLightbox } from '../components/Lightbox';
import { Link, useParams } from 'react-router-dom';
import { raceData } from '../data/races';
import { formatDriverNote, getDriverBestFinish, getDriverBySlug, getDriverProfilePresentation, getDriverRaceEntries } from '../lib/drivers';
import { createProfilePageSchema, usePageMetadata } from '../lib/seo';

export function DriverProfilePage() {
  const { slug } = useParams();
  const driver = slug ? getDriverBySlug(slug) : undefined;
  const profile = driver ? getDriverProfilePresentation(driver) : undefined;

  usePageMetadata({
    title: driver ? driver.name : 'Driver Profile Not Found',
    description: driver
      ? profile?.summary ?? driver.note
      : 'The requested Snowball Derby driver profile could not be found in the archive.',
    image: profile?.image,
    type: 'profile',
    robots: driver ? 'index,follow' : 'noindex,nofollow',
    keywords: driver
      ? ['Snowball Derby driver profile', driver.name, 'Five Flags Speedway', driver.wins > 0 ? 'Snowball Derby winner' : 'Snowball Derby regular']
      : undefined,
    breadcrumbs: driver && slug
      ? [
          { name: 'Home', path: '/' },
          { name: 'Drivers', path: '/drivers' },
          { name: driver.name, path: `/drivers/${slug}` },
        ]
      : undefined,
    schema: driver && slug
      ? createProfilePageSchema({
          name: `${driver.name} Snowball Derby profile`,
          description: profile?.summary ?? driver.note,
          path: `/drivers/${slug}`,
          image: profile?.image,
          person: {
            name: driver.name,
            description: profile?.summary ?? driver.note,
            knowsAbout: ['Snowball Derby', 'Five Flags Speedway', 'Late model racing'],
            award: driver.winYears.length ? `Snowball Derby winner (${driver.winYears.join(', ')})` : undefined,
            homeLocation: profile?.hometown
              ? {
                  '@type': 'Place',
                  name: profile.hometown,
                }
              : undefined,
          },
        })
      : undefined,
  });

  if (!driver || !slug) {
    return (
      <section className="page-section">
        <div className="container page-stack">
          <p className="eyebrow">Driver Not Found</p>
          <h1 className="page-title">That driver profile does not exist.</h1>
          <Link className="button button-primary" to="/drivers">
            Return to drivers
          </Link>
        </div>
      </section>
    );
  }

  const { open: openLightbox } = useLightbox();
  const raceEntries = getDriverRaceEntries(driver, raceData);
  const bestFinish = getDriverBestFinish(driver, raceData);
  const firstYear = driver.years.length ? Math.min(...driver.years) : null;
  const lastYear = driver.years.length ? Math.max(...driver.years) : null;
  const activeSpan =
    firstYear && lastYear ? (firstYear === lastYear ? `${firstYear}` : `${firstYear}-${lastYear}`) : 'Unavailable';
  const latestEntry = raceEntries[0];
  const profileLens =
    driver.wins >= 2
      ? 'One of the repeat-winning anchors in Derby history.'
      : driver.wins === 1
        ? 'A single Derby win was enough to place this driver inside the permanent race memory.'
        : driver.starts >= 10
          ? 'This profile matters because persistence and presence are part of Derby history too.'
          : 'A connected archive figure whose Derby appearances still help explain the broader story.';

  return (
    <section className="page-section">
      <div className="container page-stack">
        <div className="section-heading">
          <p className="eyebrow">Driver Profile</p>
          <h1 className="page-title">{driver.name}</h1>
          <p className="page-intro">
            {profile?.headline ?? driver.note}
          </p>
        </div>

        <section className="profile-hero-grid">
          <article className="detail-panel profile-lead-panel">
            {profile?.image ? (
              <img alt={driver.name} className="feature-image" onClick={() => openLightbox([{ src: profile.image!, alt: driver.name, title: driver.name }])} src={profile.image} />
            ) : null}
            <p>{profile?.summary ?? driver.note}</p>
            {profile?.hometown ? (
              <p className="profile-years">Hometown: {profile.hometown}</p>
            ) : null}
            {profile?.highlights?.length ? (
              <div className="tag-row">
                {profile.highlights.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="profile-action-row">
              <Link className="button button-secondary button-small" to="/drivers">
                Back to drivers
              </Link>
              {latestEntry ? (
                <Link className="button button-primary button-small" to={latestEntry.href}>
                  Open latest race
                </Link>
              ) : null}
            </div>
          </article>

          <aside className="winner-spotlight profile-sidebar">
            <h2>Career Snapshot</h2>
            <dl className="meta-list">
              <div>
                <dt>Starts</dt>
                <dd>{driver.starts}</dd>
              </div>
              <div>
                <dt>Wins</dt>
                <dd>{driver.wins}</dd>
              </div>
              <div>
                <dt>Best Finish</dt>
                <dd>{bestFinish ?? 'Unavailable'}</dd>
              </div>
              <div>
                <dt>First Year</dt>
                <dd>{firstYear ?? 'Unavailable'}</dd>
              </div>
              <div>
                <dt>Last Year</dt>
                <dd>{lastYear ?? 'Unavailable'}</dd>
              </div>
              <div>
                <dt>Win Years</dt>
                <dd>{driver.winYears.length ? driver.winYears.join(', ') : 'None'}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <div className="profile-stat-grid">
          <article className="stat-card">
            <div className="stat-value">{driver.starts}</div>
            <div className="stat-label">Starts</div>
          </article>
          <article className="stat-card">
            <div className="stat-value">{driver.wins}</div>
            <div className="stat-label">Wins</div>
          </article>
          <article className="stat-card">
            <div className="stat-value">{bestFinish ?? '—'}</div>
            <div className="stat-label">Best Finish</div>
          </article>
          <article className="stat-card">
            <div className="stat-value">{activeSpan}</div>
            <div className="stat-label">Active Span</div>
          </article>
        </div>

        <section className="card-grid compact-grid profile-context-grid">
          <article className="feature-panel">
            <p className="eyebrow">Career Lens</p>
            <h3>Why this profile matters</h3>
            <p>{profileLens}</p>
          </article>
          <article className="feature-panel">
            <p className="eyebrow">Latest Chapter</p>
            <h3>{latestEntry ? latestEntry.year : 'No linked race yet'}</h3>
            <p>{latestEntry ? latestEntry.summary : 'This driver is not yet connected to a detailed race entry in the archive.'}</p>
          </article>
          <article className="feature-panel">
            <p className="eyebrow">Timeline Window</p>
            <h3>{activeSpan}</h3>
            <p>
              {driver.winYears.length
                ? `Winning seasons: ${driver.winYears.join(', ')}.`
                : 'No Derby victories, but the appearances still help define the archive.'}
            </p>
          </article>
        </section>

        <section className="detail-panel">
          <h2>Archive Note</h2>
          <p>{formatDriverNote(driver.note)}</p>
        </section>

        <section className="detail-panel">
          <h2>Race History</h2>
          {raceEntries.length ? (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Summary</th>
                    <th>Winner</th>
                    <th>Race Page</th>
                  </tr>
                </thead>
                <tbody>
                  {raceEntries.map((entry) => (
                    <tr key={`${driver.name}-${entry.year}`}>
                      <td>{entry.year}</td>
                      <td>{entry.summary}</td>
                      <td>{entry.winner}</td>
                      <td>
                        <Link className="text-link" to={entry.href}>
                          Open race
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No connected race entries were found in the current archive dataset.</p>
          )}
        </section>

        <ContinueExploring
          title="Keep moving through the connected archive"
          items={[
            ...(latestEntry
              ? [
                  {
                    title: 'Latest connected race',
                    description: `Jump straight to the most recent Snowball Derby page connected to ${driver.name}.`,
                    to: latestEntry.href,
                    cta: 'Open race page',
                    eyebrow: 'Recent',
                  },
                ]
              : []),
            {
              title: 'Driver database',
              description: 'Compare this profile against the wider field of winners, multi-win drivers, and NASCAR crossovers.',
              to: '/drivers',
              cta: 'Browse drivers',
              eyebrow: 'Directory',
            },
            {
              title: 'Records and timeline',
              description: 'See where this driver’s runs fit into the Derby’s milestones, eras, and broader historical story.',
              to: '/records',
              cta: 'Open records',
              eyebrow: 'Context',
            },
          ]}
        />
      </div>
    </section>
  );
}
