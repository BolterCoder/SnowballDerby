import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { formatDriverNote, getDriverSlug, mergedDriverData } from '../lib/drivers';
import { createItemList, createWebPageSchema, usePageMetadata } from '../lib/seo';

type DriverFilter = 'all' | 'winners' | 'multi' | 'nascar';
type DriverSort = 'name' | 'starts' | 'wins';

const filters: { id: DriverFilter; label: string }[] = [
  { id: 'all', label: 'All Drivers' },
  { id: 'winners', label: 'Winners' },
  { id: 'multi', label: 'Multi-Win' },
  { id: 'nascar', label: 'NASCAR Crossovers' },
];

export function DriversPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const filter = (searchParams.get('filter') ?? 'all') as DriverFilter;
  const sort = (searchParams.get('sort') ?? 'starts') as DriverSort;

  const drivers = useMemo(() => {
    return [...mergedDriverData]
      .filter((driver) => {
        const note = formatDriverNote(driver.note);
        const searchMatch = !query || `${driver.name} ${note}`.toLowerCase().includes(query.toLowerCase());

        const filterMatch =
          filter === 'all'
            ? true
            : filter === 'winners'
              ? driver.wins > 0
              : filter === 'multi'
                ? driver.wins >= 2
                : note.toLowerCase().includes('nascar');

        return searchMatch && filterMatch;
      })
      .sort((left, right) => {
        if (sort === 'name') {
          return left.name.localeCompare(right.name);
        }

        return right[sort] - left[sort];
      });
  }, [filter, query, sort]);
  const currentPath = `/drivers${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const activeFilterLabel = filters.find((item) => item.id === filter)?.label ?? 'Drivers';
  const driverItems = drivers.map((driver) => ({
    name: `${driver.name} Snowball Derby profile`,
    path: `/drivers/${getDriverSlug(driver.name)}`,
  }));

  usePageMetadata({
    title: 'Drivers',
    description: query
      ? `Search the Snowball Derby driver database for "${query}" with filters for winners, multi-win drivers, and NASCAR crossovers.`
      : 'Browse the Snowball Derby driver database with starts, wins, profile pages, and archive notes.',
    keywords: ['Snowball Derby drivers', 'Snowball Derby winners', 'Five Flags Speedway driver archive', activeFilterLabel],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Drivers', path: '/drivers' },
    ],
    schema: createWebPageSchema({
      name: 'Snowball Derby Driver Database',
      description: query
        ? `Search the Snowball Derby driver database for "${query}" with filters for winners, multi-win drivers, and NASCAR crossovers.`
        : 'Browse the Snowball Derby driver database with starts, wins, profile pages, and archive notes.',
      path: currentPath,
      type: 'CollectionPage',
      keywords: ['Snowball Derby drivers', 'Snowball Derby winners', 'Five Flags Speedway driver archive', activeFilterLabel],
      mainEntity: createItemList(driverItems),
    }),
  });

  const summaryCards = useMemo(() => {
    const totalDrivers = mergedDriverData.length;
    const winnerCount = mergedDriverData.filter((driver) => driver.wins > 0).length;
    const multiWinCount = mergedDriverData.filter((driver) => driver.wins >= 2).length;
    const nascarCount = mergedDriverData.filter((driver) =>
      formatDriverNote(driver.note).toLowerCase().includes('nascar'),
    ).length;

    return [
      {
        value: totalDrivers,
        label: 'Drivers Indexed',
        detail: 'Merged identities across the archive',
      },
      {
        value: winnerCount,
        label: 'Winners',
        detail: 'Drivers with at least one Derby victory',
      },
      {
        value: multiWinCount,
        label: 'Multi-Win Names',
        detail: 'The repeat champions worth comparing first',
      },
      {
        value: nascarCount,
        label: 'NASCAR Crossovers',
        detail: 'National-series names linked back to Five Flags',
      },
    ];
  }, []);

  return (
    <section className="page-section">
      <div className="container page-stack">
        <div className="section-heading">
          <p className="eyebrow">Driver Database</p>
          <h1 className="page-title">The drivers who kept showing up, winning, and shaping the Derby.</h1>
          <p className="page-intro">
            Search the field by starts, wins, and archive notes, then move into connected profile pages.
          </p>
        </div>

        <div className="profile-stat-grid">
          {summaryCards.map((card) => (
            <article className="stat-card" key={card.label}>
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
              <p className="stat-detail">{card.detail}</p>
            </article>
          ))}
        </div>

        <div className="filters-row">
          <div className="filter-tabs" role="tablist" aria-label="Driver filters">
            {filters.map((item) => (
              <button
                key={item.id}
                className={`filter-tab${filter === item.id ? ' is-active' : ''}`}
                type="button"
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  if (item.id === 'all') {
                    next.delete('filter');
                  } else {
                    next.set('filter', item.id);
                  }
                  setSearchParams(next);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <label className="search-field">
            <span className="sr-only">Search drivers</span>
            <input
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
              placeholder="Search names or notes"
              type="search"
              value={query}
            />
          </label>

          <label className="select-field">
            <span>Sort</span>
            <select
              onChange={(event) => {
                const next = new URLSearchParams(searchParams);
                if (event.target.value === 'starts') {
                  next.delete('sort');
                } else {
                  next.set('sort', event.target.value);
                }
                setSearchParams(next);
              }}
              value={sort}
            >
              <option value="starts">Starts</option>
              <option value="wins">Wins</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>

        <div className="archive-results-bar">
          <span>{drivers.length} drivers shown</span>
          <span>
            {filter === 'all'
              ? `All archive drivers in play • Sorted by ${sort}`
              : `Filter: ${filters.find((item) => item.id === filter)?.label} • Sorted by ${sort}`}
          </span>
        </div>

        {drivers.length ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Driver</th>
                  <th>Starts</th>
                  <th>Wins</th>
                  <th>Win Years</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.name}>
                    <td>
                      <Link className="text-link" to={`/drivers/${getDriverSlug(driver.name)}`}>
                        {driver.name}
                      </Link>
                    </td>
                    <td>{driver.starts}</td>
                    <td>{driver.wins}</td>
                    <td>{driver.winYears.length ? driver.winYears.join(', ') : '—'}</td>
                    <td>{formatDriverNote(driver.note)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <section className="detail-panel empty-state-panel">
            <p className="eyebrow">No Matches</p>
            <h2>No drivers match this search.</h2>
            <p>Try a broader search term or return to the full driver database.</p>
            <div className="empty-state-actions">
              <Link className="button button-primary button-small" to="/drivers">
                Reset driver filters
              </Link>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
