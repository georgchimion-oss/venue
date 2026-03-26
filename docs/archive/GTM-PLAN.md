# VENUE — Go-to-Market Plan

> **Last updated:** 2026-03-17
> **Owner:** Georg Chimion (solo operator, Frank advisory)
> **Market:** Miami, FL — private event venues
> **URL:** venue.georg.miami
> **Time budget:** 4-6 hours/week

---

## The Opportunity

Miami's private event market is fragmented: Peerspace/Giggster are impersonal, local planners charge $2K-$10K, and no one owns the "Miami-specific, concierge-driven, Instagram-native" positioning. Average private event ticket: $2,500-$5,000.

**VENUE's wedge:** Free for consumers, high-touch for venues, deeply local. We fake the supply side first (list real venues from public data), manually fulfill leads as a concierge, then formalize partnerships once venues see value.

---

## Architecture Decision

### Next.js + React + TypeScript on VPS

The single-file HTML prototype has reached its limit. The marketplace needs:
- **Multiple routes** — venue detail pages, neighborhood SEO pages, partner dashboard, blog
- **Server-side rendering** — critical for Google rankings ("private dining miami")
- **API routes** — form submission via Resend, Supabase queries, all in one codebase
- **Component reuse** — VenueCard, BookingWizard, ContactModal used across pages

### Why VPS (not Vercel/Netlify)

Georg already has a DigitalOcean VPS with Nginx serving `*.georg.miami`:
- $0 additional hosting cost
- Full control (Supabase, n8n, cron jobs alongside)
- No vendor lock-in or usage-based billing
- Nginx reverse proxy: `venue.georg.miami` → `localhost:3001`

### Target File Structure

```
venue/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout: fonts, meta, analytics
│   │   ├── page.tsx                  # Home / booking wizard
│   │   ├── partners/page.tsx         # Venue owner pitch page (Phase 3)
│   │   ├── venues/[slug]/page.tsx    # Individual venue detail (SEO)
│   │   ├── neighborhoods/[area]/page.tsx  # Wynwood, Brickell, etc. (SEO)
│   │   ├── dashboard/page.tsx        # Venue partner dashboard (Phase 4)
│   │   ├── blog/[slug]/page.tsx      # Content SEO engine (Phase 5)
│   │   └── api/
│   │       ├── booking/route.ts      # Form → Resend + Supabase
│   │       └── venues/route.ts       # Venue data API
│   ├── components/
│   │   ├── BookingWizard.tsx          # 3-step wizard
│   │   ├── VenueCard.tsx             # Reusable venue card
│   │   ├── ContactModal.tsx          # Booking/contact modal
│   │   ├── ProgressBar.tsx           # Wizard progress bar
│   │   ├── HeroSection.tsx           # Landing page hero
│   │   └── ui/                       # Shared UI primitives
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client (Phase 4)
│   │   ├── resend.ts                # Email sending (Phase 2)
│   │   ├── analytics.ts            # PostHog + GA4
│   │   └── venues.ts               # Data access layer
│   ├── data/
│   │   └── venues.json             # Real Miami venue database
│   └── styles/
│       └── globals.css              # Design system from index.html
├── public/images/venues/
├── docs/                            # Strategy & operations docs
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

### Migration Strategy (NOT a rewrite — structured extraction)

1. **CSS** (lines 1-600 of index.html) → `globals.css` (nearly verbatim)
2. **HTML** (lines 600-1050) → Split into React components
3. **JavaScript** (lines 1050-1260) → Component logic + `lib/` utilities
4. **State** → React `useState` in BookingWizard (replaces global `state` object)

### VPS Deployment

```bash
# One-time setup on VPS
cd /var/www
git clone https://github.com/georgchimion-oss/venue.git
cd venue && npm install && npm run build
pm2 start npm --name "venue" -- start -- -p 3001

