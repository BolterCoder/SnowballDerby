import type { ControversyItem, MilestoneItem, RecordCard } from '../types/content';

export const recordCards: RecordCard[] = [
  { title: 'Most Wins', value: '5', holder: 'Rich Bickle (1990, 1991, 1996, 1998, 1999)' },
  { title: 'Most Starts', value: '32', holder: 'Red Farmer (1968–1999, consecutive)' },
  { title: 'Most Laps Led (3-Year Span)', value: '846', holder: 'Derek Thorn (2020–2022)' },
  { title: 'Youngest Winner', value: '16', holder: 'Chase Elliott (2011)' },
  { title: 'Closest Finish', value: '0.229s', holder: 'Elliott over VanderLey (2011)' },
  { title: 'Most Caution Laps', value: '144', holder: '2002 race' },
  { title: 'Longest Wait to Win', value: '17', holder: 'Eddie Mercer (17th attempt, 2005)' },
  { title: 'Largest Winner’s Purse', value: '$125K', holder: 'Rich Bickle 1999, including bonus' },
  { title: 'Fastest Race Time', value: '1:23', holder: 'Gary Balough (1980)' },
];

export const controversies: ControversyItem[] = [
  {
    year: '1977',
    title: 'The Waltrip scoring dispute',
    description:
      'Darrell Waltrip appeared to win back-to-back, but a scoring review ruled Ronnie Sanders the winner. Waltrip kept the original trophy and Sanders later received a second one.',
  },
  {
    year: '1999',
    title: "Bickle's fifth after a scoring correction",
    description:
      'Bobby Gill celebrated first, but post-race review found him a lap down. Rich Bickle was declared the true winner and claimed his record fifth Derby.',
  },
  {
    year: '2013',
    title: 'The tungsten disqualification',
    description:
      'Chase Elliott crossed first but was disqualified in post-race inspection for illegal tungsten. Erik Jones inherited the win.',
  },
  {
    year: '2019',
    title: 'Titanium brakes scandal',
    description:
      'Stephen Nasse crossed first and celebrated, only to be disqualified later for titanium piston caps. Travis Braden inherited the victory.',
  },
];

export const milestones: MilestoneItem[] = [
  {
    year: '1968',
    text: 'The first Snowball Derby is run. The press box catches fire and Wayne Niedecken Sr. wins the inaugural event.',
  },
  {
    year: '1972',
    text: 'Ed Howe wins with a purpose-built race car, signaling a real shift in the event’s engineering era.',
  },
  {
    year: '1974',
    text: 'Pete Hamilton becomes the only driver ever to win both the Daytona 500 and the Snowball Derby.',
  },
  {
    year: '1984',
    text: 'Butch Lindley wins with a V6 engine, a major technical milestone for the event.',
  },
  {
    year: '1988',
    text: 'The race expands to 300 laps, creating the distance that now defines the Derby.',
  },
  {
    year: '1994',
    text: 'Tammy Jo Kirk becomes the first female Snowball Derby winner.',
  },
  {
    year: '2010',
    text: 'Johanna Long becomes the second female winner, 16 years after Kirk’s breakthrough.',
  },
  {
    year: '2011',
    text: 'Chase Elliott wins at age 16 by 0.229 seconds, becoming the youngest champion in the closest finish on record.',
  },
  {
    year: '2025',
    text: 'Stephen Nasse finally wins on his 15th eligible attempt as the purse reaches $50,000.',
  },
];
