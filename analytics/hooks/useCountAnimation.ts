'use client';

import { useState, useEffect, useRef } from 'react';

/** Animates `display` toward `target` over ~500 ms using ease-out cubic. */
export function useCountAnimation(target: number): number {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = display;
    const diff = target - start;
    if (diff === 0) return;

    const duration = 500;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return display;
}
