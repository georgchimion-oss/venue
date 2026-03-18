import { MetadataRoute } from 'next';
import { getAllVenueSlugs, getAllNeighborhoodSlugs } from '@/lib/venues';

/**
 * Auto-generated sitemap for Google Search Console.
 * Includes: home page + all 31 venue pages + all neighborhood pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://venue.georg.miami';
  const now = new Date().toISOString();

  const home = {
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 1,
  };

  const venuePages = getAllVenueSlugs().map(slug => ({
    url: `${baseUrl}/venues/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const neighborhoodPages = getAllNeighborhoodSlugs().map(area => ({
    url: `${baseUrl}/neighborhoods/${area}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [home, ...venuePages, ...neighborhoodPages];
}
