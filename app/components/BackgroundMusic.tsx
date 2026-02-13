'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';

const BackgroundMusic = forwardRef<HTMLAudioElement>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = ref && 'current' in ref ? ref.current : null;
    
    const playAudio = async () => {
      if (audioElement) {
        try {
          audioElement.volume = 0.5; // Volumen al 50%
          await audioElement.play();
          setIsPlaying(true);
        } catch (error) {
          // Si falla autoplay, reproducir en la primera interacción
          setIsPlaying(false);
        }
      }
    };

    // Intentar reproducir inmediatamente
    playAudio();

    // Si falla, reproducir con cualquier interacción del usuario
    const startOnInteraction = async () => {
      if (!isPlaying && audioElement) {
        try {
          await audioElement.play();
          setIsPlaying(true);
          // Remover listeners después de reproducir
          document.removeEventListener('click', startOnInteraction);
          document.removeEventListener('touchstart', startOnInteraction);
          document.removeEventListener('keydown', startOnInteraction);
        } catch (error) {
          console.log('Esperando interacción del usuario');
        }
      }
    };

    document.addEventListener('click', startOnInteraction);
    document.addEventListener('touchstart', startOnInteraction);
    document.addEventListener('keydown', startOnInteraction);

    return () => {
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('touchstart', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
    };
  }, [isPlaying, ref]);

  return (
    <audio
      ref={ref}
      loop
      preload="auto"
    >
      <source src="/music.mp3" type="audio/mpeg" />
      Tu navegador no soporta audio HTML5.
    </audio>
  );
});

BackgroundMusic.displayName = 'BackgroundMusic';

export default BackgroundMusic;
