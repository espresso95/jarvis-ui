import React, { useState } from 'react';
import ArrowIcon from '../assets/icons/arrow.svg?react';
import QuestionIcon from '../assets/icons/question.svg?react';
import ResponseBox from './ResponseBox';
import LoadingBox from './LoadingBox';
import ExampleSuggestions from './ExampleSuggestions';

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [responseData, setResponseData] = useState<{
    id?: string;
    message: string;
    timestamp?: string;
    type?: string;
  } | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (message.trim()) {
      console.log('Submitting message:', message);

      // Close suggestions if open
      setShowSuggestions(false);

      // Show loading state immediately
      setIsLoading(true);
      setShowResponse(true);
      setMessage(''); // Clear the input

      // Reset textarea height
      setTimeout(() => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.style.height = 'auto';
        }
      }, 0);

      // Simulate API delay (replace with real API call)
      setTimeout(() => {
        const mockResponse = {
          id: Date.now().toString(),
          message: 'Hi... yoo?\nLight bright\nWhat hello?',
          timestamp: new Date().toISOString(),
          type: 'ai_response',
        };

        setResponseData(mockResponse);
        setIsLoading(false); // Stop loading, show response
      }, 4500); // 4.5 seconds to cycle through all messages
    }
  };

  const handleCloseResponse = () => {
    setShowResponse(false);
    setIsLoading(false);
    setResponseData(null);
  };

  const handleToggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const handleCloseSuggestions = () => {
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (suggestionText: string) => {
    setMessage(suggestionText);
  };

  return (
    <div>
      {isLoading && <LoadingBox />}
      {showResponse && responseData && !isLoading && (
        <ResponseBox response={responseData} onClose={handleCloseResponse} />
      )}

      {showSuggestions && (
        <ExampleSuggestions
          onClose={handleCloseSuggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />
      )}

      <div className="border border-black p-4 flex flex-col">
        {/* Textarea at the top */}
        <textarea
          value={message}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Share your suggestion..."
          className="resize-none outline-none text-agent-title border-none bg-transparent text-black placeholder-black/50 overflow-hidden"
          rows={1}
          style={{
            lineHeight: '1.5',
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
        />

        {/* Bottom bar with circles */}
        <div className="flex justify-between items-center mt-2 pt-2">
          {/* Left circle - Toggle suggestions */}
          <button
            onClick={handleToggleSuggestions}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer rounded"
          >
            <QuestionIcon className="w-4 h-4 fill-black" />
          </button>

          {/* Right circle with arrow icon - Submit button */}
          <button
            onClick={handleSubmit}
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <ArrowIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
