import { Link } from 'react-router-dom';
import { ContinueExploring } from '../components/ContinueExploring';
import { nascarCrossovers, supportDivisions, supportRaceMoments, trackGallery, trackHistoryMoments, trackStats } from '../content/event';
import { getDriverPath } from '../lib/drivers';
import { createWebPageSchema, usePageMetadata } from '../lib/seo';

export function EventPage() {
  usePageMetadata({
    title: 'Event',
    description:
      'See the wider Snowball Derby event context, including Five Flags Speedway, support divisions, and the NASCAR pipeline.',
    image: '/images/Turn 1 Grandstand Snowball Derby.jpg',
    keywords: ['Snowball Derby weekend', 'Five Flags Speedway', 'Snowflake 100', 'NASCAR pipeline'],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Event', path: '/event' },
    ],
    schema: createWebPageSchema({
      name: 'Snowball Derby Event Context',
      description:
        'See the wider Snowball Derby event context, including Five Flags Speedway, support divisions, and the NASCAR pipeline.',
      path: '/event',
      type: 'AboutPage',
      image: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      keywords: ['Snowball Derby weekend', 'Five Flags Speedway', 'Snowflake 100', 'NASCAR pipeline'],
    }),
  });

  return (
    <section className="page-section">
      <div className="container page-stack">
        <div className="section-heading">
          <p className="eyebrow">Event Context</p>
          <h1 className="page-title">Track history, support races, and the NASCAR pipeline around Derby weekend.</h1>
          <p className="page-intro">
            Five Flags is more than a backdrop. Derby weekend has always been its own ecosystem of
            divisions, prospects, and local mythology.
          </p>
        </div>

        <section className="detail-grid">
          <article className="detail-panel">
            <p className="eyebrow">The Battleground</p>
            <h2>Five Flags Speedway</h2>
            <p>
              Built in 1953, Five Flags Speedway sits at the center of the Derby’s mythology. The
              half-mile oval has long been a proving ground where local legends and national stars
              collide every December.
            </p>
            <div className="stats-grid compact-grid">
              {trackStats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </article>
              ))}
            </div>
          </article>

          <article className="detail-panel">
            <img
              alt="Packed grandstands at the Snowball Derby"
              className="feature-image"
              src="/images/Turn 1 Grandstand Snowball Derby.jpg"
            />
          </article>
        </section>

        <section className="detail-grid event-history-grid">
          <article className="detail-panel detail-panel-band">
            <p className="eyebrow">Track History</p>
            <h2 className="section-title">Five Flags is part of the plot, not just the setting.</h2>
            <p>
              One of the main things the original static version did well was make the speedway feel
              alive. The Derby makes more sense when you remember it grew out of a real Pensacola
              racing place with its own crowd, pressure, and winter ritual.
            </p>
          </article>

          <div className="stack-list">
            {trackHistoryMoments.map((moment) => (
              <article className="stack-item" key={moment.title}>
                <p className="eyebrow">{moment.eyebrow}</p>
                <h3>{moment.title}</h3>
                <p>{moment.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-stack">
          <div className="section-heading">
            <p className="eyebrow">Five Flags Gallery</p>
            <h2 className="section-title">The venue should feel visible, not implied.</h2>
          </div>
          <div className="media-grid">
            {trackGallery.map((item) => (
              <article className="media-card" key={item.title}>
                <img alt={item.alt} className="feature-image" src={item.image} />
                <h3 className="media-title">{item.title}</h3>
                <p className="media-caption">{item.caption}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-stack">
          <div className="section-heading">
            <p className="eyebrow">Support Divisions</p>
            <h2 className="section-title">Derby weekend is bigger than the main feature.</h2>
          </div>
          <div className="detail-grid event-support-grid">
            <div className="feature-grid">
              {supportDivisions.map((division) => (
                <article className="feature-panel" key={division.name}>
                  <h3>{division.name}</h3>
                  <p>{division.description}</p>
                  <p className="profile-years">{division.status}</p>
                </article>
              ))}
            </div>
            <div className="stack-list">
              {supportRaceMoments.map((moment) => (
                <article className="stack-item" key={moment.title}>
                  <p className="eyebrow">{moment.eyebrow}</p>
                  <h3>{moment.title}</h3>
                  <p>{moment.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-stack">
          <div className="section-heading">
            <p className="eyebrow">The Pipeline</p>
            <h2 className="section-title">From Five Flags to NASCAR</h2>
          </div>
          <div className="card-grid">
            {nascarCrossovers.map((driver) => (
              <article className="archive-card" key={driver.name}>
                <h3>{driver.name}</h3>
                <p className="archive-date">{driver.achievement}</p>
                <p>{driver.derbyNote}</p>
                {getDriverPath(driver.name) ? (
                  <Link className="text-link" to={getDriverPath(driver.name) ?? '#'}>
                    Open profile
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <ContinueExploring
          title="Use the event page to branch back into the archive"
          items={[
            {
              title: 'Race-by-race archive',
              description: 'Go from venue and weekend context straight into each Derby running.',
              to: '/races',
              cta: 'Open archive',
              eyebrow: 'Races',
            },
            {
              title: 'Driver profiles',
              description: 'Follow the stars, regulars, and crossover names into individual profile pages.',
              to: '/drivers',
              cta: 'Open drivers',
              eyebrow: 'People',
            },
            {
              title: 'Timeline',
              description: 'See how the event’s structure, purse, and national reach changed year by year.',
              to: '/timeline',
              cta: 'Open timeline',
              eyebrow: 'History',
            },
          ]}
        />
      </div>
    </section>
  );
}
