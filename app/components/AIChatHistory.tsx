import React from 'react';

interface HistoryItem {
  question: string;
  answer: string;
}

interface AIChatHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

const AIChatHistory: React.FC<AIChatHistoryProps> = ({ history, onSelect }) => {
  return (
    <div>
      <h2>Chat History</h2>
      {history.map((item, index) => {
        console.log('Rendering history item:', item);
        return (
          <div key={index}>
            <p>Question: {item.question}</p>
            <p>Your Answer: {item.answer}</p>
            <button onClick={() => {
              console.log('Select button clicked for:', item);
              onSelect(item);
            }}>
              Select
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AIChatHistory;
