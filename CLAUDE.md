# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VENUE is a Miami-market private event venue marketplace. It connects people planning events (birthdays, corporate, weddings, baby showers) with real Miami venues through a guided booking wizard.

- **Live site:** venue.georg.miami
- **Co-founder:** Frank (advisory role)
- **Operator:** Georg Chimion (everything — dev, research, outreach, marketing)
- **Current phase:** Phase 1 — Concierge MVP
- **Strategy doc:** `docs/GTM-PLAN.md`

## Current State (as of 2026-03-17)

The app is currently a **single-file SPA** (`index.html`, ~1,260 lines) deployed via GitHub Pages. It's being migrated to **Next.js + React + TypeScript** for the real marketplace.

### What exists now:
- `index.html` — Full prototype (CSS + HTML + JS, all inline)
- `src/data/venues.json` — Real Miami venue database (16+ venues, expanding to 30)
- `docs/GTM-PLAN.md` — Master go-to-market strategy with 5 phases
- `docs/email-templates.md` — Concierge email copy (6 templates)
- `docs/METRICS.md` — Weekly metrics tracking

### What's being built (Phase 1):
- Next.js App Router project with TypeScript
- Component extraction from index.html → React components
- VPS deployment (DigitalOcean + Nginx + pm2)
- PostHog + GA4 analytics

## Target Architecture (Next.js)

```
venue/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout: fonts, meta, analytics
│   │   ├── page.tsx                  # Home / booking wizard
│   │   ├── partners/page.tsx         # Venue owner pitch (Phase 3)
│   │   ├── venues/[slug]/page.tsx    # Venue detail pages (SEO)
│   │   ├── neighborhoods/[area]/page.tsx  # SEO landing pages
│   │   ├── dashboard/page.tsx        # Partner dashboard (Phase 4)
│   │   └── api/
│   │       ├── booking/route.ts      # Form → Resend + Supabase
│   │       └── venues/route.ts       # Venue data API
│   ├── components/
│   │   ├── BookingWizard.tsx          # 3-step wizard (from index.html JS)
│   │   ├── VenueCard.tsx             # Reusable venue card
│   │   ├── ContactModal.tsx          # Booking/contact modal
│   │   ├── ProgressBar.tsx           # Wizard progress bar
│   │   ├── HeroSection.tsx           # Landing page hero
│   │   └── ui/                       # Shared UI primitives
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client (Phase 4)
│   │   ├── resend.ts                # Email sending (Phase 2)
│   │   ├── analytics.ts            # PostHog + GA4
│   │   └── venues.ts               # Data access: JSON now, Supabase later
│   ├── data/
│   │   └── venues.json             # Real Miami venue database
│   └── styles/
│       └── globals.css              # Design system (from index.html CSS)
├── public/images/venues/
├── docs/
│   ├── GTM-PLAN.md                  # Master strategy doc
│   ├── email-templates.md           # Concierge email copy
│   └── METRICS.md                   # Weekly metrics tracking
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

## Legacy Architecture (index.html)

Everything lives in `index.html` (~1,260 lines):

- **Lines ~1–600:** CSS in a `<style>` block (design system, responsive breakpoints)
- **Lines ~600–1050:** HTML structure (screens `#s0` through `#s4`, modals, loading state)
- **Lines ~1050–1260:** JavaScript in a `<script>` block (state management, navigation, form submission)

### Screen Flow

`s0` (Hero) → `s1` (Event Type) → `s2` (Location/Date/Guests) → `s3` (Vibe/Budget) → `s-load` (Fake loading) → `s4` (Venue Results) → Contact Modal → Confirmation

### Key Functions (to port)

| Function | What it does | Target Component |
|---|---|---|
| `go(id)` | Navigate between screens, update progress bar | `BookingWizard.tsx` |
| `findVenues()` | Loading animation → show results | `BookingWizard.tsx` |
| `showConfirm(venue, minSpend, minNum)` | Open contact/booking modal | `ContactModal.tsx` |
| `submitBookingRequest()` | POST to FormSubmit.co | `api/booking/route.ts` |
| `updatePricing()` | Recalculate per-person pricing | `VenueCard.tsx` |

### Migration Strategy (NOT a rewrite — structured extraction)

1. **CSS** (lines 1-600) → `src/styles/globals.css` (nearly verbatim)
2. **HTML** (lines 600-1050) → Split into React components per screen
3. **JavaScript** (lines 1050-1260) → Component logic + `lib/` utilities
4. **State** → React `useState` in BookingWizard (replaces global `state` object)

## Design System

- **Fonts:** Cormorant Garamond (serif headings), DM Sans (body) via Google Fonts
- **Colors:** Accent `#C05A3B` (terracotta), Background `#F8F6F2`, Success `#3A7D5A`
- **Breakpoints:** Desktop >900px, Tablet 600–900px, Mobile <600px, Small <380px
- **Note:** VENUE uses its own brand identity, separate from the teal georg.miami design system

## Venue Data Schema

Venues are stored in `src/data/venues.json` with this structure per venue:

```json
{
  "id": "kebab-case-id",
  "name": "Venue Name",
  "neighborhood": "Wynwood",
  "address": "123 NW 2nd Ave, Miami, FL 33127",
  "description": "1-2 sentence description",
  "spaceTypes": ["full-venue", "rooftop", "private-room"],
  "capacity": { "min": 20, "max": 200, "seated": 120, "cocktail": 200 },
  "pricing": {
    "model": "f&b-minimum | hourly | venue-rental | daily-rental | varies",
    "minimumSpend": 5000,
    "minimumSpendNotes": "Details about pricing",
    "hourlyRate": null,
    "currency": "USD"
  },
  "amenities": ["outdoor-space", "full-bar", "catering", "av-equipment"],
  "bestFor": ["birthday", "corporate", "wedding", "cocktail-party"],
  "ratings": { "google": 4.5, "googleReviewCount": 2000 },
  "contact": { "phone": "...", "email": "...", "website": "...", "eventsUrl": "..." },
  "images": []
}
```

## Deployment

### Production: VPS (DigitalOcean + Nginx + pm2)
```bash
# Deploy: push to GitHub, pull + build + restart on VPS
git push origin HEAD:main
ssh root@159.89.185.96 "cd /var/www/venue-app && git pull && npm run build && pm2 restart venue"
```

- **VPS path**: `/var/www/venue-app/`
- **pm2 process**: `venue` (port 3001)
- **Nginx**: `venue.georg.miami` → `proxy_pass http://localhost:3001`
- **SSL**: Wildcard cert `/etc/letsencrypt/live/georg.miami/`
- **Note**: TypeScript check skipped on VPS builds (1GB RAM OOM) — validate types locally before pushing

### Legacy: GitHub Pages (index.html prototype)
The original `index.html` is still in the repo for reference but no longer deployed.

## Development

```bash
npm install
npm run dev          # localhost:3001
npm run build        # production build
npm start -- -p 3001 # production server
```

## Conventions

- TypeScript for all new code
- React components in PascalCase
- Data access through `lib/venues.ts` (abstracts JSON vs Supabase)
- All business context in `docs/` folder
- Update `CLAUDE.md` and `ROADMAP.md` at end of every session

## Business Context

- **Revenue model:** Free → lead fees ($25-50) → featured placement ($99/mo) → commission (10-15%)
- **Current revenue:** $0 (validation phase)
- **Form backend:** FormSubmit.co → georg.chimion@gmail.com (temporary)
- **Target:** $100-500/mo by Month 3, $3K-8K/mo by Month 12
- **Full plan:** See `docs/GTM-PLAN.md`
