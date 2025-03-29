import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';
import './Quiz.css';

const Quiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizQuestions[0].timeLimit);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer('');
    }
  }, [timeLeft, isAnswered]);

  const handleAnswer = (answer) => {
    setIsAnswered(true);
    setSelectedAnswer(answer);

    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      // Calculate score based on time left (faster = more points)
      const timeBonus = Math.floor(timeLeft * 3);
      setScore((prev) => prev + 100 + timeBonus);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(quizQuestions[currentQuestion + 1].timeLimit);
      setIsAnswered(false);
      setSelectedAnswer('');
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="score">Score: {score}</div>
        <div className="timer">Time Left: {timeLeft}s</div>
      </div>

      <div className="question-container">
        <h2>Question {currentQuestion + 1}</h2>
        <p>{quizQuestions[currentQuestion].question}</p>
      </div>

      <div className="options-container">
        {quizQuestions[currentQuestion].options.map((option) => (
          <button
            key={option}
            onClick={() => !isAnswered && handleAnswer(option)}
            className={`option-button ${
              isAnswered
                ? option === quizQuestions[currentQuestion].correctAnswer
                  ? 'correct'
                  : option === selectedAnswer
                  ? 'incorrect'
                  : ''
                : ''
            }`}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <button className="next-button" onClick={nextQuestion}>
          {currentQuestion === quizQuestions.length - 1
            ? 'Finish'
            : 'Next Question'}
        </button>
      )}
    </div>
  );
};

export default Quiz;
