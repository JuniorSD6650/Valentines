'use client';

import { useEffect, useState } from 'react';

// ⚙️ VARIABLES DE CONFIGURACIÓN - Ajusta estos valores según el ritmo de tu canción
const EXPLOSION_DELAY = 76000; // Tiempo de espera inicial (ms) antes de la primera explosión
const EXPLOSION_INTERVAL = 8000; // Intervalo entre explosiones (ms)
const HEARTS_PER_EXPLOSION = 30; // Cantidad de corazones por explosión

interface FloatingHeartsProps {
  startExplosions?: boolean; // Controla cuándo comienzan las explosiones
}

export default function FloatingHearts({ startExplosions = false }: FloatingHeartsProps) {
  const [backgroundHearts, setBackgroundHearts] = useState<{ id: string; left: number; delay: number; duration: number; size: number }[]>([]);
  const [explosionHearts, setExplosionHearts] = useState<{ id: string; left: number; delay: number; duration: number; timestamp: number; size: number }[]>([]);

  // Generar corazones de fondo solo en el cliente
  useEffect(() => {
    setBackgroundHearts(
      Array.from({ length: 20 }, (_, i) => ({
        id: `bg-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        size: 20 + Math.random() * 15,
      }))
    );
  }, []);

  // Explosiones de corazones al ritmo - solo cuando startExplosions es true
  useEffect(() => {
    if (!startExplosions) return;

    // Esperar el delay inicial antes de comenzar
    const initialTimeout = setTimeout(() => {
      // Primera explosión
      triggerExplosion();

      // Explosiones subsecuentes en intervalo
      const explosionInterval = setInterval(() => {
        triggerExplosion();
      }, EXPLOSION_INTERVAL);

      return () => clearInterval(explosionInterval);
    }, EXPLOSION_DELAY);

    return () => clearTimeout(initialTimeout);
  }, [startExplosions]);

  const triggerExplosion = () => {
    const timestamp = Date.now();
    
    const newHearts = Array.from({ length: HEARTS_PER_EXPLOSION }, (_, i) => ({
      id: `exp-${timestamp}-${i}`,
      left: 20 + Math.random() * 60, // Más distribuido
      delay: Math.random() * 0.3,
      duration: 3 + Math.random() * 2, // Más rápidos
      timestamp,
      size: 25 + Math.random() * 20,
    }));

    setExplosionHearts((prev) => [...prev, ...newHearts]);

    // Limpiar corazones después de que terminen su animación
    setTimeout(() => {
      setExplosionHearts((prev) => prev.filter((h) => h.timestamp !== timestamp));
    }, 6000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Corazones de fondo - siempre presentes */}
      {backgroundHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-400 opacity-30"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animation: `floatUpSmooth ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </div>
      ))}
      
      {/* Corazones de explosión */}
      {explosionHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-500"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animation: `explosionFloat ${heart.duration}s linear forwards`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </div>
      ))}
      
      <style jsx>{`
        @keyframes floatUpSmooth {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.3;
          }
          95% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes explosionFloat {
          0% {
            transform: translateY(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          3% {
            transform: translateY(-30px) scale(1.1) rotate(20deg);
            opacity: 0.9;
          }
          8% {
            transform: translateY(-80px) scale(1) rotate(40deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
