'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
    Users, 
    GraduationCap, 
    BookOpen, 
    TrendingUp,
    Activity,
    Clock,
    DollarSign,
    Star
} from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
}

const StatCard = ({ title, value, icon, change, changeType = 'neutral' }: StatCardProps) => {
    const changeColor = {
        positive: 'text-green-400',
        negative: 'text-red-400',
        neutral: 'text-gray-400'
    }[changeType];

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
            <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white mt-2">{value}</p>
            {change && (
                <p className={`text-sm mt-2 ${changeColor}`}>
                {change}
                </p>
            )}
            </div>
            <div className="text-purple-500">
            {icon}
            </div>
        </div>
        </div>
    );
};

interface RecentActivityItem {
    id: string;
    action: string;
    user: string;
    time: string;
    type: 'user' | 'tutor' | 'course' | 'system';
}

const ActivityItem = ({ action, user, time, type }: Omit<RecentActivityItem, 'id'>) => {
    const typeColors = {
        user: 'bg-blue-500',
        tutor: 'bg-green-500',
        course: 'bg-yellow-500',
        system: 'bg-purple-500'
    };

    return (
        <div className="flex items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-colors">
        <div className={`w-2 h-2 rounded-full ${typeColors[type]}`}></div>
        <div className="flex-1">
            <p className="text-sm text-white">{action}</p>
            <p className="text-xs text-gray-400">{user}</p>
        </div>
        <p className="text-xs text-gray-400">{time}</p>
        </div>
    );
    };

    export default function AdminDashboard() {
    const { admin } = useSelector((state: RootState) => state.admin);

    // Mock data - replace with real data from your API
    const stats = [
        {
        title: 'Total Users',
        value: '1,234',
        icon: <Users size={24} />,
        change: '+12% from last month',
        changeType: 'positive' as const
        },
        {
        title: 'Active Tutors',
        value: '56',
        icon: <GraduationCap size={24} />,
        change: '+3 new this week',
        changeType: 'positive' as const
        },
        {
        title: 'Total Courses',
        value: '89',
        icon: <BookOpen size={24} />,
        change: '+5 added recently',
        changeType: 'positive' as const
        },
        {
        title: 'Revenue',
        value: '$12,345',
        icon: <DollarSign size={24} />,
        change: '+8% from last month',
        changeType: 'positive' as const
        }
    ];

    const recentActivities: RecentActivityItem[] = [
        {
        id: '1',
        action: 'New user registration',
        user: 'John Doe',
        time: '2 minutes ago',
        type: 'user'
        },
        {
        id: '2',
        action: 'Tutor profile updated',
        user: 'Sarah Johnson',
        time: '15 minutes ago',
        type: 'tutor'
        },
        {
        id: '3',
        action: 'New course published',
        user: 'Mathematics 101',
        time: '1 hour ago',
        type: 'course'
        },
        {
        id: '4',
        action: 'System backup completed',
        user: 'System',
        time: '2 hours ago',
        type: 'system'
        },
        {
        id: '5',
        action: 'Payment processed',
        user: 'Michael Brown',
        time: '3 hours ago',
        type: 'user'
        }
    ];

    const quickActions = [
        {
        title: 'Add New User',
        description: 'Create a new user account',
        icon: <Users size={20} />,
        href: '/admin/users/new'
        },
        {
        title: 'Approve Tutor',
        description: 'Review pending tutor applications',
        icon: <GraduationCap size={20} />,
        href: '/admin/tutors/pending'
        },
        {
        title: 'System Settings',
        description: 'Configure system preferences',
        icon: <Activity size={20} />,
        href: '/admin/settings'
        }
    ];

    return (
        <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold">
            Welcome back, {admin?.firstname}!
            </h1>
            <p className="mt-2 opacity-90">
            Here's what's happening with your platform today.
            </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
            <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}
                changeType={stat.changeType}
            />
            ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center">
                <Clock className="mr-2" size={20} />
                Recent Activity
                </h2>
            </div>
            <div className="p-2">
                {recentActivities.map((activity) => (
                <ActivityItem
                    key={activity.id}
                    action={activity.action}
                    user={activity.user}
                    time={activity.time}
                    type={activity.type}
                />
                ))}
            </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center">
                <TrendingUp className="mr-2" size={20} />
                Quick Actions
                </h2>
            </div>
            <div className="p-4 space-y-3">
                {quickActions.map((action, index) => (
                <button
                    key={index}
                    className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
                >
                    <div className="flex items-start space-x-3">
                    <div className="text-purple-400 group-hover:text-purple-300">
                        {action.icon}
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-white group-hover:text-gray-100">
                        {action.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                        {action.description}
                        </p>
                    </div>
                    </div>
                </button>
                ))}
            </div>
            </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white flex items-center">
                <Star className="mr-2" size={20} />
                Platform Performance
            </h2>
            </div>
            <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                <div className="text-3xl font-bold text-green-400">98.5%</div>
                <div className="text-sm text-gray-400 mt-1">Uptime</div>
                </div>
                <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">1.2s</div>
                <div className="text-sm text-gray-400 mt-1">Avg Response Time</div>
                </div>
                <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">4.8/5</div>
                <div className="text-sm text-gray-400 mt-1">User Satisfaction</div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}