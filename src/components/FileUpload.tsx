import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileLoaded: (content: string[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    
    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      setError('Please upload a text (.txt) file');
      return;
    }

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.split('\n');
        onFileLoaded(lines);
      } catch (err) {
        setError('Failed to read file. Please try again.');
        console.error(err);
      }
    };
    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
    };
    reader.readAsText(file);
  }, [onFileLoaded]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 transition-all duration-200 text-center cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : fileName 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".txt,text/plain"
          className="hidden"
          onChange={handleInputChange}
        />
        
        <Upload 
          className={`mx-auto mb-4 ${fileName ? 'text-green-500' : 'text-gray-400'}`} 
          size={48}
        />
        
        {fileName ? (
          <div className="mt-2 transition-all duration-300 ease-in-out">
            <p className="text-sm text-gray-500">Uploaded file:</p>
            <p className="text-lg font-medium text-gray-700">{fileName}</p>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium text-gray-700">
              Drag & drop your text file here
            </p>
            <p className="mt-2 text-sm text-gray-500">
              or click to browse
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-sm text-red-500 bg-red-50 p-2 rounded">{error}</div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;