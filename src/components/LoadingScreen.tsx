'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  location: string;
  guests: number;
}

const MESSAGES = [
  'Checking venue availability...',
  'Matching your event type...',
  'Filtering by your preferences...',
  'Confirming pricing for {guests} guests...',
  'Almost ready...',
];

export default function LoadingScreen({ location, guests }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    // Start progress bar animation
    const timer = setTimeout(() => setProgress(100), 80);

    // Cycle through messages
    const interval = setInterval(() => {
      setMsgIndex(prev => Math.min(prev + 1, MESSAGES.length - 1));
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const loc = location ? location.split(',')[0] : 'your area';
  const currentMsg = MESSAGES[msgIndex].replace('{guests}', String(guests));

  return (
    <div className="screen active loading-screen">
      <div className="load-wrap">
        <div className="load-tag">Searching Now</div>
        <div className="load-title">
          Finding the perfect space<br />
          near {loc}
          <span className="load-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
        <div className="load-bar-bg">
          <div className="load-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="load-msg">{currentMsg}</div>
      </div>
    </div>
  );
}
