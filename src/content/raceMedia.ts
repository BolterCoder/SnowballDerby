import type { RaceMediaItem } from '../types/content';

export const defaultRaceMedia: RaceMediaItem[] = [
  {
    type: 'image',
    title: 'Five Flags Speedway in race conditions',
    src: '/images/Turn 1 Shot.jpg',
    alt: 'Turn 1 action at Five Flags Speedway',
    caption: 'Five Flags Speedway is the constant backdrop across every Derby era.',
  },
  {
    type: 'image',
    title: 'Snowball Derby grandstand atmosphere',
    src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
    alt: 'Packed grandstands at the Snowball Derby',
    caption: 'The event grew from a local winter race into one of short-track racing’s defining weekends.',
  },
];

export const raceMediaByYear: Record<number, RaceMediaItem[]> = {
  1968: [
    {
      type: 'image',
      title: 'Inaugural Derby scene',
      src: '/images/1968-Derby.webp',
      alt: 'Historic image from the inaugural 1968 Snowball Derby',
      caption: 'The first Snowball Derby established the event’s myth almost immediately.',
    },
    {
      type: 'image',
      title: 'Founder context',
      src: '/images/Tom Dawson.jpg',
      alt: 'Tom Dawson, founder of the Snowball Derby',
      caption: 'Tom Dawson’s creation of the Derby gave Five Flags its signature event.',
    },
  ],
  1970: [
    {
      type: 'image',
      title: 'The first repeat winner era',
      src: '/images/Turn 1 Shot.jpg',
      alt: 'Race action representing the early Snowball Derby era',
      caption: 'The 1970 Derby doubled in distance and turned Wayne Niedecken Sr. into the event’s first repeat benchmark.',
    },
  ],
  1971: [
    {
      type: 'image',
      title: 'Pioneer-era intensity',
      src: '/images/Red Farmer.jpg',
      alt: 'Red Farmer during the Derby’s pioneer era',
      caption: 'The 1971 race is remembered less for clean closure than for the protest and debate that followed the finish.',
    },
    {
      type: 'note',
      title: 'One of the earliest Derby finishes to live on through argument as much as through the official result.',
    },
  ],
  1972: [
    {
      type: 'image',
      title: 'Pioneer-era star power',
      src: '/images/Red Farmer.jpg',
      alt: 'Red Farmer during the Snowball Derby’s pioneer era',
      caption: 'The 1972 field still carried the event’s rough-edged early identity even as Ed Howe’s purpose-built winner signaled a technical shift.',
    },
  ],
  1975: [
    {
      type: 'image',
      title: 'Early big-event atmosphere',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Packed crowd during Snowball Derby weekend',
      caption: 'A 50-car field and the Allison-family storyline made 1975 feel like a major Southern stock-car event, not just a local winter race.',
    },
  ],
  1976: [
    {
      type: 'image',
      title: 'Waltrip’s early Derby context',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Grandstand atmosphere at Five Flags Speedway',
      caption: 'Darrell Waltrip’s lone Derby win helped validate the event with a future national star before the 1977 controversy changed the conversation.',
    },
  ],
  1974: [
    {
      type: 'image',
      title: 'Five Flags under the lights',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Grandstand view at Five Flags Speedway',
      caption: 'Pete Hamilton’s 1974 win remains the only Derby victory by a driver who also won the Daytona 500.',
    },
  ],
  1979: [
    {
      type: 'image',
      title: 'Freddy Fryar victory image',
      src: '/images/Freddy Fryar 1979 Winner.jpg',
      alt: 'Freddy Fryar after the 1979 Snowball Derby',
      caption: 'Fryar’s 1979 win became one of the defining moments of the pioneer era.',
    },
  ],
  1980: [
    {
      type: 'image',
      title: 'Speed record context',
      src: '/images/Turn 1 Shot.jpg',
      alt: 'Cars racing at Five Flags Speedway',
      caption: 'Gary Balough’s 1980 win is still remembered as one of the fastest and most visually dramatic Derby runnings ever staged.',
    },
  ],
  1981: [
    {
      type: 'image',
      title: 'Freddie Fryar closes the loop',
      src: '/images/Freddy Fryar 1979 Winner.jpg',
      alt: 'Freddie Fryar around Derby victory-lane imagery',
      caption: 'The same local legend who broke through in 1979 returned in 1981 to add a second Derby title and a pole-to-win weekend.',
    },
  ],
  1984: [
    {
      type: 'image',
      title: 'A technical turning point',
      src: '/images/Turn 1 Shot.jpg',
      alt: 'Cars racing through turn one at Five Flags Speedway',
      caption: 'Butch Lindley’s V6-powered win in 1984 forced the Derby field to rethink what could succeed at Five Flags.',
    },
  ],
  1985: [
    {
      type: 'image',
      title: 'The 1985 breakthrough tone',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Grandstand view at Five Flags Speedway',
      caption: 'Jody Ridley’s 1985 win carried more emotion than a normal Derby title and remains one of the race’s most personal victory stories.',
    },
  ],
  1990: [
    {
      type: 'image',
      title: 'Dynasty begins',
      src: '/images/Turn 1 Shot.jpg',
      alt: 'Race action at Five Flags Speedway',
      caption: 'Rich Bickle’s first Derby win in 1990 opened the defining championship run of the decade.',
    },
  ],
  1992: [
    {
      type: 'image',
      title: 'A rookie winner breaks through',
      src: '/images/Turn 1 Shot.jpg',
      alt: 'Cars racing under pressure at Five Flags Speedway',
      caption: 'Gary St. Amant’s 1992 win gave the Derby one of its sharpest rookie breakthrough stories.',
    },
  ],
  1999: [
    {
      type: 'image',
      title: 'Richest Derby atmosphere',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Crowd view at Five Flags Speedway',
      caption: 'The 1999 Derby carried a huge-event feel: the richest purse in race history and a finish that had to be corrected after the celebration.',
    },
  ],
  2001: [
    {
      type: 'image',
      title: 'Early-2000s Derby reset',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Snowball Derby crowd scene',
      caption: 'Wayne Anderson’s 2001 win sits in the event’s transitional early-2000s chapter, after Bickle’s peak and before the later national-profile boom.',
    },
  ],
  2002: [
    {
      type: 'image',
      title: 'Attrition-night context',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Snowball Derby crowd scene at Five Flags',
      caption: 'The 2002 Derby became a survival test as much as a speed contest, with caution laps and attrition reshaping the night.',
    },
  ],
  2005: [
    {
      type: 'image',
      title: 'Mercer breakthrough context',
      src: '/images/Turn 1 Shot.jpg',
      alt: 'Race action at Five Flags Speedway',
      caption: 'Eddie Mercer’s eventual breakthrough ended one of the longest personal chases in Derby history.',
    },
  ],
  2007: [
    {
      type: 'image',
      title: 'Augie Grill breakthrough',
      src: '/images/Augie Grill.jpg',
      alt: 'Augie Grill around Snowball Derby weekend',
      caption: 'Grill’s first Derby win came in the milestone 40th running of the event.',
    },
    {
      type: 'image',
      title: '40th running atmosphere',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Packed crowd during Snowball Derby weekend',
      caption: 'The 40th Derby marked how large the event had become before the modern streaming and national-profile era fully arrived.',
    },
  ],
  2008: [
    {
      type: 'image',
      title: 'Augie Grill repeats',
      src: '/images/Augie Grill.jpg',
      alt: 'Augie Grill after consecutive Derby victories',
      caption: 'Back-to-back Derby titles pushed Grill into rare company.',
    },
  ],
  2009: [
    {
      type: 'image',
      title: 'National spotlight at Five Flags',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Packed Snowball Derby grandstands',
      caption: 'Kyle Busch’s appearance gave the 2009 race a bigger national spotlight than most Derby runnings of that era.',
    },
    {
      type: 'note',
      title: 'Johanna Long became the first female pole winner, a one-year prelude to her 2010 Derby victory.',
    },
  ],
  2012: [
    {
      type: 'image',
      title: 'Young-star breakthrough context',
      src: '/images/Turn 1 Shot.jpg',
      alt: 'Late model action at Five Flags Speedway',
      caption: 'Erik Jones winning on his first Derby attempt made 2012 one of the event’s cleanest modern breakthrough stories.',
    },
  ],
  2017: [
    {
      type: 'image',
      title: 'The 50th running atmosphere',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Packed grandstands during Snowball Derby weekend',
      caption: 'The 50th running needed a centerpiece, and Kyle Busch’s second Derby win gave it one.',
    },
  ],
  2020: [
    {
      type: 'image',
      title: 'Ty Majeski at the 53rd annual Derby',
      src: '/images/TY Majeski 53rd Annual.jpeg',
      alt: 'Ty Majeski during the 2020 Snowball Derby weekend',
      caption: 'The 2020 race marked Majeski’s first Derby victory after years of build-up.',
    },
    {
      type: 'image',
      title: 'Winner image',
      src: '/images/Ty Majeski Winner.jpg',
      alt: 'Ty Majeski after winning the Snowball Derby',
      caption: 'A breakthrough Derby win in a stacked modern field.',
    },
  ],
  2021: [
    {
      type: 'image',
      title: 'Modern heartbreak setup',
      src: '/images/Turn 1 Shot.jpg',
      alt: 'Cars battling into turn one at Five Flags',
      caption: 'The 2021 Derby is remembered as much for Derek Thorn’s heartbreak as for Chandler Smith’s winning move.',
    },
  ],
  2022: [
    {
      type: 'image',
      title: 'Derek Thorn finally breaks through',
      src: '/images/Derek Thorn 55th Annual.jpg',
      alt: 'Derek Thorn during the 55th Snowball Derby',
      caption: 'After multiple near-misses, Thorn converted a dominant era into a Derby title.',
    },
    {
      type: 'image',
      title: 'Modern-era intensity',
      src: '/images/Turn 1 Shot.jpg',
      alt: 'Cars battling at Five Flags Speedway',
      caption: 'The 2022 race distilled the modern Derby formula: elite field, late pressure, and a breakthrough years in the making.',
    },
  ],
  2015: [
    {
      type: 'image',
      title: 'Tech-room drama context',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Crowd and track view during Snowball Derby weekend',
      caption: 'The 2015 Derby kept the modern pattern alive: even after the checkered flag, the result was not fully settled until inspection ended.',
    },
  ],
  2018: [
    {
      type: 'image',
      title: 'Stormy-weekend Derby',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Snowball Derby crowd scene',
      caption: 'A weather-tossed weekend, a hard-earned win, and the later trophy story made 2018 one of the stranger modern Derby chapters.',
    },
    {
      type: 'note',
      title: 'Noah Gragson’s lost-and-recovered trophy gave the 2018 race an unusual extra layer of folklore.',
    },
  ],
  2023: [
    {
      type: 'image',
      title: '56th annual Snowball Derby',
      src: '/images/56th Annual Snowball Derby.png',
      alt: 'Promotional image for the 56th Snowball Derby',
      caption: 'The event had fully settled into its modern national-profile identity.',
    },
    {
      type: 'image',
      title: 'Ty Majeski returns to the top',
      src: '/images/Ty Majeski Winner.jpg',
      alt: 'Ty Majeski after winning the 2023 Snowball Derby',
      caption: 'Majeski’s second Derby title reinforced his place in the event’s modern elite.',
    },
  ],
  2024: [
    {
      type: 'image',
      title: '2024 field',
      src: '/images/2024 Snowball Derby Field.jpg',
      alt: 'The 2024 Snowball Derby field',
      caption: 'The modern Derby field remains one of the deepest short-track lineups in America.',
    },
    {
      type: 'image',
      title: 'Kaden Honeycutt feature image',
      src: '/images/Kaden Honeycutt.jpg',
      alt: 'Kaden Honeycutt around the Snowball Derby',
      caption: 'Honeycutt’s breakthrough Derby win gave the modern era another young star moment.',
    },
    {
      type: 'image',
      title: 'Kaden Honeycutt portrait',
      src: '/images/Kaden Honeycutt 2.jpg',
      alt: 'Kaden Honeycutt portrait image',
      caption: 'A second editorial image for the 2024 race page.',
    },
    {
      type: 'image',
      title: '57th annual Derby image',
      src: '/images/76855440007-57th-snow-ball-derby-1.webp',
      alt: 'Image from the 57th Snowball Derby',
      caption: 'Another visual anchor from the 2024 Derby weekend.',
    },
  ],
  2025: [
    {
      type: 'image',
      title: 'Turn one under pressure',
      src: '/images/Turn 1 Shot.jpg',
      alt: 'Turn 1 action at Five Flags Speedway',
      caption: 'The 2025 Derby ended in late-race controversy and another reminder of how unforgiving Five Flags can be.',
    },
    {
      type: 'image',
      title: 'Grandstand perspective',
      src: '/images/Turn 1 Grandstand Snowball Derby.jpg',
      alt: 'Grandstand view of the Snowball Derby',
      caption: 'Even when weather and postponements interfere, the Derby still carries a national-event atmosphere.',
    },
  ],
};
