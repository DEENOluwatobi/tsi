// AssignmentsPage.tsx
'use client';
import { JSX, useState } from 'react';
import { 
  FileText, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users,
  Download,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: 'active' | 'graded' | 'overdue';
  createdAt: string;
  description?: string;
  points?: number;
}

export function AssignmentsPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'graded'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Quadratic Equations Practice',
      course: 'Mathematics',
      dueDate: '2025-06-15',
      submissions: 142,
      totalStudents: 156,
      status: 'active',
      createdAt: '2025-06-01',
      description: 'Practice problems covering quadratic formula and factoring',
      points: 100
    },
    {
      id: '2',
      title: 'Calculus Integration Test',
      course: 'Advanced Calculus',
      dueDate: '2025-06-10',
      submissions: 24,
      totalStudents: 24,
      status: 'graded',
      createdAt: '2025-05-25',
      description: 'Comprehensive test on integration techniques',
      points: 150
    },
    {
      id: '3',
      title: 'Linear Algebra Assignment',
      course: 'Mathematics',
      dueDate: '2025-06-08',
      submissions: 18,
      totalStudents: 30,
      status: 'overdue',
      createdAt: '2025-05-20',
      description: 'Matrix operations and vector spaces',
      points: 75
    },
    {
      id: '4',
      title: 'Probability Theory Homework',
      course: 'Statistics',
      dueDate: '2025-06-20',
      submissions: 5,
      totalStudents: 28,
      status: 'active',
      createdAt: '2025-06-05',
      description: 'Bayesian probability and distributions',
      points: 80
    }
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && assignment.status === activeTab;
  });

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'graded':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: Assignment['status']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'graded':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSubmissionPercentage = (submissions: number, total: number): number => {
    return Math.round((submissions / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600">Manage and track your course assignments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Assignment
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Courses</option>
            <option>Mathematics</option>
            <option>Advanced Calculus</option>
            <option>Statistics</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { key: 'all', label: 'All Assignments', count: assignments.length },
            { key: 'active', label: 'Active', count: assignments.filter(a => a.status === 'active').length },
            { key: 'graded', label: 'Graded', count: assignments.filter(a => a.status === 'graded').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Assignments Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            {/* Assignment Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className={getStatusBadge(assignment.status)}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
              </div>
              <div className="relative">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Assignment Info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{assignment.title}</h3>
                <p className="text-sm text-gray-600">{assignment.course}</p>
                {assignment.description && (
                  <p className="text-sm text-gray-500 mt-1">{assignment.description}</p>
                )}
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Due {formatDate(assignment.dueDate)}</span>
                {assignment.points && (
                  <span className="ml-auto font-medium">{assignment.points} pts</span>
                )}
              </div>

              {/* Submissions Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Submissions</span>
                  </div>
                  <span className="font-medium">
                    {assignment.submissions}/{assignment.totalStudents}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getSubmissionPercentage(assignment.submissions, assignment.totalStudents)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {getSubmissionPercentage(assignment.submissions, assignment.totalStudents)}% submitted
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:bg-gray-50 px-2 py-1 rounded">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:bg-gray-50 px-2 py-1 rounded">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first assignment'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Create Assignment
            </button>
          )}
        </div>
      )}

      {/* Create Assignment Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Create New Assignment</h2>
            <p className="text-gray-600 mb-4">Assignment creation form would go here.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}