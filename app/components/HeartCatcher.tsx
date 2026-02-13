'use client';

import { useState, useEffect } from 'react';

interface HeartCatcherProps {
  onComplete: () => void;
}

type FallingObject = {
  id: number;
  x: number;
  y: number;
  caught: boolean;
  currentY?: number;
  type: 'heart' | 'bomb'; // ❤️ corazones o 💣 bombas
};

export default function HeartCatcher({ onComplete }: HeartCatcherProps) {
  const [objects, setObjects] = useState<FallingObject[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(22); // Aumentado a 20 segundos
  const targetScore = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      // 35% probabilidad de bomba, 65% de corazón
      const isBomb = Math.random() < 0.45;
      
      setObjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: -10,
          caught: false,
          type: isBomb ? 'bomb' : 'heart',
        },
      ]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (score >= targetScore) {
      setTimeout(() => onComplete(), 5000);
    }
  }, [score, onComplete]);

  const catchObject = (id: number, event: React.MouseEvent | React.TouchEvent) => {
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const parent = element.parentElement?.getBoundingClientRect();
    
    if (parent) {
      const currentY = ((rect.top - parent.top) / parent.height) * 100;
      const obj = objects.find(o => o.id === id);
      
      setObjects((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, caught: true, currentY } : item
        )
      );
      
      // Si es corazón suma 1, si es bomba resta 1 (mínimo 0)
      if (obj?.type === 'heart') {
        setScore((prev) => prev + 1);
      } else {
        setScore((prev) => Math.max(0, prev - 1));
      }
    }
  };

  if (score >= targetScore) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-4xl font-bold text-pink-600 mb-4">🙈🙈🙉</h2>
        <p className="text-xl text-gray-700">¡Atrapaste todos los corazones! 💕 ¡Así como me atrapaste a mí!</p>
      </div>
    );
  }

  if (timeLeft === 0 && score < targetScore) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-4xl font-bold text-pink-600 mb-4">¡Animo mi amor!</h2>
        <p className="text-xl text-gray-700 mb-4">
          Atrapaste {score} de {targetScore} corazones
        </p>
        <button
          onClick={() => {
            setScore(0);
            setTimeLeft(20);
            setObjects([]);
          }}
          className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors shadow-lg"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between mb-4 text-lg font-semibold">
        <span className="text-pink-600">❤️ Corazones: {score}/{targetScore}</span>
        <span className="text-pink-600">⏱️ Tiempo: {timeLeft}s</span>
      </div>
      <div className="relative w-full h-96 bg-white/30 rounded-2xl overflow-hidden border-4 border-pink-300 shadow-xl">
        {objects.map((obj) => (
          <div
            key={obj.id}
            className={`absolute text-5xl cursor-pointer select-none ${
              obj.caught ? 'animate-catch' : ''
            }`}
            style={{
              left: `${obj.x}%`,
              top: obj.caught && obj.currentY !== undefined ? `${obj.currentY}%` : `${obj.y}%`,
              animation: obj.caught ? 'catch 0.4s ease-out forwards' : 'fall 3s linear forwards',
              padding: '8px',
              margin: '-8px',
              pointerEvents: obj.caught ? 'none' : 'auto',
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              if (!obj.caught) catchObject(obj.id, e);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              if (!obj.caught) catchObject(obj.id, e);
            }}
          >
            {obj.type === 'heart' ? '❤️' : '💔'}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(450px);
          }
        }
        @keyframes catch {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
