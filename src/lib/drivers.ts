import { driverProfiles } from '../content/driverProfiles';
import { driverData } from '../data/drivers';
import type { Driver, DriverProfileContent, DriverRaceEntry, Race } from '../types/content';

const aliasMap: Record<string, string> = {
  'freddy fryar': 'freddie fryar',
  'gio ruggiero': 'giovanni ruggiero',
  'rich bickle jr': 'rich bickle',
  'treyten lapcevich': 'treyton lapcevich',
  'wayne niedecken': 'wayne niedecken sr',
};

export function normalizeDriverName(name: string) {
  const normalized = name
    .toLowerCase()
    .replace(/\s*\(.*?\)/g, '')
    .replace(/\b(sr|jr|iii|ii)\.?\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  return aliasMap[normalized] ?? normalized;
}

export function getDriverSlug(name: string) {
  return normalizeDriverName(name).replace(/\s+/g, '-');
}

function normalizeSentence(sentence: string) {
  if (!sentence) {
    return '';
  }

  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export function formatDriverNote(note: string) {
  const normalized = note
    .replace(/ALL-TIME WINS LEADER\.?/gi, 'All-time wins leader.')
    .replace(/\b(\d+)\+\s+starts\b/gi, 'At least $1 starts')
    .replace(/\bDQ['’]?d\b/gi, 'disqualified')
    .replace(/\bDQ\b/gi, 'disqualification')
    .replace(/\s+/g, ' ')
    .trim();

  const sentences = normalized
    .split('. ')
    .map((sentence) => sentence.trim().replace(/\.+$/g, ''))
    .filter(Boolean)
    .map(normalizeSentence);

  return sentences.join('. ') + (sentences.length ? '.' : '');
}

function buildDriverHeadline(driver: Driver) {
  if (driver.wins >= 5) {
    return 'The all-time Derby benchmark.';
  }

  if (driver.wins >= 2) {
    return 'A multi-time Snowball Derby winner.';
  }

  if (driver.wins === 1) {
    return 'A Snowball Derby winner.';
  }

  if (driver.starts >= 15) {
    return 'One of the Derby’s long-haul regulars.';
  }

  return 'A connected figure in the Snowball Derby archive.';
}

function buildDriverHighlights(driver: Driver) {
  const highlights: string[] = [];

  if (driver.wins > 0) {
    highlights.push(`${driver.wins} Derby win${driver.wins === 1 ? '' : 's'}`);
  }

  if (driver.starts > 0) {
    highlights.push(`${driver.starts} documented start${driver.starts === 1 ? '' : 's'}`);
  }

  if (driver.winYears.length) {
    highlights.push(`Won in ${driver.winYears.join(', ')}`);
  } else if (driver.years.length) {
    const firstYear = Math.min(...driver.years);
    const lastYear = Math.max(...driver.years);
    highlights.push(firstYear === lastYear ? `Active in ${firstYear}` : `Active from ${firstYear} to ${lastYear}`);
  }

  return highlights.slice(0, 3);
}

function buildDriverSummary(driver: Driver) {
  const firstYear = driver.years.length ? Math.min(...driver.years) : null;
  const lastYear = driver.years.length ? Math.max(...driver.years) : null;
  const span =
    firstYear && lastYear
      ? firstYear === lastYear
        ? `in ${firstYear}`
        : `from ${firstYear} to ${lastYear}`
      : 'across the archive';
  const note = formatDriverNote(driver.note);

  if (driver.wins > 0) {
    return `${driver.name} made ${driver.starts} documented Snowball Derby starts ${span} and won ${driver.wins} time${
      driver.wins === 1 ? '' : 's'
    }. ${note}`;
  }

  return `${driver.name} made ${driver.starts} documented Snowball Derby starts ${span}. ${note}`;
}

function mergeDriverRecords(records: Driver[]) {
  const merged = new Map<string, Driver>();

  for (const record of records) {
    const key = normalizeDriverName(record.name);
    const existing = merged.get(key);

    if (!existing) {
      merged.set(key, {
        ...record,
        years: [...record.years].sort((a, b) => a - b),
        winYears: [...record.winYears].sort((a, b) => a - b),
        note: formatDriverNote(record.note),
      });
      continue;
    }

    const combinedNotes = new Set(
      `${existing.note} ${record.note}`
        .split('. ')
        .map((part) => part.trim())
        .filter(Boolean),
    );

    merged.set(key, {
      ...existing,
      starts: Math.max(existing.starts, record.starts),
      wins: Math.max(existing.wins, record.wins),
      years: Array.from(new Set([...existing.years, ...record.years])).sort((a, b) => a - b),
      winYears: Array.from(new Set([...existing.winYears, ...record.winYears])).sort((a, b) => a - b),
      note: formatDriverNote(Array.from(combinedNotes).join('. ')),
    });
  }

  return Array.from(merged.values());
}

export const mergedDriverData = mergeDriverRecords(driverData);

export function getDriverBySlug(slug: string) {
  return mergedDriverData.find((driver) => getDriverSlug(driver.name) === slug);
}

export function getDriverPath(name: string) {
  const driver = mergedDriverData.find((entry) => normalizeDriverName(entry.name) === normalizeDriverName(name));
  return driver ? `/drivers/${getDriverSlug(driver.name)}` : null;
}

export function getDriverProfileContent(slug: string) {
  return driverProfiles[slug];
}

export function getDriverProfilePresentation(driver: Driver): DriverProfileContent {
  const curated = driverProfiles[getDriverSlug(driver.name)] ?? {};

  return {
    ...curated,
    headline: curated.headline ?? buildDriverHeadline(driver),
    summary: curated.summary ?? buildDriverSummary(driver),
    highlights: curated.highlights?.length ? curated.highlights : buildDriverHighlights(driver),
  };
}

export function getDriverRaceEntries(driver: Driver, races: Race[]): DriverRaceEntry[] {
  const target = normalizeDriverName(driver.name);

  return races
    .filter((race) => {
      const inWinner = normalizeDriverName(race.winner) === target;
      const inResults = race.fullResults?.some((entry) => entry.driver && normalizeDriverName(entry.driver) === target);
      const inNotable = race.notableEntrants?.some((entry) => normalizeDriverName(entry) === target);
      const inDnq = race.dnq?.some((entry) => normalizeDriverName(entry) === target);
      const inDns = race.dns?.some((entry) => normalizeDriverName(entry) === target);

      return Boolean(inWinner || inResults || inNotable || inDnq || inDns);
    })
    .map((race) => {
      const resultEntry = race.fullResults?.find(
        (entry) => entry.driver && normalizeDriverName(entry.driver) === target,
      );

      let summary = 'Entered the race';

      if (normalizeDriverName(race.winner) === target) {
        summary = 'Won the Snowball Derby';
      } else if (resultEntry?.finish) {
        summary = `Finished ${resultEntry.finish}`;
      } else if (race.dnq?.some((entry) => normalizeDriverName(entry) === target)) {
        summary = 'Did not qualify';
      } else if (race.dns?.some((entry) => normalizeDriverName(entry) === target)) {
        summary = 'Did not start';
      } else if (race.notableEntrants?.some((entry) => normalizeDriverName(entry) === target)) {
        summary = 'Listed as a notable entrant';
      }

      return {
        year: race.year,
        winner: race.winner,
        summary,
        href: `/races/${race.year}`,
        isWinner: normalizeDriverName(race.winner) === target,
      };
    })
    .sort((left, right) => right.year - left.year);
}

export function getDriverBestFinish(driver: Driver, races: Race[]) {
  const target = normalizeDriverName(driver.name);
  const finishes = races
    .flatMap((race) => race.fullResults ?? [])
    .filter((entry) => entry.driver && normalizeDriverName(entry.driver) === target)
    .map((entry) => entry.finish)
    .filter((finish): finish is number => typeof finish === 'number');

  if (driver.wins > 0) {
    return 1;
  }

  return finishes.length ? Math.min(...finishes) : null;
}
