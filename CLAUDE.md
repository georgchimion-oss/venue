# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VENUE is a Miami-market private event venue marketplace. It connects people planning events (birthdays, corporate, weddings, baby showers) with real Miami venues through a guided booking wizard.

- **Live site:** https://venue.georg.miami
- **Co-founder:** Frank (advisory role)
- **Operator:** Georg Chimion (everything — dev, research, outreach, marketing)
- **Current phase:** Phase 1 — Concierge MVP
- **Strategy doc:** `docs/GTM-PLAN.md`

## Current State (as of 2026-03-18)

The app is a **Next.js 16 + React 19 + TypeScript** app deployed on Georg's VPS. The migration from the old single-file prototype is complete.

### What's live now:
- Next.js app at `venue.georg.miami` (VPS, pm2 + Nginx)
- 31 real Miami venues in `src/data/venues.json`
- 3-step booking wizard: Event Type → Location/Details → Preferences → Results → Contact Modal
- Booking requests POST to FormSubmit.co → georg.chimion@gmail.com
- PostHog + GA4 analytics infrastructure wired (7 funnel events), needs API keys in `.env.local`
- JSON-LD structured data for Google SEO
- Old prototype archived at `docs/legacy-prototype.html`

### What's next (remaining Phase 1 tasks):
- [ ] Create PostHog account, add API key to VPS `.env.local` (see `.env.example`)
- [ ] Create GA4 property, add measurement ID to VPS `.env.local`
- [ ] Set up Supabase (leads table + venue data — single DB for all phases)
- [ ] Submit to Google Search Console

## Architecture

```
venue/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout: fonts, meta, JSON-LD, PostHogProvider
│   │   └── page.tsx                  # Home — renders BookingApp
│   ├── components/
│   │   ├── BookingApp.tsx            # Main orchestrator (client component, manages wizard state)
│   │   ├── HeroSection.tsx           # Landing hero with real venue count
│   │   ├── EventTypeStep.tsx         # Step 1: pick event type (9 options)
│   │   ├── LocationStep.tsx          # Step 2: location, guests, date, time
│   │   ├── PreferencesStep.tsx       # Step 3: budget, catering, vibe, must-haves
│   │   ├── LoadingScreen.tsx         # Animated search loading
│   │   ├── VenueResults.tsx          # Results cards with pricing
│   │   ├── ContactModal.tsx          # Booking form → FormSubmit.co
│   │   └── PostHogProvider.tsx       # Client-side analytics wrapper
│   ├── lib/
│   │   ├── types.ts                  # TypeScript interfaces (VenueData, FormState, Step, etc.)
│   │   ├── venues.ts                 # Data access: getAllVenues(), filterVenues(), formatCurrency()
│   │   └── analytics.ts             # PostHog + GA4 init, page views, 7 wizard funnel events
│   ├── data/
│   │   └── venues.json              # 31 real Miami venues across 9 neighborhoods
│   └── styles/
│       └── globals.css               # Full design system (ported from prototype CSS)
├── docs/
│   ├── GTM-PLAN.md                   # Master 5-phase go-to-market strategy
│   ├── email-templates.md            # 6 concierge email templates
│   ├── METRICS.md                    # Weekly metrics tracking
│   └── legacy-prototype.html         # Archived original index.html (reference only)
├── .env.example                      # PostHog + GA4 key placeholders
├── next.config.ts                    # TypeScript check disabled (VPS OOM)
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

## Wizard Flow

`hero` → `event-type` → `location` → `preferences` → `loading` (2.5s) → `results` → ContactModal → FormSubmit POST

State managed in `BookingApp.tsx` via `useState<Step>` and `useState<FormState>`.

## Analytics Events (wired in BookingApp.tsx)

| Event | When | Data |
|-------|------|------|
| `wizard_started` | Click "Book My Event" | — |
| `event_type_selected` | Pick event type | event_type |
| `location_completed` | Finish step 2 | guests, zip |
| `preferences_completed` | Finish step 3 | budget |
| `search_started` | Click "Find My Space" | guests, event_type |
| `results_viewed` | Results load | venue_count |
| `venue_clicked` | Click "Request This Space" | venue_id, venue_name |
| `booking_submitted` | Submit contact form | venue_id, venue_name, guests |

## Design System

- **Fonts:** Cormorant Garamond (serif headings), DM Sans (body) via `next/font/google`
- **CSS Variables:** `--font-cormorant`, `--font-dm-sans`
- **Colors:** Accent `#C05A3B` (terracotta), Background `#F8F6F2`, Success `#3A7D5A`
- **Breakpoints:** Desktop >900px, Tablet 600–900px, Mobile <600px, Small <380px
- **Note:** VENUE uses its own brand identity, separate from the teal georg.miami design system

## Venue Data Schema

Venues in `src/data/venues.json` — nullable fields: `contact.phone`, `contact.email`, `contact.eventsUrl`, `pricing.hourlyRate`

```json
{
  "id": "kebab-case-id",
  "name": "Venue Name",
  "neighborhood": "Wynwood",
  "capacity": { "min": 20, "max": 200, "seated": 120, "cocktail": 200 },
  "pricing": { "model": "f&b-minimum", "minimumSpend": 5000, "hourlyRate": null },
  "ratings": { "google": 4.5, "googleReviewCount": 2000 },
  "amenities": ["outdoor-space", "full-bar", "catering"],
  "bestFor": ["birthday", "corporate", "wedding"]
}
```

## Deployment

### Production: VPS (DigitalOcean + Nginx + pm2)
```bash
# Deploy: push to GitHub, then pull + build + restart on VPS
git push origin HEAD:main
ssh root@159.89.185.96 "cd /var/www/venue-app && git pull origin main && rm -rf .next && npm install && npm run build && pm2 restart venue"
```

- **VPS path**: `/var/www/venue-app/`
- **pm2 process**: `venue` (port 3001)
- **Nginx**: `venue.georg.miami` → `proxy_pass http://localhost:3001`
- **DNS**: A record `venue` → `159.89.185.96` (Namecheap Advanced DNS)
- **SSL**: Wildcard cert `/etc/letsencrypt/live/georg.miami/`
- **Note**: TypeScript check skipped on VPS builds (1GB RAM OOM) — validate types locally

### Development
```bash
npm install
npm run dev          # localhost:3001
npm run build        # production build
```

## Conventions

- TypeScript for all new code
- React components in PascalCase
- Data access through `lib/venues.ts` (abstracts JSON now, Supabase later)
- All business context in `docs/` folder
- Update `CLAUDE.md` and `ROADMAP.md` at end of every session
- Git: local `master` branch, push to remote `main` via `git push origin HEAD:main`

## Business Context

- **Revenue model:** Free → lead fees ($25-50) → featured placement ($99/mo) → commission (10-15%)
- **Current revenue:** $0 (validation phase)
- **Form backend:** FormSubmit.co → georg.chimion@gmail.com (temporary, Phase 2 replaces with Resend)
- **Target:** $100-500/mo by Month 3, $3K-8K/mo by Month 12
- **Full plan:** See `docs/GTM-PLAN.md`
