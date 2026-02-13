'use client';

import { useState, useRef } from 'react';
import BackgroundMusic from './BackgroundMusic';
import MusicButton from './MusicButton';
import FullscreenButton from './FullscreenButton';

export default function ControlPanel() {
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      {/* Audio siempre montado, una sola vez */}
      <BackgroundMusic ref={audioRef} />
      
      <div className="fixed top-4 right-4 z-50">
        {/* Controles siempre montados, solo cambia visibilidad */}
        <div 
          className={`flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-xl border-2 border-pink-200 ${
            isVisible ? '' : 'hidden'
          }`}
        >
          <MusicButton audioRef={audioRef} />
          <FullscreenButton className="" />
          <button
            onClick={() => setIsVisible(false)}
            className="text-pink-600 hover:text-pink-700 p-2 rounded-full hover:bg-pink-50 transition-all"
            aria-label="Ocultar controles"
            title="Ocultar controles"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        
        <button
          onClick={() => setIsVisible(true)}
          className={`bg-white/80 backdrop-blur-sm hover:bg-white text-pink-600 p-2 rounded-full shadow-lg transition-all hover:scale-110 border-2 border-pink-200 ${
            isVisible ? 'hidden' : ''
          }`}
          aria-label="Mostrar controles"
          title="Mostrar controles"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
