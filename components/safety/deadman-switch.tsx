'use client';

import React, { useEffect, useState } from 'react';
import { HUDPanel } from '@/components/jarvis/hud-panel';

interface DeadmanSwitchProps {
  timeoutSeconds?: number;
  onTimeout?: () => void;
  isActive?: boolean;
}

export const DeadmanSwitch: React.FC<DeadmanSwitchProps> = ({
  timeoutSeconds = 300,
  onTimeout,
  isActive = true,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(timeoutSeconds);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        setIsWarning(next <= 60); // Warning when less than 1 minute

        if (next <= 0) {
          clearInterval(interval);
          onTimeout?.();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeout]);

  const handleReset = () => {
    setSecondsLeft(timeoutSeconds);
    setIsWarning(false);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <HUDPanel
      title="DEADMAN SWITCH"
      status={secondsLeft === 0 ? 'critical' : isWarning ? 'warning' : 'normal'}
    >
      <div className="text-center mb-3">
        <div className="text-4xl font-bold text-cyan-100 font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <p className="text-cyan-500 text-xs mt-2">
          {isWarning ? 'УВАГА: НИЗЬКИЙ ЧАС' : 'СИСТЕМА АКТИВНА'}
        </p>
      </div>

      <button
        onClick={handleReset}
        className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded font-bold text-white text-sm hover:from-cyan-500 hover:to-blue-500 transition-all"
      >
        СКИНУТИ ТАЙМЕР
      </button>

      {/* Warning indicator */}
      {isWarning && (
        <div className="mt-3 p-2 bg-orange-900 border border-orange-500 rounded text-orange-300 text-xs text-center animate-pulse">
          ⚠️ КРИТИЧНИЙ ЧАС - НАТИСНІТЬ СКИНУТИ
        </div>
      )}

      {secondsLeft === 0 && (
        <div className="mt-3 p-2 bg-red-900 border border-red-500 rounded text-red-300 text-xs text-center font-bold animate-pulse">
          🛑 ТАЙМЕР ВИЧЕРПАНИЙ - СИСТЕМА ВІДКЛЮЧЕНА
        </div>
      )}
    </HUDPanel>
  );
};
