// ── Step Navigation ──
export type Step = 'hero' | 'event-type' | 'location' | 'preferences' | 'loading' | 'results';

export const PROGRESS_MAP: Record<Step, number> = {
  'hero': 0,
  'event-type': 18,
  'location': 42,
  'preferences': 66,
  'loading': 83,
  'results': 100,
};

// ── Booking Form State ──
export interface FormState {
  eventType: string | null;
  zip: string;
  radius: string;
  space: string;
  guests: number;
  date: 'today' | 'tomorrow' | 'custom';
  customDate: string | null;
  timeOfDay: string;
  occasion: string | null;
  budget: string | null;
  catering: string | null;
  drinks: string | null;
  vibe: string | null;
  mustHaves: string[];
  notes: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export const DEFAULT_FORM_STATE: FormState = {
  eventType: null,
  zip: '',
  radius: '1 mi',
  space: 'Private Room',
  guests: 25,
  date: 'today',
  customDate: null,
  timeOfDay: 'Evening',
  occasion: null,
  budget: null,
  catering: null,
  drinks: null,
  vibe: null,
  mustHaves: [],
  notes: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
};

// ── Venue Data (from venues.json) ──
export interface VenueData {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  description: string;
  spaceTypes: string[];
  capacity: {
    min: number;
    max: number;
    seated: number;
    cocktail: number;
  };
  pricing: {
    model: string;
    minimumSpend: number;
    minimumSpendNotes: string;
    hourlyRate: number | null;
    currency: string;
  };
  amenities: string[];
  bestFor: string[];
  ratings: {
    google: number;
    googleReviewCount: number;
    yelp: number;
    yelpReviewCount: number;
  };
  contact: {
    phone: string | null;
    email: string | null;
    website: string;
    eventsUrl: string | null;
  };
  hours: string;
  ageRestriction: string;
  images: string[];
}

// ── Event Type Options ──
export const EVENT_TYPES = [
  { emoji: '🍼', name: 'Baby Shower', desc: 'Intimate celebration for the new arrival. Decor, catering & setup included.' },
  { emoji: '🎂', name: 'Birthday Party', desc: 'Milestone birthdays to casual gatherings. Any age, any size.' },
  { emoji: '💐', name: 'Bridal Shower', desc: 'A beautiful send-off for the bride-to-be. Elegant spaces with full catering.' },
  { emoji: '🎓', name: 'Graduation', desc: 'Celebrate the achievement. Private rooms for family and friends.' },
  { emoji: '💍', name: 'Engagement Party', desc: 'Toast the couple in style. Intimate venues with catering and bar service.' },
  { emoji: '🎈', name: 'Kids Party', desc: 'Fun, safe, and memorable. Kid-friendly spaces with activities and catering.' },
  { emoji: '💼', name: 'Corporate Event', desc: 'Team events, client dinners, offsites, and celebrations. AV + catering included.' },
  { emoji: '🎄', name: 'Holiday Party', desc: 'Seasonal celebrations for families or teams. Festive decor available.' },
  { emoji: '✨', name: 'Something Else', desc: 'Retirement, reunion, anniversary, bar mitzvah — tell us and we\'ll find the space.' },
] as const;

// ── Visual Constants ──
export const NEIGHBORHOOD_GRADIENTS: Record<string, string> = {
  'Wynwood': 'linear-gradient(145deg, #7ECEC1, #5AB8A9, #3DA294)',
  'Brickell': 'linear-gradient(145deg, #6B8CC7, #4A72B5, #3560A0)',
  'Coral Gables': 'linear-gradient(145deg, #E8D5C4, #D4BC9E, #C0A37A)',
  'South Beach': 'linear-gradient(145deg, #8CC5D6, #62ABBD, #3F8FA4)',
  'Design District': 'linear-gradient(145deg, #C4A8D6, #A87FC1, #8B5EA4)',
  'Coconut Grove': 'linear-gradient(145deg, #A8D6A0, #7FC18B, #5EA46B)',
  'Little Havana': 'linear-gradient(145deg, #D6C4A8, #C1A87F, #A48B5E)',
  'Little River': 'linear-gradient(145deg, #D6A8B3, #C17F92, #A45E71)',
  'Downtown': 'linear-gradient(145deg, #A8B3D6, #7F92C1, #5E71A4)',
};

export const NEIGHBORHOOD_EMOJIS: Record<string, string> = {
  'Wynwood': '🎨',
  'Brickell': '🌇',
  'Coral Gables': '🏛️',
  'South Beach': '🌊',
  'Design District': '💎',
  'Coconut Grove': '🌴',
  'Little Havana': '🎺',
  'Little River': '🏗️',
  'Downtown': '🏙️',
};
