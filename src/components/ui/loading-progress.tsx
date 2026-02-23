'use client';

import {useEffect, useState} from 'react';

export function LoadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stages = [
      {target: 30, delay: 300, duration: 400},
      {target: 60, delay: 800, duration: 500},
      {target: 85, delay: 1500, duration: 400},
      {target: 100, delay: 2200, duration: 300},
    ];

    const timeouts: NodeJS.Timeout[] = [];

    stages.forEach(({target, delay}) => {
      const timeout = setTimeout(() => {
        setProgress(target);
      }, delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground tracking-wide">
          Loading
        </span>
        <span className="text-sm font-mono text-muted-foreground tabular-nums">
          {progress}%
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-foreground transition-all duration-500 ease-out"
          style={{width: `${progress}%`}}
        />
      </div>
    </div>
  );
}
