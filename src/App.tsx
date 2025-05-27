import React, { useState } from 'react';
import { FileType } from 'lucide-react';
import FileUpload from './components/FileUpload';
import TextDisplay from './components/TextDisplay';
import Instructions from './components/Instructions';

function App() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [hasUploadedFile, setHasUploadedFile] = useState(false);

  const handleFileLoaded = (content: string[]) => {
    setLines(content);
    setCurrentLineIndex(0);
    setHasUploadedFile(true);
  };

  const handleNextLine = () => {
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <FileType className="text-blue-600" size={24} />
            <h1 className="text-xl font-semibold text-gray-900">Line Reader</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {!hasUploadedFile && <Instructions />}
          
          {!hasUploadedFile && (
            <FileUpload onFileLoaded={handleFileLoaded} />
          )}

          {hasUploadedFile && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Reading Text</h2>
                <button
                  onClick={() => setHasUploadedFile(false)}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Upload a different file
                </button>
              </div>

              <TextDisplay 
                lines={lines} 
                currentLineIndex={currentLineIndex}
                onNextLine={handleNextLine}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;