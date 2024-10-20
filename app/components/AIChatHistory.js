import React from 'react';

const AIChatHistory = ({ chatHistory, onSelectAnswer }) => {
  console.log('AIChatHistory rendered', { chatHistory });

  return (
    <div className="ai-chat-history">
      <h3>Quiz History</h3>
      {chatHistory.map((item, index) => {
        console.log('Rendering history item:', item);
        return (
          <div key={index} className="chat-item">
            <p>Question: {item.question}</p>
            <p>Your Answer: {item.answer}</p>
            <button onClick={() => {
              console.log('Select button clicked for:', item);
              onSelectAnswer(item.answer);
            }}>Select</button>
          </div>
        );
      })}
    </div>
  );
};

export default AIChatHistory;