'use client';

import { useState } from 'react';
import ValentineCard from './components/ValentineCard';
import HeartCatcher from './components/HeartCatcher';
import MemoryGame from './components/MemoryGame';
import LoveQuiz from './components/LoveQuiz';
import FloatingHearts from './components/FloatingHearts';
import BackgroundMusic from './components/BackgroundMusic';

const loveMessages = [
  'Eres la razón por la que mi corazón late más fuerte cada día ❤️',
  'Contigo, cada momento se convierte en un recuerdo precioso 💕',
  'Tu sonrisa ilumina mi mundo de formas que no puedo describir ✨',
  'Eres mi persona favorita en todo el universo 🌟',
  'Cada día a tu lado es un regalo que atesoro 💝',
];

type Stage = 'welcome' | 'quiz' | 'catcher' | 'memory' | 'messages' | 'final';

export default function Home() {
  const [stage, setStage] = useState<Stage>('welcome');
  const [currentMessage, setCurrentMessage] = useState(0);

  const nextMessage = () => {
    if (currentMessage < loveMessages.length - 1) {
      setCurrentMessage(currentMessage + 1);
    } else {
      setStage('final');
    }
  };

  return (
    <>
      <FloatingHearts />
      <BackgroundMusic />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
        <div className="max-w-4xl w-full">
          {stage === 'welcome' && (
            <div className="text-center animate-float">
              <h1 className="text-6xl md:text-8xl font-bold text-pink-600 mb-6 drop-shadow-lg">
                💝 San Valentín 💝
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-semibold">
                Una experiencia interactiva llena de amor
              </p>
              <div className="space-y-4 mb-8">
                <p className="text-xl text-gray-600">✨ Juegos divertidos</p>
                <p className="text-xl text-gray-600">💌 Mensajes especiales</p>
                <p className="text-xl text-gray-600">❤️ Mucho amor</p>
              </div>
              <button
                onClick={() => setStage('quiz')}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:from-pink-600 hover:to-red-600 transition-all shadow-2xl hover:scale-110 transform"
              >
                ¡Comenzar! 💕
              </button>
            </div>
          )}

          {stage === 'quiz' && (
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold text-pink-600 mb-8 text-center">
                Cuestionario del Amor 💘
              </h2>
              <LoveQuiz onComplete={() => setStage('catcher')} />
            </div>
          )}

          {stage === 'catcher' && (
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold text-pink-600 mb-8 text-center">
                ¡Atrapa los Corazones! 💖
              </h2>
              <HeartCatcher onComplete={() => setStage('memory')} />
            </div>
          )}

          {stage === 'memory' && (
            <div className="flex flex-col items-center">
              <MemoryGame onComplete={() => setStage('messages')} />
            </div>
          )}

          {stage === 'messages' && (
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold text-pink-600 mb-8 text-center">
                Un mensaje especial para ti 💌
              </h2>
              <ValentineCard
                message={loveMessages[currentMessage]}
                onNext={nextMessage}
              />
            </div>
          )}

          {stage === 'final' && (
            <div className="text-center animate-float">
              <div className="text-8xl mb-6 animate-pulse-heart">❤️</div>
              <h1 className="text-5xl md:text-7xl font-bold text-pink-600 mb-6 drop-shadow-lg">
                ¡Feliz San Valentín!
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-semibold">
                Gracias por compartir este momento especial
              </p>
              <div className="space-y-4 mb-8">
                <p className="text-xl text-gray-600 italic">
                  "El amor no es perfecto, pero contigo todo es perfecto" 💕
                </p>
              </div>
              <button
                onClick={() => {
                  setStage('welcome');
                  setCurrentMessage(0);
                }}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-10 py-3 rounded-full text-xl font-bold hover:from-pink-600 hover:to-red-600 transition-all shadow-2xl hover:scale-110 transform"
              >
                Volver a empezar 🔄
              </button>
            </div>
          )}
        </div>

        <footer className="mt-16 text-center text-gray-600">
          <p className="text-sm">Hecho con ❤️ para San Valentín 2026</p>
        </footer>
      </div>
    </>
  );
}
