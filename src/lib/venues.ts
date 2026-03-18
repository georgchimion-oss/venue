import venueData from '@/data/venues.json';
import { VenueData } from './types';

/**
 * Get all venues from the static JSON database.
 * In Phase 4, this will be replaced with a Supabase query.
 */
export function getAllVenues(): VenueData[] {
  return venueData.venues as unknown as VenueData[];
}

export function getVenueCount(): number {
  return venueData.meta.totalVenues;
}

/**
 * Get a single venue by its slug (id).
 * Returns null if not found.
 */
export function getVenueBySlug(slug: string): VenueData | null {
  return getAllVenues().find(v => v.id === slug) || null;
}

/**
 * Get all venue slugs (for static page generation).
 */
export function getAllVenueSlugs(): string[] {
  return getAllVenues().map(v => v.id);
}

/**
 * Get unique neighborhoods with their venue counts.
 */
export function getNeighborhoods(): { name: string; count: number; venues: VenueData[] }[] {
  const venues = getAllVenues();
  const map = new Map<string, VenueData[]>();
  for (const v of venues) {
    const arr = map.get(v.neighborhood) || [];
    arr.push(v);
    map.set(v.neighborhood, arr);
  }
  return Array.from(map.entries())
    .map(([name, vens]) => ({ name, count: vens.length, venues: vens }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get venues for a specific neighborhood.
 */
export function getVenuesByNeighborhood(neighborhood: string): VenueData[] {
  return getAllVenues().filter(v =>
    v.neighborhood.toLowerCase().replace(/\s+/g, '-') === neighborhood.toLowerCase()
    || v.neighborhood.toLowerCase() === neighborhood.toLowerCase()
  );
}

/**
 * Get all neighborhood slugs (for static page generation).
 */
export function getAllNeighborhoodSlugs(): string[] {
  const venues = getAllVenues();
  const set = new Set(venues.map(v => v.neighborhood.toLowerCase().replace(/\s+/g, '-')));
  return Array.from(set);
}

/** Convert kebab-case to Title Case */
export function formatTag(tag: string): string {
  return tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/**
 * Filter venues based on user's wizard selections.
 * Returns venues sorted by rating (best first).
 */
export function filterVenues(options: {
  guests?: number;
  budget?: string;
  eventType?: string;
}): VenueData[] {
  let venues = getAllVenues();

  // Filter by guest capacity
  if (options.guests) {
    venues = venues.filter(v =>
      v.capacity.max >= options.guests!
    );
  }

  // Filter by budget range
  if (options.budget) {
    const budgetMax = parseBudgetMax(options.budget);
    if (budgetMax !== null && budgetMax !== Infinity) {
      venues = venues.filter(v => v.pricing.minimumSpend <= budgetMax);
    }
  }

  // Sort by Google rating (highest first), then by review count
  venues.sort((a, b) => {
    if (b.ratings.google !== a.ratings.google) {
      return b.ratings.google - a.ratings.google;
    }
    return b.ratings.googleReviewCount - a.ratings.googleReviewCount;
  });

  return venues;
}

function parseBudgetMax(budget: string): number | null {
  if (budget.includes('Under $1')) return 1000;
  if (budget.includes('$1') && budget.includes('$3')) return 3000;
  if (budget.includes('$3') && budget.includes('$7')) return 7000;
  if (budget.includes('$7,000+')) return Infinity;
  return null;
}

/**
 * Format a minimum spend number as a currency string.
 */
export function formatCurrency(amount: number): string {
  return '$' + amount.toLocaleString('en-US');
}

/**
 * Generate star rating string from a numeric rating.
 */
export function getStarRating(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.3;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}
