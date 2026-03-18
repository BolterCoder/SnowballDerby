import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLightbox } from '../components/Lightbox';
import { raceData } from '../data/races';
import { getDriverPath } from '../lib/drivers';
import { formatRaceDate, getRaceEra, getRaceExcerpt, getRacePoleDisplay, matchesRaceQuery, sortRacesDescending } from '../lib/races';
import { createItemList, createWebPageSchema, usePageMetadata } from '../lib/seo';

const eras = [
  { id: 'all', label: 'All Years' },
  { id: 'pioneer', label: 'Pioneer Era' },
  { id: 'golden', label: 'Golden Era' },
  { id: 'modern', label: 'Modern Era' },
] as const;

const femaleWinners = new Set(['Tammy Jo Kirk', 'Johanna Long']);

export function RacesPage() {
  const { open: openLightbox } = useLightbox();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentEra = searchParams.get('era') ?? 'all';
  const query = searchParams.get('q') ?? '';
  const currentEraLabel = eras.find((era) => era.id === currentEra)?.label ?? 'Race Archive';

  const races = useMemo(() => {
    return sortRacesDescending(raceData).filter((race) => {
      const eraMatch = currentEra === 'all' || getRaceEra(race.year) === currentEra;
      return eraMatch && matchesRaceQuery(race, query);
    });
  }, [currentEra, query]);
  const hasSearch = query.length > 0;
  const currentPath = `/races${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const raceItems = races.map((race) => ({
    name: `${race.year} Snowball Derby won by ${race.winner}`,
    path: `/races/${race.year}`,
  }));

  usePageMetadata({
    title: currentEra === 'all' ? 'Race Archive' : `${currentEraLabel} Archive`,
    description: query
      ? `Browse ${currentEraLabel.toLowerCase()} results in the Snowball Derby archive filtered for "${query}".`
      : 'Browse every Snowball Derby race year with era filters, winner pages, and full race detail.',
    keywords: ['Snowball Derby results', 'Snowball Derby winners', 'Five Flags Speedway archive', currentEraLabel],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Race Archive', path: '/races' },
    ],
    schema: createWebPageSchema({
      name: currentEra === 'all' ? 'Snowball Derby Race Archive' : `${currentEraLabel} Snowball Derby Archive`,
      description: query
        ? `Browse ${currentEraLabel.toLowerCase()} results in the Snowball Derby archive filtered for "${query}".`
        : 'Browse every Snowball Derby race year with era filters, winner pages, and full race detail.',
      path: currentPath,
      type: 'CollectionPage',
      keywords: ['Snowball Derby results', 'Snowball Derby winners', 'Five Flags Speedway archive', currentEraLabel],
      about: {
        '@type': 'SportsEvent',
        name: 'Snowball Derby',
        sport: 'Auto racing',
      },
      mainEntity: createItemList(raceItems),
    }),
  });

  return (
    <section className="page-section">
      <div className="container page-stack">
        <div className="section-heading">
          <p className="eyebrow">Race Archive</p>
          <h1 className="page-title">Every Snowball Derby, year by year.</h1>
          <p className="page-intro">
            Search by year, winner, pole, or story, filter by era, and move straight into the races
            that shaped the event.
          </p>
        </div>

        <div className="archive-summary-grid">
          <article className="stat-card archive-summary-card">
            <div className="quick-stat-value">{races.length}</div>
            <div className="stat-label">Shown Now</div>
            <p className="stat-detail">Filtered from the full Derby archive</p>
          </article>
          <article className="stat-card archive-summary-card">
            <div className="quick-stat-value">{currentEraLabel}</div>
            <div className="stat-label">Active Era</div>
            <p className="stat-detail">Move across Derby history without losing your place</p>
          </article>
          <article className="stat-card archive-summary-card">
            <div className="quick-stat-value">{hasSearch ? 'Search On' : 'Browse Mode'}</div>
            <div className="stat-label">Query State</div>
            <p className="stat-detail">{hasSearch ? `Searching for "${query}"` : 'No search term applied'}</p>
          </article>
        </div>

        <div className="filters-row">
          <div className="filter-tabs" role="tablist" aria-label="Race eras">
            {eras.map((era) => (
              <button
                key={era.id}
                className={`filter-tab${currentEra === era.id ? ' is-active' : ''}`}
                type="button"
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  if (era.id === 'all') {
                    next.delete('era');
                  } else {
                    next.set('era', era.id);
                  }
                  setSearchParams(next);
                }}
              >
                {era.label}
              </button>
            ))}
          </div>

          <label className="search-field">
            <span className="sr-only">Search races</span>
            <input
              name="q"
              onChange={(event) => {
                const next = new URLSearchParams(searchParams);
                const value = event.target.value.trim();
                if (value) {
                  next.set('q', value);
                } else {
                  next.delete('q');
                }
                setSearchParams(next);
              }}
              placeholder="Search by year, winner, pole, or story"
              type="search"
              value={query}
            />
          </label>
        </div>

        <div className="archive-results-bar">
          <span>{races.length} races shown</span>
          <span>{hasSearch ? `Current view: ${currentEraLabel} • Search: "${query}"` : `Current view: ${currentEraLabel}`}</span>
        </div>

        {races.length ? (
          <div className="card-grid">
            {races.map((race) => (
              <article className="archive-card" key={race.year}>
                <div className="archive-card-topline">
                  <span>{race.year}</span>
                  <span>{race.order}</span>
                </div>

                {race.image ? (
                  <img
                    alt={`${race.winner} ${race.year}`}
                    className="archive-preview-image"
                    onClick={() => openLightbox([{ src: `/${race.image!.replace(/^images\//, 'images/')}`, alt: `${race.winner} ${race.year}`, title: `${race.year} Snowball Derby` }])}
                    style={{ cursor: 'zoom-in' }}
                    src={`/${race.image.replace(/^images\//, 'images/')}`}
                  />
                ) : null}

                <div className="badge-row">
                  {race.controversy ? <span className="badge">Controversy</span> : null}
                  {femaleWinners.has(race.winner) ? <span className="badge badge-gold">Historic Winner</span> : null}
                  {race.fullResults && race.fullResults.length > 5 ? (
                    <span className="badge badge-subtle">Full Results</span>
                  ) : null}
                </div>

                <h2>
                  {getDriverPath(race.winner) ? (
                    <Link className="text-link" to={getDriverPath(race.winner) ?? '#'}>
                      {race.winner}
                    </Link>
                  ) : (
                    race.winner
                  )}
                </h2>
                <p className="archive-date">{formatRaceDate(race.date)}</p>
                <p>{getRaceExcerpt(race)}</p>
                <div className="archive-meta">
                  <span>Pole: {getRacePoleDisplay(race)}</span>
                  <span>{race.laps} laps</span>
                  <span>{race.purse}</span>
                </div>
                <div className="archive-card-actions">
                  <Link className="button button-primary button-small" to={`/races/${race.year}`}>
                    Open race page
                  </Link>
                  {getDriverPath(race.winner) ? (
                    <Link className="button button-secondary button-small" to={getDriverPath(race.winner) ?? '#'}>
                      Winner profile
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="detail-panel empty-state-panel">
            <p className="eyebrow">No Matches</p>
            <h2>No races match this filter combination.</h2>
            <p>Try clearing the search term or switching back to a broader era view.</p>
            <div className="empty-state-actions">
              <Link className="button button-primary button-small" to="/races">
                Reset archive filters
              </Link>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
