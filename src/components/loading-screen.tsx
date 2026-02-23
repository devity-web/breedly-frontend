'use client';

import {useEffect, useState} from 'react';
import {LoadingStatus} from './loading-status';
import {LoadingProgress} from './ui/loading-progress';
import {Spinner} from './ui/spinner';

export function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-border"
        aria-hidden="true"
      >
        <div
          className="h-full bg-foreground"
          style={{
            animation: 'sweep-line 2s ease-in-out infinite',
            width: '120px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo / Spinner area */}
        <div className="flex flex-col items-center gap-6">
          <Spinner />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-foreground text-balance">
              Breedly
            </h1>
            <LoadingStatus />
          </div>
        </div>

        {/* Progress bar */}
        <LoadingProgress />
      </div>

      {/* Bottom bar with version info */}
      <div className="absolute bottom-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-mono">v2.4.1</span>
        <span
          className="w-1 h-1 rounded-full bg-muted-foreground/40"
          aria-hidden="true"
        />
        <span>Secure connection</span>
      </div>
    </div>
  );
}
