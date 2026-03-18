import { raceMetadataByYear } from '../content/raceMetadata';
import { defaultRaceMedia, raceMediaByYear } from '../content/raceMedia';
import { getDriverPath } from './drivers';
import type { Driver, Race, RaceMediaItem, RaceMetadata, RaceRelation, RaceTag, RelatedDriver } from '../types/content';

const emptyRaceValues = new Set(['', '--', 'n/a', 'na', 'unknown', 'page empty - no data available']);

export function getRaceEra(year: number) {
  if (year >= 1968 && year <= 1987) {
    return 'pioneer';
  }

  if (year >= 1988 && year <= 2009) {
    return 'golden';
  }

  return 'modern';
}

export function formatRaceDate(date?: string) {
  if (!date) {
    return 'Date unavailable';
  }

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(parsed);
}

export function getRaceExcerpt(race: Race) {
  const [firstSentence] = race.story.split('. ');
  return firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`;
}

export function formatRaceValue(value: unknown, fallback = 'Unavailable') {
  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value !== 'string') {
    return fallback;
  }

  const normalized = value.replace(/\s+/g, ' ').trim();

  if (!normalized || emptyRaceValues.has(normalized.toLowerCase())) {
    return fallback;
  }

  return normalized;
}

export function getRacePoleDisplay(race: Race) {
  return formatRaceValue(race.fastQualifier?.driver ?? race.pole, 'Unknown');
}

export function getRaceFastTimeDisplay(race: Race) {
  return formatRaceValue(race.fastQualifier?.speed, 'Unavailable');
}

export function getRaceStatNote(race: Race) {
  return formatRaceValue(race.statisticallySpeaking, '');
}

export function getRaceSnowflakeDisplay(race: Race) {
  if (!race.snowflake) {
    return 'Unavailable';
  }

  const normalized = race.snowflake.replace(/\s+/g, ' ').trim().toLowerCase();

  if (normalized === 'n/a' || normalized === 'na') {
    return 'Not run';
  }

  return formatRaceValue(race.snowflake, 'Unavailable');
}

export function formatRaceResultStatus(status?: string) {
  const normalized = status?.replace(/\s+/g, ' ').trim().toLowerCase();

  if (!normalized || emptyRaceValues.has(normalized)) {
    return '—';
  }

  const mappedStatuses: Record<string, string> = {
    running: 'Running',
    accident: 'Accident',
    crash: 'Crash',
    engine: 'Engine',
    transmission: 'Transmission',
    clutch: 'Clutch',
    battery: 'Battery',
    mechanical: 'Mechanical',
    suspension: 'Suspension',
    dq: 'DQ',
    dnf: 'DNF',
    'did not finish': 'DNF',
    'did not return': 'Did not return',
    'did not start': 'DNS',
    'did not qualify': 'DNQ',
    'black flagged': 'Black flagged',
  };

  const formatStatusToken = (token: string) => {
    const trimmed = token.trim();
    return mappedStatuses[trimmed] ?? trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  if (normalized.includes('/')) {
    return normalized
      .split('/')
      .map((token) => formatStatusToken(token))
      .join(' / ');
  }

  return formatStatusToken(normalized);
}

export function formatRaceResultLine(result: string) {
  return result
    .replace(/\(historical records incomplete\)/gi, '(Archived result unavailable)')
    .replace(/historical records incomplete/gi, 'archived result unavailable')
    .replace(/\bDQ['’]?d\b/gi, 'disqualified')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchesRaceQuery(race: Race, query: string) {
  if (!query) {
    return true;
  }

  const term = query.toLowerCase();
  const haystack = [
    String(race.year),
    race.winner,
    race.story,
    race.pole,
    race.statisticallySpeaking,
    race.fastQualifier?.driver,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(term);
}

export function sortRacesDescending(races: Race[]) {
  return [...races].sort((a, b) => b.year - a.year);
}

export function getTopWinner(drivers: Driver[]) {
  return [...drivers].sort((a, b) => b.wins - a.wins || b.starts - a.starts)[0];
}

export function getUniqueWinnerCount(races: Race[]) {
  return new Set(races.map((race) => race.winner)).size;
}

export function getStatCards(races: Race[], drivers: Driver[]) {
  const topWinner = getTopWinner(drivers);

  return [
    { label: 'Races Run', value: String(races.length), detail: '1968 to 2025' },
    {
      label: 'Documented Drivers',
      value: String(drivers.length),
      detail: 'Searchable database',
    },
    {
      label: 'Unique Winners',
      value: String(getUniqueWinnerCount(races)),
      detail: 'Across every era',
    },
    {
      label: 'All-Time Wins Leader',
      value: `${topWinner.name} (${topWinner.wins})`,
      detail: 'Built from the driver dataset',
    },
  ];
}

function normalizePersonName(name: string) {
  return name
    .replace(/\s*\(.*\)/g, '')
    .replace(/\b(Sr\.|Jr\.|III|II)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function getPoleWinnerRows(races: Race[]) {
  return sortRacesDescending(races).map((race) => {
    const poleDriver = race.fastQualifier?.driver ?? race.pole ?? '';
    const poleTime = race.fastQualifier?.speed ?? '';
    const poleWon =
      poleDriver !== '' &&
      poleDriver.toLowerCase() !== 'unknown' &&
      normalizePersonName(poleDriver) === normalizePersonName(race.winner);

    return {
      year: race.year,
      poleDriver: poleDriver || '—',
      poleTime: poleTime || '—',
      winner: race.winner,
      poleWon,
    };
  });
}

function normalizeRacePerson(name: string) {
  return name
    .toLowerCase()
    .replace(/\s*\(.*?\)/g, '')
    .replace(/\b(sr|jr|iii|ii)\.?\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getRacePeople(race: Race) {
  const seen = new Set<string>();
  const people: string[] = [];

  const push = (name?: string) => {
    if (!name) {
      return;
    }

    const normalized = normalizeRacePerson(name);
    if (!normalized || normalized === 'unknown' || seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    people.push(name);
  };

  push(race.winner);
  push(race.fastQualifier?.driver);
  push(race.pole);

  for (const result of race.fullResults ?? []) {
    if (typeof result.finish === 'number' && result.finish <= 5) {
      push(result.driver);
    }
  }

  for (const entrant of race.notableEntrants ?? []) {
    push(entrant);
  }

  return people;
}

function getSharedRacePeople(race: Race, candidate: Race) {
  const candidatePeople = new Map(
    getRacePeople(candidate).map((name) => [normalizeRacePerson(name), name] as const),
  );

  return getRacePeople(race)
    .map((name) => candidatePeople.get(normalizeRacePerson(name)))
    .filter((name): name is string => Boolean(name));
}

function formatSharedLabels(tags: RaceTag[]) {
  const labels = tags.map((tag) => tag.label.toLowerCase());

  if (labels.length <= 2) {
    return labels.join(' and ');
  }

  return `${labels.slice(0, 2).join(', ')}, and more`;
}

function getExplicitRaceLink(sourceYear: number, targetYear: number) {
  return raceMetadataByYear[sourceYear]?.relatedRaces?.find((entry) => entry.year === targetYear);
}

const weightedTagScores: Record<string, number> = {
  controversy: 4,
  'post-race-dq': 4,
  'modern-flashpoint': 3,
  redemption: 3,
  'female-winner': 4,
  'closest-finish': 4,
  'youngest-winner': 4,
  inaugural: 5,
  'event-origin': 5,
  'distance-change': 4,
  '300-lap-era': 2,
  'local-win': 3,
  'redemption-setup': 3,
  'multi-win-arc': 3,
  'modern-benchmark': 3,
  'barrier-breaker': 4,
  'scoring-dispute': 4,
  'technology-shift': 4,
  'nascar-crossover': 3,
  'record-purse': 4,
  'long-wait': 4,
  anniversary: 2,
  'national-spotlight': 3,
  'female-pole': 4,
  breakthrough: 3,
  'v6-winner': 4,
};

export function getRaceMediaItems(race: Race) {
  const items: RaceMediaItem[] = [];
  const seenImageSrcs = new Set<string>();
  const customItems = raceMediaByYear[race.year] ?? [];

  for (const item of customItems) {
    if (item.src) {
      seenImageSrcs.add(item.src);
    }
    items.push(item);
  }

  if (race.image && customItems.length === 0) {
    const fallbackSrc = `/${race.image.replace(/^images\//, 'images/')}`;
    if (!seenImageSrcs.has(fallbackSrc)) {
      items.push({
        type: 'image',
        title: `${race.winner} in ${race.year}`,
        src: fallbackSrc,
        alt: `${race.winner} ${race.year}`,
      });
    }
  }

  if (!items.some((item) => item.type === 'image')) {
    for (const item of defaultRaceMedia) {
      if (item.src && seenImageSrcs.has(item.src)) {
        continue;
      }

      if (item.src) {
        seenImageSrcs.add(item.src);
      }

      items.push(item);
    }
  }

  for (const note of race.gallery ?? []) {
    items.push({
      type: 'note',
      title: note,
    });
  }

  return items;
}

export function getRaceMetadata(race: Race) {
  return raceMetadataByYear[race.year];
}

export function getRaceTags(race: Race) {
  const tags: RaceTag[] = [
    { id: getRaceEra(race.year), label: `${getRaceEra(race.year)} era` },
  ];
  const explicitTags = raceMetadataByYear[race.year]?.tags ?? [];

  if (race.controversy) {
    tags.push({ id: 'controversy', label: 'Controversy' });
  }

  const femaleWinners = new Set(['tammy jo kirk', 'johanna long']);
  if (femaleWinners.has(normalizeRacePerson(race.winner))) {
    tags.push({ id: 'female-winner', label: 'Historic female winner' });
  }

  if (
    race.fastQualifier?.driver &&
    normalizeRacePerson(race.fastQualifier.driver) === normalizeRacePerson(race.winner)
  ) {
    tags.push({ id: 'pole-to-win', label: 'Pole-to-win' });
  }

  if ((race.notableEntrants?.length ?? 0) >= 6) {
    tags.push({ id: 'deep-field', label: 'Deep notable field' });
  }

  if (race.laps === 300) {
    tags.push({ id: '300-lap-era', label: '300-lap era' });
  }

  const deduped = new Map<string, RaceTag>();
  for (const tag of [...explicitTags, ...tags]) {
    deduped.set(tag.id, tag);
  }

  return Array.from(deduped.values());
}

export function getRelatedDriversForRace(race: Race) {
  const seen = new Set<string>();
  const drivers: RelatedDriver[] = [];

  const pushDriver = (name: string | undefined, role: string) => {
    if (!name) {
      return;
    }

    const normalized = normalizeRacePerson(name);
    if (!normalized || seen.has(normalized)) {
      return;
    }

    const href = getDriverPath(name);
    if (!href) {
      return;
    }

    seen.add(normalized);
    drivers.push({ name, role, href });
  };

  pushDriver(race.winner, 'Winner');
  pushDriver(race.fastQualifier?.driver ?? race.pole, 'Pole winner');

  for (const result of race.fullResults ?? []) {
    if (drivers.length >= 6) {
      break;
    }

    if (typeof result.finish === 'number' && result.finish <= 5) {
      pushDriver(result.driver, `Finished ${result.finish}`);
    }
  }

  for (const entrant of race.notableEntrants ?? []) {
    if (drivers.length >= 8) {
      break;
    }

    pushDriver(entrant, 'Notable entrant');
  }

  return drivers;
}

export function getRelatedRaces(race: Race, races: Race[]) {
  const raceTags = new Set(getRaceTags(race).map((tag) => tag.id));

  return sortRacesDescending(races)
    .filter((candidate) => candidate.year !== race.year)
    .map((candidate) => {
      const directLink = getExplicitRaceLink(race.year, candidate.year);
      const reverseLink = getExplicitRaceLink(candidate.year, race.year);
      const explicitLink = directLink ?? reverseLink;
      let score = 0;
      let reason = `${candidate.year}`;
      let description = getRaceExcerpt(candidate);
      const candidateTags = getRaceTags(candidate);
      const sharedTags = candidateTags.filter((tag) => raceTags.has(tag.id));
      const sharedTagScore = sharedTags.reduce((total, tag) => total + (weightedTagScores[tag.id] ?? 2), 0);
      const sharedPeople = getSharedRacePeople(race, candidate);

      if (explicitLink) {
        score += 14 + (explicitLink.weight ?? 0);
        reason = explicitLink.label;
        description = explicitLink.description;
      }

      if (normalizeRacePerson(candidate.winner) === normalizeRacePerson(race.winner)) {
        score += 7;
        if (!explicitLink) {
          reason = 'Shared winner';
          description = `${candidate.winner} won both races, making this a direct winner callback in Derby history.`;
        }
      }

      if (getRaceEra(candidate.year) === getRaceEra(race.year)) {
        score += 1;
      }

      if (Boolean(candidate.controversy) === Boolean(race.controversy) && candidate.controversy) {
        score += 3;
        if (!explicitLink && !sharedTags.length) {
          reason = 'Controversy thread';
          description = 'Another controversy-linked Derby finish with the result shaped after the race itself.';
        }
      }

      if (sharedTagScore) {
        score += sharedTagScore;
        if (!explicitLink && sharedTagScore >= 4) {
          reason = sharedTags[0].label;
          description = `Shares ${formatSharedLabels(sharedTags)} with this race.`;
        }
      }

      const femaleWinners = new Set(['tammy jo kirk', 'johanna long']);
      if (
        femaleWinners.has(normalizeRacePerson(candidate.winner)) &&
        femaleWinners.has(normalizeRacePerson(race.winner))
      ) {
        score += 5;
        if (!explicitLink) {
          reason = 'Barrier-breaker parallel';
          description = 'Another historic female-winning Derby that sits in the same milestone lane.';
        }
      }

      if (sharedPeople.length) {
        score += Math.min(6, sharedPeople.length * 2);
        if (!explicitLink && sharedPeople.length >= 2) {
          reason = 'Shared driver thread';
          description = `Connects through ${sharedPeople.slice(0, 3).join(', ')} in the same Derby orbit.`;
        }
      }

      if (Math.abs(candidate.year - race.year) === 1) {
        score += 1;
        if (!explicitLink && score >= 6) {
          reason = 'Adjacent chapter';
        }
      }

      return {
        year: candidate.year,
        title: `${candidate.year} • ${candidate.winner}`,
        reason,
        description,
        href: `/races/${candidate.year}`,
        score,
        explicit: Boolean(explicitLink),
      };
    })
    .filter((candidate) => candidate.explicit || candidate.score >= 5)
    .sort((left, right) => right.score - left.score || right.year - left.year)
    .slice(0, 4)
    .map(({ year, title, reason, description, href }) => ({ year, title, reason, description, href } satisfies RaceRelation));
}
