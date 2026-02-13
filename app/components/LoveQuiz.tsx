'use client';

import { useState } from 'react';

interface LoveQuizProps {
  onComplete: () => void;
}

const questions = [
  {
    question: '¿Qué es lo más importante en una relación?',
    options: ['Confianza', 'Dinero', 'Apariencia', 'Fama'],
    correct: 0,
  },
  {
    question: '¿Cuál es el mejor regalo para San Valentín?',
    options: ['Joyas caras', 'Tiempo de calidad juntos', 'Un carro', 'Ropa de marca'],
    correct: 1,
  },
  {
    question: '¿Qué símbolo representa el amor verdadero?',
    options: ['💰', '💎', '❤️', '👑'],
    correct: 2,
  },
];

export default function LoveQuiz({ onComplete }: LoveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        setTimeout(() => onComplete(), 3000);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">
          {score === questions.length ? '💯' : score >= questions.length / 2 ? '😊' : '💪'}
        </div>
        <h2 className="text-4xl font-bold text-pink-600 mb-4">
          {score === questions.length
            ? '¡Perfecto!'
            : score >= questions.length / 2
            ? '¡Muy bien!'
            : '¡Buen intento!'}
        </h2>
        <p className="text-xl text-gray-700">
          Respondiste correctamente {score} de {questions.length} preguntas
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-pink-600 font-semibold">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <span className="text-pink-600 font-semibold">Puntaje: {score}</span>
        </div>
        <div className="w-full bg-pink-200 rounded-full h-2">
          <div
            className="bg-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white/80 rounded-2xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {questions[currentQuestion].question}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                selectedAnswer === null
                  ? 'bg-pink-100 hover:bg-pink-200 text-gray-800 hover:scale-105'
                  : selectedAnswer === index
                  ? index === questions[currentQuestion].correct
                    ? 'bg-green-400 text-white scale-105'
                    : 'bg-red-400 text-white'
                  : index === questions[currentQuestion].correct
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
