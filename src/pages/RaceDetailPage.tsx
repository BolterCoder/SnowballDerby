import { ContinueExploring } from '../components/ContinueExploring';
import { useLightbox } from '../components/Lightbox';
import { Link, useParams } from 'react-router-dom';
import { raceData } from '../data/races';
import { getDriverPath } from '../lib/drivers';
import {
  formatRaceDate,
  formatRaceResultLine,
  formatRaceResultStatus,
  formatRaceValue,
  getRaceMediaItems,
  getRaceMetadata,
  getRaceFastTimeDisplay,
  getRacePoleDisplay,
  getRaceSnowflakeDisplay,
  getRaceStatNote,
  getRaceTags,
  getRelatedDriversForRace,
  getRelatedRaces,
  sortRacesDescending,
} from '../lib/races';
import { createArticleSchema, createWebPageSchema, usePageMetadata } from '../lib/seo';

function renderDriverLink(name: string) {
  const driverPath = getDriverPath(name);
  return driverPath ? (
    <Link className="text-link" to={driverPath}>
      {name}
    </Link>
  ) : (
    <>{name}</>
  );
}

function buildStoryParagraphs(story: string) {
  const sentences = story
    .split('. ')
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .map((sentence) => (sentence.endsWith('.') ? sentence : `${sentence}.`));

  const lead = sentences.slice(0, 2).join(' ');
  const body: string[] = [];

  for (let index = 2; index < sentences.length; index += 2) {
    body.push(sentences.slice(index, index + 2).join(' '));
  }

  return { lead, body };
}

