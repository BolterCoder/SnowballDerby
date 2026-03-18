# Snowball Derby React Migration Plan

## Goal

Turn the current single-file static site into a React application that:

- keeps the existing visual direction and storytelling tone
- is easier to edit and expand
- supports more pages and deeper content over time
- separates content, layout, interactions, and data
- allows future migration from local data files to a CMS or API without rewriting the UI

## Current State

The current site is a single long landing page made of:

- `index.html`: all page structure
- `styles.css`: all styling
- `app.js`: all content data and all interactive behavior

### Current issues

- Content, presentation, and behavior are tightly coupled.
- Race data and driver data live inside one large JavaScript file.
- The main race detail experience is modal-only, so it is not linkable or SEO-friendly.
- Several interactions are fragile because DOM selectors and markup do not consistently match.
- Adding a new page or major feature would mean adding more imperative DOM code instead of composing reusable UI.

### Examples of current fragility

- Navigation JS looks for `.hamburger`, but the HTML uses `.nav-toggle`.
- Quote carousel JS looks for `.quote-carousel` and `.quote-item`, but the HTML uses `.quotes-carousel` and `.quote-card`.
- Driver filter JS looks for `.driver-filter`, but the HTML uses `.filter-btn`.

This is a good candidate for a React rewrite because the site already has strong content domains:

- races
- drivers
- legends
- track/history
- records/statistics

## Recommended App Direction

Build a React app that is route-driven and data-driven.

### Recommended stack

- React
- TypeScript
- Vite
- React Router
- CSS Modules or scoped feature CSS
- local JSON/TS content files first

Optional later:

- a headless CMS
- image optimization pipeline
- search indexing
- analytics

I would not start with a CMS yet. First get the data model and routes right. If the content model is clean, CMS integration becomes a content-source swap rather than another refactor.

## Core Architecture

### App shell

Create a shared shell for:

- site header
- mobile navigation
- theme toggle
- footer
- route transitions

This shell should wrap every page so design stays consistent as the site grows.

### Content-first data model

Move all data out of UI code and into typed content modules.

Suggested structure:

```text
src/
  app/
    router.tsx
    providers.tsx
  components/
    layout/
    ui/
  features/
    home/
    races/
    drivers/
    legends/
    records/
  content/
    site.ts
    milestones.ts
    records.ts
    legends.ts
    locals.ts
    support-divisions.ts
    nascar-pipeline.ts
  data/
    races.ts
    drivers.ts
  lib/
    formatters.ts
    filters.ts
    seo.ts
  types/
    race.ts
    driver.ts
```

### Dynamic patterns to adopt immediately

- Route-driven details instead of modal-only details
- URL-based filters and search params
- Typed content objects instead of inline markup strings
- Reusable section and card components
- Shared formatter utilities for dates, labels, stats, and badges
- Image metadata stored with content so galleries can grow cleanly

These are the changes that create future expansion room.

## Recommended Page Map

The current site is one page. It should become a small multi-page content app.

### 1. Home page: `/`

Purpose:

- hero
- event overview
- story
- track overview
- key numbers
- featured quotes
- featured links into deeper pages

Content moved here:

- `hero`
- `story`
- `track`
- `stats`
- `quotes`

React notes:

- Keep this page editorial and high-impact.
- Do not dump every section here after the rewrite.
- Use featured race cards, featured legends, and quick links instead of embedding every data-heavy module.

### 2. Race archive page: `/races`

Purpose:

- searchable archive of all Derby races
- era filtering
- quick scanning and comparison

Content moved here:

- current `races` section card grid

React notes:

- Replace imperative DOM rendering with mapped React components.
- Make search and era filters URL-driven:
  - `/races?era=modern&q=elliott`
- This makes the archive shareable and easier to extend later.

### 3. Race detail page: `/races/:year`

Purpose:

- full story for a single race
- results table
- notable entrants
- DNQ/DNS
- media/gallery

Content moved here:

- current race modal content

React notes:

- This is the most important structural upgrade.
- The current modal can remain as an optional desktop enhancement, but the source of truth should be a page route.
- Each race should be deep-linkable and SEO-readable.
- This route creates expansion room for:
  - citations
  - photo galleries
  - embedded video
  - supporting articles
  - related drivers

### 4. Drivers page: `/drivers`

Purpose:

- searchable driver database
- sortable stats
- future driver profile links

Content moved here:

- current `drivers` section

React notes:

- Build table state with React, not DOM mutation.
- Filters and sorting should also live in the URL where useful.
- Design this so rows can later link to `/drivers/:slug`.

### 5. Legends page: `/legends`

Purpose:

- featured all-time figures
- local heroes
- editorial storytelling around iconic people

Content moved here:

- `legends`
- `locals`

React notes:

- These are content cards now, but should be modeled as profile summaries.
- This page can later support individual profile pages without reworking the list layout.

### 6. Records page: `/records`

Purpose:

- major records
- qualifying/pole winners
- milestones
- controversial outcomes

Content moved here:

- `records`
- `qualifying`
- `milestones`
- `controversies`

React notes:

- This page becomes the statistics and context hub.
- Records should come from computed data where possible, not only hardcoded display cards.
- Pole winners should be its own typed dataset or derived from races.

### 7. Timeline page: `/timeline`

Purpose:

- chronological event overview
- high-level scan of all years

Content moved here:

- `timeline`

React notes:

- The timeline should be fed by race excerpts derived from content, not hand-built markup.
- Later this page can support filters by era, controversies, winners, or NASCAR crossover.

