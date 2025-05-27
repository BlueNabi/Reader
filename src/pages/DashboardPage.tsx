import React from 'react';
import { Clock, BarChart3, Users, Briefcase, Bell } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Card, { CardHeader, CardBody } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <Card className="overflow-hidden">
    <div className="p-6">
      <div className="flex items-center">
        <div className={`rounded-md p-3 ${color}`}>
          {icon}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  </Card>
);

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for dashboard statistics
  const stats = [
    { id: 1, title: 'Projects', value: 12, icon: <Briefcase className="h-6 w-6 text-white" />, color: 'bg-indigo-600' },
    { id: 2, title: 'Clients', value: 28, icon: <Users className="h-6 w-6 text-white" />, color: 'bg-emerald-500' },
    { id: 3, title: 'Hours', value: '162.5', icon: <Clock className="h-6 w-6 text-white" />, color: 'bg-amber-500' },
    { id: 4, title: 'Analytics', value: '+24%', icon: <BarChart3 className="h-6 w-6 text-white" />, color: 'bg-blue-500' },
  ];

  // Mock data for recent activities
  const activities = [
    { id: 1, title: 'New project created', time: '2 hours ago' },
    { id: 2, title: 'Meeting with client', time: 'Yesterday' },
    { id: 3, title: 'Project deadline updated', time: '3 days ago' },
    { id: 4, title: 'New task assigned to you', time: '1 week ago' },
  ];
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Welcome back, {user?.name}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Here's what's happening with your projects today.
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-5">
                    {[1, 2, 3].map((project) => (
                      <div key={project} className="flex items-center space-x-4">
                        <div className={`w-2 h-12 bg-indigo-${400 + project * 100} rounded-full`}></div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">Project {project}</h3>
                          <div className="mt-1 flex items-center">
                            <div className="flex-1">
                              <div className="h-2 bg-gray-200 rounded">
                                <div
                                  className="h-2 bg-indigo-600 rounded"
                                  style={{ width: `${30 * project}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="ml-3 text-sm text-gray-500">{30 * project}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
            
            {/* Side content area */}
            <div>
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                  <Bell className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardBody className="px-4 pb-5">
                  <ul className="divide-y divide-gray-200">
                    {activities.map((activity) => (
                      <li key={activity.id} className="py-3">
                        <div className="flex space-x-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DashboardPage;