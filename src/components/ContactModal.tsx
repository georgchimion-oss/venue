'use client';

import { useState } from 'react';
import { FormState, VenueData } from '@/lib/types';
import { formatCurrency } from '@/lib/venues';

interface ContactModalProps {
  open: boolean;
  venue: VenueData | null;
  form: FormState;
  updateForm: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onClose: () => void;
}

export default function ContactModal({ open, venue, form, updateForm, onClose }: ContactModalProps) {
  const [phase, setPhase] = useState<'contact' | 'confirm'>('contact');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!open || !venue) return null;

  const minSpend = venue.pricing.minimumSpend;
  const ppTotal = (minSpend / form.guests) * 1.27;

  const isFormValid = form.contactName.trim() && form.contactEmail.trim() && form.contactPhone.trim();

  const getDateStr = () => {
    if (form.date === 'custom' && form.customDate) {
      return new Date(form.customDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
    if (form.date === 'tomorrow') {
      return new Date(Date.now() + 86400000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
    return new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setSubmitting(true);
    setError('');

    const dateStr = getDateStr();

    const formData = {
      name: form.contactName,
      email: form.contactEmail,
      phone: form.contactPhone,
      venue: venue.name,
      event_type: form.eventType || 'Not specified',
      date: dateStr,
      time_of_day: form.timeOfDay,
      guests: form.guests,
      space_type: form.space || 'Private Room',
      budget: form.budget || 'Not specified',
      catering: form.catering || 'Not selected',
      drinks: form.drinks || 'Not selected',
      minimum_spend: formatCurrency(minSpend),
      est_per_person: '$' + Math.round(ppTotal) + ' (with tax + tip)',
      special_requests: form.notes || 'None',
      _subject: `VENUE Request: ${venue.name} — ${form.eventType || 'Event'} for ${form.guests} guests`,
      _template: 'table',
    };

    try {
      const res = await fetch('https://formsubmit.co/ajax/georg.chimion@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Request failed');
      setPhase('confirm');
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setPhase('contact');
    setError('');
    setSubmitting(false);
    updateForm('contactName', '');
    updateForm('contactEmail', '');
    updateForm('contactPhone', '');
    onClose();
  };

  const dateStr = getDateStr();

  return (
    <div
      className={`overlay${open ? ' open' : ''}`}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {phase === 'contact' ? (
        <div className="modal">
          <button className="modal-x" onClick={handleClose}>×</button>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>📋</span>
          </div>
          <div className="modal-title">Request This Space</div>
          <div className="modal-sub" style={{ marginBottom: 24 }}>
            We&apos;ll check availability at <strong>{venue.name}</strong> and get back to you.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <div>
              <label className="field-label" style={{ marginBottom: 6, display: 'block' }}>Your Name</label>
              <input
                className="text-input"
                type="text"
                placeholder="First and last name"
                value={form.contactName}
                onChange={e => updateForm('contactName', e.target.value)}
              />
            </div>
            <div>
              <label className="field-label" style={{ marginBottom: 6, display: 'block' }}>Email</label>
              <input
                className="text-input"
                type="email"
                placeholder="you@email.com"
                value={form.contactEmail}
                onChange={e => updateForm('contactEmail', e.target.value)}
              />
            </div>
            <div>
              <label className="field-label" style={{ marginBottom: 6, display: 'block' }}>Phone</label>
              <input
                className="text-input"
                type="tel"
                placeholder="(305) 555-0123"
                value={form.contactPhone}
                onChange={e => updateForm('contactPhone', e.target.value)}
              />
            </div>
          </div>
          <button
            className={`btn-primary${!isFormValid || submitting ? ' disabled' : ''}`}
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleSubmit}
          >
            <span>{submitting ? 'Sending...' : 'Send Request'}</span>
            {!submitting && (
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
          {error && (
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#c0392b' }}>
              {error}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--mid)', letterSpacing: '0.06em' }}>
            No payment required · We&apos;ll confirm availability within 24 hours
          </div>
        </div>
      ) : (
        <div className="modal">
          <button className="modal-x" onClick={handleClose}>×</button>
          <div className="check-ring">
            <svg className="check-svg" width="26" height="26" viewBox="0 0 28 28">
              <path d="M5 14L11 20L23 8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="modal-title">Request Received</div>
          <div className="modal-sub">We&apos;re checking availability and will be in touch shortly.</div>
          <div className="summary" style={{ marginTop: 20 }}>
            <div className="s-row"><span className="s-k">Venue</span><span className="s-v">{venue.name}</span></div>
            <div className="s-row"><span className="s-k">Event</span><span className="s-v">{form.eventType || 'Event'}</span></div>
            <div className="s-row"><span className="s-k">Date &amp; Time</span><span className="s-v">{dateStr} · {form.timeOfDay}</span></div>
            <div className="s-row"><span className="s-k">Guests</span><span className="s-v">{form.guests} guests</span></div>
            <div className="s-row"><span className="s-k">Space Type</span><span className="s-v">{form.space}</span></div>
            <div className="s-row"><span className="s-k">Budget</span><span className="s-v">{form.budget || 'Not specified'}</span></div>
            <div className="s-row"><span className="s-k">Est. Minimum</span><span className="s-v">{formatCurrency(minSpend)}</span></div>
            <div className="s-row price-row"><span className="s-k">Est. per person (with tax + tip)</span><span className="s-v">${Math.round(ppTotal)}/person</span></div>
          </div>
          <div className="modal-note" style={{ marginTop: 16 }}>
            We&apos;ll email next steps to <strong>{form.contactEmail}</strong>.<br />
            Expect to hear from us within <strong>24 hours</strong> — usually much sooner.
          </div>
        </div>
      )}
    </div>
  );
}
