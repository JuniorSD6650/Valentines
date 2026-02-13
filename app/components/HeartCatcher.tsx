'use client';

import { useState, useEffect } from 'react';

interface HeartCatcherProps {
  onComplete: () => void;
}

export default function HeartCatcher({ onComplete }: HeartCatcherProps) {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; caught: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const targetScore = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: -10,
          caught: false,
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
      setTimeout(() => onComplete(), 1000);
    }
  }, [score, onComplete]);

  const catchHeart = (id: number) => {
    setHearts((prev) =>
      prev.map((heart) =>
        heart.id === id ? { ...heart, caught: true } : heart
      )
    );
    setScore((prev) => prev + 1);
  };

  if (score >= targetScore) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-4xl font-bold text-pink-600 mb-4">¡Excelente!</h2>
        <p className="text-xl text-gray-700">¡Atrapaste todos los corazones! 💕</p>
      </div>
    );
  }

  if (timeLeft === 0 && score < targetScore) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-4xl font-bold text-pink-600 mb-4">¡Casi!</h2>
        <p className="text-xl text-gray-700 mb-4">
          Atrapaste {score} de {targetScore} corazones
        </p>
        <button
          onClick={() => {
            setScore(0);
            setTimeLeft(10);
            setHearts([]);
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
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className={`absolute text-4xl cursor-pointer transition-all duration-300 ${
              heart.caught ? 'scale-150 opacity-0' : 'hover:scale-125'
            }`}
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              animation: heart.caught ? 'none' : 'fall 3s linear forwards',
            }}
            onClick={() => !heart.caught && catchHeart(heart.id)}
          >
            ❤️
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(450px);
          }
        }
      `}</style>
    </div>
  );
}
