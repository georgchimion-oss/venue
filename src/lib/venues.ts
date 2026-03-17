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
