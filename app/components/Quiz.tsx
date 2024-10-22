import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  answer: string;
}

const Quiz: React.FC = () => {
  const [questions] = useState<Question[]>([
    { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces" },
    { id: 2, question: "What is JSX?", answer: "A syntax extension for JavaScript" },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [history, setHistory] = useState<Array<{ question: string; answer: string }>>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionId = currentQuestion?.id;
  const currentAnswer = answers[currentQuestionId] || '';

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = { ...answers, [currentQuestionId]: e.target.value };
    setAnswers(newAnswers);
    console.log('Answer updated:', newAnswers);
    alert('Answer updated: ' + JSON.stringify(newAnswers));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newHistory = [...history, { question: currentQuestion.question, answer: currentAnswer }];
      setHistory(newHistory);
      console.log('Quiz history updated:', newHistory);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log('Moving to next question. New index:', currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      console.log('Moving to previous question. New index:', currentQuestionIndex - 1);
      alert('Moving to previous question. New index: ' + (currentQuestionIndex - 1));
    }
  };

  console.log('Current render state:', {
    currentQuestionIndex,
    currentQuestion,
    currentAnswer,
    answers,
    history
  });

  return (
    <div>
      {currentQuestion && (
        <>
          <p>Question {currentQuestionIndex + 1}: {currentQuestion.question}</p>
          <input
            type="text"
            value={currentAnswer}
            onChange={handleAnswerChange}
            placeholder="Type your answer here"
          />
          <button onClick={handlePreviousQuestion}>Previous</button>
          <button onClick={handleNextQuestion}>Next</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
