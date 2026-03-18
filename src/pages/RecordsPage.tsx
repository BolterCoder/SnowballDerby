import { Link } from 'react-router-dom';
import { ContinueExploring } from '../components/ContinueExploring';
import { controversies, milestones, recordCards } from '../content/records';
import { raceData } from '../data/races';
import { getDriverPath } from '../lib/drivers';
import { getPoleWinnerRows } from '../lib/races';
import { createWebPageSchema, usePageMetadata } from '../lib/seo';

export function RecordsPage() {
  usePageMetadata({
    title: 'Records',
    description:
      'Explore Snowball Derby records, qualifying history, controversies, and milestone years from the archive.',
    keywords: ['Snowball Derby records', 'Snowball Derby controversies', 'Snowball Derby milestones'],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Records', path: '/records' },
    ],
    schema: createWebPageSchema({
      name: 'Snowball Derby Records',
      description:
        'Explore Snowball Derby records, qualifying history, controversies, and milestone years from the archive.',
      path: '/records',
      type: 'CollectionPage',
      keywords: ['Snowball Derby records', 'Snowball Derby controversies', 'Snowball Derby milestones'],
    }),
  });

  const poleRows = getPoleWinnerRows(raceData);

  return (
    <section className="page-section">
      <div className="container page-stack">
        <div className="section-heading">
          <p className="eyebrow">Records</p>
          <h1 className="page-title">The record book, milestone years, and controversy log.</h1>
          <p className="page-intro">
            Wins, poles, milestones, and disputes belong in one place so the event’s history can be
            compared, not just remembered.
          </p>
        </div>

        <div className="stats-grid">
          {recordCards.map((record) => (
            <article className="stat-card" key={record.title}>
              <div className="stat-value">{record.value}</div>
              <div className="stat-label">{record.title}</div>
              <p className="stat-detail">{record.holder}</p>
            </article>
          ))}
        </div>

        <section className="detail-panel">
          <div className="section-heading">
            <p className="eyebrow">Qualifying</p>
            <h2 className="section-title">Pole winners and race winners across every running.</h2>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Pole Winner</th>
                  <th>Time</th>
                  <th>Race Winner</th>
                  <th>Pole Won?</th>
                </tr>
              </thead>
              <tbody>
                {poleRows.map((row) => (
                  <tr key={row.year}>
                    <td>
                      <Link className="text-link" to={`/races/${row.year}`}>
                        {row.year}
                      </Link>
                    </td>
                    <td>
                      {getDriverPath(row.poleDriver) ? (
                        <Link className="text-link" to={getDriverPath(row.poleDriver) ?? '#'}>
                          {row.poleDriver}
                        </Link>
                      ) : (
                        row.poleDriver
                      )}
                    </td>
                    <td>{row.poleTime}</td>
                    <td>
                      {getDriverPath(row.winner) ? (
                        <Link className="text-link" to={getDriverPath(row.winner) ?? '#'}>
                          {row.winner}
                        </Link>
                      ) : (
                        row.winner
                      )}
                    </td>
                    <td>{row.poleWon ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="detail-grid">
          <section className="detail-panel">
            <div className="section-heading">
              <p className="eyebrow">Controversies</p>
              <h2 className="section-title">Historic disputes and disqualifications</h2>
            </div>
            <div className="stack-list">
              {controversies.map((item) => (
                <article className="stack-item" key={`${item.year}-${item.title}`}>
                  <p className="eyebrow">{item.year}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link className="text-link" to={`/races/${item.year}`}>
                    Open {item.year} race page
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-panel">
            <div className="section-heading">
              <p className="eyebrow">Milestones</p>
              <h2 className="section-title">Key years in Derby history</h2>
            </div>
            <div className="stack-list">
              {milestones.map((item) => (
                <article className="stack-item" key={`${item.year}-${item.text}`}>
                  <p className="eyebrow">{item.year}</p>
                  <p>{item.text}</p>
                  <Link className="text-link" to={`/races/${item.year}`}>
                    Open {item.year} race page
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>

        <ContinueExploring
          title="Move from the numbers back into the stories"
          items={[
            {
              title: 'Race archive',
              description: 'Open the individual race pages behind the milestones, controversies, and qualifying benchmarks.',
              to: '/races',
              cta: 'Browse races',
              eyebrow: 'Archive',
            },
            {
              title: 'Historical timeline',
              description: 'See how the record-book moments line up across the Derby’s three major eras.',
              to: '/timeline',
              cta: 'Open timeline',
              eyebrow: 'Chronology',
            },
            {
              title: 'Event context',
              description: 'Step out from the stats and into Five Flags, Derby weekend, and the NASCAR pipeline.',
              to: '/event',
              cta: 'View event page',
              eyebrow: 'Weekend',
            },
          ]}
        />
      </div>
    </section>
  );
}
