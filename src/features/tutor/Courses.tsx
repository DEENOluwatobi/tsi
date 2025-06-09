'use client';

import { JSX, useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Users, 
  Clock, 
  Star, 
  Play,
  Edit,
  Trash2,
  Calendar,
  BarChart3
} from 'lucide-react';

interface Tutor {
  firstname: string;
  lastname: string;
  course: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  students: number;
  duration: string;
  rating: number;
  progress: number;
  status: 'active' | 'draft' | 'completed';
  thumbnail?: string;
  lastUpdated: string;
}

interface CourseCardProps {
  course: Course;
}

interface CoursesPageProps {
  tutor: Tutor;
}

const CourseCard = ({ course }: CourseCardProps): JSX.Element => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Course Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-red-500 to-blue-500 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-white opacity-80" />
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[course.status]}`}>
            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-black line-clamp-2">{course.title}</h3>
          <div className="flex items-center space-x-1 ml-2">
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-500 rounded">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{course.students} students</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{course.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">{course.rating}/5</span>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{course.progress}% avg</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Course Progress</span>
            <span className="text-xs font-medium text-gray-700">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Last Updated */}
        <p className="text-xs text-gray-500 mb-4">Last updated: {course.lastUpdated}</p>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-200">
            <Play className="w-4 h-4" />
            <span className="text-sm">View Course</span>
          </button>
          <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CoursesPage({ tutor }: CoursesPageProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'draft' | 'completed'>('all');

  const courses: Course[] = [
    {
      id: '1',
      title: tutor.course,
      description: 'Comprehensive course covering fundamental mathematical concepts and advanced problem-solving techniques.',
      students: 156,
      duration: '12 weeks',
      rating: 4.8,
      progress: 85,
      status: 'active',
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      title: 'Advanced Calculus',
      description: 'Deep dive into differential and integral calculus with real-world applications.',
      students: 24,
      duration: '16 weeks',
      rating: 4.9,
      progress: 92,
      status: 'active',
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      title: 'Introduction to Statistics',
      description: 'Learn statistical analysis, probability theory, and data interpretation.',
      students: 89,
      duration: '10 weeks',
      rating: 4.7,
      progress: 78,
      status: 'active',
      lastUpdated: '3 days ago'
    },
    {
      id: '4',
      title: 'Linear Algebra Fundamentals',
      description: 'Master vectors, matrices, and linear transformations.',
      students: 0,
      duration: '8 weeks',
      rating: 0,
      progress: 0,
      status: 'draft',
      lastUpdated: '1 week ago'
    },
    {
      id: '5',
      title: 'Geometry Basics',
      description: 'Complete introductory course covering all essential geometry concepts.',
      students: 45,
      duration: '6 weeks',
      rating: 4.6,
      progress: 100,
      status: 'completed',
      lastUpdated: '2 months ago'
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    return course.status === activeTab;
  });

  const tabs = [
    { id: 'all' as const, label: 'All Courses', count: courses.length },
    { id: 'active' as const, label: 'Active', count: courses.filter(c => c.status === 'active').length },
    { id: 'draft' as const, label: 'Draft', count: courses.filter(c => c.status === 'draft').length },
    { id: 'completed' as const, label: 'Completed', count: courses.filter(c => c.status === 'completed').length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black">My Courses</h1>
          <p className="text-gray-600">Create and manage your educational content</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-200">
          <Plus className="w-5 h-5" />
          <span>Create Course</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-black">{courses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-black">
                {courses.reduce((acc, course) => acc + course.students, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-black">
                {(courses.filter(c => c.rating > 0).reduce((acc, course) => acc + course.rating, 0) / 
                  courses.filter(c => c.rating > 0).length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-black">
                {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-black mb-2">No courses found</h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'all' 
              ? "You haven't created any courses yet." 
              : `No ${activeTab} courses available.`
            }
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-200 mx-auto">
            <Plus className="w-5 h-5" />
            <span>Create Your First Course</span>
          </button>
        </div>
      )}
    </div>
  );
}