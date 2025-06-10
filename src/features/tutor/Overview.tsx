'use client';

import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Star, 
  Activity,
  Calendar,
  Clock,
  Award
} from 'lucide-react';
import { JSX } from 'react';

interface Tutor {
  firstname: string;
  lastname: string;
  course: string;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  textColor: string;
  trend?: string;
}

interface OverviewPageProps {
  tutor: Tutor;
}

const StatCard = ({ title, value, icon: Icon, bgColor, textColor, trend }: StatCardProps): JSX.Element => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 ${bgColor} rounded-lg`}>
          <Icon className={`w-6 h-6 ${textColor}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-black">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend}
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const ActivityItem = ({ type, message, time }: { type: 'new' | 'completed' | 'updated'; message: string; time: string }): JSX.Element => {
  const colors = {
    new: 'bg-blue-500',
    completed: 'bg-green-500',
    updated: 'bg-red-500'
  };

  return (
    <div className="flex items-start space-x-3 py-3">
      <div className={`w-2 h-2 ${colors[type]} rounded-full mt-2 flex-shrink-0`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800">{message}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

export default function OverviewPage({ tutor }: OverviewPageProps): JSX.Element {
  const stats = [
    {
      title: 'Total Students',
      value: '156',
      icon: Users,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      trend: '+12% from last month'
    },
    {
      title: 'Active Courses',
      value: '3',
      icon: BookOpen,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      trend: '+1 new course'
    },
    {
      title: 'Completion Rate',
      value: '89%',
      icon: Award,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      trend: '+5% improvement'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      icon: Star,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      trend: '+0.2 this month'
    }
  ];

  const recentActivities = [
    { type: 'new' as const, message: 'New student enrolled in Mathematics Course', time: '2 hours ago' },
    { type: 'completed' as const, message: 'Assignment submitted by John Doe - Algebra Quiz', time: '4 hours ago' },
    { type: 'updated' as const, message: 'Course material updated for Advanced Calculus', time: '6 hours ago' },
    { type: 'new' as const, message: 'New question posted in discussion forum', time: '8 hours ago' },
    { type: 'completed' as const, message: 'Sarah Smith completed Chapter 5 exercises', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-blue-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Hello, {tutor.firstname}!</h2>
            <p className="text-red-100">Here's what's happening with your courses today.</p>
          </div>
          <div className="hidden md:block">
            <Calendar className="w-12 h-12 text-red-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-black">Recent Activity</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-1">
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
            <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All Activities
            </button>
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-black">Course Performance</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              
              {/* Primary Course */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800">{tutor.course}</span>
                  <span className="text-sm font-bold text-black">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">156 active students</p>
              </div>

              {/* Secondary Courses */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800">Advanced Topics</span>
                  <span className="text-sm font-bold text-black">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-red-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">24 active students</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800">Beginner Course</span>
                  <span className="text-sm font-bold text-black">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">89 active students</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-black">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Create New Course</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors duration-200">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Add Students</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors duration-200">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Schedule Class</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}