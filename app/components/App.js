import React, { useState } from 'react';
import AIChatHistory from './components/AIChatHistory';
import AIChat from './components/AIChat';

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="App">
      <h1>AI Chat Application</h1>
      <div className="chat-container">
        <AIChatHistory onSelectAnswer={handleSelectAnswer} />
        <AIChat selectedAnswer={selectedAnswer} />
      </div>
    </div>
  );
}

export default App;