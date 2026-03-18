import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllNeighborhoodSlugs, getVenuesByNeighborhood, formatCurrency, formatTag } from '@/lib/venues';
import { NEIGHBORHOOD_GRADIENTS, NEIGHBORHOOD_EMOJIS } from '@/lib/types';

interface Props {
  params: Promise<{ area: string }>;
}

export async function generateStaticParams() {
  return getAllNeighborhoodSlugs().map(area => ({ area }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const displayName = formatTag(area);
  const venues = getVenuesByNeighborhood(area);
  if (venues.length === 0) return { title: 'Neighborhood Not Found' };

  return {
    title: `${displayName} Event Venues — ${venues.length} Private Spaces | VENUE Miami`,
    description: `Browse ${venues.length} private event venues in ${displayName}, Miami. Book birthday parties, corporate events, baby showers & more. Free to browse.`,
    openGraph: {
      title: `${displayName} Event Venues — VENUE Miami`,
      description: `${venues.length} private event spaces in ${displayName}. Find your perfect venue.`,
      url: `https://venue.georg.miami/neighborhoods/${area}`,
      siteName: 'VENUE',
      type: 'website',
    },
  };
}

export default async function NeighborhoodPage({ params }: Props) {
  const { area } = await params;
  const venues = getVenuesByNeighborhood(area);
  if (venues.length === 0) notFound();

  const displayName = venues[0].neighborhood;
  const emoji = NEIGHBORHOOD_EMOJIS[displayName] || '📍';

  return (
    <>
      <nav>
        <Link href="/" className="wordmark" style={{ textDecoration: 'none', color: 'inherit' }}>VENUE</Link>
        <Link href="/" className="nav-badge" style={{ textDecoration: 'none', color: 'inherit' }}>
          ← Back to Search
        </Link>
      </nav>

      <div className="neighborhood-page">
        <div className="nb-header">
          <div className="nb-tag">{emoji} {displayName}</div>
          <h1 className="nb-title">
            {venues.length} event venue{venues.length !== 1 ? 's' : ''} in {displayName}
          </h1>
          <p className="nb-subtitle">
            Browse private event spaces in {displayName}, Miami.
            Book birthday parties, corporate events, baby showers, and more.
          </p>
        </div>

        <div className="nb-venues-grid">
          {venues
            .sort((a, b) => b.ratings.google - a.ratings.google)
            .map(venue => {
              const gradient = NEIGHBORHOOD_GRADIENTS[venue.neighborhood] || 'linear-gradient(145deg, #ccc, #aaa)';
              const vEmoji = NEIGHBORHOOD_EMOJIS[venue.neighborhood] || '📍';
              return (
                <Link href={`/venues/${venue.id}`} key={venue.id} className="nb-card">
                  <div className="nb-card-img" style={{ background: gradient }}>
                    <span>{vEmoji}</span>
                  </div>
                  <div className="nb-card-body">
                    <div className="nb-card-name">{venue.name}</div>
                    <div className="nb-card-meta">
                      ★ {venue.ratings.google} · Up to {venue.capacity.max} guests · {venue.spaceTypes.map(formatTag).join(', ')}
                    </div>
                    <div className="nb-card-price">From {formatCurrency(venue.pricing.minimumSpend)}</div>
                  </div>
                </Link>
              );
            })}
        </div>

        <Link href="/" className="nb-back">← Browse all Miami venues</Link>
      </div>
    </>
  );
}
