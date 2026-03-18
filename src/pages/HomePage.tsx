import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { originStoryBeats, pensacolaStoryBeats } from '../content/history';
import { quotes } from '../content/quotes';
import { driverData } from '../data/drivers';
import { raceData } from '../data/races';
import { getRaceExcerpt, getStatCards, sortRacesDescending } from '../lib/races';
import { createFAQSchema, createItemList, createWebPageSchema, usePageMetadata } from '../lib/seo';
import type { Race } from '../types/content';

const featuredYears = [2025, 2011, 1994];
const homeFaqs = [
  {
    question: 'What is the Snowball Derby?',
    answer:
      'The Snowball Derby is a prestigious annual super late model stock car race that has been run at Five Flags Speedway in Pensacola, Florida since 1968.',
  },
  {
    question: 'Where is the Snowball Derby held?',
    answer:
      'The race is held at Five Flags Speedway, a half-mile paved oval in Pensacola, Florida that has become one of the most important short-track venues in the United States.',
  },
  {
    question: 'When is the Snowball Derby run?',
    answer:
      'The Snowball Derby is traditionally run in early December as the centerpiece of a larger Five Flags Speedway weekend that also includes the Snowflake 100 and support divisions.',
  },
  {
    question: 'Why does the Snowball Derby matter?',
    answer:
      'The Derby matters because it blends local short-track history with national-level talent, and many future NASCAR stars used Five Flags as a proving ground before moving into bigger series.',
  },
] as const;