# Nginx config
server {
    server_name venue.georg.miami;
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Deploy updates
ssh vps "cd /var/www/venue && git pull && npm run build && pm2 restart venue"
```

---

## Phase 1 — Concierge MVP (Weeks 1-3, $0/mo revenue)

**Goal:** Scaffold Next.js, port the wizard, load real venue data, add analytics. Ship a working product with real Miami venues.

| Task | Session | Description |
|------|---------|-------------|
| 1.1 | Session 1 | Scaffold Next.js project, configure TypeScript, port CSS to `globals.css` |
| 1.2 | Session 1 | Port booking wizard HTML → `BookingWizard.tsx` + child components |
| 1.3 | Session 2 | Port venue cards → `VenueCard.tsx`, real filtering from `venues.json` |
| 1.4 | Session 2 | Port contact modal → `ContactModal.tsx`, keep FormSubmit.co for now |
| 1.5 | Session 3 | VPS deployment (Nginx proxy, pm2, git-pull deploy script) |
| 1.6 | Session 3 | PostHog + GA4 analytics (wizard funnel tracking) |
| 1.7 | Session 3 | SEO meta tags, Open Graph, JSON-LD structured data |
| 1.8 | Session 4 | Fix dishonest UI stats ("200+ venues" → real count), honest loading UX |
| 1.9 | Manual | Set up Airtable CRM (Venues + Leads + Revenue tables) |
| 1.10 | Manual | Submit site to Google Search Console |

**Tools:** PostHog (free, 1M events/mo), GA4 (free), Airtable (free), FormSubmit.co (keep)

**Success metrics:**
- 30 real venues loaded from `venues.json`
- Working Next.js app at venue.georg.miami
- Wizard funnel tracked in PostHog
- 5-10 booking requests in first 2 weeks

---

## Phase 2 — Automate the Middle (Weeks 4-6, $0-$100/mo)

**Goal:** Automated branded emails, UTM tracking, Instagram marketing.

| Task | Session | Description |
|------|---------|-------------|
| 2.1 | Session 5 | Replace FormSubmit.co with `/api/booking` + Resend (3K free emails/mo) |
| 2.2 | Session 5 | Branded email templates with React Email |
| 2.3 | Session 6 | Auto-create Airtable records from `/api/booking` |
| 2.4 | Session 6 | UTM tracking + lead source attribution |
| 2.5 | Session 7 | Real capacity/budget/event-type filtering in BookingWizard |
| 2.6 | Manual | @venue.miami Instagram + content pipeline (Later + Canva) |

**Tools:** Resend (free, 3K/mo), Later (free), Canva (free)

**Success metrics:**
- 100% automated emails on booking submit
- All leads auto-created in Airtable
- 100-200 Instagram followers
- >20% wizard completion rate
- >40% email open rate

---

## Phase 3 — Product-Market Fit (Month 2-3, $100-$500/mo)

**Goal:** Validate demand, close first revenue deal, add SEO pages.

| Task | Session | Description |
|------|---------|-------------|
| 3.1 | Session 8 | `/partners` page — pitch to venue owners with lead stats |
| 3.2 | Session 8 | `/venues/[slug]` detail pages — gallery, amenities, map, CTA |
| 3.3 | Session 9 | `/neighborhoods/[area]` SEO landing pages (6 neighborhoods) |
| 3.4 | Session 10 | A/B test wizard flow with PostHog feature flags |
| 3.5 | Manual | Venue outreach campaign — email/call 30 venues |
| 3.6 | Manual | Close first deal: featured placement ($99/mo) or commission (10-15%) |

**Revenue tiers for venues:**
- **Free listing** — we send leads, venue responds within 24h
- **Featured** — $99/mo, top placement + "Featured" badge
- **Commission** — 10-15% on confirmed bookings

**Success metrics:**
- 20-30 monthly booking requests
- 5-8 venue partners (any tier)
- First $99 placement sold
- 50+ organic search visits/mo

---

## Phase 4 — Real Platform (Month 3-6, $500-$2,000/mo)

**Goal:** Database backend, venue dashboard, payment processing.

| Task | Session | Description |
|------|---------|-------------|
| 4.1 | Session 11-12 | Supabase setup (PostgreSQL, auth). Tables: `venues`, `bookings`, `venue_users` |
| 4.2 | Session 12 | Migrate `venues.json` → Supabase. Update `lib/venues.ts` |
| 4.3 | Session 13 | Form submission → Supabase `bookings` table |
| 4.4 | Session 14-15 | `/dashboard` — venue partner portal (Supabase Auth, magic link) |
| 4.5 | Session 16 | Stripe Connect for commission splitting (if 10+ bookings/mo) |

**Tools:** Supabase (free → $25/mo), Stripe Connect (2.9% + $0.30/txn)

**Success metrics:**
- Database-backed listings and bookings
- Venue partners self-manage via dashboard
- 50-100 monthly booking requests
- $500-$2,000 monthly revenue

---

## Phase 5 — Scale & Monetize (Month 6-12, $3,000-$8,000/mo)

| Task | Description |
|------|-------------|
| 5.1 | Expand to 100+ venues (Little Havana, Edgewater, Midtown, Key Biscayne, Doral, Aventura) |
| 5.2 | Add-on services marketplace (photographer, florist, DJ referrals at $50-100/referral) |
| 5.3 | `/blog` content SEO engine — long-tail keyword posts |
| 5.4 | Paid acquisition: Instagram ads + Google Ads (CAC < $50/lead) |
| 5.5 | PWA support (manifest.json + service worker) |
| 5.6 | Stripe Connect for automated commission splitting |

**Success metrics:**
- 200+ monthly booking requests
- 30+ venue partners
- $3,000-$8,000 monthly revenue

---

## Revenue Model

| Timeline | Model | Per-unit | Expected Monthly |
|----------|-------|---------|-----------------|
| Month 1-2 | Free (validation) | $0 | $0 |
| Month 2-3 | Lead fee ($25-50/qualified lead) | $25-$50 | $100-$500 |
| Month 3-4 | + Featured placement ($99/mo/venue) | $99 recurring | $500-$1,500 |
| Month 4-6 | + Commission (10-15% on bookings) | $250-$375/booking | $1,000-$3,000 |
| Month 6-12 | + Add-on referrals ($50-100 each) | $50-$100/add-on | $3,000-$8,000 |

**Why commission wins long-term:** Miami avg private event = $2,500-$5,000. At 12% = $300-$600/booking. 10 bookings/mo = $3K-$6K.

---

## Marketing Strategy

### SEO
- **Phase 1:** Meta tags, Open Graph, JSON-LD structured data
- **Phase 3:** Neighborhood landing pages (Wynwood, Brickell, SoBe, Coral Gables, Design District, Coconut Grove)
- **Phase 5:** Blog posts targeting long-tail keywords
- **Target keywords:** "private event space miami" (500/mo), "baby shower venue miami" (300/mo), "birthday party venue brickell" (150/mo), "corporate event space wynwood" (200/mo)

### Instagram (@venue.miami)
- 3 posts/week: Venue spotlights (Mon), Event inspo (Wed), Weekend availability (Fri)
- Reels: venue walkthroughs (algorithm boost)
- Bilingual: English/Spanish for Miami market (+45% reach)
- Bio link with UTM: `venue.georg.miami?utm_source=instagram`

### Partnerships
- Event planners → 5% referral fee
- Miami micro-influencers (5K-20K followers) → free venue access for content
- Cross-referral with florists, caterers, photographers

---

## Tool Stack

| Need | Tool | Cost | Phase |
|------|------|------|-------|
| Framework | Next.js + React + TypeScript | Free | 1 |
| Hosting | DigitalOcean VPS + Nginx + pm2 | $0 (existing) | 1 |
| Analytics | PostHog + GA4 | Free | 1 |
| CRM | Airtable | Free | 1 |
| SEO | Google Search Console + Ubersuggest | Free | 1 |
| Email | Resend (React Email templates) | Free (3K/mo) | 2 |
| Automation | n8n (self-hosted) or Make.com | Free | 2 |
| Social | Later + Canva | Free | 2 |
| Database | Supabase | Free → $25/mo | 4 |
| Auth | Supabase Auth (magic link) | Free | 4 |
| Payments | Stripe Connect | 2.9% + $0.30/txn | 4-5 |

---

## Operations

### Risk Factors

| Risk | Mitigation |
|------|------------|
| Venues demand listing removal | Remove immediately, pivot to "we had leads for you" |
| Georg's bandwidth (9 active projects) | Timebox to 4-6 hrs/week, automate everything |
| No demand | Instagram is fastest test; zero clicks in 2 weeks = reconsider |
| Venues won't pay | Lead fees ($25-50) lower friction than commissions |
| Legal (photos/names without permission) | Use only public info, add disclaimer, never imply partnership |

### Competitive Advantage
- No national platform owns "Miami-specific, concierge-driven, Instagram-native"
- Peerspace/Giggster are impersonal; local planners charge $2K-$10K
- VENUE is free for consumers, high-touch for venues
- Miami's event culture + Instagram obsession + high avg ticket = perfect market

---

## Session Persistence

| File | Purpose | Update When |
|------|---------|-------------|
| `docs/GTM-PLAN.md` | This plan | Weekly or strategy changes |
| `src/data/venues.json` | Real venue database | When venues added/updated |
| `docs/email-templates.md` | Concierge email copy | When templates change |
| `docs/METRICS.md` | Weekly metrics | Weekly |
| `CLAUDE.md` | Architecture for Claude Code | Every session |
| `personal/ROADMAP.md` | VENUE status in portfolio | Every session |

**Rule:** At session end, always update `CLAUDE.md` and `ROADMAP.md`.
