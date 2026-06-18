'use client';

import React from 'react';

interface HUDPanelProps {
  title: string;
  value?: string | number;
  unit?: string;
  status?: 'normal' | 'warning' | 'critical';
  children?: React.ReactNode;
  className?: string;
}

const statusColors = {
  normal: '#00d4ff',
  warning: '#ff9800',
  critical: '#ff4444',
};

export const HUDPanel: React.FC<HUDPanelProps> = ({
  title,
  value,
  unit,
  status = 'normal',
  children,
  className = '',
}) => {
  return (
    <div
      className={`
        relative bg-gradient-to-br from-blue-950 to-blue-900 border-2 rounded-lg p-4
        shadow-lg overflow-hidden group ${className}
      `}
      style={{
        borderColor: statusColors[status],
        boxShadow: `0 0 10px ${statusColors[status]}40, inset 0 0 10px ${statusColors[status]}20`,
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
        style={{
          background: `radial-gradient(ellipse at center, ${statusColors[status]} 0%, transparent 70%)`,
        }}
      />

      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-px bg-cyan-400"
            style={{ marginTop: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: statusColors[status] }}
          >
            {title}
          </h3>
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: statusColors[status] }}
          />
        </div>

        {value !== undefined && (
          <div className="text-2xl font-bold text-cyan-100 mb-1">
            {value}
            {unit && <span className="text-sm ml-1 text-cyan-400">{unit}</span>}
          </div>
        )}

        {children}
      </div>

      {/* Corner brackets */}
      <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16">
        <path d="M2 14 L2 2 L14 2" fill="none" stroke={statusColors[status]} strokeWidth="1" opacity="0.5" />
      </svg>
      <svg className="absolute top-0 right-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16">
        <path d="M14 14 L14 2 L2 2" fill="none" stroke={statusColors[status]} strokeWidth="1" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16">
        <path d="M2 2 L2 14 L14 14" fill="none" stroke={statusColors[status]} strokeWidth="1" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16">
        <path d="M14 2 L14 14 L2 14" fill="none" stroke={statusColors[status]} strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
};
