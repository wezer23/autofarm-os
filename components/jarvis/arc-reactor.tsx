'use client';

import React, { useEffect, useState } from 'react';

export const ArcReactor: React.FC<{ isActive?: boolean }> = ({ isActive = true }) => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="arcGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
          <stop offset="70%" stopColor="#0099cc" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000510" stopOpacity="0" />
        </radialGradient>
        <filter id="arcGlowFilter">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />

      {/* Middle rings */}
      <circle cx="100" cy="100" r="75" fill="none" stroke="#0099cc" strokeWidth="1" opacity="0.2" />
      <circle cx="100" cy="100" r="55" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.2" />

      {/* Core glow */}
      <circle cx="100" cy="100" r="40" fill="url(#arcGlow)" opacity={0.3 + pulse * 0.007} />

      {/* Inner core */}
      <circle cx="100" cy="100" r="30" fill="none" stroke="#00d4ff" strokeWidth="2" opacity={0.5 + pulse * 0.005} />

      {/* Pulsing center */}
      <circle
        cx="100"
        cy="100"
        r="15"
        fill="#00d4ff"
        opacity={0.4 + Math.sin(pulse * 0.1) * 0.3}
        filter="url(#arcGlowFilter)"
      />

      {/* Triangular resonators */}
      {[0, 120, 240].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 65 * Math.cos(rad);
        const y = 100 + 65 * Math.sin(rad);
        return (
          <g key={angle} opacity={0.6 + pulse * 0.004}>
            <circle cx={x} cy={y} r="8" fill="none" stroke="#00d4ff" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="3" fill="#00d4ff" opacity="0.8" />
          </g>
        );
      })}

      {/* Scan lines */}
      <line x1="100" y1="50" x2="100" y2="150" stroke="#00d4ff" strokeWidth="0.5" opacity="0.1" />
      <line x1="50" y1="100" x2="150" y2="100" stroke="#00d4ff" strokeWidth="0.5" opacity="0.1" />
    </svg>
  );
};
