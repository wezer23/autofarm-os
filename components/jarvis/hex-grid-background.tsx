'use client';

import React from 'react';

export const HexGridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-black">
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hexGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 25 0 L 50 14.4 L 50 43.3 L 25 57.7 L 0 43.3 L 0 14.4 Z"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
      </svg>

      {/* Animated scan lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={`${(i * 100) / 24}%`}
            x2="100%"
            y2={`${(i * 100) / 24}%`}
            stroke="#00d4ff"
            strokeWidth="0.5"
            opacity="0.05"
            className="animate-pulse"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </svg>

      {/* Corner glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl opacity-5" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-5" />
    </div>
  );
};
