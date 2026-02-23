'use client';

import {useEffect, useState} from 'react';

const statusMessages = [
  'Initializing application...',
  'Loading resources...',
  'Preparing workspace...',
  'Almost there...',
];

export function LoadingStatus() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex(prev =>
          prev < statusMessages.length - 1 ? prev + 1 : prev,
        );
        setFade(true);
      }, 200);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className={`text-sm text-muted-foreground text-center transition-opacity duration-200 ${
        fade ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {statusMessages[currentIndex]}
    </p>
  );
}
