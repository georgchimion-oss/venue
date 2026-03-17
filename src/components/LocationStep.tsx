'use client';

import { useRef, useMemo } from 'react';
import { FormState } from '@/lib/types';

interface LocationStepProps {
  form: FormState;
  updateForm: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

const RADIUS_OPTIONS = ['0.5 mi', '1 mi', '2 mi', '5 mi', '10 mi'];
const OCCASION_OPTIONS = [
  { emoji: '👶', label: 'Kids welcome' },
  { emoji: '🔞', label: 'Adults only' },
  { emoji: '🤝', label: 'All ages' },
];
const TIME_OPTIONS = [
  { emoji: '🌅', label: 'Morning', range: '8 AM – 12 PM' },
  { emoji: '☀️', label: 'Afternoon', range: '12 PM – 5 PM' },
  { emoji: '🌆', label: 'Evening', range: '5 PM – 10 PM' },
  { emoji: '🌙', label: 'Late Night', range: '10 PM – 2 AM' },
];

export default function LocationStep({ form, updateForm, onNext, onBack }: LocationStepProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const todayLabel = useMemo(() =>
    new Date().toLocaleDateString('en-US', { weekday: 'short' }), []);
  const tomorrowLabel = useMemo(() =>
    new Date(Date.now() + 86400000).toLocaleDateString('en-US', { weekday: 'short' }), []);
  const customLabel = useMemo(() => {
    if (form.customDate) {
      const d = new Date(form.customDate + 'T12:00:00');
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return '+ Date';
  }, [form.customDate]);

  const handleDatePick = (val: 'today' | 'tomorrow' | 'custom') => {
    updateForm('date', val);
    if (val === 'custom' && dateInputRef.current) {
      const today = new Date().toISOString().split('T')[0];
      dateInputRef.current.min = today;
      dateInputRef.current.showPicker?.();
    }
  };

  const handleCustomDate = (val: string) => {
    if (!val) return;
    updateForm('customDate', val);
    updateForm('date', 'custom');
  };

  return (
    <div className="screen active">
      <div className="step-wrap">
        <div className="step-hd au">
          <div className="step-tag">Step 02 / 03</div>
          <h2 className="step-title">Where and when?</h2>
        </div>
        <div className="two-col">
          {/* LEFT COLUMN */}
          <div>
            <div className="field-group">
              <label className="field-label">Your Location</label>
              <input
                className={`text-input${form.zip ? ' filled' : ''}`}
                type="text"
                placeholder="ZIP code or neighborhood (e.g. Wynwood, 33137)"
                value={form.zip}
                onChange={e => updateForm('zip', e.target.value)}
              />
              <button
                className="loc-btn"
                onClick={() => updateForm('zip', 'Miami, FL 33137')}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
                </svg>
                Use my current location
              </button>
            </div>

            <div className="field-group">
              <label className="field-label">Search Radius</label>
              <div className="pill-row">
                {RADIUS_OPTIONS.map(r => (
                  <div
                    key={r}
                    className={`pill${form.radius === r ? ' sel' : ''}`}
                    onClick={() => updateForm('radius', r)}
                  >
                    {r}
                  </div>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Space Type</label>
              <div className="space-grid">
                <div
                  className={`space-card${form.space === 'Private Room' ? ' sel' : ''}`}
                  onClick={() => updateForm('space', 'Private Room')}
                >
                  <div className="sp-icon">🚪</div>
                  <div className="sp-name">Private Room</div>
                  <div className="sp-desc">Exclusive section within venue</div>
                </div>
                <div
                  className={`space-card${form.space === 'Full Venue' ? ' sel' : ''}`}
                  onClick={() => updateForm('space', 'Full Venue')}
                >
                  <div className="sp-icon">🏛️</div>
                  <div className="sp-name">Full Venue</div>
                  <div className="sp-desc">Entire place is yours</div>
                </div>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Occasion Type</label>
              <div className="pill-row">
                {OCCASION_OPTIONS.map(({ emoji, label }) => (
                  <div
                    key={label}
                    className={`pill${form.occasion === label ? ' sel' : ''}`}
                    onClick={() => updateForm('occasion', label)}
                  >
                    {emoji} {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="field-group">
              <label className="field-label">Guest Count</label>
              <div className="ctr-row">
                <button
                  className="ctr-btn"
                  onClick={() => updateForm('guests', Math.max(5, form.guests - 5))}
                >
                  −
                </button>
                <div className="ctr-val">{form.guests}</div>
                <button
                  className="ctr-btn"
                  onClick={() => updateForm('guests', Math.min(300, form.guests + 5))}
                >
                  +
                </button>
              </div>
              <div className="ctr-sub">guests expected</div>
            </div>

            <div className="field-group">
              <label className="field-label">Date</label>
              <div className="date-row">
                <div
                  className={`date-pill${form.date === 'today' ? ' sel' : ''}`}
                  onClick={() => handleDatePick('today')}
                >
                  <span className="dp-main">{todayLabel}</span>
                  <span className="dp-sub">Today</span>
                </div>
                <div
                  className={`date-pill${form.date === 'tomorrow' ? ' sel' : ''}`}
                  onClick={() => handleDatePick('tomorrow')}
                >
                  <span className="dp-main">{tomorrowLabel}</span>
                  <span className="dp-sub">Tomorrow</span>
                </div>
                <div
                  className={`date-pill${form.date === 'custom' ? ' sel' : ''}`}
                  onClick={() => handleDatePick('custom')}
                >
                  <span className="dp-main">{customLabel}</span>
                  <span className="dp-sub">Custom</span>
                  <input
                    ref={dateInputRef}
                    type="date"
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                    onChange={e => handleCustomDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Time of Day</label>
              <div className="tod-grid">
                {TIME_OPTIONS.map(({ emoji, label, range }) => (
                  <div
                    key={label}
                    className={`tod-pill${form.timeOfDay === label ? ' sel' : ''}`}
                    onClick={() => updateForm('timeOfDay', label)}
                  >
                    <span className="tod-emoji">{emoji}</span>
                    <span className="tod-label">{label}</span>
                    <span className="tod-range">{range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="step-footer">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext}>
          <span>Next: Preferences</span>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
