import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllVenueSlugs, getVenueBySlug, formatCurrency, formatTag } from '@/lib/venues';
import { NEIGHBORHOOD_GRADIENTS, NEIGHBORHOOD_EMOJIS } from '@/lib/types';
import VenueDetailClient from './VenueDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-generate all 31 venue detail pages at build time.
 * Each gets its own URL, title, and JSON-LD for SEO.
 */
export async function generateStaticParams() {
  return getAllVenueSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) return { title: 'Venue Not Found' };

  return {
    title: `${venue.name} — Private Event Space in ${venue.neighborhood} | VENUE`,
    description: `Book ${venue.name} in ${venue.neighborhood}, Miami for your next event. Capacity up to ${venue.capacity.max} guests. ${venue.description}`,
    openGraph: {
      title: `${venue.name} — ${venue.neighborhood} Event Space`,
      description: venue.description,
      url: `https://venue.georg.miami/venues/${venue.id}`,
      siteName: 'VENUE',
      type: 'website',
    },
  };
}

export default async function VenueDetailPage({ params }: Props) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) notFound();

  const gradient = NEIGHBORHOOD_GRADIENTS[venue.neighborhood] || 'linear-gradient(145deg, #ccc, #aaa)';
  const emoji = NEIGHBORHOOD_EMOJIS[venue.neighborhood] || '📍';
  const stars = '★'.repeat(Math.floor(venue.ratings.google)) +
    (venue.ratings.google % 1 >= 0.3 ? '½' : '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: venue.name,
    description: venue.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address,
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    maximumAttendeeCapacity: venue.capacity.max,
    url: `https://venue.georg.miami/venues/${venue.id}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: venue.ratings.google,
      reviewCount: venue.ratings.googleReviewCount,
      bestRating: 5,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav>
        <Link href="/" className="wordmark" style={{ textDecoration: 'none', color: 'inherit' }}>VENUE</Link>
        <Link href="/" className="nav-badge" style={{ textDecoration: 'none', color: 'inherit' }}>
          ← Back to Search
        </Link>
      </nav>

      <div className="venue-detail">
        {/* Hero Image Placeholder */}
        <div className="vd-hero" style={{ background: gradient }}>
          <span className="vd-hero-emoji">{emoji}</span>
          <div className="vd-hero-overlay">
            <Link
              href={`/neighborhoods/${venue.neighborhood.toLowerCase().replace(/\s+/g, '-')}`}
              className="vd-neighborhood-link"
            >
              {emoji} {venue.neighborhood}
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="vd-content">
          <div className="vd-main">
            <h1 className="vd-name">{venue.name}</h1>
            <div className="vd-address">{venue.address}</div>
            <div className="vd-rating">
              <span className="stars">{stars}</span>
              <span className="rating-num">
                {venue.ratings.google} ({venue.ratings.googleReviewCount.toLocaleString()} Google reviews)
              </span>
            </div>
            <p className="vd-description">{venue.description}</p>

            {/* Details Grid */}
            <div className="vd-details-grid">
              <div className="vd-detail-card">
                <div className="vd-detail-label">Capacity</div>
                <div className="vd-detail-value">{venue.capacity.min}–{venue.capacity.max} guests</div>
                <div className="vd-detail-sub">
                  {venue.capacity.seated} seated · {venue.capacity.cocktail} cocktail
                </div>
              </div>
              <div className="vd-detail-card">
                <div className="vd-detail-label">Pricing</div>
                <div className="vd-detail-value">{formatCurrency(venue.pricing.minimumSpend)} min</div>
                <div className="vd-detail-sub">{formatTag(venue.pricing.model)} model</div>
              </div>
              <div className="vd-detail-card">
                <div className="vd-detail-label">Space Types</div>
                <div className="vd-detail-value">{venue.spaceTypes.map(formatTag).join(', ')}</div>
              </div>
              <div className="vd-detail-card">
                <div className="vd-detail-label">Best For</div>
                <div className="vd-detail-value">{venue.bestFor.map(formatTag).join(', ')}</div>
              </div>
            </div>

            {/* Amenities */}
            <div className="vd-section">
              <h2 className="vd-section-title">Amenities</h2>
              <div className="vd-tags">
                {venue.amenities.map(a => (
                  <span className="vd-tag" key={a}>{formatTag(a)}</span>
                ))}
              </div>
            </div>

            {/* Pricing Notes */}
            {venue.pricing.minimumSpendNotes && (
              <div className="vd-section">
                <h2 className="vd-section-title">Pricing Details</h2>
                <p className="vd-pricing-notes">{venue.pricing.minimumSpendNotes}</p>
              </div>
            )}

            {/* Practical Info */}
            <div className="vd-section">
              <h2 className="vd-section-title">Good to Know</h2>
              <div className="vd-info-grid">
                <div className="vd-info-item">
                  <span className="vd-info-label">Hours</span>
                  <span className="vd-info-value">{venue.hours}</span>
                </div>
                <div className="vd-info-item">
                  <span className="vd-info-label">Age Policy</span>
                  <span className="vd-info-value">{venue.ageRestriction}</span>
                </div>
                {venue.contact.website && (
                  <div className="vd-info-item">
                    <span className="vd-info-label">Website</span>
                    <a href={venue.contact.website} target="_blank" rel="noopener noreferrer" className="vd-info-link">
                      Visit site →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="vd-sidebar">
            <div className="vd-cta-card">
              <div className="vd-cta-title">Request This Space</div>
              <div className="vd-cta-price">{formatCurrency(venue.pricing.minimumSpend)}</div>
              <div className="vd-cta-sub">minimum spend · {formatTag(venue.pricing.model)}</div>
              <VenueDetailClient venueId={venue.id} venueName={venue.name} />
              <div className="vd-cta-note">Free to request · No commitment</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
