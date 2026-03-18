import assert from 'node:assert/strict';
import test from 'node:test';

import { driverData } from '../src/data/drivers';
import {
  formatDriverNote,
  getDriverBySlug,
  getDriverProfilePresentation,
  getDriverSlug,
  normalizeDriverName,
} from '../src/lib/drivers';

test('normalizeDriverName resolves legacy aliases', () => {
  assert.equal(normalizeDriverName('Gio Ruggiero'), 'giovanni ruggiero');
  assert.equal(normalizeDriverName('Freddy Fryar'), 'freddie fryar');
  assert.equal(normalizeDriverName('Treyten Lapcevich'), 'treyton lapcevich');
});

test('formatDriverNote normalizes emphasis and plus-start phrasing', () => {
  const formatted = formatDriverNote('ALL-TIME WINS LEADER. 12+ starts. local star');
  assert.equal(formatted, 'All-time wins leader. At least 12 starts. Local star.');
});

test('driver slugs resolve merged records', () => {
  assert.equal(getDriverSlug('Rich Bickle Jr.'), 'rich-bickle');
  assert.equal(getDriverBySlug('rich-bickle')?.name, 'Rich Bickle');
});

test('driver profile presentation builds fallback copy', () => {
  const driver = driverData.find((entry) => entry.name === 'Cole Butcher');
  assert.ok(driver);

  const presentation = getDriverProfilePresentation(driver!);

  assert.match(presentation.headline ?? '', /connected figure|long-haul regulars/i);
  assert.ok(presentation.summary?.includes('Cole Butcher made 9 documented Snowball Derby starts'));
  assert.ok(presentation.highlights?.includes('9 documented starts'));
});
