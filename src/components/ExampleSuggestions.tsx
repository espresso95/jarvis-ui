import React, { useState } from 'react';
import Close from '../assets/icons/close.svg?react';
import DownIcon from '../assets/icons/down.svg?react';
import QuestionIcon from '../assets/icons/question.svg?react';

const suggestions = {
  tokens: {
    title: 'Tokens',
    text: 'Add shitcoins $BONK and $SUI',
  },
  strategy: {
    title: 'Strategy',
    text: 'Start using SRI indicators',
  },
  cull: {
    title: 'Cull',
    text: 'Remove all instances of $DOGE',
  },
};

interface ExampleSuggestionsProps {
  onClose: () => void;
  onSelectSuggestion: (text: string) => void;
}

const ExampleSuggestions: React.FC<ExampleSuggestionsProps> = ({
  onClose,
  onSelectSuggestion,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSuggestionClick = (suggestionText: string) => {
    onSelectSuggestion(suggestionText);
    onClose(); // Close suggestions after selection
  };

  return (
    <div className="border border-black py-4 flex flex-col mb-2">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center px-4">
          <QuestionIcon className="w-4 h-4 fill-black mr-2" />
          <p className="text-stat-label ml-2">Example suggestions</p>
        </div>
        <button onClick={onClose}>
          <Close className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-row justify-between space-x-1 px-4">
        <div
          className={`bg-stat p-2 rounded-lg flex-1 ${
            !isOpen ? 'cursor-pointer hover:bg-gray-100' : ''
          }`}
          onClick={!isOpen ? handleToggle : undefined}
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-agent-title">{suggestions.tokens.title}</p>
            <button onClick={handleToggle}>
              <DownIcon
                className={`w-4 h-4 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
          {isOpen && (
            <p
              className="text-stat-label leading-tight cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick(suggestions.tokens.text);
              }}
            >
              "{suggestions.tokens.text}"
            </p>
          )}
        </div>

        <div
          className={`bg-stat p-2 rounded-lg flex-1 ${
            !isOpen ? 'cursor-pointer hover:bg-gray-100' : ''
          }`}
          onClick={!isOpen ? handleToggle : undefined}
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-agent-title">{suggestions.strategy.title}</p>
            <button onClick={handleToggle}>
              <DownIcon
                className={`w-4 h-4 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
          {isOpen && (
            <p
              className="text-stat-label leading-tight cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick(suggestions.strategy.text);
              }}
            >
              "{suggestions.strategy.text}"
            </p>
          )}
        </div>

        <div
          className={`bg-stat p-2 rounded-lg flex-1 ${
            !isOpen ? 'cursor-pointer hover:bg-gray-100' : ''
          }`}
          onClick={!isOpen ? handleToggle : undefined}
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-agent-title">{suggestions.cull.title}</p>
            <button onClick={handleToggle}>
              <DownIcon
                className={`w-4 h-4 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
          {isOpen && (
            <p
              className="text-stat-label leading-tight cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick(suggestions.cull.text);
              }}
            >
              "{suggestions.cull.text}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExampleSuggestions;
