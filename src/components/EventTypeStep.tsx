'use client';

import { EVENT_TYPES } from '@/lib/types';

interface EventTypeStepProps {
  selected: string | null;
  onSelect: (eventType: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const CheckSvg = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M2 6L5 9L10 3" stroke="#C05A3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function EventTypeStep({ selected, onSelect, onNext, onBack }: EventTypeStepProps) {
  return (
    <div className="screen active">
      <div className="step-wrap">
        <div className="step-hd au">
          <div className="step-tag">Step 01 / 03</div>
          <h2 className="step-title">What are we<br />celebrating?</h2>
        </div>
        <div className="event-grid">
          {EVENT_TYPES.map(({ emoji, name, desc }) => (
            <div
              key={name}
              className={`event-card${selected === name ? ' sel' : ''}`}
              onClick={() => onSelect(name)}
            >
              <div className="e-check"><CheckSvg /></div>
              <div className="e-icon">{emoji}</div>
              <div className="e-name">{name}</div>
              <div className="e-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="step-footer">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button
          className={`btn-primary${!selected ? ' disabled' : ''}`}
          onClick={onNext}
        >
          <span>Continue</span>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
