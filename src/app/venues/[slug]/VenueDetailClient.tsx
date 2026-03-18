'use client';

import { useRouter } from 'next/navigation';

interface Props {
  venueId: string;
  venueName: string;
}

export default function VenueDetailClient({ venueId, venueName }: Props) {
  const router = useRouter();

  return (
    <button
      className="btn-primary vd-cta-btn"
      onClick={() => {
        // Navigate to home wizard with venue pre-selected
        // For now, just go to the booking wizard
        router.push('/');
      }}
    >
      <span>Book {venueName.length > 20 ? 'This Venue' : venueName}</span>
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
