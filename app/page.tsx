'use client';

import React, { useState } from 'react';
import { BootSequence } from '@/components/jarvis/boot-sequence';
import { HexGridBackground } from '@/components/jarvis/hex-grid-background';
import { ArcReactor } from '@/components/jarvis/arc-reactor';
import { HUDPanel } from '@/components/jarvis/hud-panel';
import { AuthorizationLevels, AuthLevel } from '@/components/safety/authorization-levels';
import { DeadmanSwitch } from '@/components/safety/deadman-switch';
import { VoiceControl } from '@/components/voice/voice-control';
import { JarvisChat } from '@/components/chat/jarvis-chat';

export default function Home() {
  const [showBoot, setShowBoot] = useState(true);
  const [authLevel, setAuthLevel] = useState<AuthLevel>(AuthLevel.RESTRICTED);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'voice' | 'chat' | 'security'>('dashboard');
  const [systemStatus, setSystemStatus] = useState('АКТИВНА');

  const handleBootComplete = () => {
    setShowBoot(false);
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    if (command === 'EMERGENCY_STOP') {
      setSystemStatus('АВАРІЙНА ЗУПИНКА';
    }
  };

  if (showBoot) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white overflow-hidden">
      <HexGridBackground />

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 flex-shrink-0">
              <ArcReactor isActive={systemStatus !== 'ВИМКНЕНА'} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-cyan-300 tracking-wider">АВТОФАРМ ОС</h1>
              <p className="text-cyan-500 text-sm">JARVIS A.I. Управління фермою Cherax quadricarinatus</p>
              <p className="text-cyan-600 text-xs mt-1">
                Статус: <span className="text-cyan-300 font-bold">{systemStatus}</span>
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-4 gap-2">
            {(['dashboard', 'voice', 'chat', 'security'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-3 rounded font-bold text-xs uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500'
                    : 'bg-blue-800 text-cyan-400 hover:bg-blue-700'
                }`}
              >
                {tab === 'dashboard' && '📊 Дашборд'}
                {tab === 'voice' && '🎤 Голос'}
                {tab === 'chat' && '💬 Chat'}
                {tab === 'security' && '🔒 Безпека'}
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <HUDPanel title="ТЕМПЕРАТУРА" value="26.5" unit="°C" status="normal" />
                  <HUDPanel title="pH" value="7.2" unit="" status="normal" />
                  <HUDPanel title="РІВЕНЬ ВОДИ" value="85" unit="%" status="normal" />
                  <HUDPanel title="О₂" value="6.8" unit="mg/L" status="normal" />
                </div>

                <HUDPanel title="ПОПУЛЯЦІЯ РАКІВ">
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between text-cyan-400 text-sm">
                      <span>Всього:</span>
                      <span className="font-bold">250</span>
                    </div>
                    <div className="h-2 bg-black rounded-full overflow-hidden border border-cyan-400">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '85%' }} />
                    </div>
                    <div className="flex justify-between text-cyan-500 text-xs">
                      <span>Смертність: 0.8%</span>
                      <span>Ріст: +2.1%/м</span>
                    </div>
                  </div>
                </HUDPanel>

                <HUDPanel title="ОБЛАДНАННЯ">
                  <div className="space-y-2 mt-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cyan-400">Насос:</span>
                      <span className="text-green-400">✅ Нормально</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-400">Фільтр:</span>
                      <span className="text-green-400">✅ Чистий</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-400">Аератор:</span>
                      <span className="text-green-400">✅ Активний</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-400">Обогрівач:</span>
                      <span className="text-blue-400">⏸️ Вимкнений</span>
                    </div>
                  </div>
                </HUDPanel>
              </>
            )}

            {activeTab === 'voice' && <VoiceControl onCommand={handleVoiceCommand} />}

            {activeTab === 'chat' && <div className="h-96"><JarvisChat onCommand={handleVoiceCommand} /></div>}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <AuthorizationLevels currentLevel={authLevel} onLevelChange={setAuthLevel} />
                <HUDPanel title="ЖУРНАЛ ДОСТУПУ">
                  <div className="space-y-1 mt-3 text-xs text-cyan-500 font-mono">
                    <div>[14:32:45] Вхід користувача: OPERATOR</div>
                    <div>[14:25:12] Активація годування</div>
                    <div>[14:18:33] Зміна налаштувань pH</div>
                    <div>[14:05:17] Запит звіту</div>
                  </div>
                </HUDPanel>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <DeadmanSwitch timeoutSeconds={300} />

            {authLevel >= AuthLevel.ADMIN && (
              <HUDPanel title="КРИТИЧНІ ОПЕРАЦІЇ" status="warning">
                <button className="w-full mt-3 py-2 px-3 bg-gradient-to-r from-red-700 to-red-900 rounded font-bold text-white text-xs hover:from-red-600 hover:to-red-800 transition-all">
                  🛑 ПЕРЕЗАГРУЗИТИ СИСТЕМУ
                </button>
              </HUDPanel>
            )}

            <HUDPanel title="ІНФОРМАЦІЯ">
              <div className="space-y-2 mt-3 text-xs text-cyan-400">
                <p>Вер: 1.0.0</p>
                <p>ESP32: ✅ З'єднаний</p>
                <p>Останнє оновл: 2 год тому</p>
              </div>
            </HUDPanel>
          </div>
        </div>
      </div>

      {/* Emergency button - always visible */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setSystemStatus('АВАРІЙНА ЗУПИНКА')}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-red-800 border-2 border-red-400 shadow-2xl shadow-red-600 hover:shadow-red-400 transition-all transform hover:scale-110 flex items-center justify-center font-bold text-white text-2xl"
          title="Аварійна зупинка"
        >
          🛑
        </button>
      </div>
    </main>
  );
}
