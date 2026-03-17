# VENUE — Email Templates

> **Last updated:** 2026-03-17
> **Usage:** Manual concierge workflow (Phase 1-2), then automated via Resend (Phase 2+)
> **From:** Georg Chimion / VENUE Team
> **Reply-to:** georg.chimion@gmail.com (Phase 1) → hello@venue.georg.miami (Phase 2+)

---

## Template 1: Customer Acknowledgment

**When:** Immediately after booking form submission
**To:** Customer who submitted the form

**Subject:** We're finding your perfect Miami venue ✨

```
Hi {firstName},

Thank you for using VENUE! We received your event details:

  Event type: {eventType}
  Date: {eventDate}
  Guests: {guestCount}
  Neighborhood: {neighborhood}
  Budget: {budgetRange}
  Vibe: {vibePreferences}

Here's what happens next:

1. Our team is reviewing Miami's best venues to find your ideal match
2. You'll receive 2-3 curated venue recommendations within 24 hours
3. We'll coordinate introductions with the venues directly

This service is completely free for you — we're here to make Miami event planning effortless.

Questions? Just reply to this email.

Best,
The VENUE Team
venue.georg.miami
```

---

## Template 2: Venue Inquiry (Concierge → Venue)

**When:** Within 2 hours of receiving a qualified lead
**To:** Venue's events contact
**Purpose:** Introduce the lead without implying a formal partnership

**Subject:** Private event inquiry — {guestCount} guests on {eventDate}

```
Hi {venueName} Events Team,

I'm reaching out on behalf of a client looking to host a private event at your venue.

Event details:
  - Type: {eventType}
  - Date: {eventDate}
  - Guests: {guestCount}
  - Budget: {budgetRange}
  - Vibe: {vibePreferences}

Would you be able to accommodate this event? If so, I'd love to connect you directly with the client.

A few quick questions:
  1. Is {eventDate} available for a private event?
  2. What's the minimum spend or rental fee for {guestCount} guests?
  3. Do you have a private events menu or package?

I help Miami locals find the right venue for their events through venue.georg.miami — a free venue discovery platform. Happy to send more qualified leads your way.

Thanks,
Georg Chimion
VENUE — Miami Event Venues
venue.georg.miami
```

---

## Template 3: Match Notification (Customer)

**When:** After venue confirms availability (usually 24-48 hours after inquiry)
**To:** Customer

**Subject:** Great news — we found {matchCount} venues for your {eventType}!

```
Hi {firstName},

We've found {matchCount} venue(s) that match your {eventType} for {guestCount} guests on {eventDate}:

---

🏛️ {venue1Name}
📍 {venue1Neighborhood}
👥 Up to {venue1Capacity} guests
💰 Starting at {venue1MinSpend}
✨ {venue1Highlight}

{venue1Description}

---

{if venue2}
🏛️ {venue2Name}
📍 {venue2Neighborhood}
👥 Up to {venue2Capacity} guests
💰 Starting at {venue2MinSpend}
✨ {venue2Highlight}

{venue2Description}

---
{/if}

{if venue3}
🏛️ {venue3Name}
📍 {venue3Neighborhood}
👥 Up to {venue3Capacity} guests
💰 Starting at {venue3MinSpend}
✨ {venue3Highlight}

{venue3Description}

---
{/if}

**Next steps:**
Reply to this email and let me know which venue(s) interest you — I'll make a direct introduction so you can schedule a tour or discuss your event.

Want to see more options? Just reply with any adjustments to your preferences.

Best,
Georg
VENUE — Miami Event Venues
venue.georg.miami
```

---

## Template 4: Booking Confirmation

**When:** After customer confirms they're moving forward with a venue
**To:** Customer

**Subject:** You're booked — {venueName} for {eventDate} 🎉

```
Hi {firstName},

Exciting news! {venueName} has confirmed your {eventType} for {eventDate}.

Booking summary:
  Venue: {venueName}
  Date: {eventDate}
  Guests: {guestCount}
  Contact: {venueContactName} ({venueContactEmail})

Your venue contact is {venueContactName} — they'll be your point person from here for menu selection, setup, and day-of logistics.

**A few tips:**
- Confirm your final guest count 2 weeks before the event
- Ask about setup/breakdown time included in your rental
- Request a site visit if you haven't done one yet

Loved using VENUE? We'd appreciate a quick shout-out on Instagram (@venue.miami) — tag us in your event photos!

Planning another event? We're always here: venue.georg.miami

Cheers,
Georg
VENUE — Miami Event Venues
```

---

## Template 5: Venue Partnership Pitch (Phase 3)

**When:** After sending 3+ leads to a venue, OR as part of outreach campaign
**To:** Venue owner/manager
**Purpose:** Convert from free listings to paid partnership

**Subject:** We've sent you {leadCount} event leads — let's make it official

```
Hi {venueContactName},

I'm Georg, founder of VENUE (venue.georg.miami) — a Miami event venue discovery platform.

Over the past {timeframe}, we've sent {leadCount} qualified event leads to {venueName}:

{leadSummary — e.g., "3 birthday parties (60-120 guests), 1 corporate event (200 guests), 1 wedding reception (80 guests)"}

We're growing fast and want to offer {venueName} priority placement. Here are our partnership tiers:

**Free Listing** (current)
- Listed on VENUE with basic info
- Leads sent as they come in

**Featured Partner — $99/month**
- "Featured" badge on your listing
- Top placement in search results
- Priority lead routing (you get matched first)
- Professional listing with photos and full details
- Monthly performance report

**Commission Partner — 10-15% on bookings**
- Everything in Featured
- We handle the full booking funnel
- You only pay when an event actually books
- No monthly fee

Interested? Reply to this email or book a 15-minute call: {calendlyLink}

Best,
Georg Chimion
VENUE — Miami Event Venues
venue.georg.miami
```

---

## Template 6: Follow-Up (No Response)

**When:** 48 hours after sending venue inquiry with no response
**To:** Venue

**Subject:** Following up — {eventType} for {guestCount} guests on {eventDate}

```
Hi {venueName} team,

Quick follow-up on my inquiry from {daysSinceInquiry} days ago about a {eventType} for {guestCount} guests on {eventDate}.

The client is actively looking and hoping to lock in a venue this week. Would love to include {venueName} in their options.

If you can let me know availability, I'll connect you directly.

Thanks,
Georg
VENUE — venue.georg.miami
```

---

## Notes

### Phase 1 Workflow (Manual)
1. Customer submits form → FormSubmit.co sends to Georg's Gmail
2. Georg manually sends Template 1 (ack) to customer
3. Georg manually sends Template 2 (inquiry) to 2-3 matching venues
4. Venue responds → Georg sends Template 3 (match notification) to customer
5. Customer selects venue → Georg sends Template 4 (confirmation)
6. Track everything in Airtable CRM

### Phase 2 Workflow (Automated via Resend)
1. Customer submits form → `/api/booking` route
2. Template 1 auto-sent via Resend
3. Lead auto-created in Airtable
4. Georg manually sends Templates 2-4 (still concierge-driven)
5. Template 6 auto-sent if no venue response in 48h

### Phase 3 Workflow (Semi-automated)
1. Templates 1-4 fully automated
2. Template 5 sent manually to venues with 3+ leads
3. Template 6 automated via Resend scheduled sends
