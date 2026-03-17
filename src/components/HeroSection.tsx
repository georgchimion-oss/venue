'use client';

interface HeroSectionProps {
  venueCount: number;
  onStart: () => void;
}

const HERO_CHIPS = [
  '🍼 Baby Shower', '🎂 Birthday', '💐 Bridal Shower',
  '🎓 Graduation', '💍 Engagement', '💼 Corporate',
  '🎄 Holiday Party', '👶 Kids Party', '🎉 & 20+ more',
];

export default function HeroSection({ venueCount, onStart }: HeroSectionProps) {
  return (
    <div className="screen active hero-screen">
      <div className="hero-bg">
        <div className="hero-blob blob-1" />
        <div className="hero-blob blob-2" />
        <div className="hero-blob blob-3" />
      </div>
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-chip au" style={{ animationDelay: '0.1s' }}>
            <span className="hero-chip-dot" />
            Same-day booking available
          </div>
          <h1 className="hero-title au" style={{ animationDelay: '0.22s' }}>
            Every<br />occasion.<br /><em>One tap.</em>
          </h1>
          <p className="hero-sub au" style={{ animationDelay: '0.36s' }}>
            From baby showers to boardrooms — find and book a private space in hours, not weeks. We handle the venue, setup, and staff.
          </p>
          <div className="hero-cta-row au" style={{ animationDelay: '0.48s' }}>
            <button className="btn-primary" onClick={onStart}>
              <span>Book My Event</span>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <span className="hero-cta-note">Free to browse · No credit card</span>
          </div>
        </div>
        <div className="hero-right au" style={{ animationDelay: '0.55s' }}>
          <div className="hero-event-chips">
            {HERO_CHIPS.map(chip => (
              <div className="h-chip" key={chip}>{chip}</div>
            ))}
          </div>
          <div className="hero-stats">
            <div className="h-stat">
              <div className="h-stat-n">3h</div>
              <div className="h-stat-l">Min notice</div>
            </div>
            <div className="h-stat">
              <div className="h-stat-n">{venueCount}</div>
              <div className="h-stat-l">Miami Venues</div>
            </div>
            <div className="h-stat">
              <div className="h-stat-n">15m</div>
              <div className="h-stat-l">To confirm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
