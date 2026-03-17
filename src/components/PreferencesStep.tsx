'use client';

import { FormState } from '@/lib/types';

interface PreferencesStepProps {
  form: FormState;
  updateForm: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onFindVenues: () => void;
  onBack: () => void;
}

const CheckSvg = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M2 6L5 9L10 3" stroke="#C05A3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SmallCheckSvg = () => (
  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#C05A3B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BUDGET_OPTIONS = [
  { emoji: '💛', name: 'Under $1k', desc: 'Small intimate gatherings', value: 'Under $1,000' },
  { emoji: '🧡', name: '$1k – $3k', desc: 'Mid-size events', value: '$1,000 – $3,000' },
  { emoji: '❤️', name: '$3k – $7k', desc: 'Premium experience', value: '$3,000 – $7,000' },
  { emoji: '💎', name: '$7k+', desc: 'All-inclusive luxury', value: '$7,000+' },
];

const CATERING_OPTIONS = [
  { emoji: '🏠', name: 'Space Only', desc: 'Venue + setup, BYO food', value: 'No Catering' },
  { emoji: '🥟', name: 'Light Bites', desc: 'Passed apps & snacks', value: 'Light Bites' },
  { emoji: '🍽️', name: 'Buffet', desc: 'Full buffet, all ages', value: 'Buffet' },
  { emoji: '🤵', name: 'Plated Dinner', desc: 'Sit-down with servers', value: 'Plated Dinner' },
];

const DRINKS_OPTIONS = [
  { emoji: '🥤', name: 'Soft Drinks & Mocktails', desc: 'Juices, sodas, mocktails — great for all ages and family events', est: '~$8–12/person', value: 'Non-Alcoholic' },
  { emoji: '🍷', name: 'Beer & Wine', desc: 'Curated selection of beers and wines', est: '~$20–30/person', value: 'Beer & Wine' },
  { emoji: '🍸', name: 'Full Open Bar', desc: 'Beer, wine, spirits, and signature cocktails', est: '~$45–65/person', value: 'Full Open Bar' },
];

const VIBE_OPTIONS = [
  { emoji: '🎉', label: 'Fun & Festive' },
  { emoji: '🌸', label: 'Warm & Elegant' },
  { emoji: '😊', label: 'Casual & Relaxed' },
  { emoji: '🤝', label: 'Professional' },
];

const MUST_HAVES = [
  { emoji: '🅿️', label: 'Free Parking' },
  { emoji: '♿', label: 'ADA Accessible' },
  { emoji: '👶', label: 'Kid-Friendly' },
  { emoji: '🌿', label: 'Outdoor Space' },
  { emoji: '🎤', label: 'Mic / PA System' },
  { emoji: '📸', label: 'Photo Backdrop' },
  { emoji: '🎊', label: 'Setup & Décor' },
  { emoji: '🍰', label: 'Cake Permitted' },
];

export default function PreferencesStep({ form, updateForm, onFindVenues, onBack }: PreferencesStepProps) {
  const toggleMustHave = (label: string) => {
    const mustHaves = form.mustHaves.includes(label)
      ? form.mustHaves.filter(v => v !== label)
      : [...form.mustHaves, label];
    updateForm('mustHaves', mustHaves);
  };

  return (
    <div className="screen active">
      <div className="step-wrap">
        <div className="step-hd au">
          <div className="step-tag">Step 03 / 03</div>
          <h2 className="step-title">What does your<br />event need?</h2>
        </div>
        <div className="two-col">
          {/* LEFT COLUMN */}
          <div>
            <div className="field-group">
              <label className="field-label">Budget Range</label>
              <div className="catering-grid">
                {BUDGET_OPTIONS.map(({ emoji, name, desc, value }) => (
                  <div
                    key={value}
                    className={`cat-card${form.budget === value ? ' sel' : ''}`}
                    onClick={() => updateForm('budget', value)}
                  >
                    <div className="opt-check"><CheckSvg /></div>
                    <div className="cat-icon">{emoji}</div>
                    <div className="cat-name">{name}</div>
                    <div className="cat-desc">{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Catering Style</label>
              <div className="catering-grid">
                {CATERING_OPTIONS.map(({ emoji, name, desc, value }) => (
                  <div
                    key={value}
                    className={`cat-card${form.catering === value ? ' sel' : ''}`}
                    onClick={() => updateForm('catering', value)}
                  >
                    <div className="opt-check"><CheckSvg /></div>
                    <div className="cat-icon">{emoji}</div>
                    <div className="cat-name">{name}</div>
                    <div className="cat-desc">{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Bar & Drinks</label>
              <div className="drinks-grid">
                {DRINKS_OPTIONS.map(({ emoji, name, desc, est, value }) => (
                  <div
                    key={value}
                    className={`drk-card${form.drinks === value ? ' sel' : ''}`}
                    onClick={() => updateForm('drinks', value)}
                  >
                    <div className="opt-check"><CheckSvg /></div>
                    <div className="drk-icon">{emoji}</div>
                    <div className="drk-info">
                      <div className="drk-name">{name}</div>
                      <div className="drk-desc">{desc}</div>
                      <div className="drk-est">{est}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="field-group">
              <label className="field-label">Atmosphere / Vibe</label>
              <div className="vibe-row">
                {VIBE_OPTIONS.map(({ emoji, label }) => (
                  <div
                    key={label}
                    className={`vibe-pill${form.vibe === label ? ' sel' : ''}`}
                    onClick={() => updateForm('vibe', label)}
                  >
                    <span>{emoji}</span>{label}
                  </div>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Must-Haves</label>
              <div className="checks-grid">
                {MUST_HAVES.map(({ emoji, label }) => {
                  const isSelected = form.mustHaves.includes(label);
                  return (
                    <div
                      key={label}
                      className={`chk-item${isSelected ? ' sel' : ''}`}
                      onClick={() => toggleMustHave(label)}
                    >
                      <div className="chk-box">
                        <span style={{ opacity: isSelected ? 1 : 0 }}><SmallCheckSvg /></span>
                      </div>
                      <span>{emoji} {label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Special Requests</label>
              <textarea
                className="text-area"
                placeholder="Theme, dietary requirements, surprise element, accessibility needs, custom signage..."
                value={form.notes}
                onChange={e => updateForm('notes', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="step-footer">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onFindVenues}>
          <span>Find My Space</span>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
