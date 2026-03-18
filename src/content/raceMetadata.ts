import type { RaceMetadata } from '../types/content';

export const raceMetadataByYear: Record<number, RaceMetadata> = {
  1968: {
    summary: 'The event origin story.',
    significance:
      'The inaugural Derby established the event’s identity immediately: cold weather, chaos, local mythology, and a winner whose name became inseparable from the race’s beginnings.',
    storylines: [
      'First Snowball Derby ever run',
      'Press box fire became part of the event mythology',
      'Wayne Niedecken Sr. delivered the first winner’s benchmark',
    ],
    tags: [
      { id: 'inaugural', label: 'Inaugural running' },
      { id: 'event-origin', label: 'Event origin story' },
    ],
    relatedRaces: [
      {
        year: 1970,
        label: 'Founding winner arc',
        description: 'Wayne Niedecken Sr. returned two years later to become the event’s first repeat winner, extending the inaugural storyline.',
        weight: 4,
      },
    ],
  },
  1971: {
    summary: 'The first great protest year.',
    significance:
      'The 1971 Derby matters because it established that the event would not only produce winners, but arguments that lingered. The disputed Dickie Davis result helped create the Derby’s long-running reputation for post-race debate and unresolved memory.',
    storylines: [
      'Freddie Fryar protested the finish after Davis was declared the winner',
      'One of the earliest examples of a Derby outcome becoming part of the folklore because of disagreement',
      'The race set the tone for later controversy-heavy chapters',
    ],
    tags: [
      { id: 'controversy', label: 'Controversy' },
      { id: 'scoring-dispute', label: 'Protested result' },
    ],
    relatedRaces: [
      {
        year: 1977,
        label: 'Early controversy lineage',
        description: 'The 1971 protest reads like the opening chapter of the same Derby argument that would erupt again in 1977.',
        weight: 4,
      },
    ],
  },
  1972: {
    summary: 'The first purpose-built race car win.',
    significance:
      'Ed Howe’s 1972 victory signaled that the Derby was moving away from its street-stock roots and into a more specialized, more professional phase of short-track competition.',
    storylines: [
      'First purpose-built race car to win the Derby',
      'Howe won from the pole and took over late',
      'The event’s engineering standard clearly shifted',
    ],
    tags: [
      { id: 'technology-shift', label: 'Technology shift' },
      { id: 'pole-to-win', label: 'Pole-to-win' },
    ],
    relatedRaces: [
      {
        year: 1984,
        label: 'Technical breakthrough lineage',
        description: 'Butch Lindley’s V6 win in 1984 belongs to the same family of Derby moments where a technical leap changed what contenders thought was possible.',
        weight: 4,
      },
    ],
  },
  1975: {
    summary: 'The 50-car field and the Allison-family spotlight.',
    significance:
      'The 1975 Derby showed how quickly the event had grown in stature. A 50-car field and an Allison-family storyline gave the race one of its clearest early markers of scale and Southern stock-car prestige.',
    storylines: [
      'Largest field in race history to that point',
      'Donnie Allison won while Bobby Allison sat on the pole',
      'The Derby’s identity as a major regional stock-car event became much clearer',
    ],
    tags: [
      { id: 'family-legacy', label: 'Family legacy' },
      { id: 'field-milestone', label: 'Field-size milestone' },
    ],
    relatedRaces: [
      {
        year: 2009,
        label: 'National-name validation',
        description: 'The Allisons in 1975 and Kyle Busch in 2009 are different versions of the same Derby signal: major names showing up and adding weight to the event.',
        weight: 3,
      },
    ],
  },
  1974: {
    summary: 'A crossover stat line no one else owns.',
    significance:
      'Pete Hamilton’s win created a distinction that still stands alone: he remains the only driver to win both the Daytona 500 and the Snowball Derby.',
    storylines: [
      'Hamilton won from the pole in dominant fashion',
      'He led 102 of 200 laps',
      'The Daytona 500 and Derby double remains unique',
    ],
    tags: [
      { id: 'nascar-crossover', label: 'NASCAR crossover' },
      { id: 'pole-to-win', label: 'Pole-to-win' },
    ],
    relatedRaces: [
      {
        year: 2009,
        label: 'National-star spotlight',
        description: 'Kyle Busch’s 2009 appearance was a later version of the same Derby truth: big national names still validate the race by showing up and trying to win it.',
        weight: 3,
      },
    ],
  },
  1977: {
    summary: 'One of the classic scoring-controversy years.',
    significance:
      'The Waltrip-Sanders scoring dispute became one of the most famous officiating controversies in Derby history and remains central to any history of contentious finishes.',
    storylines: [
      'Scoring controversy overshadowed the finish',
      'Two-trophy aftermath kept the story alive for months',
    ],
    tags: [
      { id: 'scoring-dispute', label: 'Scoring dispute' },
      { id: 'controversy', label: 'Controversy' },
    ],
    relatedRaces: [
      {
        year: 2013,
        label: 'Officiating flashpoint',
        description: 'Both races became defining examples of a Snowball Derby result being reshaped after the track went quiet.',
        weight: 3,
      },
      {
        year: 2019,
        label: 'Controversy lineage',
        description: 'The 2019 Nasse disqualification revived the same argument 1977 left behind: who really won when the decision comes after the flag.',
        weight: 3,
      },
    ],
  },
  1984: {
    summary: 'The V6 upset that changed the paddock’s assumptions.',
    significance:
      'Butch Lindley proved that unconventional power could win the Derby, making 1984 one of the event’s key technical turning points before the 300-lap era arrived.',
    storylines: [
      'First V6-powered winner in Derby history',
      'Lindley’s lone Derby title became his signature Pensacola achievement',
      'The race challenged assumptions about what package could win at Five Flags',
    ],
    tags: [
      { id: 'technology-shift', label: 'Technology shift' },
      { id: 'v6-winner', label: 'First V6 winner' },
    ],
    relatedRaces: [
      {
        year: 1972,
        label: 'Technical breakthrough lineage',
        description: 'Ed Howe’s purpose-built win in 1972 and Lindley’s V6 victory in 1984 both mark moments when the Derby’s competitive standard jumped forward.',
        weight: 4,
      },
      {
        year: 1988,
        label: 'Pre-modern turning point',
        description: 'The 1984 technical milestone was one of the last big evolutionary steps before the Derby’s modern 300-lap identity arrived in 1988.',
        weight: 3,
      },
    ],
  },
  1979: {
    summary: 'The veteran local masterpiece.',
    significance:
      'Freddie Fryar’s 1979 win is one of the core pioneer-era victories because it tied local dominance, veteran patience, and late-race strategy into a result that still feels central to Five Flags history.',
    storylines: [
      'Fryar took control late after Butch Lindley had dominated much of the race',
      'His wider 1979 season made the Derby feel like the capstone to a regional masterpiece',
      'One of the most important local-driver wins in the event’s first decade',
    ],
    tags: [
      { id: 'local-win', label: 'Local winner' },
      { id: 'veteran-masterclass', label: 'Veteran masterclass' },
    ],
    relatedRaces: [
      {
        year: 1981,
        label: 'Freddie Fryar double',
        description: 'The 1979 breakthrough and 1981 pole-to-win return form the complete Derby championship arc for Freddie Fryar.',
        weight: 5,
      },
    ],
  },
  1980: {
    summary: 'The lightning-fast Derby that became impossible to forget.',
    significance:
      'Gary Balough’s 1980 win is one of the event’s signature spectacle races because of the raw speed, the tire drama, and the way the entire field looked outmatched by the pace of the winning car.',
    storylines: [
      'Balough set an astonishing pace and won in record time',
      'The race became famous for tire destruction across the field',
      'One of the most visually memorable Derby wins of the early era',
    ],
    tags: [
      { id: 'record-pace', label: 'Record pace' },
      { id: 'dominant-run', label: 'Dominant run' },
    ],
    relatedRaces: [
      {
        year: 1986,
        label: 'Balough returns',
        description: 'Balough’s 1986 win completed the two-title Derby arc started by the outrageous speed of 1980.',
        weight: 4,
      },
    ],
  },
  1985: {
    summary: 'A long chase ending in one of the race’s most personal victories.',
    significance:
      'Jody Ridley’s 1985 win stands out because it was not just a breakthrough. It was an emotional payoff shaped by years of Derby attempts and by the shadow of Butch Lindley’s injury, which gave the result unusual emotional gravity.',
    storylines: [
      'Ridley finally turned years of Derby contention into a title',
      'He led 117 laps and held off Rusty Wallace',
      'The emotional dedication to Butch Lindley deepened the story well beyond the box score',
    ],
    tags: [
      { id: 'long-wait', label: 'Long-awaited win' },
      { id: 'emotional-win', label: 'Emotional win' },
    ],
    relatedRaces: [
      {
        year: 2005,
        label: 'Patient payoff',
        description: 'Ridley in 1985 and Mercer in 2005 are two of the clearest examples of a long Derby pursuit finally paying off.',
        weight: 3,
      },
    ],
  },
  1988: {
    summary: 'The race that established the modern distance.',
    significance:
      'The move to 300 laps gave the Snowball Derby the race length that now defines its modern identity, changing how endurance, strategy, and attrition shaped the event.',
    storylines: [
      'First 300-lap Snowball Derby',
      'A major structural change to the event format',
    ],
    tags: [
      { id: 'distance-change', label: 'Distance change' },
      { id: '300-lap-era', label: '300-lap era' },
    ],
    relatedRaces: [
      {
        year: 1989,
        label: 'First full follow-up',
        description: 'The 1989 Derby was the first race to fully live inside the 300-lap format introduced in 1988.',
        weight: 4,
      },
    ],
  },
  1989: {
    summary: 'The first full race inside the new 300-lap identity.',
    significance:
      'Rick Crawford’s 1989 win mattered in part because it confirmed the 300-lap Derby was not a one-year experiment. The event’s modern endurance-based identity was now real and repeatable.',
    storylines: [
      'First follow-up to the format shift introduced in 1988',
      'Rick Crawford gave the new era an early fresh-name winner',
      'Rich Bickle’s rise in the results helped preview the decade to come',
    ],
    tags: [
      { id: '300-lap-era', label: '300-lap era' },
      { id: 'era-transition', label: 'Era transition' },
    ],
    relatedRaces: [
      {
        year: 1990,
        label: 'Decade handoff',
        description: 'The early 300-lap years quickly turned into the Bickle era, making 1989 and 1990 feel like a direct historical handoff.',
        weight: 4,
      },
    ],
  },
  1990: {
    summary: 'The start of the Bickle standard.',
    significance:
      'Rich Bickle’s first Derby title matters because it opened the strongest winner run in event history. Once he won in 1990, the rest of the decade had a new central reference point.',
    storylines: [
      'Bickle earned his first Derby title',
      'The race began the most important winner run of the 1990s',
      'Junior Niedecken was part of the same foundational early-1990s story',
    ],
    tags: [
      { id: 'dynasty-begins', label: 'Dynasty begins' },
      { id: 'modern-benchmark', label: 'Benchmark run' },
    ],
    relatedRaces: [
      {
        year: 1999,
        label: 'Dynasty endpoint',
        description: 'The 1990 breakthrough only reaches full historical scale when paired with the fifth and final Bickle title in 1999.',
        weight: 5,
      },
      {
        year: 1991,
        label: 'Back-to-back continuation',
        description: 'The immediate sequel to Bickle’s first win came one year later when he became the event’s first back-to-back champion.',
        weight: 4,
      },
    ],
  },
  1994: {
    summary: 'A barrier-breaking championship.',
    significance:
      'Tammy Jo Kirk’s victory was one of the event’s most important social milestones, widening the Derby’s legacy beyond pure record-book achievement.',
    storylines: [
      'First female winner in Derby history',
      'One of the defining modern milestone races',
    ],
    tags: [
      { id: 'female-winner', label: 'Historic female winner' },
      { id: 'barrier-breaker', label: 'Barrier breaker' },
    ],
    relatedRaces: [
      {
        year: 2010,
        label: 'Barrier-breaker follow-up',
        description: 'Johanna Long’s win became the clearest sequel to Tammy Jo Kirk’s breakthrough and re-opened the same part of Derby history.',
        weight: 5,
      },
    ],
  },
  1995: {
    summary: 'A prestige crossover that only one other Derby winner can match.',
    significance:
      'Jeff Purvis brought a different kind of résumé weight to the Derby, and his 1995 victory stands out because it linked the event to another piece of major short-track prestige through the World 100 connection.',
    storylines: [
      'Purvis won after falling short to Gary St. Amant in 1992',
      'One of the race’s strongest résumé-based winners',
      'The Derby again showed it could attract and reward accomplished short-track names from beyond the Gulf Coast core',
    ],
    tags: [
      { id: 'nascar-crossover', label: 'National résumé crossover' },
      { id: 'career-completer', label: 'Career-completing win' },
    ],
    relatedRaces: [
      {
        year: 1974,
        label: 'Résumé rarity',
        description: 'Purvis in 1995 and Pete Hamilton in 1974 are different kinds of crossover oddities: Derby winners whose larger racing résumés make them stand apart in the archive.',
        weight: 2,
      },
    ],
  },
  1999: {
    summary: 'The fifth crown, the richest purse, and a corrected finish.',
    significance:
      'Rich Bickle’s 1999 win completed the strongest Derby career on record, but the race is just as memorable for its scoring reversal and the unmatched $125,000 purse structure.',
    storylines: [
      'Bickle was awarded a record fifth Derby title',
      'Bobby Gill initially celebrated before the scoring correction',
      'The purse and bonus structure made it the richest Derby night ever',
    ],
    tags: [
      { id: 'scoring-dispute', label: 'Scoring dispute' },
      { id: 'dynasty-peak', label: 'Dynasty peak' },
      { id: 'record-purse', label: 'Record purse' },
    ],
    relatedRaces: [
      {
        year: 1977,
        label: 'Scoring correction lineage',
        description: 'The Derby’s long memory for corrected finishes runs straight from 1977 into Bickle’s 1999 fifth title.',
        weight: 5,
      },
      {
        year: 2005,
        label: 'Veteran payoff',
        description: 'Bickle’s career-defining 1999 finish and Eddie Mercer’s long-awaited 2005 breakthrough are different kinds of veteran payoffs, but both feel like earned endings to long Derby arcs.',
        weight: 2,
      },
    ],
  },
  2001: {
    summary: 'A clean marker in the post-Bickle reset period.',
    significance:
      'Wayne Anderson’s 2001 win helped define the Derby’s early-2000s transition years, when the event was still prestigious but had not yet fully entered its later national-media phase.',
    storylines: [
      'One of the first notable winners after the Bickle-heavy 1990s',
      'The event was finding its next identity after a dynasty era',
    ],
    tags: [
      { id: 'era-transition', label: 'Era transition' },
      { id: 'post-dynasty', label: 'Post-dynasty reset' },
    ],
    relatedRaces: [
      {
        year: 2005,
        label: 'Early-2000s local arc',
        description: 'The early-2000s Derby evolved from transitional winners like Anderson to local-payoff stories like Mercer in 2005.',
        weight: 3,
      },
    ],
  },
  2003: {
    summary: 'The rear-to-front upset from an unlikely route.',
    significance:
      'Charlie Bradberry’s 2003 win gave the Derby one of its stranger travel-and-timing stories, proving that the event could still reward an outsider who reached Pensacola late and executed anyway.',
    storylines: [
      'Bradberry arrived late and still won',
      'The story felt more improvisational than a typical polished modern Derby run',
      'A reminder that the Derby still had room for oddball journey stories even in the 2000s',
    ],
    tags: [
      { id: 'outsider-win', label: 'Outsider win' },
      { id: 'travel-story', label: 'Travel story' },
    ],
    relatedRaces: [
      {
        year: 2016,
        label: 'Young-gun contrast',
        description: 'Bradberry’s unusual 2003 route to victory contrasts sharply with the more polished prospect-driven wins that defined later years like 2016.',
        weight: 1,
      },
    ],
  },
  2004: {
    summary: 'The youngest-winner record changed hands again.',
    significance:
      'Steven Wallace’s 2004 win matters because it briefly reset one of the Derby’s key age markers before Chase Elliott lowered it even further in 2011.',
    storylines: [
      'Steven Wallace became the youngest Derby winner at the time',
      'The event continued to reinforce its reputation as a launchpad for future national names',
    ],
    tags: [
      { id: 'youngest-winner', label: 'Youngest winner at the time' },
      { id: 'nascar-crossover', label: 'National launchpad' },
    ],
    relatedRaces: [
      {
        year: 2011,
        label: 'Youngest-winner reset',
        description: 'Steven Wallace held the age mark until Chase Elliott’s 2011 breakthrough pushed the benchmark even lower.',
        weight: 5,
      },
    ],
  },
  2005: {
    summary: 'A breakthrough that took 17 attempts.',
    significance:
      'Eddie Mercer’s Derby win was one of the event’s most satisfying delayed payoffs, ending a long local pursuit and setting the benchmark for patience before later redemption stories arrived.',
    storylines: [
      'Mercer finally won on his 17th attempt',
      'One of the longest waits to a Derby title on record',
      'A local favorite finally cashed in on years of near-misses',
    ],
    tags: [
      { id: 'long-wait', label: 'Long-awaited win' },
      { id: 'local-win', label: 'Local winner' },
    ],
    relatedRaces: [
      {
        year: 2025,
        label: 'Patience and payoff',
        description: 'Mercer’s 2005 breakthrough is the clearest earlier comparison for Stephen Nasse finally getting his official Derby moment in 2025.',
        weight: 4,
      },
    ],
  },
  2007: {
    summary: 'The 40th running and Augie Grill’s first crown.',
    significance:
      'The 40th anniversary Derby landed with a fitting modern Pensacola figure at the center as Augie Grill won for the first time while also strengthening his identity as both driver and crew chief.',
    storylines: [
      '40th running of the Snowball Derby',
      'Augie Grill won his first Derby',
      'The support-race side of Derby weekend was peaking in participation',
    ],
    tags: [
      { id: 'anniversary', label: 'Anniversary running' },
      { id: 'local-win', label: 'Local winner' },
    ],
    relatedRaces: [
      {
        year: 2008,
        label: 'Back-to-back setup',
        description: 'Grill’s first Derby title in 2007 only became more important when he returned a year later and repeated.',
        weight: 4,
      },
    ],
  },
  2008: {
    summary: 'A repeat title that confirmed Augie Grill was not a one-year story.',
    significance:
      'Grill’s second straight Derby win moved him from local favorite to modern Derby fixture. Back-to-back wins are rare enough that the 2008 race immediately elevated his standing in the event’s pecking order.',
    storylines: [
      'Augie Grill completed a back-to-back run',
      'The 2007 breakthrough became a larger Derby identity',
      'One of the clearest modern local-ace stretches in the archive',
    ],
    tags: [
      { id: 'multi-win-arc', label: 'Repeat-title arc' },
      { id: 'local-win', label: 'Local winner' },
    ],
    relatedRaces: [
      {
        year: 2007,
        label: 'Back-to-back setup',
        description: 'The 2008 repeat only works because 2007 established Grill as the center of that Derby moment.',
        weight: 5,
      },
    ],
  },
  2009: {
    summary: 'A national-star win with a milestone pole beside it.',
    significance:
      'Kyle Busch’s win elevated the Derby’s national profile, but Johanna Long’s pole run may have been the more important long-term storyline because it previewed the barrier-breaking 2010 season that followed.',
    storylines: [
      'Kyle Busch crossed the Derby off his list',
      'Johanna Long became the first female pole winner',
      'The race carried a stronger national spotlight than the years immediately before it',
    ],
    tags: [
      { id: 'national-spotlight', label: 'National spotlight' },
      { id: 'female-pole', label: 'First female pole winner' },
    ],
    relatedRaces: [
      {
        year: 2010,
        label: 'Johanna Long rise',
        description: 'Long’s pole-winning speed in 2009 reads like the setup chapter for her breakthrough Derby win one season later.',
        weight: 5,
      },
      {
        year: 1974,
        label: 'National-star spotlight',
        description: 'Pete Hamilton in 1974 and Kyle Busch in 2009 are different eras of the same Derby trait: nationally recognized names treating the race as something worth winning.',
        weight: 3,
      },
    ],
  },
  2012: {
    summary: 'The first Erik Jones shockwave.',
    significance:
      'Jones winning on his first Derby attempt gave the event one of its cleanest modern breakthrough stories and announced a future national-level driver before he was fully a national name.',
    storylines: [
      'Erik Jones won as a first-time Derby starter',
      'A teenager immediately solved one of short-track racing’s hardest races',
      'The result opened a short but important back-to-back title thread',
    ],
    tags: [
      { id: 'breakthrough', label: 'First-attempt breakthrough' },
      { id: 'young-gun', label: 'Young-gun win' },
    ],
    relatedRaces: [
      {
        year: 2013,
        label: 'Back-to-back continuation',
        description: 'The 2012 shock became a championship thread when Jones backed it up with the inherited 2013 title.',
        weight: 4,
      },
    ],
  },
  2010: {
    summary: 'Pensacola and history collided again.',
    significance:
      'Johanna Long’s victory reinforced the Derby’s local identity while also making her only the second female winner in event history.',
    storylines: [
      'Second female winner in event history',
      'Pensacola-native championship',
    ],
    tags: [
      { id: 'female-winner', label: 'Historic female winner' },
      { id: 'local-win', label: 'Local winner' },
    ],
    relatedRaces: [
      {
        year: 1994,
        label: 'Barrier-breaker precedent',
        description: 'Tammy Jo Kirk’s 1994 breakthrough is the essential historical comparison for Johanna Long’s hometown victory.',
        weight: 5,
      },
      {
        year: 2009,
        label: 'Johanna Long rise',
        description: 'Long’s pole in 2009 reads like the setup chapter for the hometown breakthrough she completed one year later.',
        weight: 3,
      },
    ],
  },
  2011: {
    summary: 'The closest finish and youngest champion on record.',
    significance:
      'Chase Elliott’s 2011 win became an instant classic because it combined future-star validation, a razor-thin finish, and a record-setting age milestone.',
    storylines: [
      'Youngest winner in Derby history',
      'Closest finish in Derby history',
      'An early signal of Elliott’s national future',
    ],
    tags: [
      { id: 'youngest-winner', label: 'Youngest winner' },
      { id: 'closest-finish', label: 'Closest finish' },
    ],
    relatedRaces: [
      {
        year: 1978,
        label: 'Youngest-winner handoff',
        description: 'Dave Mader III held the youngest-winner mark until Chase Elliott reset it in 2011.',
        weight: 4,
      },
    ],
  },
  2013: {
    summary: 'A finish rewritten in post-race inspection.',
    significance:
      'The tungsten disqualification became one of the most important modern examples of a Derby outcome changing after the checkered flag.',
    storylines: [
      'Chase Elliott crossed first but was disqualified',
      'Erik Jones inherited a second straight Derby title',
    ],
    tags: [
      { id: 'post-race-dq', label: 'Post-race DQ' },
      { id: 'controversy', label: 'Controversy' },
    ],
    relatedRaces: [
      {
        year: 1977,
        label: 'Classic controversy echo',
        description: 'The 2013 tech-room reversal belongs in the same family as the 1977 scoring dispute.',
        weight: 3,
      },
      {
        year: 2019,
        label: 'Modern tech controversy',
        description: 'Both races are remembered less for the checkered flag than for the technical inspection that rewrote the finish.',
        weight: 5,
      },
      {
        year: 2025,
        label: 'Penalty-era sequel',
        description: 'The 2025 finish kept alive the modern pattern of the Derby’s result changing after the apparent winner crossed first.',
        weight: 3,
      },
    ],
  },
  2014: {
    summary: 'Another young-winner chapter in the national-launchpad era.',
    significance:
      'John Hunter Nemechek’s win kept the 2010s pattern alive: the Derby was increasingly becoming a place where future national-series drivers validated themselves before larger audiences.',
    storylines: [
      'Nemechek won in a late-restart finish',
      'The race preserved the 2010s run of young national-bound winners',
      'Erik Jones’ failed three-peat chase added extra context',
    ],
    tags: [
      { id: 'young-gun', label: 'Young-gun win' },
      { id: 'national-spotlight', label: 'National launchpad' },
    ],
    relatedRaces: [
      {
        year: 2011,
        label: 'Young-star era',
        description: 'Elliott in 2011 and Nemechek in 2014 belong to the same period where the Derby kept producing future national figures as winners.',
        weight: 3,
      },
    ],
  },
  2015: {
    summary: 'Another win that had to survive post-race tech.',
    significance:
      'Chase Elliott’s second Derby title also reinforced one of the event’s persistent truths: some of its most memorable finishes are not final until after inspection is complete.',
    storylines: [
      'Christopher Bell was disqualified after initially getting the win',
      'Elliott became a two-time Derby winner',
      'The 2010s kept producing young, national-profile champions',
    ],
    tags: [
      { id: 'post-race-dq', label: 'Post-race DQ' },
      { id: 'controversy', label: 'Controversy' },
      { id: 'multi-win-arc', label: 'Second title' },
    ],
    relatedRaces: [
      {
        year: 2013,
        label: 'Tech-room echo',
        description: 'The 2015 post-race reversal felt like an immediate sequel to the 2013 tungsten disqualification storyline.',
        weight: 5,
      },
    ],
  },
  2016: {
    summary: 'A photo-finish prospect duel.',
    significance:
      'Christian Eckes beating John Hunter Nemechek on the last lap gave the Derby another proof-of-future moment, but in a style that felt more like a modern development showcase than a classic attrition race.',
    storylines: [
      'Eckes won by a razor-thin margin on the final lap',
      'Another young driver used the Derby as a career credential',
      'The weather-delayed schedule added to the feeling of a long, hard-earned win',
    ],
    tags: [
      { id: 'young-gun', label: 'Young-gun win' },
      { id: 'close-finish', label: 'Close finish' },
    ],
    relatedRaces: [
      {
        year: 2011,
        label: 'Modern close-finish thread',
        description: 'The 2016 last-lap duel does not match 2011’s margin exactly, but both races live in the modern Derby memory as wins decided under maximum late pressure.',
        weight: 2,
      },
    ],
  },
  2018: {
    summary: 'A stormy-weekend win that added folklore to the trophy itself.',
    significance:
      'Noah Gragson’s 2018 victory is remembered for the driving, but also for the odd afterlife of the trophy story, which turned a modern Derby win into a broader piece of event folklore.',
    storylines: [
      'Gragson came from eighth to win',
      'The weekend’s weather disruption already made the event feel unstable',
      'The lost-and-recovered trophy story gave the race a strange extra chapter',
    ],
    tags: [
      { id: 'modern-flashpoint', label: 'Modern folklore' },
      { id: 'weather-weekend', label: 'Weather-disrupted weekend' },
    ],
    relatedRaces: [
      {
        year: 2019,
        label: 'Immediate modern sequel',
        description: 'The weirdness of 2018 was followed by the much harsher tech controversy of 2019, giving the Derby back-to-back years of modern folklore for very different reasons.',
        weight: 3,
      },
    ],
  },
  2020: {
    summary: 'The first Ty Majeski breakthrough.',
    significance:
      'Majeski’s 2020 victory opened the most important modern repeat-winner thread before he became a recurring benchmark in the Derby’s current era.',
    storylines: [
      'Ty Majeski earned his first Derby crown',
      'A stacked national field marked the event’s modern reach',
    ],
    tags: [
      { id: 'modern-benchmark', label: 'Modern benchmark' },
      { id: 'multi-win-arc', label: 'Multi-win arc' },
    ],
    relatedRaces: [
      {
        year: 2023,
        label: 'Repeat-winner thread',
        description: 'Majeski’s second win in 2023 turned the 2020 breakthrough into a genuine multi-title Derby run.',
        weight: 4,
      },
      {
        year: 2025,
        label: 'Penalty reversal',
        description: 'The 2025 controversy is sharper because the apparent winner was the same Ty Majeski who had already defined this era.',
        weight: 3,
      },
    ],
  },
  2021: {
    summary: 'The bump-and-run heartbreak race.',
    significance:
      'Chandler Smith’s 2021 win matters because it sits at the center of Derek Thorn’s modern Derby heartbreak arc. Few recent races are remembered more by the driver who almost won than by the eventual winner.',
    storylines: [
      'Thorn looked in command before the late contact and pass',
      'Chandler Smith added another young national-series name to the winner list',
      'The race intensified the sense that Thorn’s eventual breakthrough still had to be earned the hard way',
    ],
    tags: [
      { id: 'heartbreak', label: 'Heartbreak finish' },
      { id: 'young-gun', label: 'Young-gun win' },
    ],
    relatedRaces: [
      {
        year: 2022,
        label: 'Immediate payoff',
        description: 'The pain of 2021 is a big reason Thorn’s 2022 breakthrough landed with such force one year later.',
        weight: 6,
      },
    ],
  },
  2022: {
    summary: 'The breakthrough Derek Thorn had been chasing.',
    significance:
      'After several years of front-running speed and repeated heartbreak, Thorn’s 2022 victory finally turned his modern Derby dominance into an actual championship.',
    storylines: [
      'Thorn finally converted his speed into a Derby win',
      'The 2020-2022 lap-led stretch became one of the wildest modern runs in event history',
      'Late cautions forced him to finish the job under pressure rather than on cruise control',
    ],
    tags: [
      { id: 'breakthrough', label: 'Long-awaited breakthrough' },
      { id: 'modern-benchmark', label: 'Modern benchmark' },
    ],
    relatedRaces: [
      {
        year: 2020,
        label: 'Modern benchmark thread',
        description: 'Majeski’s 2020 win and Thorn’s 2022 breakthrough define the same modern standard: front-running speed finally paying off on Derby night.',
        weight: 3,
      },
      {
        year: 2023,
        label: 'Modern benchmark thread',
        description: 'Thorn’s 2022 breakthrough and Majeski’s 2023 second title sit in the same recent-era conversation about who defined the Derby’s current competitive bar.',
        weight: 3,
      },
    ],
  },
  2019: {
    summary: 'A modern scandal that still defines the event’s tone.',
    significance:
      'The Nasse disqualification and the surrounding accusations made the 2019 race one of the most debated Derby finishes of the modern era.',
    storylines: [
      'Stephen Nasse crossed first but lost the win',
      'Brake-system violations became central to the aftermath',
    ],
    tags: [
      { id: 'post-race-dq', label: 'Post-race DQ' },
      { id: 'controversy', label: 'Controversy' },
      { id: 'modern-flashpoint', label: 'Modern flashpoint' },
    ],
    relatedRaces: [
      {
        year: 2013,
        label: 'Tech-inspection precedent',
        description: 'The 2013 Derby is the closest modern precedent for a race outcome flipping after post-race inspection.',
        weight: 5,
      },
      {
        year: 2024,
        label: 'Heartbreak setup',
        description: 'Stephen Nasse’s runner-up finish in 2024 kept the emotional thread from 2019 alive one year before his redemption.',
        weight: 3,
      },
      {
        year: 2025,
        label: 'Redemption payoff',
        description: 'The 2025 win reads as the payoff to the controversy and frustration that started with Nasse’s 2019 disqualification.',
        weight: 6,
      },
    ],
  },
  2024: {
    summary: 'A near-miss that set up the payoff one year later.',
    significance:
      'Kaden Honeycutt’s win mattered on its own, but the race also became the final heartbreak before Stephen Nasse’s breakthrough in 2025.',
    storylines: [
      'Honeycutt became the first Texas winner',
      'Stephen Nasse finished second and kept the redemption story alive',
      'Ty Majeski controlled much of the night before fading to third',
    ],
    tags: [
      { id: 'redemption-setup', label: 'Redemption setup' },
      { id: 'modern-flashpoint', label: 'Modern flashpoint' },
    ],
    relatedRaces: [
      {
        year: 2019,
        label: 'Nasse heartbreak thread',
        description: 'Nasse’s 2024 runner-up run re-opened the wound created by the 2019 disqualification.',
        weight: 3,
      },
      {
        year: 2025,
        label: 'Immediate sequel',
        description: 'The 2025 Derby feels like the direct sequel to 2024: Nasse’s heartbreak flipped into the long-awaited win.',
        weight: 6,
      },
    ],
  },
  2023: {
    summary: 'Ty Majeski returned to the top of the event.',
    significance:
      'A second Majeski title established him as one of the defining benchmark drivers of the modern Derby.',
    storylines: [
      'Majeski became a two-time winner',
      'The purse and national profile continued to climb',
    ],
    tags: [
      { id: 'modern-benchmark', label: 'Modern benchmark' },
      { id: 'multi-win-arc', label: 'Multi-win arc' },
    ],
    relatedRaces: [
      {
        year: 2020,
        label: 'Repeat-winner thread',
        description: 'The 2020 win was Majeski’s breakthrough; 2023 confirmed it was more than a one-off.',
        weight: 4,
      },
      {
        year: 2025,
        label: 'Majeski controversy endpoint',
        description: 'The 2025 penalty carried extra weight because it involved a driver who had already become a modern Derby standard.',
        weight: 3,
      },
    ],
  },
  2025: {
    summary: 'A long-awaited redemption that still arrived through late-race drama.',
    significance:
      'Nasse’s first official Derby win closed a story arc that had stretched across more than a decade, while the late-race Majeski penalty kept the event’s controversy tradition alive.',
    storylines: [
      'Stephen Nasse finally won after years of heartbreak',
      'Ty Majeski crossed first but lost the race on penalty',
      'The winner’s purse remained at the modern $50,000 level',
    ],
    tags: [
      { id: 'redemption', label: 'Redemption win' },
      { id: 'controversy', label: 'Controversy' },
      { id: 'modern-flashpoint', label: 'Modern flashpoint' },
    ],
    relatedRaces: [
      {
        year: 2019,
        label: 'Redemption origin',
        description: 'Nasse’s official 2025 breakthrough only makes full sense when read against the win he lost in 2019.',
        weight: 6,
      },
      {
        year: 2024,
        label: 'Immediate sequel',
        description: 'The 2024 near-miss was the final setup before Nasse finally got the Tom Dawson Trophy.',
        weight: 6,
      },
      {
        year: 2020,
        label: 'Majeski era callback',
        description: 'Ty Majeski’s role in the 2025 penalty finish hits differently because he already owned one of the era’s benchmark victories.',
        weight: 3,
      },
      {
        year: 2023,
        label: 'Majeski era callback',
        description: 'Majeski’s 2023 title is part of the same modern-era thread that made the 2025 late-race penalty so consequential.',
        weight: 3,
      },
    ],
  },
  1970: {
    summary: 'The first repeat winner made the origin story bigger.',
    significance:
      'Wayne Niedecken Sr. winning again in 1970 mattered because it transformed the inaugural winner from a one-night first champion into the event’s earliest benchmark. The Derby suddenly had history, not just a debut.',
    storylines: [
      'The race doubled in length to 200 laps',
      'Wayne Niedecken Sr. became the event’s first repeat winner',
      'The Derby began to separate long-haul winners from one-off survivors',
    ],
    tags: [
      { id: 'founding-benchmark', label: 'Founding benchmark' },
      { id: 'distance-change', label: 'Distance change' },
    ],
    relatedRaces: [
      {
        year: 1968,
        label: 'Founding sequel',
        description: 'The first running created the winner; 1970 confirmed Wayne Niedecken Sr. as the Derby’s first real benchmark figure.',
        weight: 5,
      },
    ],
  },
  1973: {
    summary: 'Dickie Davis did it again and the protests kept following him.',
    significance:
      'Davis’ second title in 1973 deepened the Derby’s early reputation for results that were fast, contested, and hard to separate from the arguments around them.',
    storylines: [
      'Dickie Davis became a two-time winner',
      'Another protest-heavy aftermath kept the race inside the controversy era',
      'Pete Hamilton’s pole run added national-name speed to the weekend',
    ],
    tags: [
      { id: 'controversy', label: 'Controversy era' },
      { id: 'multi-win-arc', label: 'Second title' },
    ],
    relatedRaces: [
      {
        year: 1971,
        label: 'Davis controversy arc',
        description: 'The 1973 win only gets sharper when paired with the first disputed Davis title in 1971.',
        weight: 5,
      },
      {
        year: 1974,
        label: 'Hamilton follow-up',
        description: 'Pete Hamilton’s pole-winning speed in 1973 fed directly into his full Derby breakthrough one season later.',
        weight: 3,
      },
    ],
  },
  1976: {
    summary: 'Darrell Waltrip got his Derby win before the 1977 chaos.',
    significance:
      'Waltrip’s 1976 victory stands on its own, but it also matters because of what came next. Once 1977 turned into a scoring-dispute legend, the clean 1976 win became part of the before-and-after contrast in Waltrip’s Derby story.',
    storylines: [
      'Waltrip scored his lone Derby title',
      'A future NASCAR Hall of Famer validated the event in its early years',
      'The race now reads like the calm before the 1977 storm',
    ],
    tags: [
      { id: 'nascar-crossover', label: 'NASCAR crossover' },
      { id: 'pre-controversy', label: 'Pre-controversy setup' },
    ],
    relatedRaces: [
      {
        year: 1977,
        label: 'Immediate controversy sequel',
        description: 'Waltrip’s clean 1976 win became inseparable from the disputed follow-up one year later.',
        weight: 5,
      },
    ],
  },
  1978: {
    summary: 'The youngest winner mark moved for the first time.',
    significance:
      'Dave Mader III’s 1978 win mattered because it created an age benchmark that held for decades. It also reinforced the Derby’s ability to make reputations quickly when a young driver was fast enough to finish the job.',
    storylines: [
      'Mader became the youngest winner at the time',
      'He beat Mark Martin late in one of the race’s better early duels',
      'The Derby gained one of its first age-based myths',
    ],
    tags: [
      { id: 'youngest-winner', label: 'Youngest winner at the time' },
      { id: 'duel-finish', label: 'Late duel' },
    ],
    relatedRaces: [
      {
        year: 2011,
        label: 'Youngest-winner handoff',
        description: 'Mader’s 1978 benchmark lasted until Chase Elliott reset the age record in 2011.',
        weight: 5,
      },
    ],
  },
  1981: {
    summary: 'Freddie Fryar finished the job from the pole.',
    significance:
      'The 1981 win rounded out Freddie Fryar’s Derby championship story by proving the 1979 breakthrough was no fluke. A pole-to-win second title moved him from local hero to one of the defining figures of the early event.',
    storylines: [
      'Freddie Fryar won his second Derby',
      'He controlled the weekend from the pole',
      'The race cemented him as one of the event’s pioneer-era anchors',
    ],
    tags: [
      { id: 'pole-to-win', label: 'Pole-to-win' },
      { id: 'multi-win-arc', label: 'Second title' },
    ],
    relatedRaces: [
      {
        year: 1979,
        label: 'Freddie Fryar double',
        description: 'The local-masterpiece win in 1979 and the pole-winning 1981 title complete Freddie Fryar’s Derby champion arc.',
        weight: 5,
      },
    ],
  },
  1986: {
    summary: 'Gary Balough came back and closed his Derby two-title arc.',
    significance:
      'Balough’s second Derby win mattered because it proved 1980 was not just a one-day spectacle. The return title gave one of the event’s flashiest early stars a complete multi-win profile.',
    storylines: [
      'Balough won for the second time',
      'His return reinforced the lasting memory of the 1980 speed-show win',
      'Freddie Fryar’s final top-10 note added another layer of era transition',
    ],
    tags: [
      { id: 'multi-win-arc', label: 'Second title' },
      { id: 'era-transition', label: 'Era transition' },
    ],
    relatedRaces: [
      {
        year: 1980,
        label: 'Balough origin chapter',
        description: 'The 1986 title reads as the mature echo of the wilder, faster, more mythic 1980 win.',
        weight: 5,
      },
    ],
  },
  1992: {
    summary: 'A rookie winner crashed straight into the middle of Derby history.',
    significance:
      'Gary St. Amant’s 1992 victory mattered because it interrupted the expected order. Rookie winners always stand out in this race, and his success over a strong field made the early-1990s Derby feel wider open again.',
    storylines: [
      'St. Amant won as a rookie',
      'The result landed in the middle of the competitive 1990s Derby stretch',
      'It set up the later proof point when he won again in 2000',
    ],
    tags: [
      { id: 'rookie-win', label: 'Rookie win' },
      { id: 'breakthrough', label: 'Immediate breakthrough' },
    ],
    relatedRaces: [
      {
        year: 2000,
        label: 'Second-proof chapter',
        description: 'The shock of St. Amant’s 1992 rookie win only became a full Derby arc when he won again in 2000.',
        weight: 5,
      },
    ],
  },
  1993: {
    summary: 'Bobby Gill arrived as more than a contender.',
    significance:
      'Gill’s first Derby title pushed him into the core group of 1990s figures who defined the decade’s competitive tone. It was the start of a run that made him impossible to separate from the era.',
    storylines: [
      'Bobby Gill claimed his first Derby title',
      'The win established him as a decade-long Derby force',
      'The 1990s contender hierarchy gained another central name',
    ],
    tags: [
      { id: 'breakthrough', label: 'First title' },
      { id: 'decade-anchor', label: '1990s anchor' },
    ],
    relatedRaces: [
      {
        year: 1997,
        label: 'Gill double',
        description: 'The 1993 breakthrough only becomes a full Derby profile when paired with Gill’s second title in 1997.',
        weight: 4,
      },
      {
        year: 1999,
        label: 'Gill controversy endpoint',
        description: 'Gill’s 1990s Derby story runs directly into the scoring-reversal heartbreak of 1999.',
        weight: 3,
      },
    ],
  },
  1996: {
    summary: 'Rich Bickle won again, and did it in one of the race’s strangest winning looks.',
    significance:
      'The 1996 Derby matters because it turned Bickle from a multiple winner into the era’s dominant standard. Winning without the hood only made the race more memorable and added to the sense that he could win this event in almost any form.',
    storylines: [
      'Bickle became a three-time winner',
      'He won with a damaged car and no hood',
      'The race deepened the aura of his 1990s Derby dominance',
    ],
    tags: [
      { id: 'dynasty-peak', label: 'Dynasty peak' },
      { id: 'damaged-car-win', label: 'Damaged car win' },
    ],
    relatedRaces: [
      {
        year: 1998,
        label: 'No-hood echo',
        description: 'Bickle’s late-1990s wins felt linked partly because the car looked battered again by the time he reached Victory Lane in 1998.',
        weight: 4,
      },
      {
        year: 1999,
        label: 'Dynasty endpoint',
        description: 'The third title in 1996 pointed directly toward the final two championships that completed Bickle’s all-time benchmark run.',
        weight: 3,
      },
    ],
  },
  2000: {
    summary: 'Gary St. Amant proved the rookie shock had a second chapter.',
    significance:
      'St. Amant’s second Derby title mattered because it turned a surprising 1992 rookie win into a legitimate multi-era Derby career. It gave the post-Bickle transition years a winner with real continuity.',
    storylines: [
      'St. Amant became a two-time winner',
      'The result validated his earlier rookie breakthrough',
      'The race helped bridge the 1990s contender era into the early 2000s',
    ],
    tags: [
      { id: 'multi-win-arc', label: 'Second title' },
      { id: 'era-transition', label: 'Era transition' },
    ],
    relatedRaces: [
      {
        year: 1992,
        label: 'Rookie-origin chapter',
        description: 'The second title only works because the first one in 1992 arrived with such immediate shock value.',
        weight: 5,
      },
      {
        year: 2001,
        label: 'Early-2000s bridge',
        description: 'The 2000 and 2001 winners together help define the Derby’s early post-Bickle identity.',
        weight: 2,
      },
    ],
  },
  2002: {
    summary: 'The marathon Derby that punished everyone.',
    significance:
      'Ricky Turner’s 2002 win stands out because the race itself became the story: huge caution totals, very few finishers, and a grueling shape that made survival feel almost as important as pace.',
    storylines: [
      'The race was slowed by an enormous number of caution laps',
      'Only a small number of cars were still running at the finish',
      'Turner’s Derby title came from surviving a punishing version of the event',
    ],
    tags: [
      { id: 'attrition-race', label: 'Attrition race' },
      { id: 'caution-heavy', label: 'Caution-heavy running' },
    ],
    relatedRaces: [
      {
        year: 1988,
        label: 'Modern-distance stress test',
        description: 'The 300-lap era created the conditions for races like 2002 to become as much endurance contests as speed contests.',
        weight: 2,
      },
    ],
  },
  2006: {
    summary: 'A DQ rewrote the finish and Clay Rogers inherited the result.',
    significance:
      'The 2006 Derby matters because it kept alive the event’s long tradition of outcomes that do not fully settle at the flag. Rogers’ win is part of the same larger Derby truth as several later modern reversals.',
    storylines: [
      'Clay Rogers was awarded the win after Bobby Gill’s disqualification',
      'The official result changed after the apparent finish order',
      'The race linked the early-2000s Derby back to the event’s long controversy thread',
    ],
    tags: [
      { id: 'post-race-dq', label: 'Post-race DQ' },
      { id: 'controversy', label: 'Controversy' },
    ],
    relatedRaces: [
      {
        year: 2013,
        label: 'Tech-room sequel',
        description: 'The 2006 post-race reversal became an important early-21st-century precursor to the better-known 2013 disqualification finish.',
        weight: 4,
      },
      {
        year: 2015,
        label: 'Another reversed finish',
        description: 'Both 2006 and 2015 remind readers that the Derby has never guaranteed the first celebration is the final verdict.',
        weight: 3,
      },
    ],
  },
  2017: {
    summary: 'The 50th running landed on a modern national star.',
    significance:
      'Kyle Busch winning the 50th Derby gave the anniversary race an appropriately big-centerpiece feel. It also confirmed that the event still carried enough prestige to matter to national-level names deep into the modern era.',
    storylines: [
      '50th running of the Snowball Derby',
      'Kyle Busch became a two-time Derby winner',
      'The anniversary race had both historical weight and modern star power',
    ],
    tags: [
      { id: 'anniversary', label: '50th running' },
      { id: 'national-spotlight', label: 'National spotlight' },
      { id: 'multi-win-arc', label: 'Second title' },
    ],
    relatedRaces: [
      {
        year: 2009,
        label: 'Busch double',
        description: 'The 2009 breakthrough and 2017 anniversary win form the two-title Derby profile for Kyle Busch.',
        weight: 5,
      },
    ],
  },
};
