# METAR Explorer

Real-time aviation weather decoded — built with Nuxt 4, Vue 3 and TypeScript.

Live at [metar.simonbehr.dev](https://metar.simonbehr.dev)

---

## What it does

Search any ICAO airport code and get the current METAR decoded into human-readable weather data. Raw
METAR strings are parsed and visualized — no aviation background required to understand what's going
on.

**Features**

- Live METAR data from the [Aviation Weather Center API](https://aviationweather.gov/api)
- Wind direction visualized on an interactive compass rose
- Flight category badge — VFR / MVFR / IFR
- Raw METAR string
- Cloud layers with base altitudes
- QNH in hPa and inHg
- Temp / dew point spread with fog risk indicator
- Nearby stations sorted by distance
- Dark / Light mode
- Fully responsive

---

## Stack

- **Framework** — Nuxt 4 / Vue 3 with Composition API
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **Data** — Aviation Weather Center REST API (no API key required)
- **Quality** — Oxlint & Oxfmt

---

## Running locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run typecheck

# Lint & Format
npm run lint:check
```

---

## How it works

The AWC API returns raw METAR data as JSON. We use the structured data to drive the UI components like the compass rose or cloud layers.

CORS is handled via a Nuxt server route that proxies requests to the AWC API server-side.

```
Browser → Nuxt Server Route → AWC API
```

Nearby stations are fetched via a bounding box calculated from the searched station's coordinates.

---

## Project structure

```
app/
├── components/
│   ├── CompassRose.vue
│   ├── CloudLayer.vue
│   ├── TheHeader.vue
│   └── ...
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   └── detail.vue
├── server/
│   └── api/
│       └── metar.get.ts
├── types/
│   └── MetarProperties.ts
└── utils/
    ├── formatWind.ts
    ├── formatWxString.ts
    └── ...
```

---

## About

Built by [Simon Behr](https://simonbehr.dev) — frontend developer and student pilot. The combination
made this project a natural fit: I know what the data means and why it matters.