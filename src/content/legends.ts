import type { PersonProfile } from '../types/content';

export const legends: PersonProfile[] = [
  {
    name: 'Rich Bickle',
    badge: 'All-Time Wins Leader',
    summary:
      'The undisputed king. Won five of eleven starts, including back-to-back victories twice, and anchored the defining Derby dynasty of the 1990s.',
    stats: [
      { label: 'Wins', value: '5' },
      { label: 'Starts', value: '11' },
      { label: 'Win Rate', value: '45.5%' },
    ],
    years: '1990 • 1991 • 1996 • 1998 • 1999',
  },
  {
    name: 'Red Farmer',
    image: '/images/Red Farmer.jpg',
    summary:
      'The Ironman. Thirty-two consecutive Derby starts, a record that feels nearly untouchable, and one of the deepest long-term ties to Five Flags in event history.',
    stats: [
      { label: 'Starts', value: '32' },
      { label: 'Wins', value: '0' },
      { label: 'Span', value: '1968–1999' },
    ],
  },
  {
    name: 'Bubba Pollard',
    summary:
      'One of the best drivers to never capture the Derby despite enormous Blizzard Series success and repeated December contention.',
    stats: [
      { label: 'Starts', value: '19+' },
      { label: 'Wins', value: '0' },
      { label: 'Blizzard Wins', value: '25' },
    ],
  },
  {
    name: 'Derek Thorn',
    image: '/images/Derek Thorn 55th Annual.jpg',
    summary:
      'A modern master whose 2020–2022 stretch was one of the most dominant three-year runs the event has ever seen. Years of heartbreak finally turned into a 2022 win.',
    stats: [
      { label: 'Laps Led', value: '846/918' },
      { label: 'Wins', value: '1' },
      { label: 'Starts', value: '14' },
    ],
  },
  {
    name: 'Stephen Nasse',
    summary:
      'A modern redemption arc. After crossing first and losing the 2019 race on disqualification, he finally won in 2025 after years of near-misses.',
    stats: [
      { label: 'Starts', value: '18' },
      { label: 'Wins', value: '1' },
      { label: 'Attempt', value: '15th' },
    ],
  },
  {
    name: 'Tammy Jo Kirk',
    summary:
      'The first female winner in Derby history, breaking a major barrier in 1994 and expanding what the event could represent.',
    stats: [
      { label: 'Historic Win', value: '1994' },
      { label: 'Champion', value: '1st female' },
    ],
  },
];

export const localHeroes: PersonProfile[] = [
  {
    name: 'Tom Dawson',
    badge: 'Founder',
    image: '/images/Tom Dawson.jpg',
    summary:
      'The man who started it all. He purchased Five Flags Speedway and created the Snowball Derby in 1968, giving the event its long-term identity.',
  },
  {
    name: 'Eddie Mercer',
    badge: '2005 Champion',
    summary:
      'Pensacola’s own Mercer waited 17 attempts before finally winning at home, delivering one of the most emotional hometown victories the event has seen.',
    stats: [
      { label: 'Attempts Before Win', value: '17' },
      { label: 'Laps Led in Win', value: '99' },
      { label: 'Career Laps Led', value: '752' },
    ],
  },
  {
    name: 'Johanna Long',
    badge: '2010 Champion',
    summary:
      'A Pensacola native who made history twice, first as the only female pole winner in 2009 and then as the second female Derby winner in 2010.',
    stats: [
      { label: 'Female Winner', value: '2nd' },
      { label: 'Historic Pole', value: '2009' },
      { label: 'Hometown', value: 'Pensacola' },
    ],
  },
  {
    name: 'Dickie Davis',
    badge: '2x Champion',
    summary:
      'An early Pensacola standard-bearer who won twice in the pioneer era and helped establish Five Flags as sacred ground for short-track racing.',
    stats: [
      { label: 'Wins', value: '2' },
      { label: 'Era', value: 'Pioneer' },
    ],
  },
  {
    name: 'Wayne Niedecken Sr.',
    badge: 'Inaugural Winner',
    summary:
      'The first winner and first repeat winner gave the Derby its earliest benchmark, turning a new Pensacola race into a tradition with an actual standard to chase.',
    stats: [
      { label: 'Wins', value: '2' },
      { label: 'Historic Years', value: '1968, 1970' },
    ],
  },
  {
    name: 'Freddie Fryar',
    badge: 'Local Hero',
    image: '/images/Freddy Fryar 1979 Winner.jpg',
    summary:
      'One of the strongest Five Flags figures of the pioneer era, Fryar helped bind regional short-track respect, local pride, and Derby credibility into the same reputation.',
    stats: [
      { label: 'Wins', value: '2' },
      { label: 'Span', value: '1979, 1981' },
    ],
  },
];

export const pensacolaLegacyMoments = [
  {
    title: 'Tom Dawson created a race that belonged to the track.',
    description:
      'The Derby’s identity starts with a local promoter deciding Five Flags needed a December headliner. That origin still matters because the event feels rooted in the speedway that produced it.',
  },
  {
    title: 'The early winners gave Pensacola a visible stake in the mythology.',
    description:
      'Wayne Niedecken Sr., Dickie Davis, and Freddie Fryar are not just names on the first pages of the record book. They are part of the reason the Derby still feels tied to local memory instead of floating above it.',
  },
  {
    title: 'Mercer and Long kept the hometown thread alive in the modern era.',
    description:
      'By the time Eddie Mercer broke through in 2005 and Johanna Long won in 2010, the Derby was already drawing national-level talent. Those wins landed differently because Pensacola remained the emotional center.',
  },
] as const;