export function HomePage() {
  const archiveItems = sortRacesDescending(raceData).slice(0, 12).map((race) => ({
    name: `${race.year} Snowball Derby won by ${race.winner}`,
    path: `/races/${race.year}`,
  }));

  usePageMetadata({
    title: 'Home',
    description:
      'Explore Snowball Derby history through race pages, driver profiles, records, timelines, and Five Flags Speedway context.',
    image: '/images/Turn 1 Shot.jpg',
    keywords: ['Snowball Derby', 'Five Flags Speedway', 'Pensacola racing', 'short track racing', 'super late model racing'],
    breadcrumbs: [{ name: 'Home', path: '/' }],
    schema: [
      createWebPageSchema({
        name: 'Snowball Derby Archive',
        description:
          'Explore Snowball Derby history through race pages, driver profiles, records, timelines, and Five Flags Speedway context.',
        path: '/',
        type: 'CollectionPage',
        image: '/images/Turn 1 Shot.jpg',
        keywords: ['Snowball Derby', 'Five Flags Speedway', 'Pensacola racing', 'short track racing', 'super late model racing'],
        about: [
          {
            '@type': 'SportsEvent',
            name: 'Snowball Derby',
            sport: 'Auto racing',
          },
          {
            '@type': 'Place',
            name: 'Five Flags Speedway',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Pensacola',
              addressRegion: 'FL',
              addressCountry: 'US',
            },
          },
        ],
        mainEntity: createItemList(archiveItems),
      }),
      createFAQSchema([...homeFaqs]),
    ],
  });

  const [quoteIndex, setQuoteIndex] = useState(0);
  const featuredRaces = featuredYears
    .map((year) => raceData.find((race) => race.year === year))
    .filter((race): race is Race => Boolean(race));
  const statCards = getStatCards(raceData, driverData);
  const latestRace = sortRacesDescending(raceData)[0] ?? raceData[0];
  const activeQuote = quotes[quoteIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-media">
          <img alt="Turn 1 action at Five Flags Speedway" src="/images/Turn 1 Shot.jpg" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <div className="hero-layout">
            <div className="hero-main">
              <p className="eyebrow">Five Flags Speedway • Pensacola, Florida</p>
              <h1 className="hero-title">America&apos;s toughest short track race, organized year by year.</h1>
              <p className="hero-copy">
                Move through race stories, driver profiles, records, timeline turns, and the wider
                Five Flags weekend without losing the event&apos;s cinematic tone.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" to="/races">
                  Explore the archive
                </Link>
                <Link className="button button-secondary" to={`/races/${latestRace.year}`}>
                  Open latest race
                </Link>
              </div>
            </div>

            <aside className="hero-sidecar">
              <p className="eyebrow">Latest Running</p>
              <h2>{latestRace.year} Snowball Derby</h2>
              <p className="hero-sidecar-copy">{getRaceExcerpt(latestRace)}</p>
              <div className="hero-sidecar-meta">
                <span>{latestRace.winner}</span>
                <span>{latestRace.laps} laps</span>
                <span>{latestRace.purse}</span>
              </div>
              <div className="hero-sidecar-stats">
                <div>
                  <strong>{raceData.length}</strong>
                  <span>Race pages</span>
                </div>
                <div>
                  <strong>{driverData.length}</strong>
                  <span>Drivers tracked</span>
                </div>
              </div>
              <Link className="text-link" to={`/races/${latestRace.year}`}>
                Step into the latest chapter
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container page-stack">
          <div className="section-heading">
            <p className="eyebrow">Since 1968</p>
            <h2 className="section-title">The long-form story still matters because every December rewrites it.</h2>
          </div>

          <div className="detail-grid home-story-grid">
            <article className="detail-panel home-story-panel">
              <p>
                Every December, the best short-track racers in the country descend on Pensacola for
                300 laps of attrition, precision, and pressure on a half-mile oval that separates
                legends from everyone else.
              </p>
              <p>
                Before they were NASCAR champions, names like Chase Elliott, Kyle Busch, Darrell
                Waltrip, Erik Jones, and Noah Gragson used Five Flags as a proving ground.
              </p>
              <p>
                This archive follows that history the same way the event happened: one race, one
                era, one rivalry, and one turning point at a time.
              </p>
            </article>
            <article className="detail-panel home-image-panel">
              <img
                alt="Grandstand view of the Snowball Derby"
                className="feature-image"
                src="/images/Turn 1 Grandstand Snowball Derby.jpg"
              />
            </article>
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container page-stack">
          <div className="section-heading">
            <p className="eyebrow">Origin Story</p>
            <h2 className="section-title">The Derby started as a Pensacola idea before it became a national obsession.</h2>
            <p className="page-intro">
              The original version carried more of this texture, so it belongs back in the front of
              the archive: Tom Dawson, the freezing inaugural night, the press-box fire, and the
              way Five Flags became a December landmark one hard year at a time.
            </p>
          </div>

          <div className="card-grid">
            {originStoryBeats.map((beat) => (
              <article className="archive-card" key={beat.title}>
                <div className="archive-card-topline">
                  <span>{beat.eyebrow}</span>
                  <span>History</span>
                </div>
                <img alt={beat.alt} className="archive-preview-image" src={beat.image} />
                <h3>{beat.title}</h3>
                <p>{beat.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container page-stack">
          <div className="section-heading">
            <p className="eyebrow">Quick Answers</p>
            <h2 className="section-title">The fastest way to understand what this archive covers.</h2>
          </div>
          <div className="feature-grid">
            {homeFaqs.map((item) => (
              <article className="feature-panel" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container page-stack">
          <div className="section-heading">
            <p className="eyebrow">By The Numbers</p>
            <h2 className="section-title">The scale of the Derby shows up in every era.</h2>
          </div>
          <div className="stats-grid">
            {statCards.map((card) => (
              <article className="stat-card" key={card.label}>
                <div className="stat-value">{card.value}</div>
                <div className="stat-label">{card.label}</div>
                <p className="stat-detail">{card.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container page-stack">
          <div className="section-heading">
            <p className="eyebrow">Voices</p>
            <h2 className="section-title">The Derby has always been told through its own voices.</h2>
          </div>
          <article className="quote-panel">
            <p className="quote-text">“{activeQuote.text}”</p>
            <div className="quote-meta">
              <strong>{activeQuote.person}</strong>
              <span>{activeQuote.context}</span>
            </div>
            <div className="quote-dots">
              {quotes.map((quote, index) => (
                <button
                  key={`${quote.person}-${index}`}
                  className={`quote-dot${quoteIndex === index ? ' is-active' : ''}`}
                  type="button"
                  onClick={() => setQuoteIndex(index)}
                />
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="container page-stack">
          <div className="section-heading">
            <p className="eyebrow">Pensacola Pulse</p>
            <h2 className="section-title">The hometown layer is not side context. It is part of the Derby’s identity.</h2>
          </div>

          <div className="detail-grid home-pensacola-grid">
            <article className="detail-panel detail-panel-band">
              <h3>Why the local thread matters</h3>
              <p>
                Pensacola is not just where the Derby happens. It is why the Derby feels different.
                The founders, the early winners, the hometown near-misses, and the way the crowd
                reacts to local drivers all shape how the race is remembered.
              </p>
              <p>
                That is why the archive needs more than results and records. It needs the local
                through-line that ties Tom Dawson, Wayne Niedecken Sr., Eddie Mercer, Johanna Long,
                and Five Flags itself into one shared story.
              </p>
              <div className="archive-card-actions">
                <Link className="button button-primary button-small" to="/legends">
                  Open Pensacola legends
                </Link>
                <Link className="button button-secondary button-small" to="/event">
                  Open Five Flags context
                </Link>
              </div>
            </article>

            <div className="stack-list">
              {pensacolaStoryBeats.map((beat) => (
                <article className="stack-item" key={beat.title}>
                  <p className="eyebrow">{beat.eyebrow}</p>
                  <h3>{beat.title}</h3>
                  <p>{beat.description}</p>
                  <Link className="text-link" to={beat.to}>
                    {beat.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container page-stack">
          <div className="section-heading">
            <p className="eyebrow">Featured Races</p>
            <h2 className="section-title">Start with the years that still frame the conversation.</h2>
          </div>
          <div className="card-grid">
            {featuredRaces.map((race) => (
              <article className="archive-card" key={race.year}>
                <div className="archive-card-topline">
                  <span>{race.year}</span>
                  <span>{race.order}</span>
                </div>
                {race.image ? (
                  <img
                    alt={`${race.winner} ${race.year}`}
                    className="archive-preview-image"
                    src={`/${race.image.replace(/^images\//, 'images/')}`}
                  />
                ) : null}
                <h3>{race.winner}</h3>
                <p>{getRaceExcerpt(race)}</p>
                <div className="archive-meta">
                  <span>{race.laps} laps</span>
                  <span>{race.purse}</span>
                </div>
                <div className="archive-card-actions">
                  <Link className="button button-primary button-small" to={`/races/${race.year}`}>
                    Read race detail
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container page-stack">
          <div className="section-heading">
            <p className="eyebrow">Archive Map</p>
            <h2 className="section-title">There are a few clean ways into the Derby story.</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-panel">
              <p className="eyebrow">Archive</p>
              <h3>Race history</h3>
              <p>Every running can be opened as its own story with results, media, and related context.</p>
              <Link className="text-link" to="/races">
                Open race archive
              </Link>
            </article>
            <article className="feature-panel">
              <p className="eyebrow">People</p>
              <h3>Drivers and legends</h3>
              <p>The people who built the event connect across profile pages, legend sections, and race pages.</p>
              <Link className="text-link" to="/drivers">
                Browse drivers
              </Link>
            </article>
            <article className="feature-panel">
              <p className="eyebrow">Context</p>
              <h3>Records and timeline</h3>
              <p>The record book and chronology give the archive a way to compare eras instead of just listing winners.</p>
              <Link className="text-link" to="/timeline">
                Open timeline
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
