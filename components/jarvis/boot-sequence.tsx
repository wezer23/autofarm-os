'use client';

import React, { useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete?: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const bootMessages = [
    '> АВТОФАРМ ОС v1.0',
    '> Ініціалізація JARVIS...',
    '> Завантаження модулів безпеки...',
    '> Налаштування датчиків...',
    '> Активація контролю температури...',
    '> Запуск моніторингу pH...',
    '> Ініціалізація системи годування...',
    '> З\'єднання з ESP32...',
    '> Верифікація безпеки...',
    '> ГОТОВО. СИСТЕМА АКТИВНА.',
  ];

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < bootMessages.length) {
        setBootLines((prev) => [...prev, bootMessages[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        setTimeout(() => onComplete?.(), 1000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-4 p-8 bg-gradient-to-b from-blue-950 to-black border border-cyan-400 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#00d4ff" strokeWidth="2" opacity="0.5" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#0099cc" strokeWidth="1.5" opacity="0.3" />
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="2"
                className="animate-spin"
                style={{ animationDuration: '2s' }}
              />
              <circle cx="50" cy="50" r="8" fill="#00d4ff" opacity="0.6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-cyan-300 tracking-wider">АВТОФАРМ ОС</h1>
          <p className="text-cyan-500 text-sm mt-2">JARVIS A.I. SYSTEM BOOT</p>
        </div>

        {/* Terminal */}
        <div className="bg-black border border-cyan-400 rounded p-4 h-64 overflow-y-auto font-mono text-sm">
          {bootLines.map((line, i) => (
            <div key={i} className="text-cyan-400 mb-1 font-bold">
              {line}
              {i === bootLines.length - 1 && <span className="animate-pulse ml-1">_</span>}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1 bg-blue-950 border border-cyan-400 rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all"
            style={{ width: `${(bootLines.length / bootMessages.length) * 100}%` }}
          />
        </div>

        <p className="text-cyan-500 text-xs text-center mt-4">
          {Math.round((bootLines.length / bootMessages.length) * 100)}%
        </p>
      </div>
    </div>
  );
};
