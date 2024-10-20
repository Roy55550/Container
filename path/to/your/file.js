const handleAnswer = (option) => {
  setAnswers((prevAnswers) => ({
    ...prevAnswers,
    [currentQuestion]: option,
  }));
};

return (
  // ... (other JSX)
  {questions[currentQuestion].options.map((option) => (
    <button
      key={option}
      className={`p-2 rounded-md ${
        answers[currentQuestion] === option ? 'bg-[#FFE8D6]' : 'hover:bg-[#FFE8D6]'
      }`}
      onClick={() => handleAnswer(option)}
    >
      {option}
    </button>
  ))}
  // ... (rest of the JSX)
);