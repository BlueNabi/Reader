import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, BarChart2 } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../contexts/AuthContext';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="rounded-md w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <PageTransition>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 h-full w-full" aria-hidden="true">
            <div className="relative h-full">
              <svg
                className="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
                width="404"
                height="784"
                fill="none"
                viewBox="0 0 404 784"
              >
                <defs>
                  <pattern
                    id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="784" fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)" />
              </svg>
              <svg
                className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
                width="404"
                height="784"
                fill="none"
                viewBox="0 0 404 784"
              >
                <defs>
                  <pattern
                    id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="784" fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)" />
              </svg>
            </div>
          </div>

          <div className="relative pt-6 pb-16 sm:pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mt-16 sm:mt-24">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Your Ultimate</span>
                  <span className="block text-indigo-600">Dashboard Solution</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Streamline your workflow, manage projects, and boost productivity with our comprehensive dashboard.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  {isAuthenticated ? (
                    <div>
                      <Link to="/dashboard">
                        <Button size="lg">Go to Dashboard</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <Link to="/signin">
                        <Button size="lg">Sign in</Button>
                      </Link>
                      <Link to="/signup">
                        <Button size="lg" variant="outline">Create account</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="relative">
              <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to manage your projects
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
                Our platform provides everything you need to streamline your workflow and boost productivity.
              </p>
            </div>

            <div className="relative mt-12 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-8">
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="Secure Authentication"
                description="Our robust authentication system ensures your data remains protected and accessible only to authorized users."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                title="Team Collaboration"
                description="Work seamlessly with your team members, assign tasks, and track progress in real-time."
              />
              <FeatureCard
                icon={<BarChart2 className="h-6 w-6" />}
                title="Insightful Analytics"
                description="Make informed decisions with comprehensive analytics and reporting features that provide valuable insights."
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block">Sign up for free today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-100">
              Join thousands of users who are already enjoying the benefits of our platform.
            </p>
            <Link to="/signup">
              <Button 
                className="mt-8 bg-white text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700" 
                size="lg"
              >
                Sign up for free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;