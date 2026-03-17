'use client';

import { useState, useCallback } from 'react';
import { Step, FormState, DEFAULT_FORM_STATE, PROGRESS_MAP, VenueData } from '@/lib/types';
import { filterVenues, getVenueCount } from '@/lib/venues';
import HeroSection from './HeroSection';
import EventTypeStep from './EventTypeStep';
import LocationStep from './LocationStep';
import PreferencesStep from './PreferencesStep';
import LoadingScreen from './LoadingScreen';
import VenueResults from './VenueResults';
import ContactModal from './ContactModal';

export default function BookingApp() {
  const [step, setStep] = useState<Step>('hero');
  const [form, setForm] = useState<FormState>(DEFAULT_FORM_STATE);
  const [matchedVenues, setMatchedVenues] = useState<VenueData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<VenueData | null>(null);

  const venueCount = getVenueCount();
  const progress = PROGRESS_MAP[step];

  // ── Navigation ──
  const goTo = useCallback((newStep: Step) => {
    setStep(newStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ── Form Updates ──
  const updateForm = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  // ── Find Venues (with loading animation) ──
  const handleFindVenues = useCallback(() => {
    goTo('loading');
    setTimeout(() => {
      const venues = filterVenues({
        guests: form.guests,
        budget: form.budget || undefined,
        eventType: form.eventType || undefined,
      });
      setMatchedVenues(venues.slice(0, 8));
      goTo('results');
    }, 2500);
  }, [form.guests, form.budget, form.eventType, goTo]);

  // ── Booking Modal ──
  const handleBook = useCallback((venue: VenueData) => {
    setSelectedVenue(venue);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedVenue(null);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Nav */}
      <nav>
        <div className="wordmark">VENUE</div>
        <div className="nav-badge">
          <span className="live-dot" />
          {venueCount} Miami venues
        </div>
      </nav>

      {/* Screens */}
      {step === 'hero' && (
        <HeroSection
          venueCount={venueCount}
          onStart={() => goTo('event-type')}
        />
      )}

      {step === 'event-type' && (
        <EventTypeStep
          selected={form.eventType}
          onSelect={type => updateForm('eventType', type)}
          onNext={() => goTo('location')}
          onBack={() => goTo('hero')}
        />
      )}

      {step === 'location' && (
        <LocationStep
          form={form}
          updateForm={updateForm}
          onNext={() => goTo('preferences')}
          onBack={() => goTo('event-type')}
        />
      )}

      {step === 'preferences' && (
        <PreferencesStep
          form={form}
          updateForm={updateForm}
          onFindVenues={handleFindVenues}
          onBack={() => goTo('location')}
        />
      )}

      {step === 'loading' && (
        <LoadingScreen
          location={form.zip}
          guests={form.guests}
        />
      )}

      {step === 'results' && (
        <VenueResults
          venues={matchedVenues}
          guests={form.guests}
          eventType={form.eventType}
          onBook={handleBook}
          onBack={() => goTo('preferences')}
        />
      )}

      {/* Contact Modal */}
      <ContactModal
        open={modalOpen}
        venue={selectedVenue}
        form={form}
        updateForm={updateForm}
        onClose={handleCloseModal}
      />
    </>
  );
}
