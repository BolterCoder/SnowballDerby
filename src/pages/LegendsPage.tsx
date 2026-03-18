import { Link } from 'react-router-dom';
import { ContinueExploring } from '../components/ContinueExploring';
import { useLightbox } from '../components/Lightbox';
import { legends, localHeroes, pensacolaLegacyMoments } from '../content/legends';
import { getDriverPath } from '../lib/drivers';
import { createWebPageSchema, usePageMetadata } from '../lib/seo';

export function LegendsPage() {
  const { open: openLightbox } = useLightbox();
  usePageMetadata({
    title: 'Legends',
    description:
      'Read the Snowball Derby legends and Pensacola figures who shaped the event across generations.',
    keywords: ['Snowball Derby legends', 'Pensacola racing legends', 'Five Flags Speedway history'],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Legends', path: '/legends' },
    ],
    schema: createWebPageSchema({
      name: 'Snowball Derby Legends',
      description:
        'Read the Snowball Derby legends and Pensacola figures who shaped the event across generations.',
      path: '/legends',
      type: 'CollectionPage',
      keywords: ['Snowball Derby legends', 'Pensacola racing legends', 'Five Flags Speedway history'],
    }),
  });

  return (
    <section className="page-section">
      <div className="container page-stack">
        <div className="section-heading">
          <p className="eyebrow">Legends</p>
          <h1 className="page-title">Champions, icons, and Pensacola figures who shaped the Derby’s identity.</h1>
          <p className="page-intro">
            Some names defined the race nationally. Others gave it its local heartbeat. Both belong
            in the same history.
          </p>
        </div>

        <div className="card-grid">
          {legends.map((legend) => (
            <article className="profile-card" key={legend.name}>
              {legend.image ? <img alt={legend.name} className="profile-image" onClick={() => openLightbox([{ src: legend.image!, alt: legend.name, title: legend.name }])} src={legend.image} /> : null}
              {legend.badge ? <p className="eyebrow">{legend.badge}</p> : null}
              <h2>{legend.name}</h2>
              {legend.stats?.length ? (
                <div className="profile-stats">
                  {legend.stats.map((stat) => (
                    <span className="tag" key={`${legend.name}-${stat.label}`}>
                      {stat.value} {stat.label}
                    </span>
                  ))}
                </div>
              ) : null}
              <p>{legend.summary}</p>
              {legend.years ? <p className="profile-years">{legend.years}</p> : null}
              {getDriverPath(legend.name) ? (
                <Link className="text-link" to={getDriverPath(legend.name) ?? '#'}>
                  Open profile
                </Link>
              ) : null}
            </article>
          ))}
        </div>

        <div className="section-heading">
          <p className="eyebrow">Pensacola’s Own</p>
          <h2 className="section-title">The local layer that gave the Derby its heartbeat.</h2>
        </div>

        <div className="feature-grid">
          {localHeroes.map((hero) => (
            <article className="profile-card" key={hero.name}>
              {hero.image ? <img alt={hero.name} className="profile-image" onClick={() => openLightbox([{ src: hero.image!, alt: hero.name, title: hero.name }])} src={hero.image} /> : null}
              {hero.badge ? <p className="eyebrow">{hero.badge}</p> : null}
              <h3>{hero.name}</h3>
              {hero.stats?.length ? (
                <div className="profile-stats">
                  {hero.stats.map((stat) => (
                    <span className="tag" key={`${hero.name}-${stat.label}`}>
                      {stat.value} {stat.label}
                    </span>
                  ))}
                </div>
              ) : null}
              <p>{hero.summary}</p>
              {getDriverPath(hero.name) ? (
                <Link className="text-link" to={getDriverPath(hero.name) ?? '#'}>
                  Open profile
                </Link>
              ) : null}
            </article>
          ))}
        </div>

        <section className="detail-grid legends-local-grid">
          <article className="detail-panel detail-panel-band">
            <p className="eyebrow">Local Identity</p>
            <h2 className="section-title">Pensacola stayed in the story even after the event went national.</h2>
            <p>
              The original site leaned harder on this, and it was right to. The Derby did not
              become important by floating above its home track. It became important because Five
              Flags already meant something locally, then the race kept producing hometown touchpoints
              people could pass down.
            </p>
            <p>
              That is why this page keeps champions and local figures together. The Derby’s bigger
              names matter, but so do the people who made Pensacola feel permanent inside the event.
            </p>
          </article>

          <div className="stack-list">
            {pensacolaLegacyMoments.map((moment) => (
              <article className="stack-item" key={moment.title}>
                <h3>{moment.title}</h3>
                <p>{moment.description}</p>
              </article>
            ))}
          </div>
        </section>

        <ContinueExploring
          title="Use the legends page as a jumping-off point"
          items={[
            {
              title: 'Driver archive',
              description: 'Move from summary legend cards into the full searchable driver database and profile pages.',
              to: '/drivers',
              cta: 'Browse drivers',
              eyebrow: 'Profiles',
            },
            {
              title: 'Records and milestones',
              description: 'See where the biggest winners and turning points land in the record book.',
              to: '/records',
              cta: 'Open records',
              eyebrow: 'Context',
            },
            {
              title: 'Full historical timeline',
              description: 'Follow the event chronologically to see where each legend fits into the larger Derby story.',
              to: '/timeline',
              cta: 'View timeline',
              eyebrow: 'History',
            },
          ]}
        />
      </div>
    </section>
  );
}
