import React, { useEffect, useRef } from 'react';

interface TextDisplayProps {
  lines: string[];
  currentLineIndex: number;
  onNextLine: () => void;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ 
  lines, 
  currentLineIndex, 
  onNextLine 
}) => {
  const displayRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLDivElement>(null);

  // Scroll to the current line when it changes
  useEffect(() => {
    if (currentLineRef.current) {
      currentLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentLineIndex]);

  // Add event listeners for key press and click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onNextLine();
      }
    };

    const handleClick = () => {
      onNextLine();
    };

    window.addEventListener('keydown', handleKeyDown);
    displayRef.current?.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      displayRef.current?.removeEventListener('click', handleClick);
    };
  }, [onNextLine]);

  // If no lines, show empty state
  if (lines.length === 0) {
    return (
      <div 
        ref={displayRef}
        className="bg-white rounded-lg shadow-md p-6 h-96 overflow-y-auto text-center flex items-center justify-center"
      >
        <p className="text-gray-400 italic">
          Upload a text file to begin reading
        </p>
      </div>
    );
  }

  // Calculate progress percentage
  const progressPercentage = 
    lines.length > 1 
      ? Math.round((currentLineIndex / (lines.length - 1)) * 100) 
      : 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          Line {currentLineIndex + 1} of {lines.length}
        </div>
        <div className="flex items-center gap-2">
          <span>{progressPercentage}%</span>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div 
        ref={displayRef}
        className="bg-white rounded-lg shadow-md p-6 h-96 overflow-y-auto relative cursor-pointer"
      >
        {lines.map((line, index) => (
          <div
            key={index}
            ref={index === currentLineIndex ? currentLineRef : null}
            className={`py-1 px-2 my-1 rounded transition-all duration-200 ${
              index === currentLineIndex
                ? 'bg-blue-100 font-medium'
                : index < currentLineIndex
                ? 'text-gray-400'
                : 'text-gray-700'
            }`}
          >
            {line || ' '}
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500">
        Press <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 shadow-sm">Enter</kbd> or click anywhere to continue
      </div>
    </div>
  );
};

export default TextDisplay;