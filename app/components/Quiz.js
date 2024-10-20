import React, { useState, useEffect } from 'react';
import AIChatHistory from './AIChatHistory';

const Quiz = () => {
  console.log('Quiz component rendered');  // Add this line

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    // Fetch questions from API or load from a local source
    // For now, let's use dummy data
    setQuestions([
      { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces" },
      { id: 2, question: "What is JSX?", answer: "A syntax extension for JavaScript" },
      // Add more questions as needed
    ]);
  }, []);

  const handleInputChange = (e) => {
    const currentQuestionId = questions[currentQuestionIndex].id;
    const newAnswers = {
      ...answers,
      [currentQuestionId]: e.target.value
    };
    setAnswers(newAnswers);
    console.log('Answer updated:', newAnswers);
    alert('Answer updated: ' + JSON.stringify(newAnswers));  // Add this line
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.id] || '';
    
    const newHistory = [
      ...quizHistory.filter(item => item.question !== currentQuestion.question),
      { question: currentQuestion.question, answer: currentAnswer }
    ];
    setQuizHistory(newHistory);
    console.log('Quiz history updated:', newHistory);
  };

  const handleSelectAnswer = (answer) => {
    const currentQuestionId = questions[currentQuestionIndex].id;
    const newAnswers = {
      ...answers,
      [currentQuestionId]: answer
    };
    setAnswers(newAnswers);
    console.log('Answer selected:', newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      handleSubmitAnswer();
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      console.log('Moving to next question. New index:', currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      handleSubmitAnswer();
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      console.log('Moving to previous question. New index:', currentQuestionIndex - 1);
      alert('Moving to previous question. New index: ' + (currentQuestionIndex - 1));  // Add this line
    }
  };

  const currentQuestion = questions[currentQuestionIndex] || {};
  const currentAnswer = answers[currentQuestion.id] || '';

  console.log('Current render state:', {
    currentQuestionIndex,
    currentQuestion,
    currentAnswer,
    answers,
    quizHistory
  });

  return (
    <div className="quiz">
      <h2>Quiz</h2>
      {questions.length > 0 && (
        <div>
          <p>Question {currentQuestionIndex + 1}: {currentQuestion.question}</p>
          <input
            type="text"
            value={currentAnswer}
            onChange={handleInputChange}
            placeholder="Type your answer here"
          />
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
        </div>
      )}
      <div className="navigation-buttons">
        <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
      </div>
      <AIChatHistory chatHistory={quizHistory} onSelectAnswer={handleSelectAnswer} />
    </div>
  );
};

export default Quiz;