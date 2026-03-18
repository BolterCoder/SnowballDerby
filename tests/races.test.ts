import assert from 'node:assert/strict';
import test from 'node:test';

import type { Race } from '../src/types/content';
import {
  formatRaceResultLine,
  formatRaceResultStatus,
  formatRaceValue,
  getRacePoleDisplay,
  getRaceSnowflakeDisplay,
  getRaceStatNote,
} from '../src/lib/races';

test('formatRaceValue filters placeholder strings', () => {
  assert.equal(formatRaceValue('Page empty - no data available', ''), '');
  assert.equal(formatRaceValue('Unknown', 'Fallback'), 'Fallback');
  assert.equal(formatRaceValue('--'), 'Unavailable');
});

test('getRacePoleDisplay prefers fast qualifier and falls back cleanly', () => {
  const raceWithFastQualifier: Race = {
    year: 1969,
    winner: 'Friday Hassler',
    story: 'Test race.',
    pole: 'Unknown',
    fastQualifier: { driver: 'Friday Hassler', speed: '19.920 sec' },
  };

  const raceWithoutPole: Race = {
    year: 2000,
    winner: 'Gary St. Amant',
    story: 'Test race.',
  };

  assert.equal(getRacePoleDisplay(raceWithFastQualifier), 'Friday Hassler');
  assert.equal(getRacePoleDisplay(raceWithoutPole), 'Unknown');
});

test('getRaceStatNote clears archived empty placeholders', () => {
  const race: Race = {
    year: 1997,
    winner: 'Bobby Gill',
    story: 'Test race.',
    statisticallySpeaking: 'Page empty - no data available',
  };

  assert.equal(getRaceStatNote(race), '');
});

test('getRaceSnowflakeDisplay reports non-run support events clearly', () => {
  const race: Race = {
    year: 1971,
    winner: 'Dickie Davis',
    story: 'Test race.',
    snowflake: 'N/A',
  };

  assert.equal(getRaceSnowflakeDisplay(race), 'Not run');
});

test('formatRaceResultStatus normalizes common status labels', () => {
  assert.equal(formatRaceResultStatus('black flagged'), 'Black flagged');
  assert.equal(formatRaceResultStatus('running / DQ'), 'Running / DQ');
  assert.equal(formatRaceResultStatus('did not finish'), 'DNF');
  assert.equal(formatRaceResultStatus('did not return'), 'Did not return');
  assert.equal(formatRaceResultStatus('--'), '—');
});

test('formatRaceResultLine cleans archive placeholder phrasing', () => {
  assert.equal(formatRaceResultLine('2. (Historical records incomplete)'), '2. (Archived result unavailable)');
  assert.equal(formatRaceResultLine("Chase Elliott (DQ'd — tungsten weights)"), 'Chase Elliott (disqualified — tungsten weights)');
});
