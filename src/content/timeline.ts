import type { TimelineEra, TimelineHighlight } from '../types/content';

export const timelineEras: TimelineEra[] = [
  {
    id: 'pioneer',
    label: 'Pioneer Era',
    years: '1968-1987',
    summary:
      'The Derby started as a regional winter showdown and built its mythology through cold-weather chaos, protests, local legends, and the first major stars.',
    focus: 'Origin story, local power, and the race discovering what kind of event it wanted to be.',
    milestoneYears: [1968, 1975, 1977],
  },
  {
    id: 'golden',
    label: 'Golden Era',
    years: '1988-2009',
    summary:
      'The move to 300 laps and the rise of national-caliber short-track stars pushed the Derby into a bigger, tougher, more strategic event.',
    focus: 'Distance change, dynasties, technical milestones, and the race gaining national gravity.',
    milestoneYears: [1988, 1994, 1999, 2005],
  },
  {
    id: 'modern',
    label: 'Modern Era',
    years: '2010-2025',
    summary:
      'Modern Derby history is defined by future NASCAR stars, ultra-close finishes, inspection drama, and a national spotlight that never fully leaves the event.',
    focus: 'Major controversy, younger champions, expanding purses, and long-running redemption arcs.',
    milestoneYears: [2010, 2011, 2013, 2019, 2025],
  },
];

export const timelineHighlights: TimelineHighlight[] = [
  {
    year: 1968,
    title: 'The race begins in chaos',
    label: 'Origin Story',
    description:
      'The inaugural Derby produced the event’s mythmaking formula immediately: freezing weather, a press-box fire, and Wayne Niedecken Sr. in Victory Lane.',
  },
  {
    year: 1988,
    title: 'The 300-lap identity arrives',
    label: 'Format Shift',
    description:
      'Once the race expanded to 300 laps, endurance and attrition became permanent parts of the Derby’s identity.',
  },
  {
    year: 1994,
    title: 'A barrier-breaking championship',
    label: 'Milestone Win',
    description:
      'Tammy Jo Kirk’s victory became one of the event’s most important breakthroughs and widened the Derby’s legacy beyond the record book.',
  },
  {
    year: 2011,
    title: 'The instant-classic finish',
    label: 'Classic Finish',
    description:
      'Chase Elliott’s youngest-winner, closest-finish victory became the cleanest example of the modern Derby’s intensity.',
  },
  {
    year: 2019,
    title: 'The modern controversy template',
    label: 'Inspection Drama',
    description:
      'Stephen Nasse crossing first and losing the race in tech made 2019 a reference point for every modern controversy conversation.',
  },
  {
    year: 2025,
    title: 'Redemption finally lands',
    label: 'Payoff',
    description:
      'Stephen Nasse’s first official win completed one of the longest emotional arcs in Derby history, even if the finish still came with late-race controversy.',
  },
];
