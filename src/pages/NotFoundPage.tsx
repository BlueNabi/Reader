import React from 'react';
import { Link } from 'react-router-dom';
import { FolderX } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';

const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
            <FolderX className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Page not found</h2>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <div className="flex space-x-4">
            <Link to="/">
              <Button size="lg">Go back home</Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;