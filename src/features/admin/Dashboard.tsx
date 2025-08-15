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
    Star,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    ExternalLink
} from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    trend?: number[];
}

const StatCard = ({ title, value, icon, change, changeType = 'neutral', trend }: StatCardProps) => {
    const changeColor = {
        positive: 'text-emerald-400',
        negative: 'text-red-400',
        neutral: 'text-gray-400'
    }[changeType];

    const changeIcon = changeType === 'positive' ? <ArrowUpRight size={16} /> : 
                      changeType === 'negative' ? <ArrowDownRight size={16} /> : null;

    return (
        <div className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-xl text-red-400 group-hover:from-red-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                        {icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
                        <p className="text-3xl font-bold text-white">{value}</p>
                    </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-700 rounded-lg transition-all duration-200">
                    <MoreVertical size={16} className="text-gray-400" />
                </button>
            </div>
            
            {change && (
                <div className="flex items-center justify-between">
                    <div className={`flex items-center space-x-1 text-sm ${changeColor}`}>
                        {changeIcon}
                        <span>{change}</span>
                    </div>
                    {trend && (
                        <div className="flex items-center space-x-1">
                            {trend.map((point, index) => (
                                <div 
                                    key={index}
                                    className={`w-1 rounded-full ${changeType === 'positive' ? 'bg-emerald-400' : 'bg-red-400'}`}
                                    style={{ height: `${Math.max(4, point)}px` }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
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
    const typeConfig = {
        user: { color: 'bg-blue-500', label: 'USER' },
        tutor: { color: 'bg-emerald-500', label: 'TUTOR' },
        course: { color: 'bg-amber-500', label: 'COURSE' },
        system: { color: 'bg-red-500', label: 'SYSTEM' }
    };

    const config = typeConfig[type];

    return (
        <div className="group flex items-center space-x-4 p-4 hover:bg-gray-700/30 rounded-xl transition-all duration-200 cursor-pointer">
            <div className="relative">
                <div className={`w-10 h-10 ${config.color} rounded-full flex items-center justify-center`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className={`absolute -top-1 -right-1 px-1.5 py-0.5 ${config.color} rounded-full`}>
                    <span className="text-[8px] font-bold text-white">{config.label.charAt(0)}</span>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white group-hover:text-gray-100 truncate">{action}</p>
                <p className="text-xs text-gray-400 truncate">{user}</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-400">{time}</p>
                <div className={`w-2 h-2 ${config.color} rounded-full mx-auto mt-1 opacity-60`}></div>
            </div>
        </div>
    );
};

export default function AdminDashboard() {
    const { admin } = useSelector((state: RootState) => state.admin);

    const stats = [
        {
            title: 'Total Users',
            value: '1,234',
            icon: <Users size={24} />,
            change: '+12% from last month',
            changeType: 'positive' as const,
            trend: [8, 12, 6, 14, 18, 22, 16, 20]
        },
        {
            title: 'Active Tutors',
            value: '56',
            icon: <GraduationCap size={24} />,
            change: '+3 new this week',
            changeType: 'positive' as const,
            trend: [5, 8, 12, 10, 15, 18, 14, 16]
        },
        {
            title: 'Total Courses',
            value: '89',
            icon: <BookOpen size={24} />,
            change: '+5 added recently',
            changeType: 'positive' as const,
            trend: [10, 8, 14, 12, 16, 20, 18, 22]
        },
        {
            title: 'Monthly Revenue',
            value: '$12,345',
            icon: <DollarSign size={24} />,
            change: '+8% from last month',
            changeType: 'positive' as const,
            trend: [15, 18, 12, 22, 25, 28, 24, 30]
        }
    ];

    const recentActivities: RecentActivityItem[] = [
        { id: '1', action: 'New user registration completed', user: 'John Doe', time: '2 min ago', type: 'user' },
        { id: '2', action: 'Tutor profile verification pending', user: 'Sarah Johnson', time: '15 min ago', type: 'tutor' },
        { id: '3', action: 'New course "Advanced Mathematics" published', user: 'Dr. Mike Wilson', time: '1 hour ago', type: 'course' },
        { id: '4', action: 'Automated system backup completed successfully', user: 'System Administrator', time: '2 hours ago', type: 'system' },
        { id: '5', action: 'Payment of $299 processed successfully', user: 'Michael Brown', time: '3 hours ago', type: 'user' },
        { id: '6', action: 'Course enrollment milestone reached', user: 'Physics 101', time: '4 hours ago', type: 'course' }
    ];

    const quickActions = [
        {
            title: 'Add New User',
            description: 'Create a new user account with full permissions',
            icon: <Users size={20} />,
            href: '/admin/dashboard/users/new',
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Approve Tutor',
            description: 'Review and approve pending tutor applications',
            icon: <GraduationCap size={20} />,
            href: '/admin/dashboard/tutors/pending',
            color: 'from-emerald-500 to-emerald-600'
        },
        {
            title: 'System Settings',
            description: 'Configure platform settings and preferences',
            icon: <Activity size={20} />,
            href: '/admin/dashboard/settings',
            color: 'from-red-500 to-red-600'
        }
    ];

    const performanceMetrics = [
        { label: 'System Uptime', value: '99.9%', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-600/20' },
        { label: 'Avg Response Time', value: '847ms', color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/20' },
        { label: 'User Satisfaction', value: '4.8/5', color: 'text-amber-400', bg: 'from-amber-500/20 to-amber-600/20' },
        { label: 'Active Sessions', value: '1,247', color: 'text-red-400', bg: 'from-red-500/20 to-red-600/20' }
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-blue-800 rounded-2xl py-6 px-8 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                Welcome back, {admin?.firstname}! 👋
                            </h1>
                            <p className="text-red-100 text-lg opacity-90">
                                Here's your platform overview for today. Everything looks great!
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Activity size={38} className="text-white/80" />
                            </div>
                        </div>
                    </div>
                </div>
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
                        trend={stat.trend}
                    />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="xl:col-span-2 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                    <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/30">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <Clock className="mr-3 text-red-400" size={24} />
                                Recent Activity
                            </h2>
                            <button className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-lg transition-colors">
                                <ExternalLink size={16} />
                            </button>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">Latest platform activities and updates</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
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
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                    <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/30">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                            <TrendingUp className="mr-3 text-blue-400" size={24} />
                            Quick Actions
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Common administrative tasks</p>
                    </div>
                    <div className="p-6 space-y-4">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                className="group w-full text-left p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 bg-gradient-to-br ${action.color} rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                                        <div className="text-white">
                                            {action.icon}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium group-hover:text-gray-100 mb-1">
                                            {action.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {action.description}
                                        </p>
                                    </div>
                                    <ArrowUpRight className="text-gray-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200" size={16} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <Star className="mr-3 text-amber-400" size={24} />
                                Platform Performance
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">Real-time system metrics and status</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-emerald-400 text-sm font-medium">Live</span>
                        </div>
                    </div>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {performanceMetrics.map((metric, index) => (
                            <div key={index} className="text-center group">
                                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${metric.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                                    <div className={`text-2xl font-bold ${metric.color}`}>
                                        {metric.value.split(/(\d+)/)[1] || metric.value.charAt(0)}
                                    </div>
                                </div>
                                <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                                <div className="text-gray-400 text-sm font-medium">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}