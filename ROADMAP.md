# VENUE — Roadmap & Status Tracker

> **Last updated:** 2026-03-18
> **Current stage:** PRE-LAUNCH (Prototype complete, waiting on Frank decisions)
> **Next milestone:** Georg + Frank meeting → domain decision → launch

---

## Current Stage: PRE-LAUNCH

### What's Done ✅
- [x] Prototype built (Next.js 16 + React 19 + TypeScript)
- [x] 31 real Miami venues researched and loaded
- [x] 3-step booking wizard fully functional
- [x] 31 individual venue pages (/venues/[slug])
- [x] 9 neighborhood browse pages (/neighborhoods/[area])
- [x] Contact form → FormSubmit.co → Georg's email
- [x] Analytics infrastructure wired (PostHog + GA4, needs API keys)
- [x] Sitemap + robots.txt ready
- [x] JSON-LD structured data
- [x] Full competitive research (Peerspace, Giggster, Splacer, The Venue Report, EventUp, Tagvenue)
- [x] SEO audit complete (10+ keyword opportunities identified)
- [x] Design/UX review complete (7 pre-launch fixes identified)
- [x] Tech debt audit complete (B+ grade)
- [x] 12-month marketing plan created (Google Ads, Instagram, SEO, partnerships)
- [x] Pitch deck for Frank (15 slides, PDF + PPTX)
- [x] Master operations plan (PDF, 10 sections)
- [x] Email templates (6 concierge templates)
- [x] Metrics tracking dashboard template

### What's Blocked ⏳ (Needs Frank)
- [ ] **Choose production domain** (venuemiami.com? bookvenue.com?)
- [ ] **Confirm Month 1 ad budget** ($500–$1,000)
- [ ] **Agree on partnership principle** (build it, fund it, split it)
- [ ] **Set up Google Ads account** (needs Frank's credit card)
- [ ] **Set up Instagram Ads account** (needs Frank's credit card)
- [ ] **Pick launch date**

### What Georg Can Do Now (Before Frank Meeting)
- [ ] Fix 7 pre-launch prototype issues (see below)
- [ ] Build venue contact database (email + phone for 31 venues)
- [ ] Set up Airtable CRM (Venues + Leads tables)
- [ ] Create PostHog account (free)
- [ ] Create GA4 property (free)

---

## Pre-Launch Fixes (7 items, ~7 hours total)

| # | Issue | Status | Time |
|---|-------|--------|------|
| 1 | Add venue images (replace gradient placeholders) | ⬜ Not Started | 4h |
| 2 | Remove fake scarcity badges ("2 left this week") | ⬜ Not Started | 5 min |
| 3 | Fix eventType filtering (use bestFor array) | ⬜ Not Started | 30 min |
| 4 | Add form validation (email + phone) | ⬜ Not Started | 1h |
| 5 | Hash email in FormSubmit.co endpoint | ⬜ Not Started | 15 min |
| 6 | Add empty state for 0 venue results | ⬜ Not Started | 30 min |
| 7 | Change CTA "Book My Event" → "Find My Venue" | ⬜ Not Started | 5 min |

---

## 12-Month Timeline

### Phase 1: LAUNCH (Weeks 1–4) — $0 revenue
- [ ] Deploy to production domain
- [ ] Activate analytics (PostHog + GA4)
- [ ] Submit to Google Search Console
- [ ] Launch Google Ads ($500/mo)
- [ ] Start daily concierge routine
- [ ] Get 10–20 booking requests
- **Kill switch:** If $1,500 yields <15 leads by Month 2, pause

### Phase 2: REVENUE (Month 2–3) — $500–$2K/mo target
- [ ] Approach venues with 3+ leads for partnership
- [ ] Close first venue deal ($99/mo featured or 10–15% commission)
- [ ] Replace FormSubmit.co with API route + Resend
- [ ] Scale ads to $1K–$2K/mo
- [ ] Launch blog (2 posts/month)
- [ ] Begin bilingual content rollout (Spanish)

### Phase 3: SCALE (Month 3–6) — $2K–$5K/mo target
- [ ] 50+ venues across all neighborhoods
- [ ] Set up Supabase (leads + venue data)
- [ ] Build venue partner dashboard
- [ ] Add Stripe Connect for commission collection
- [ ] Launch add-on referrals (photographer, florist, DJ)
- [ ] Instagram: 3 posts/week, micro-influencer partnerships

### Phase 4: DOMINATE (Month 6–12) — $5K–$15K/mo target
- [ ] 100+ venues
- [ ] Full bilingual English/Spanish content
- [ ] 24 blog posts published
- [ ] 10,000+ Instagram followers
- [ ] Consider Fort Lauderdale / West Palm expansion
- [ ] Consider raising funding if growth warrants it

---

## Key Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Pitch deck (for Frank) | `docs/VENUE-Business-Plan.pdf` | Send to Frank before meeting |
| Master operations plan | `docs/VENUE-Master-Plan.pdf` | Georg's complete playbook |
| Interactive plan (browser) | `docs/VENUE-Master-Plan.html` | Same as PDF but interactive |
| Email templates | `docs/email-templates.md` | 6 concierge email templates |
| Weekly metrics | `docs/METRICS.md` | Track progress weekly |
| This file | `ROADMAP.md` | Living status tracker |
| Codebase context | `CLAUDE.md` | Architecture for AI assistants |

---

## Decision Log

| Date | Decision | Made By | Notes |
|------|----------|---------|-------|
| 2026-03-18 | Complete project review + strategy plan | Georg | Used Cowork to run competitive, SEO, design, tech, and marketing analysis |
| TBD | Production domain chosen | Georg + Frank | Options: venuemiami.com, bookvenue.com, etc. |
| TBD | Month 1 ad budget confirmed | Frank | Target: $500–$1,000 |
| TBD | Partnership terms agreed | Georg + Frank | Formalize equity at $1K/month revenue |
| TBD | Launch date set | Georg + Frank | Can be live in 7 days after domain decision |

---

**Rule:** Update this file at the end of every work session.
