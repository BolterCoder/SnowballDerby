import type { NascarCrossover, SupportDivision, TrackStat } from '../types/content';

export const trackStats: TrackStat[] = [
  { value: '1/2', label: 'Mile Oval' },
  { value: '1953', label: 'Year Built' },
  { value: '14°', label: 'Banking in Turns' },
  { value: 'Pensacola', label: 'Florida, USA' },
];

export const trackHistoryMoments = [
  {
    eyebrow: '1953',
    title: 'Five Flags already had local meaning before the Derby existed.',
    description:
      'The speedway gave Pensacola a permanent racing home first. That matters because the Derby later grew out of an already-lived-in place instead of arriving as a one-off marquee date.',
  },
  {
    eyebrow: '1968',
    title: 'Tom Dawson turned the oval into a winter destination.',
    description:
      'Once Dawson created the Derby, Five Flags stopped being just another short track on the map. It became the place people circled every December.',
  },
  {
    eyebrow: 'December Ritual',
    title: 'The venue became part pilgrimage, part proving ground.',
    description:
      'Packed grandstands, long support-race days, and a half-mile that punishes mistakes gave the place its own winter mythology. The Derby works because Five Flags feels hard to conquer.',
  },
] as const;

export const trackGallery = [
  {
    title: 'The race began with rough-edged local spectacle',
    image: '/images/1968-Derby.webp',
    alt: 'Inaugural Snowball Derby race action',
    caption:
      'The original Derby already had the tension and atmosphere that would define the event: local crowd energy, cold weather, and a race that immediately felt bigger than its purse.',
  },
  {
    title: 'Tom Dawson gave Five Flags its signature event',
    image: '/images/Tom Dawson.jpg',
    alt: 'Tom Dawson, founder of the Snowball Derby',
    caption:
      'The race still carries Dawson’s imprint. Even the trophy keeps his name tied to every modern winner.',
  },
  {
    title: 'Turn one still looks like the center of the sport for one weekend',
    image: '/images/Turn 1 Shot.jpg',
    alt: 'Cars racing through turn one at Five Flags Speedway',
    caption:
      'The modern Derby can feel national in scale, but it still unfolds on the same tight Pensacola half-mile that made the race famous.',
  },
  {
    title: 'The grandstands are part of the Derby story too',
    image: '/images/Turn 1 Grandstand Snowball Derby.jpg',
    alt: 'Packed grandstands at Five Flags Speedway',
    caption:
      'The crowd scenes are part of what the original site captured well. Five Flags does not feel neutral in December. It feels lived in.',
  },
] as const;

export const supportDivisions: SupportDivision[] = [
  {
    name: 'Snowflake 100',
    description:
      'The premier support race of Derby weekend and a major proving ground for young talent. In 2025, Keelan Harvick became the youngest Snowflake 100 winner.',
    status: 'Signature support race',
  },
  {
    name: 'Allen Turner Pro Late Models',
    description:
      'A local and regional proving ground that gives Five Flags regulars a high-profile weekend stage.',
    status: 'Regional proving ground',
  },
  {
    name: 'Modifieds and Sportsman',
    description:
      'Supporting divisions help make Derby weekend feel like a full festival rather than a single-feature event.',
    status: 'Weekend staple',
  },
];

export const supportRaceMoments = [
  {
    eyebrow: '1983',
    title: 'Support-race history reaches back deeper than the modern weekend branding.',
    description:
      'The legacy archive marks 1983 as the first Snowflake-style Saturday support-race moment, which matters because it shows the Derby was already becoming a weekend rather than a single feature.',
  },
  {
    eyebrow: 'Snowflake 100',
    title: 'The support race became its own line on a driver’s resume.',
    description:
      'The Snowflake stopped being a sideshow a long time ago. Young talents and future stars used it as a proving ground with its own prestige, pressure, and memory.',
  },
  {
    eyebrow: 'Pensacola Weekend',
    title: 'Local divisions keep the weekend from turning into a fly-in show.',
    description:
      'Pro Late Models, Sportsman, Modifieds, and other support classes keep Five Flags involved as a local racing community, not just a once-a-year national stage.',
  },
] as const;

export const nascarCrossovers: NascarCrossover[] = [
  { name: 'Darrell Waltrip', achievement: '3x NASCAR Cup Champion', derbyNote: 'Won the 1976 Derby' },
  { name: 'Kyle Busch', achievement: '2x NASCAR Cup Champion', derbyNote: 'Won the 2009 and 2017 Derbies' },
  { name: 'Chase Elliott', achievement: '2020 NASCAR Cup Champion', derbyNote: 'Won the 2011 and 2015 Derbies' },
  { name: 'William Byron', achievement: '2024 NASCAR Cup Champion', derbyNote: 'Finished 6th in the 2022 Derby' },
  { name: 'Erik Jones', achievement: 'NASCAR Cup Series Driver', derbyNote: 'Won the 2012 and 2013 Derbies' },
  { name: 'Noah Gragson', achievement: 'NASCAR Cup Series Driver', derbyNote: 'Won the 2018 Derby' },
  { name: 'Bobby Allison', achievement: 'NASCAR Hall of Famer', derbyNote: 'Sat on the pole for the inaugural 1968 race' },
  { name: 'Rusty Wallace', achievement: '1989 NASCAR Cup Champion', derbyNote: 'Finished 2nd to Jody Ridley in 1985' },
  { name: 'Mark Martin', achievement: 'NASCAR Hall of Famer', derbyNote: 'Finished 2nd to Dave Mader III in 1978' },
];
