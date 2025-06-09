'use client';

import React, { JSX, useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar,
  Award,
  TrendingUp,
  MoreVertical
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  lastActive: string;
  grade: string;
  avatar?: string;
}

interface StudentCardProps {
  student: Student;
}

const StudentCard = ({ student }: StudentCardProps): JSX.Element => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {student.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-black">{student.name}</h3>
          <p className="text-sm text-gray-600">{student.email}</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>

    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Course</span>
        <span className="text-sm font-medium text-black">{student.course}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Progress</span>
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full" 
              style={{ width: `${student.progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-black">{student.progress}%</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Grade</span>
        <span className="text-sm font-medium text-black">{student.grade}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Last Active</span>
        <span className="text-sm text-gray-500">{student.lastActive}</span>
      </div>
    </div>

    <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
      <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
        <Mail className="w-4 h-4" />
        <span>Message</span>
      </button>
      <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
        <TrendingUp className="w-4 h-4" />
        <span>Progress</span>
      </button>
    </div>
  </div>
);

export default function StudentsPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      course: 'Mathematics',
      progress: 85,
      lastActive: '2 hours ago',
      grade: 'A'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah.smith@email.com',
      course: 'Advanced Calculus',
      progress: 92,
      lastActive: '1 day ago',
      grade: 'A+'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      course: 'Algebra',
      progress: 67,
      lastActive: '3 hours ago',
      grade: 'B'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      course: 'Mathematics',
      progress: 78,
      lastActive: '5 hours ago',
      grade: 'B+'
    },
    {
      id: '5',
      name: 'Alex Wilson',
      email: 'alex.wilson@email.com',
      course: 'Geometry',
      progress: 95,
      lastActive: '30 minutes ago',
      grade: 'A+'
    },
    {
      id: '6',
      name: 'Lisa Brown',
      email: 'lisa.brown@email.com',
      course: 'Statistics',
      progress: 73,
      lastActive: '2 days ago',
      grade: 'B'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'active') return matchesSearch && student.lastActive.includes('hour');
    if (selectedFilter === 'top') return matchesSearch && student.progress >= 85;
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Students</h1>
          <p className="text-gray-600">Manage and track your students' progress</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-200">
          <UserPlus className="w-5 h-5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-black">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Today</p>
              <p className="text-2xl font-bold text-black">
                {students.filter(s => s.lastActive.includes('hour')).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Top Performers</p>
              <p className="text-2xl font-bold text-black">
                {students.filter(s => s.progress >= 85).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-black">
                {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Students</option>
              <option value="active">Active Today</option>
              <option value="top">Top Performers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-black mb-2">No students found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}