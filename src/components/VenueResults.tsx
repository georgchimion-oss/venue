'use client';

import { VenueData, NEIGHBORHOOD_GRADIENTS, NEIGHBORHOOD_EMOJIS } from '@/lib/types';
import { formatCurrency } from '@/lib/venues';

interface VenueResultsProps {
  venues: VenueData[];
  guests: number;
  eventType: string | null;
  onBook: (venue: VenueData) => void;
  onBack: () => void;
}

function VenueCard({
  venue,
  guests,
  index,
  onBook,
}: {
  venue: VenueData;
  guests: number;
  index: number;
  onBook: (venue: VenueData) => void;
}) {
  const gradient = NEIGHBORHOOD_GRADIENTS[venue.neighborhood] || 'linear-gradient(145deg, #ccc, #aaa)';
  const emoji = NEIGHBORHOOD_EMOJIS[venue.neighborhood] || '📍';
  const minSpend = venue.pricing.minimumSpend;
  const ppBase = minSpend / guests;
  const ppTotal = ppBase * 1.27; // 7% tax + 20% gratuity
  const isTopRated = venue.ratings.google >= 4.7;
  const stars = '★'.repeat(Math.floor(venue.ratings.google)) +
    (venue.ratings.google % 1 >= 0.3 ? '½' : '');
  const tags = venue.amenities.slice(0, 4);

  return (
    <div className="v-card au" style={{ animationDelay: `${0.05 + index * 0.08}s` }}>
      <div className="v-img">
        <div className="v-img-bg" style={{ background: gradient }}>
          <span style={{ fontSize: 44, opacity: 0.5 }}>{emoji}</span>
        </div>
        <div className="v-badge-wrap">
          {isTopRated && <div className="v-badge badge-top">Top Rated</div>}
        </div>
      </div>
      <div className="v-body">
        <div className="v-name">{venue.name}</div>
        <div className="v-loc">{venue.neighborhood} · {venue.address.split(',')[0]}</div>
        <div className="v-rating">
          <span className="stars">{stars}</span>
          <span className="rating-num">
            {venue.ratings.google} ({venue.ratings.googleReviewCount} reviews)
          </span>
        </div>
        <div className="v-tags">
          {tags.map(tag => (
            <div className="v-tag" key={tag}>{tag}</div>
          ))}
        </div>
        <div className="v-meta">
          <span><strong>{venue.capacity.max}</strong> cap</span>
          {venue.amenities.includes('Full Catering') && <span><strong>Full catering</strong> avail.</span>}
          {venue.amenities.includes('ADA Accessible') && <span><strong>ADA</strong> accessible</span>}
        </div>
      </div>
      <div className="v-cta">
        <div>
          <div className="v-min-label">Minimum Spend</div>
          <div className="v-min-price">{formatCurrency(minSpend)}</div>
          <div className="v-pp-divider" />
          <div className="v-pp-row">
            <span className="v-pp-lbl">Before tax &amp; tip</span>
            <span className="v-pp-val">${Math.round(ppBase)}/pp</span>
          </div>
          <div className="v-pp-row total">
            <span className="v-pp-lbl">With tax + gratuity</span>
            <span className="v-pp-val">${Math.round(ppTotal)}/pp</span>
          </div>
          <div className="v-pp-note">based on {guests} guests</div>
        </div>
        <button className="v-book" onClick={() => onBook(venue)}>
          Request This Space
        </button>
      </div>
    </div>
  );
}

export default function VenueResults({ venues, guests, eventType, onBook, onBack }: VenueResultsProps) {
  const eventLabel = eventType ? eventType.toLowerCase() : 'your event';

  return (
    <div className="screen active">
      <div className="step-wrap">
        <div className="step-hd au">
          <div className="step-tag">Your Results</div>
          <h2 className="step-title">
            {venues.length} perfect space{venues.length !== 1 ? 's' : ''}<br />
            for your {eventLabel}.
          </h2>
        </div>
        <div className="venues-list">
          {venues.map((venue, i) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              guests={guests}
              index={i}
              onBook={onBook}
            />
          ))}
        </div>
      </div>
      <div className="step-footer">
        <button className="btn-ghost" onClick={onBack}>← Adjust Preferences</button>
        <span style={{ fontSize: 11, color: 'var(--mid)', letterSpacing: '0.1em' }}>
          Prices for {guests} guests · 7% tax · 20% gratuity
        </span>
      </div>
    </div>
  );
}
