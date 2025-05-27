import React from 'react';
import { BookOpen } from 'lucide-react';

const Instructions: React.FC = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <BookOpen className="text-blue-500 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-gray-800 mb-2">How to use this reader</h3>
          <ol className="text-sm text-gray-600 space-y-2 pl-5 list-decimal">
            <li>Upload a text file using the drop area below</li>
            <li>Your text will appear line by line in the reading pane</li>
            <li>Press <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded border border-gray-300 shadow-sm">Enter</kbd> key or click anywhere to move to the next line</li>
            <li>Your progress is shown at the top of the reading pane</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Instructions;