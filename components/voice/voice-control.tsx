'use client';

import React, { useEffect, useState, useRef } from 'react';
import { HUDPanel } from '@/components/jarvis/hud-panel';

interface VoiceControlProps {
  onCommand?: (command: string) => void;
}

type SpeechRecognitionEvent = Event & {
  results?: SpeechRecognitionResultList;
  isFinal?: boolean;
};

export const VoiceControl: React.FC<VoiceControlProps> = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing'>('idle');
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'uk-UA'; // Ukrainian

    recognition.onstart = () => {
      setIsListening(true);
      setStatus('listening');
      speak('Я вас слухаю');
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          processCommand(transcript);
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      speak('Помилка розпізнавання. Спробуйте ще раз.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setStatus('idle');
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []);

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'uk-UA';
    utterance.rate = 0.9;
    synth.speak(utterance);
  };

  const processCommand = (command: string) => {
    const lowerCmd = command.toLowerCase().trim();
    setStatus('processing');

    // Emergency stop
    if (lowerCmd.includes('стоп') || lowerCmd.includes('аварійна зупинка')) {
      speak('Система зупинена');
      onCommand?.('EMERGENCY_STOP');
      return;
    }

    // Temperature control
    if (lowerCmd.includes('температура')) {
      speak('Показую температуру');
      onCommand?.('SHOW_TEMPERATURE');
      return;
    }

    // pH control
    if (lowerCmd.includes('pH') || lowerCmd.includes('пш')) {
      speak('Показую кислотність');
      onCommand?.('SHOW_PH');
      return;
    }

    // Water level
    if (lowerCmd.includes('вода') || lowerCmd.includes('рівень')) {
      speak('Показую рівень води');
      onCommand?.('SHOW_WATER_LEVEL');
      return;
    }

    // Feeding
    if (lowerCmd.includes('корм')) {
      speak('Активую годування');
      onCommand?.('ACTIVATE_FEEDING');
      return;
    }

    speak('Команда не розпізнана');
  };

  const handleStartListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return (
    <HUDPanel
      title="ГОЛОСОВИЙ КОНТРОЛЬ"
      status={isListening ? 'normal' : status === 'processing' ? 'warning' : 'normal'}
    >
      <div className="space-y-3">
        {/* Microphone indicator */}
        <div className="flex items-center justify-center gap-2">
          <div
            className={`w-4 h-4 rounded-full ${
              isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'
            }`}
          />
          <span className="text-cyan-400 text-sm font-mono">
            {isListening ? 'СЛУХАЮ...' : status === 'processing' ? 'ОБРОБКА...' : 'ГОТОВО'}
          </span>
        </div>

        {/* Transcript display */}
        {transcript && (
          <div className="p-2 bg-black border border-cyan-400 rounded text-cyan-300 text-xs min-h-12 font-mono">
            {transcript}
          </div>
        )}

        {/* Wake word info */}
        <div className="text-xs text-cyan-500 text-center">
          Скажіть "Автофарм" для активації
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleStartListening}
            disabled={isListening}
            className="py-2 px-3 bg-gradient-to-r from-red-600 to-red-700 rounded font-bold text-white text-xs hover:from-red-500 hover:to-red-600 disabled:opacity-50 transition-all"
          >
            🎤 СЛУХАТИ
          </button>
          <button
            onClick={handleStopListening}
            disabled={!isListening}
            className="py-2 px-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded font-bold text-white text-xs hover:from-gray-500 hover:to-gray-600 disabled:opacity-50 transition-all"
          >
            ⏹️ СТОП
          </button>
        </div>

        {/* Command list */}
        <div className="text-xs text-cyan-500 space-y-1 pt-2 border-t border-cyan-500">
          <p className="font-bold">Команди:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Температура</li>
            <li>pH / пш</li>
            <li>Вода / рівень</li>
            <li>Корм</li>
            <li>Стоп / Аварійна зупинка</li>
          </ul>
        </div>
      </div>
    </HUDPanel>
  );
};
