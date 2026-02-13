'use client';

import { useState, useEffect } from 'react';

interface MemoryGameProps {
  onComplete: () => void;
}

const emojis = ['💕', '💖', '💗', '💝', '💘', '💞'];

export default function MemoryGame({ onComplete }: MemoryGameProps) {
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const gameEmojis = [...emojis, ...emojis];
    const shuffled = gameEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = flippedCards;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard?.emoji === secondCard?.emoji) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, matched: true, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setTimeout(() => onComplete(), 1500);
    }
  }, [cards, onComplete]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (card?.flipped || card?.matched) return;

    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, flipped: true } : c))
    );
    setFlippedCards((prev) => [...prev, id]);
  };

  const allMatched = cards.length > 0 && cards.every((card) => card.matched);

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-pink-600 mb-2">Encuentra las parejas ❤️</h2>
        <p className="text-lg text-gray-700">Movimientos: {moves}</p>
      </div>

      {allMatched ? (
        <div className="text-center">
          <div className="text-6xl mb-4">🎊</div>
          <h3 className="text-4xl font-bold text-pink-600 mb-2">¡Increíble!</h3>
          <p className="text-xl text-gray-700">Lo completaste en {moves} movimientos</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center text-5xl ${
                card.matched
                  ? 'bg-green-200 scale-95'
                  : card.flipped
                  ? 'bg-white shadow-lg scale-105'
                  : 'bg-pink-400 hover:bg-pink-500 hover:scale-105 shadow-md'
              }`}
            >
              {card.flipped || card.matched ? card.emoji : '❓'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
