'use client';

import React, { useState } from 'react';
import { HUDPanel } from '@/components/jarvis/hud-panel';

export enum AuthLevel {
  RESTRICTED = 0,
  USER = 1,
  OPERATOR = 2,
  ADMIN = 3,
}

interface AuthorizationLevelsProps {
  currentLevel?: AuthLevel;
  onLevelChange?: (level: AuthLevel) => void;
}

const levelInfo = {
  [AuthLevel.RESTRICTED]: {
    name: 'ОБМЕЖЕНО',
    description: 'Тільки перегляд даних',
    color: '#ff4444',
  },
  [AuthLevel.USER]: {
    name: 'КОРИСТУВАЧ',
    description: 'Базові налаштування',
    color: '#ff9800',
  },
  [AuthLevel.OPERATOR]: {
    name: 'ОПЕРАТОР',
    description: 'Повна робота системи',
    color: '#ffc107',
  },
  [AuthLevel.ADMIN]: {
    name: 'АДМІН',
    description: 'Критичні операції',
    color: '#00d4ff',
  },
};

export const AuthorizationLevels: React.FC<AuthorizationLevelsProps> = ({
  currentLevel = AuthLevel.RESTRICTED,
  onLevelChange,
}) => {
  const [pinCode, setPinCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const adminPin = '1987'; // Змініть в продакшні

  const handleVerify = async () => {
    setIsVerifying(true);
    // Имітація затримки
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (pinCode === adminPin) {
      onLevelChange?.(AuthLevel.ADMIN);
      setPinCode('');
    } else {
      alert('Неправильний PIN-код');
      setPinCode('');
    }
    setIsVerifying(false);
  };

  return (
    <div className="space-y-4">
      {/* Current Level Display */}
      <HUDPanel
        title="РІВЕНЬ ДОСТУПУ"
        value={levelInfo[currentLevel].name}
        status={currentLevel === AuthLevel.RESTRICTED ? 'critical' : currentLevel === AuthLevel.ADMIN ? 'normal' : 'warning'}
      >
        <p className="text-cyan-400 text-xs mt-2">{levelInfo[currentLevel].description}</p>
      </HUDPanel>

      {/* Level Indicators */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(levelInfo).map(([level, info]) => {
          const lvl = parseInt(level) as AuthLevel;
          const isActive = currentLevel >= lvl;

          return (
            <div
              key={level}
              className="p-3 bg-gradient-to-br from-blue-950 to-blue-900 border rounded text-center text-sm"
              style={{
                borderColor: isActive ? info.color : '#334455',
                boxShadow: isActive ? `0 0 8px ${info.color}40` : 'none',
                opacity: isActive ? 1 : 0.5,
              }}
            >
              <div className="font-bold" style={{ color: info.color }}>
                {info.name}
              </div>
              <div className="text-cyan-600 text-xs">{lvl}</div>
            </div>
          );
        })}
      </div>

      {/* Admin Access */}
      {currentLevel < AuthLevel.ADMIN && (
        <div className="p-4 bg-gradient-to-br from-blue-950 to-blue-900 border border-yellow-600 rounded-lg">
          <h4 className="text-yellow-400 font-bold mb-2 text-sm">АДМІН ДОСТУП</h4>
          <input
            type="password"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value.slice(0, 4))}
            placeholder="PIN-код"
            maxLength={4}
            className="w-full px-3 py-2 bg-black border border-yellow-600 rounded text-yellow-400 text-center font-mono mb-2 focus:outline-none focus:border-yellow-400"
          />
          <button
            onClick={handleVerify}
            disabled={isVerifying || pinCode.length < 4}
            className="w-full py-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded font-bold text-white text-sm hover:from-yellow-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isVerifying ? 'ВЕРИФІКАЦІЯ...' : 'ВЕРИФІКУВАТИ'}
          </button>
        </div>
      )}
    </div>
  );
};
