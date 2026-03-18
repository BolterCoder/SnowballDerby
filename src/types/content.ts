export interface FastQualifier {
  driver?: string;
  speed?: string;
}

export interface RaceResult {
  finish?: number | string;
  start?: number | string;
  carNumber?: string;
  driver?: string;
  sponsor?: string;
  make?: string;
  laps?: number | string;
  lapsLed?: number | string;
  status?: string;
  [key: string]: string | number | undefined;
}

export interface Race {
  year: number;
  date?: string;
  order?: string;
  winner: string;
  pole?: string;
  laps?: number;
  purse?: string;
  starters?: number;
  weather?: string;
  raceTime?: string;
  averageSpeed?: string;
  cautions?: string;
  leadChanges?: string;
  ledLaps?: string;
  marginOfVictory?: string;
  winMargin?: string;
  winMethod?: string;
  attempts?: string;
  story: string;
  statisticallySpeaking?: string;
  results?: string[];
  fullResults?: RaceResult[];
  notableEntrants?: string[];
  dnq?: string[];
  dns?: string[];
  gallery?: string[];
  snowflake?: string;
  controversy?: string;
  image?: string;
  fastQualifier?: FastQualifier;
  [key: string]: unknown;
}

export interface Driver {
  name: string;
  starts: number;
  wins: number;
  years: number[];
  winYears: number[];
  note: string;
}

export interface Quote {
  text: string;
  person: string;
  context: string;
}

export interface ProfileStat {
  label: string;
  value: string;
}

export interface PersonProfile {
  name: string;
  badge?: string;
  image?: string;
  summary: string;
  stats?: ProfileStat[];
  years?: string;
}

export interface RecordCard {
  title: string;
  value: string;
  holder: string;
}

export interface ControversyItem {
  year: string;
  title: string;
  description: string;
}

export interface MilestoneItem {
  year: string;
  text: string;
}

export interface TrackStat {
  value: string;
  label: string;
}

export interface SupportDivision {
  name: string;
  description: string;
  status: string;
}

export interface NascarCrossover {
  name: string;
  achievement: string;
  derbyNote: string;
}

export interface DriverProfileContent {
  hometown?: string;
  image?: string;
  headline?: string;
  summary?: string;
  highlights?: string[];
}

export interface DriverRaceEntry {
  year: number;
  winner: string;
  summary: string;
  href: string;
  isWinner: boolean;
}

export interface RaceMediaItem {
  type: 'image' | 'note';
  title: string;
  src?: string;
  alt?: string;
  caption?: string;
}

export interface RaceRelation {
  year: number;
  title: string;
  reason: string;
  description: string;
  href: string;
}

export interface RelatedDriver {
  name: string;
  role: string;
  href: string;
}

export interface RaceTag {
  id: string;
  label: string;
}

export interface RaceMetadata {
  summary?: string;
  significance?: string;
  storylines?: string[];
  tags?: RaceTag[];
  relatedRaces?: Array<{
    year: number;
    label: string;
    description: string;
    weight?: number;
  }>;
}

export interface TimelineEra {
  id: 'pioneer' | 'golden' | 'modern';
  label: string;
  years: string;
  summary: string;
  focus: string;
  milestoneYears: number[];
}

export interface TimelineHighlight {
  year: number;
  title: string;
  label: string;
  description: string;
}
