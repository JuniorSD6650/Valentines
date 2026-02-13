'use client';

import { useState } from 'react';

interface ValentineCardProps {
  message: string;
  onNext: () => void;
}

export default function ValentineCard({ message, onNext }: ValentineCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full max-w-md">
      <div
        className={`relative w-full h-64 transition-transform duration-700 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl shadow-2xl flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse-heart">💌</div>
            <p className="text-white text-xl font-semibold">Click para ver el mensaje</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center p-8 rotate-y-180">
          <div className="text-center">
            <p className="text-white text-2xl font-bold mb-6">{message}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-pink-100 transition-colors shadow-lg"
            >
              Siguiente ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