export function RaceDetailPage() {
  const { year } = useParams();
  const { open: openLightbox } = useLightbox();
  const race = raceData.find((entry) => String(entry.year) === year);
  const metadata = race ? getRaceMetadata(race) : undefined;
  const mediaItems = race ? getRaceMediaItems(race) : [];
  const heroImage = mediaItems.find((item) => item.type === 'image')?.src;
  const story = race ? buildStoryParagraphs(race.story) : { lead: '', body: [] };

  usePageMetadata({
    title: race ? `${race.year} Snowball Derby` : 'Race Not Found',
    description: race
      ? metadata?.significance ?? metadata?.summary ?? story.lead
      : `There is no Snowball Derby race entry for ${year}.`,
    image: heroImage,
    type: race ? 'article' : 'website',
    robots: race ? 'index,follow' : 'noindex,nofollow',
    keywords: race ? ['Snowball Derby', `${race.year} Snowball Derby`, race.winner, ...getRaceTags(race).map((tag) => tag.label)] : undefined,
    breadcrumbs: race
      ? [
          { name: 'Home', path: '/' },
          { name: 'Race Archive', path: '/races' },
          { name: String(race.year), path: `/races/${race.year}` },
        ]
      : undefined,
    schema: race
      ? [
          createArticleSchema({
            headline: `${race.year} Snowball Derby won by ${race.winner}`,
            description: metadata?.significance ?? metadata?.summary ?? story.lead,
            path: `/races/${race.year}`,
            image: heroImage,
            datePublished: race.date,
            keywords: ['Snowball Derby', `${race.year} Snowball Derby`, race.winner, ...getRaceTags(race).map((tag) => tag.label)],
            about: {
              '@type': 'SportsEvent',
              name: `${race.year} Snowball Derby`,
              startDate: race.date,
              eventStatus: 'https://schema.org/EventCompleted',
              eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
              location: {
                '@type': 'Place',
                name: 'Five Flags Speedway',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Pensacola',
                  addressRegion: 'FL',
                  addressCountry: 'US',
                },
              },
              sport: 'Auto racing',
            },
          }),
          createWebPageSchema({
            name: `${race.year} Snowball Derby`,
            description: metadata?.summary ?? story.lead,
            path: `/races/${race.year}`,
            type: 'WebPage',
            image: heroImage,
            keywords: ['Snowball Derby', `${race.year} Snowball Derby`, race.winner],
          }),
        ]
      : undefined,
  });

  if (!race) {
    return (
      <section className="page-section">
        <div className="container page-stack">
          <p className="eyebrow">Race Not Found</p>
          <h1 className="page-title">There is no race entry for {year}.</h1>
          <Link className="button button-primary" to="/races">
            Return to archive
          </Link>
        </div>
      </section>
    );
  }

  const races = sortRacesDescending(raceData);
  const currentIndex = races.findIndex((entry) => entry.year === race.year);
  const previousRace = races[currentIndex + 1];
  const nextRace = races[currentIndex - 1];
  const raceTags = getRaceTags(race);
  const relatedDrivers = getRelatedDriversForRace(race);
  const relatedRaces = getRelatedRaces(race, raceData);
  const winnerEntry = race.fullResults?.find((entry) => entry.finish === 1) ?? race.fullResults?.[0];
  const winnerPath = getDriverPath(race.winner);
  const fieldSummary = [
    race.fullResults?.length ? `${race.fullResults.length} classified entries` : null,
    race.dnq?.length ? `${race.dnq.length} DNQ` : null,
    race.dns?.length ? `${race.dns.length} DNS` : null,
  ].filter(Boolean);
  const topFinishers =
    race.fullResults
      ?.filter((entry) => typeof entry.finish === 'number' && entry.finish <= 3)
      .sort((left, right) => Number(left.finish) - Number(right.finish)) ?? [];

  const quickStats = [
    {
      label: 'Fast Qualifier',
      value: getRacePoleDisplay(race),
      emphasize: false,
    },
    {
      label: 'Cautions',
      value: formatRaceValue(race.cautions),
      emphasize: false,
    },
    {
      label: 'Lead Changes',
      value: formatRaceValue(race.leadChanges),
      emphasize: false,
    },
    {
      label: 'Margin',
      value: formatRaceValue(race.marginOfVictory ?? race.winMargin),
      emphasize: true,
    },
  ];
  const statNote = getRaceStatNote(race);

  return (
    <section className="page-section">
      <div className="container page-stack">
        <div className="section-heading">
          <p className="eyebrow">{race.order} Snowball Derby</p>
          <h1 className="page-title">
            {race.winner} in {race.year}
          </h1>
          <p className="page-intro">
            {formatRaceDate(race.date)} • {race.laps} laps • {race.purse}
          </p>
        </div>

        <div className="tag-row">
          {raceTags.map((tag) => (
            <span className="tag" key={tag.id}>
              {tag.label}
            </span>
          ))}
        </div>

        <div className="race-route-row">
          {previousRace ? (
            <Link className="button button-secondary button-small" to={`/races/${previousRace.year}`}>
              Earlier: {previousRace.year}
            </Link>
          ) : (
            <span />
          )}
          <Link className="button button-primary button-small" to="/races">
            Return to race archive
          </Link>
          {nextRace ? (
            <Link className="button button-secondary button-small" to={`/races/${nextRace.year}`}>
              Later: {nextRace.year}
            </Link>
          ) : (
            <span />
          )}
        </div>

        <section className="race-hero-grid">
          <article className="detail-panel race-story-panel">
            <p className="eyebrow">At A Glance</p>
            <h2 className="section-title">{metadata?.summary ?? `${race.winner} captured the ${race.year} Derby.`}</h2>
            <p className="story-lead">{story.lead}</p>
            {metadata?.significance ? <p>{metadata.significance}</p> : null}
          </article>

          <aside className="winner-spotlight race-winner-panel">
            <p className="eyebrow">Winner Spotlight</p>
            <h2>{renderDriverLink(race.winner)}</h2>
            <div className="winner-meta">
              <span>{race.purse}</span>
              <span>{race.laps} laps</span>
              <span>{formatRaceDate(race.date)}</span>
            </div>
            {winnerEntry?.carNumber || winnerEntry?.make || winnerEntry?.sponsor ? (
              <div className="winner-build">
                {winnerEntry?.carNumber ? <p>Car #{winnerEntry.carNumber}</p> : null}
                {winnerEntry?.make ? <p>{winnerEntry.make}</p> : null}
                {winnerEntry?.sponsor ? <p>{winnerEntry.sponsor}</p> : null}
              </div>
            ) : null}
          </aside>
        </section>

        <div className="quick-stats-grid">
          {quickStats.map((item) => (
            <article className={`stat-card${item.emphasize ? ' stat-card-accent' : ''}`} key={item.label}>
              <div className="stat-label">{item.label}</div>
              <div className="quick-stat-value">{item.value}</div>
            </article>
          ))}
        </div>

        {fieldSummary.length ? (
          <section className="detail-panel detail-panel-band">
            <div className="section-heading compact-heading">
              <p className="eyebrow">Field Snapshot</p>
              <h2 className="section-title">Who made this running what it was</h2>
            </div>
            <div className="tag-row">
              {fieldSummary.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {mediaItems.length ? (
          <section className="page-stack">
            <div className="section-heading">
              <p className="eyebrow">Media</p>
              <h2 className="section-title">Race visuals and archive notes</h2>
            </div>
            <div className="media-grid">
              {(() => {
                const imageItems = mediaItems.filter((item) => item.type === 'image' && item.src);
                const lightboxImages = imageItems.map((item) => ({
                  src: item.src!,
                  title: item.title,
                  caption: item.caption,
                  alt: item.alt,
                }));
                let imageIndex = 0;
                return mediaItems.map((item) => {
                  if (item.type === 'image') {
                    const currentImageIndex = imageIndex++;
                    return (
                      <article className="media-card media-card-image" key={`${race.year}-${item.title}`}>
                        <img
                          alt={item.alt}
                          className="feature-image"
                          onClick={() => openLightbox(lightboxImages, currentImageIndex)}
                          src={item.src}
                        />
                        <p className="media-title">{item.title}</p>
                        {item.caption ? <p className="media-caption">{item.caption}</p> : null}
                      </article>
                    );
                  }
                  return (
                    <article className="media-card" key={`${race.year}-${item.title}`}>
                      <p className="eyebrow">Archive Note</p>
                      <p className="media-title">{item.title}</p>
                    </article>
                  );
                });
              })()}
            </div>
          </section>
        ) : null}

        <div className="detail-grid">
          <article className="detail-panel">
            <h2>Race Story</h2>
            {story.body.map((paragraph, index) => (
              <p key={`${race.year}-story-${index}`}>{paragraph}</p>
            ))}
            {statNote ? (
              <div className="highlight-box">
                <p className="eyebrow">Statistically Speaking</p>
                <p>{statNote}</p>
              </div>
            ) : null}
            {race.controversy ? (
              <div className="highlight-box">
                <p className="eyebrow">Controversy</p>
                <p>{race.controversy}</p>
              </div>
            ) : null}
          </article>

          <aside className="detail-panel">
            <h2>Snapshot</h2>
            <dl className="meta-list">
              <div>
                <dt>Winner</dt>
                <dd>{renderDriverLink(race.winner)}</dd>
              </div>
                  <div>
                    <dt>Pole</dt>
                    <dd>
                      {race.fastQualifier?.driver || race.pole
                    ? renderDriverLink(getRacePoleDisplay(race))
                    : 'Unknown'}
                    </dd>
                  </div>
                  <div>
                    <dt>Fast Time</dt>
                    <dd>{getRaceFastTimeDisplay(race)}</dd>
                  </div>
                  <div>
                    <dt>Weather</dt>
                    <dd>{formatRaceValue(race.weather)}</dd>
                  </div>
                  <div>
                    <dt>Race Time</dt>
                    <dd>{formatRaceValue(race.raceTime)}</dd>
                  </div>
                  <div>
                    <dt>Average Speed</dt>
                    <dd>{formatRaceValue(race.averageSpeed)}</dd>
                  </div>
                  <div>
                    <dt>Snowflake Winner</dt>
                    <dd>{getRaceSnowflakeDisplay(race)}</dd>
                  </div>
                  <div>
                    <dt>Laps Led</dt>
                    <dd>{formatRaceValue(race.ledLaps)}</dd>
                  </div>
                </dl>
              </aside>
        </div>

        {metadata?.storylines?.length ? (
          <section className="detail-panel">
            <h2>Key Storylines</h2>
            <div className="stack-list">
              {metadata.storylines.map((storyline) => (
                <article className="stack-item" key={storyline}>
                  <p>{storyline}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {topFinishers.length ? (
          <section className="page-stack">
            <div className="section-heading">
              <p className="eyebrow">Podium</p>
              <h2 className="section-title">The front of the field</h2>
            </div>
            <div className="podium-grid">
              {topFinishers.map((entry) => (
                <article className="profile-card" key={`${race.year}-${entry.finish}-${entry.driver}`}>
                  <p className="eyebrow">P{entry.finish}</p>
                  <h3>{entry.driver ? renderDriverLink(entry.driver) : 'Unknown'}</h3>
                  {entry.carNumber ? <p className="profile-years">Car #{entry.carNumber}</p> : null}
                  {entry.sponsor ? <p>{entry.sponsor}</p> : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {race.fullResults?.length ? (
          <section className="detail-panel">
            <h2>Full Results</h2>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Start</th>
                    <th>#</th>
                    <th>Driver</th>
                    <th>Sponsor</th>
                    <th>Make</th>
                    <th>Laps</th>
                    <th>Led</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {race.fullResults.map((result, index) => (
                    <tr key={`${race.year}-${result.driver ?? 'entry'}-${index}`}>
                      <td>{result.finish ?? '—'}</td>
                      <td>{result.start ?? '—'}</td>
                      <td>{result.carNumber ?? '—'}</td>
                      <td>{result.driver ? renderDriverLink(result.driver) : '—'}</td>
                      <td>{result.sponsor ?? '—'}</td>
                      <td>{formatRaceValue(result.make, '—')}</td>
                      <td>{result.laps ?? '—'}</td>
                      <td>{result.lapsLed ?? '—'}</td>
                      <td>{formatRaceResultStatus(result.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : race.results?.length ? (
          <section className="detail-panel">
            <h2>Results</h2>
            <div className="stack-list">
              {race.results.map((result) => (
                <article className="stack-item" key={result}>
                  <p>{formatRaceResultLine(result)}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <div className="detail-grid">
          {race.notableEntrants?.length ? (
            <section className="detail-panel">
              <h2>Notable Entrants</h2>
              <div className="tag-row">
                {race.notableEntrants.map((entrant) => (
                  <span className="tag" key={entrant}>
                    {renderDriverLink(entrant)}
                  </span>
                ))}
              </div>
            </section>
          ) : (
            <span />
          )}

          {(race.dnq?.length || race.dns?.length) ? (
            <section className="detail-panel">
              <h2>Field Notes</h2>
              {race.dnq?.length ? (
                <>
                  <p className="eyebrow">Did Not Qualify</p>
                  <div className="tag-row">
                    {race.dnq.map((driver) => (
                      <span className="tag" key={driver}>
                        {renderDriverLink(driver)}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}
              {race.dns?.length ? (
                <>
                  <p className="eyebrow">Did Not Start</p>
                  <div className="tag-row">
                    {race.dns.map((driver) => (
                      <span className="tag" key={driver}>
                        {renderDriverLink(driver)}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}
            </section>
          ) : (
            <span />
          )}
        </div>

        <div className="detail-grid">
          {relatedDrivers.length ? (
            <section className="detail-panel">
              <h2>Related Drivers</h2>
              <div className="stack-list">
                {relatedDrivers.map((driver) => (
                  <article className="stack-item" key={`${driver.name}-${driver.role}`}>
                    <p className="eyebrow">{driver.role}</p>
                    <h3>
                      <Link className="text-link" to={driver.href}>
                        {driver.name}
                      </Link>
                    </h3>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <span />
          )}

          {relatedRaces.length ? (
            <section className="detail-panel">
              <h2>Related Races</h2>
              <div className="stack-list">
                {relatedRaces.map((relatedRace) => (
                  <article className="stack-item" key={relatedRace.year}>
                    <p className="eyebrow">{relatedRace.reason}</p>
                    <h3>
                      <Link className="text-link" to={relatedRace.href}>
                        {relatedRace.title}
                      </Link>
                    </h3>
                    <p className="profile-years">{relatedRace.year}</p>
                    <p>{relatedRace.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <span />
          )}
        </div>

        <div className="race-pagination">
          {previousRace ? (
            <Link className="button button-secondary" to={`/races/${previousRace.year}`}>
              Older race
            </Link>
          ) : (
            <span />
          )}
          <Link className="button button-primary" to="/races">
            Back to archive
          </Link>
          {nextRace ? (
            <Link className="button button-secondary" to={`/races/${nextRace.year}`}>
              Newer race
            </Link>
          ) : (
            <span />
          )}
        </div>

        <ContinueExploring
          title="Branch out from this race"
          items={[
            ...(winnerPath
              ? [
                  {
                    title: `${race.winner} profile`,
                    description: `Move from the ${race.year} result into the broader Snowball Derby profile for ${race.winner}.`,
                    to: winnerPath,
                    cta: 'Open driver profile',
                    eyebrow: 'Winner',
                  },
                ]
              : []),
            {
              title: 'Timeline placement',
              description: 'See how this running fits into the Derby’s larger chronology and turning points.',
              to: '/timeline',
              cta: 'Open timeline',
              eyebrow: 'History',
            },
            {
              title: 'Records and controversies',
              description: 'Cross-check this race against the event’s milestones, records, and biggest disputes.',
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
