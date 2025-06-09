'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  User, 
  Briefcase, 
  MapPin, 
  Calendar,
  TrendingUp,
  BookOpen,
  Award,
  Clock
} from 'lucide-react';

const Overview: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    const stats = [
        {
            name: 'Profile Completion',
            value: user?.phone && user?.techSkill && user?.state ? '100%' : '75%',
            icon: User,
            color: 'bg-blue-500',
            change: '+12%',
            changeType: 'positive'
        },
        {
            name: 'Account Status',
            value: 'Active',
            icon: Briefcase,
            color: 'bg-green-500',
            change: 'Verified',
            changeType: 'neutral'
        },
        {
            name: 'Courses Enrolled',
            value: '3',
            icon: BookOpen,
            color: 'bg-red-500',
            change: '+1 this month',
            changeType: 'positive'
        },
        {
            name: 'Certificates',
            value: '2',
            icon: Award,
            color: 'bg-yellow-500',
            change: 'Latest: React Basics',
            changeType: 'neutral'
        }
    ];

    const recentActivity = [
        {
            id: 1,
            action: 'Completed lesson',
            target: 'Introduction to React',
            time: '2 hours ago',
            icon: BookOpen,
            color: 'text-green-600'
        },
        {
            id: 2,
            action: 'Updated profile',
            target: 'Tech skills section',
            time: '1 day ago',
            icon: User,
            color: 'text-blue-600'
        },
        {
            id: 3,
            action: 'Earned certificate',
            target: 'JavaScript Fundamentals',
            time: '3 days ago',
            icon: Award,
            color: 'text-yellow-600'
        },
        {
            id: 4,
            action: 'Joined classroom',
            target: 'Advanced Web Development',
            time: '1 week ago',
            icon: BookOpen,
            color: 'text-red-600'
        }
    ];

    const upcomingEvents = [
        {
            id: 1,
            title: 'React Advanced Concepts',
            type: 'Live Session',
            date: 'Today, 3:00 PM',
            instructor: 'John Doe'
        },
        {
            id: 2,
            title: 'JavaScript Assignment Due',
            type: 'Assignment',
            date: 'Tomorrow, 11:59 PM',
            instructor: 'Jane Smith'
        },
        {
            id: 3,
            title: 'Web Development Workshop',
            type: 'Workshop',
            date: 'Friday, 2:00 PM',
            instructor: 'Mike Johnson'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 to-red-600 rounded-lg shadow-sm p-6 text-white">
                <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2">
                    Welcome back, {user?.firstName}! 👋
                    </h2>
                    <p className="text-blue-100">
                    Ready to continue your learning journey? You have 2 pending assignments.
                    </p>
                </div>
                <div className="hidden md:block">
                    <div className="bg-white/20 rounded-full p-4">
                    <TrendingUp className="h-8 w-8" />
                    </div>
                </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                        <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                            <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                            {stat.name}
                            </dt>
                            <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                                {stat.value}
                            </div>
                            <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                                stat.changeType === 'positive' ? 'text-green-600' : 
                                stat.changeType === 'negative' ? 'text-red-600' : 
                                'text-gray-500'
                            }`}>
                                {stat.change}
                            </div>
                            </dd>
                        </dl>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                </div>
                <div className="px-6 py-4">
                    <div className="flow-root">
                    <ul className="-mb-8">
                        {recentActivity.map((activity, index) => (
                        <li key={activity.id}>
                            <div className="relative pb-8">
                            {index !== recentActivity.length - 1 && (
                                <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                                />
                            )}
                            <div className="relative flex space-x-3">
                                <div>
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-100`}>
                                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                                </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                    {activity.action}{' '}
                                    <span className="font-medium text-gray-900">{activity.target}</span>
                                    </p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                    <time>{activity.time}</time>
                                </div>
                                </div>
                            </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
                </div>
                <div className="px-6 py-4">
                    <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                            <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{event.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {event.type}
                            </span>
                            <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {event.date}
                            </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">with {event.instructor}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                </div>
                <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <button className="relative group bg-gray-50 p-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                        <span className="rounded-lg inline-flex p-3 bg-blue-500 text-white">
                        <BookOpen className="h-6 w-6" />
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">Browse Courses</h3>
                        <p className="mt-2 text-sm text-gray-500">
                        Explore new courses and expand your skills
                        </p>
                    </div>
                    </button>

                    <button className="relative group bg-gray-50 p-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                        <span className="rounded-lg inline-flex p-3 bg-green-500 text-white">
                        <User className="h-6 w-6" />
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">Update Profile</h3>
                        <p className="mt-2 text-sm text-gray-500">
                        Keep your information up to date
                        </p>
                    </div>
                    </button>

                    <button className="relative group bg-gray-50 p-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                        <span className="rounded-lg inline-flex p-3 bg-red-500 text-white">
                        <Award className="h-6 w-6" />
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">View Certificates</h3>
                        <p className="mt-2 text-sm text-gray-500">
                        Check your earned certificates
                        </p>
                    </div>
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;