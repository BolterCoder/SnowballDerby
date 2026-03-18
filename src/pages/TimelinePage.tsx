import { ContinueExploring } from '../components/ContinueExploring';
import { Link } from 'react-router-dom';
import { timelineEras, timelineHighlights } from '../content/timeline';
import { raceData } from '../data/races';
import { getDriverPath } from '../lib/drivers';
import { formatRaceDate, getRaceEra, getRaceExcerpt, getRaceMetadata, getRaceTags, sortRacesDescending } from '../lib/races';
import { createWebPageSchema, usePageMetadata } from '../lib/seo';

export function TimelinePage() {
  usePageMetadata({
    title: 'Timeline',
    description:
      'Move through the Snowball Derby by era, turning point, and year with a timeline built for historical storytelling.',
    keywords: ['Snowball Derby timeline', 'Snowball Derby history', 'Five Flags Speedway history'],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Timeline', path: '/timeline' },
    ],
    schema: createWebPageSchema({
      name: 'Snowball Derby Timeline',
      description:
        'Move through the Snowball Derby by era, turning point, and year with a timeline built for historical storytelling.',
      path: '/timeline',
      type: 'CollectionPage',
      keywords: ['Snowball Derby timeline', 'Snowball Derby history', 'Five Flags Speedway history'],
    }),
  });

  const races = sortRacesDescending(raceData);
  const highlightYears = new Map(timelineHighlights.map((item) => [item.year, item]));
  const eraSections = timelineEras.map((era) => ({
    ...era,
    races: races.filter((race) => getRaceEra(race.year) === era.id),
  }));

  return (
    <section className="page-section">
      <div className="container page-stack">
        <div className="section-heading">
          <p className="eyebrow">Timeline</p>
          <h1 className="page-title">A historical timeline built around turning points, not just dates.</h1>
          <p className="page-intro">
            Move through the Derby in editorial order: major eras up front, milestone years called
            out clearly, and the full chronology underneath.
          </p>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <div className="stat-value">{races.length}</div>
            <div className="stat-label">Runnings</div>
            <p className="stat-detail">1968 through 2025 in one connected chronology</p>
          </article>
          <article className="stat-card">
            <div className="stat-value">{timelineEras.length}</div>
            <div className="stat-label">Editorial Eras</div>
            <p className="stat-detail">Grouped around how the race changed, not just decades</p>
          </article>
          <article className="stat-card">
            <div className="stat-value">{timelineHighlights.length}</div>
            <div className="stat-label">Turning Points</div>
            <p className="stat-detail">Years that changed the event’s identity or direction</p>
          </article>
        </div>

        <section className="page-stack">
          <div className="section-heading">
            <p className="eyebrow">Turning Points</p>
            <h2 className="section-title">The years that changed how the Derby is remembered</h2>
          </div>
          <div className="card-grid">
            {timelineHighlights.map((highlight) => (
              <article className="archive-card" key={highlight.year}>
                <div className="archive-card-topline">
                  <span>{highlight.year}</span>
                  <span>{highlight.label}</span>
                </div>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
                <Link className="text-link" to={`/races/${highlight.year}`}>
                  Open {highlight.year}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="page-stack">
          <div className="section-heading">
            <p className="eyebrow">By Era</p>
            <h2 className="section-title">Three versions of the same race, each with a different tone</h2>
          </div>

          <div className="feature-grid">
            {eraSections.map((era) => (
              <article className="feature-panel" key={era.id}>
                <p className="eyebrow">{era.years}</p>
                <h3>{era.label}</h3>
                <p>{era.summary}</p>
                <p className="profile-years">{era.focus}</p>
              </article>
            ))}
          </div>
        </section>

        {eraSections.map((era) => (
          <section className="timeline-era-section" key={era.id}>
            <div className="timeline-era-header">
              <div className="section-heading">
                <p className="eyebrow">{era.years}</p>
                <h2 className="section-title">{era.label}</h2>
                <p className="page-intro">{era.summary}</p>
              </div>
              <div className="highlight-box">
                <p className="eyebrow">Era Focus</p>
                <p>{era.focus}</p>
                <div className="tag-row">
                  {era.milestoneYears.map((year) => (
                    <span className="tag" key={`${era.id}-${year}`}>
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="timeline-list">
              {era.races.map((race) => {
                const metadata = getRaceMetadata(race);
                const tags = getRaceTags(race).slice(0, 3);
                const highlight = highlightYears.get(race.year);
                const winnerPath = getDriverPath(race.winner);

                return (
                  <article className="timeline-item" key={race.year}>
                    <div className="timeline-year">{race.year}</div>
                    <div className="timeline-body">
                      <div className="timeline-item-top">
                        <div>
                          <p className="eyebrow">{race.order}</p>
                          <h3 className="timeline-title">
                            {winnerPath ? (
                              <Link className="text-link" to={winnerPath}>
                                {race.winner}
                              </Link>
                            ) : (
                              race.winner
                            )}
                          </h3>
                        </div>
                        {highlight ? <span className="badge badge-gold">{highlight.label}</span> : null}
                      </div>

                      <p className="timeline-summary">{metadata?.summary ?? getRaceExcerpt(race)}</p>

                      <p className="timeline-copy">
                        {metadata?.significance ?? getRaceExcerpt(race)}
                      </p>

                      <div className="archive-meta">
                        <span>{formatRaceDate(race.date)}</span>
                        <span>{race.laps} laps</span>
                        <span>{race.purse}</span>
                      </div>

                      {tags.length ? (
                        <div className="tag-row">
                          {tags.map((tag) => (
                            <span className="tag" key={`${race.year}-${tag.id}`}>
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="timeline-link-row">
                        <Link className="text-link" to={`/races/${race.year}`}>
                          Open race detail
                        </Link>
                        {winnerPath ? (
                          <Link className="text-link" to={winnerPath}>
                            Open winner profile
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        <ContinueExploring
          title="Jump from chronology into the rest of the archive"
          items={[
            {
              title: 'Records and controversies',
              description: 'Switch from the year-by-year flow into the record book and dispute history.',
              to: '/records',
              cta: 'Open records',
              eyebrow: 'Stats',
            },
            {
              title: 'Legends and local icons',
              description: 'Follow the timeline into the people who defined different eras of the Derby.',
              to: '/legends',
              cta: 'Open legends',
              eyebrow: 'People',
            },
            {
              title: 'Event context',
              description: 'Step out from chronology and into the wider Derby weekend and Five Flags setting.',
              to: '/event',
              cta: 'Open event page',
              eyebrow: 'Context',
            },
          ]}
        />
      </div>
    </section>
  );
}