### 8. Track and weekend page: `/event`

Purpose:

- Five Flags Speedway
- support divisions
- Derby weekend context
- NASCAR pipeline section

Content moved here:

- `track`
- `support`
- `nascar`

React notes:

- This keeps the home page from becoming overloaded.
- It also gives you a clean place to expand Snowflake 100 content later.

## Future Expansion Opportunities

These are the changes that make the site truly expandable.

### A. Turn race details into a first-class content system

Each race should be a typed object with stable fields such as:

- `year`
- `slug`
- `title`
- `date`
- `winner`
- `pole`
- `laps`
- `purse`
- `story`
- `stats`
- `results`
- `notableEntrants`
- `media`
- `tags`

That lets you add:

- related races
- featured tags like `controversy`, `female-winner`, `record-race`
- automated timelines
- derived records

### B. Support driver profile pages later

Even if driver profiles are not in phase one, the data model should allow:

- `/drivers/red-farmer`
- `/drivers/rich-bickle`

Suggested additions to driver records:

- `slug`
- `hometown`
- `bestFinish`
- `podiums`
- `topTens`
- `notableMoments`
- `headshot`
- `relatedRaceYears`

### C. Make UI state URL-addressable

This matters for growth.

Examples:

- `/drivers?filter=winners&sort=starts`
- `/races?era=golden`
- `/timeline?tag=controversy`

Benefits:

- sharable filtered views
- better analytics
- easier testing
- no hidden state trapped in imperative JS

### D. Introduce computed content

Some parts of the site should be derived from the race dataset rather than duplicated manually.

Examples:

- unique winners count
- pole-to-win count
- youngest winner
- largest purse
- repeat winners
- era summaries

This reduces maintenance drift.

### E. Prepare for a CMS without forcing one now

Keep content access behind a thin data layer so local arrays today can become CMS/API calls later.

For example:

- `getAllRaces()`
- `getRaceByYear(year)`
- `getDrivers()`
- `getFeaturedLegends()`

If those functions exist early, the UI stays stable when content sourcing changes.

## Component Plan

### Shared components

- `AppShell`
- `SiteHeader`
- `SiteFooter`
- `SectionHeader`
- `Hero`
- `StatCard`
- `SearchInput`
- `FilterTabs`
- `Badge`
- `DataTable`
- `ImageGallery`
- `ThemeToggle`

### Feature components

- `RaceArchiveGrid`
- `RaceArchiveCard`
- `RaceFilters`
- `RaceDetailHero`
- `RaceResultsTable`
- `RaceMetaGrid`
- `DriverTable`
- `DriverFilters`
- `LegendCard`
- `LocalHeroCard`
- `TimelineEntry`
- `PoleWinnersTable`

## Data Refactor Plan

### Phase 1: normalize the existing data

Move:

- `raceData` into `src/data/races.ts`
- `driverDB` into `src/data/drivers.ts`

Clean up:

- inconsistent field names
- repeated strings embedded in UI assumptions
- fields that are sometimes numbers and sometimes formatted strings

### Phase 2: add proper types

Define:

- `Race`
- `RaceResult`
- `Driver`
- `Legend`
- `Milestone`
- `RecordItem`

This will expose bad data early and prevent the React app from depending on accidental shape differences.

### Phase 3: derive computed views

Create selectors/utilities for:

- era grouping
- race search
- records calculations
- timeline excerpts
- pole winner table rows

## Styling Plan

Do not port the current CSS blindly.

Instead:

- keep the visual identity
- break styling into layout-level and feature-level files
- standardize design tokens
- make section components reusable

Suggested styling split:

- `src/styles/tokens.css`
- `src/styles/base.css`
- feature CSS modules or co-located styles

The current design language is usable, but the CSS should be reorganized around components and pages.

## Migration Phases

### Phase 1: foundation

- scaffold Vite + React + TypeScript
- set up router
- create app shell
- move global design tokens and base styles

### Phase 2: content and data extraction

- move race and driver datasets into typed modules
- create formatting and selector utilities
- remove content from imperative JS

### Phase 3: primary pages

- build `/`
- build `/races`
- build `/races/:year`
- build `/drivers`

These deliver most of the value.

### Phase 4: secondary pages

- build `/legends`
- build `/records`
- build `/timeline`
- build `/event`

### Phase 5: enhancements

- add SEO metadata per route
- add image handling improvements
- add analytics
- add citations/source references if desired
- optionally add profile pages and CMS integration

## Recommended Order of Build

1. Build the shell and routing.
2. Move race data and ship `/races` plus `/races/:year`.
3. Move driver data and ship `/drivers`.
4. Split the rest of the editorial sections into focused pages.
5. Add computed records and future profile hooks.

This order gives you a usable app quickly while moving the biggest maintenance risk first: the monolithic race modal/data/rendering code.

## What Should Change to Make It More Dynamic

If the priority is future flexibility, these are the non-negotiable changes:

- replace modal-only detail views with route pages
- move all content into typed data modules
- make filters/search URL-driven
- compute stats from source data where possible
- design every list so it can later link to a detail page
- keep a thin content access layer between UI and data source

That gives you room for:

- more pages
- better SEO
- more content types
- contributor-friendly edits
- eventual CMS/API adoption

## Immediate Next Step

The right first implementation step is:

1. scaffold the React app
2. create the shared layout and routes
3. port the race archive and race detail flow first

That gives the project a stable structure without forcing a full rewrite in one shot.
