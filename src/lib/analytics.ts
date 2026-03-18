'use client';

import posthog from 'posthog-js';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

let initialized = false;

/**
 * Initialize PostHog + GA4.
 * Call once from PostHogProvider (client-side only).
 */
export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;

  // PostHog
  if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: false, // We handle this manually on route change
      capture_pageleave: true,
    });
  }

  // GA4 — inject gtag script
  if (GA_ID) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_ID);
    window.gtag = gtag;
  }

  initialized = true;
}

/**
 * Track a page view (both PostHog + GA4).
 */
export function trackPageView(url: string) {
  if (POSTHOG_KEY) {
    posthog.capture('$pageview', { $current_url: url });
  }
  if (GA_ID && window.gtag) {
    window.gtag('event', 'page_view', { page_location: url });
  }
}

// ── Wizard Funnel Events ──

export function trackWizardStart() {
  posthog.capture('wizard_started');
}

export function trackEventTypeSelected(eventType: string) {
  posthog.capture('event_type_selected', { event_type: eventType });
}

export function trackLocationCompleted(guests: number, zip: string) {
  posthog.capture('location_completed', { guests, zip });
}

export function trackPreferencesCompleted(budget: string) {
  posthog.capture('preferences_completed', { budget });
}

export function trackSearchStarted(guests: number, eventType: string | null) {
  posthog.capture('search_started', { guests, event_type: eventType });
}

export function trackResultsViewed(venueCount: number) {
  posthog.capture('results_viewed', { venue_count: venueCount });
}

export function trackVenueClicked(venueId: string, venueName: string) {
  posthog.capture('venue_clicked', { venue_id: venueId, venue_name: venueName });
}

export function trackBookingSubmitted(venueId: string, venueName: string, guests: number) {
  posthog.capture('booking_submitted', {
    venue_id: venueId,
    venue_name: venueName,
    guests,
  });
}

// ── Type augmentation for gtag ──
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
