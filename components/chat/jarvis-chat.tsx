'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'jarvis';
  content: string;
  timestamp: Date;
}

interface JarvisChatProps {
  onCommand?: (command: string) => void;
}

export const JarvisChat: React.FC<JarvisChatProps> = ({ onCommand }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'jarvis',
      content: 'Привіт. Я JARVIS. Готів допомогти з управлінням фермою. Як можу вам допомогти?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // Temperature queries
    if (msg.includes('температура') || msg.includes('тепло')) {
      return 'Поточна температура води 26.5°C. Оптимальна для Cherax quadricarinatus 24-28°C. Система охолодження активна.';
    }

    // pH queries
    if (msg.includes('ph') || msg.includes('пш') || msg.includes('кислотність')) {
      return 'Кислотність води pH 7.2. Оптимальний діапазон 6.5-8.0. Буферна система в нормі.';
    }

    // Water level
    if (msg.includes('вода') || msg.includes('рівень') || msg.includes('заповнен')) {
      return 'Рівень води 85% від максимуму. Система фільтрації працює нормально. Наступна заміна води через 2 дні.';
    }

    // Feeding
    if (msg.includes('корм') || msg.includes('годування')) {
      return 'Останнє годування 3 години тому. Наступне заплановане через 4 години. Запас корму: 78%.';
    }

    // Emergency
    if (msg.includes('аварія') || msg.includes('помилка') || msg.includes('проблема')) {
      return 'Помилок не виявлено. Всі системи в нормі. Останній самодіагностичний тест пройдений успішно 1 годину тому.';
    }

    // Status
    if (msg.includes('статус') || msg.includes('як справи') || msg.includes('все добре')) {
      return 'Всі системи активні і працюють оптимально. 🐚 Популяція: 250 раків. Смертність: 0.8%. Темп зростання: +2.1% цього місяця.';
    }

    // Equipment status
    if (msg.includes('обладнання') || msg.includes('агрегат')) {
      return 'Насос: ✅ нормально\nАератор: ✅ нормально\nФільтр: ✅ чистий\nОсвітлення: ✅ активне (12ч)\nОбогрівач: ⏸️ вимкнений\nКомпресор: ✅ нормально';
    }

    // Help
    if (msg.includes('допомога') || msg.includes('команди') || msg.includes('що ти можеш')) {
      return 'Я можу допомогти з:\n• Контролем температури та pH\n• Інформацією про рівень води\n• Управлінням годуванням\n• Статусом обладнання\n• Звітами про популяцію раків\n• Планування обслуговування';
    }

    // Default response
    return 'Я розумію ваш запит. Можете уточнити, яка саме інформація вам потрібна? Я можу допомогти з температурою, pH, водою, годуванням або статусом обладнання.';
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const jarvisResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'jarvis',
      content: generateResponse(input),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, jarvisResponse]);
    setIsLoading(false);

    // Speak response
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(jarvisResponse.content);
    utterance.lang = 'uk-UA';
    utterance.rate = 0.9;
    synth.speak(utterance);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-950 to-blue-900 border border-cyan-400 rounded-lg overflow-hidden"
      style={{ boxShadow: '0 0 10px #00d4ff40' }}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-cyan-400 bg-gradient-to-r from-blue-900 to-blue-950">
        <h2 className="text-cyan-300 font-bold tracking-wider text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          JARVIS КОНСУЛЬТАНТ
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg border ${
                msg.role === 'user'
                  ? 'bg-blue-800 border-blue-500 text-blue-100'
                  : 'bg-cyan-900 border-cyan-500 text-cyan-100'
              }`}
            >
              {msg.content}
              <div className="text-xs opacity-50 mt-1">
                {msg.timestamp.toLocaleTimeString('uk-UA', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-cyan-900 border border-cyan-500 text-cyan-100 px-4 py-2 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-cyan-400 bg-blue-950">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Запитайте мене..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 bg-black border border-cyan-400 rounded text-cyan-300 placeholder-cyan-600 focus:outline-none focus:border-cyan-300 disabled:opacity-50 text-sm font-mono"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded font-bold text-white text-sm hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 transition-all"
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
};
