import React, { useState, useEffect } from 'react';
// ... other imports

const AIChat = ({ selectedAnswer }) => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (selectedAnswer) {
      setChatMessages([{ role: 'assistant', content: selectedAnswer }]);
    }
  }, [selectedAnswer]);

  // ... rest of the component code
};

export default AIChat;