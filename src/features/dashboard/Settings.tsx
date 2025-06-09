'use client'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  Shield, 
  Bell, 
  Eye, 
  Lock, 
  Mail, 
  Globe, 
  Moon, 
  Sun,
  Smartphone,
  Monitor,
  Save,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

const Settings: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [activeTab, setActiveTab] = useState('general');
    
    // Settings state
    const [settings, setSettings] = useState({
        // General settings
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        
        // Notification settings
        emailNotifications: true,
        pushNotifications: true,
        courseReminders: true,
        assignmentDeadlines: true,
        newCourses: false,
        weeklyDigest: true,
        
        // Privacy settings
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        allowMessages: true,
        
        // Security settings
        twoFactorAuth: false,
        loginAlerts: true,
        sessionTimeout: 30
    });

    const handleSettingChange = (key: string, value: any) => {
        setSettings(prev => ({
        ...prev,
        [key]: value
        }));
    };

    const handleSaveSettings = () => {
        // Here you would typically dispatch an action to save settings
        console.log('Saving settings:', settings);
    };

    const tabs = [
        { id: 'general', name: 'General', icon: Monitor },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'privacy', name: 'Privacy', icon: Eye },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'data', name: 'Data & Storage', icon: Download }
    ];

    const renderGeneralSettings = () => (
        <div className="space-y-6">
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
                </label>
                <div className="flex space-x-4">
                {[
                    { value: 'light', label: 'Light', icon: Sun },
                    { value: 'dark', label: 'Dark', icon: Moon },
                    { value: 'system', label: 'System', icon: Monitor }
                ].map((theme) => (
                    <button
                    key={theme.value}
                    onClick={() => handleSettingChange('theme', theme.value)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                        settings.theme === theme.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    >
                    <theme.icon className="h-4 w-4" />
                    <span className="text-sm">{theme.label}</span>
                    </button>
                ))}
                </div>
            </div>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Localization</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
                </label>
                <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
                </label>
                <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">Greenwich Mean Time</option>
                </select>
            </div>
            </div>
        </div>
        </div>
    );

    const renderNotificationSettings = () => (
        <div className="space-y-6">
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
            {[
                { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications on your device' },
                { key: 'courseReminders', label: 'Course Reminders', description: 'Get reminded about upcoming lessons' },
                { key: 'assignmentDeadlines', label: 'Assignment Deadlines', description: 'Notifications for assignment due dates' },
                { key: 'newCourses', label: 'New Course Announcements', description: 'Be notified when new courses are available' },
                { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Weekly summary of your learning progress' }
            ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                    className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                </div>
            ))}
            </div>
        </div>
        </div>
    );

    const renderPrivacySettings = () => (
        <div className="space-y-6">
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Who can see your profile?
                </label>
                <div className="space-y-2">
                {[
                    { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
                    { value: 'students', label: 'Students Only', description: 'Only other students can view your profile' },
                    { value: 'private', label: 'Private', description: 'Only you can view your profile' }
                ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                        type="radio"
                        name="profileVisibility"
                        value={option.value}
                        checked={settings.profileVisibility === option.value}
                        onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div>
                        <div className="text-sm font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                    </div>
                    </label>
                ))}
                </div>
            </div>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
            {[
                { key: 'showEmail', label: 'Show Email Address', description: 'Display your email on your public profile' },
                { key: 'showPhone', label: 'Show Phone Number', description: 'Display your phone number on your public profile' },
                { key: 'allowMessages', label: 'Allow Messages', description: 'Let other users send you messages' }
            ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                    className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                </div>
            ))}
            </div>
        </div>
        </div>
    );

    const renderSecuritySettings = () => (
        <div className="space-y-6">
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
            <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">Login Alerts</h4>
                <p className="text-sm text-gray-500">Get notified of new device logins</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={settings.loginAlerts}
                    onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Password & Security</h3>
            <div className="space-y-4">
            <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                    <p className="text-sm text-gray-500">Update your account password</p>
                </div>
                <Lock className="h-5 w-5 text-gray-400" />
                </div>
            </button>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
                </label>
                <select
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={0}>Never</option>
                </select>
            </div>
            </div>
        </div>
        </div>
    );

    const renderDataSettings = () => (
        <div className="space-y-6">
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
            <div className="space-y-4">
            <button className="w-full text-left p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
                <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-medium text-blue-900">Export Data</h4>
                    <p className="text-sm text-blue-700">Download a copy of your data</p>
                </div>
                <Download className="h-5 w-5 text-blue-600" />
                </div>
            </button>

            <button className="w-full text-left p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200">
                <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-medium text-green-900">Import Data</h4>
                    <p className="text-sm text-green-700">Import data from another platform</p>
                </div>
                <Upload className="h-5 w-5 text-green-600" />
                </div>
            </button>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h3>
            <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="text-sm font-medium text-red-900 mb-2">Delete Account</h4>
                <p className="text-sm text-red-700 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
                </button>
            </div>
            </div>
        </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
        case 'general':
            return renderGeneralSettings();
        case 'notifications':
            return renderNotificationSettings();
        case 'privacy':
            return renderPrivacySettings();
        case 'security':
            return renderSecuritySettings();
        case 'data':
            return renderDataSettings();
        default:
            return renderGeneralSettings();
        }
    };

    return (
        <div className="space-y-6">
        {/* Settings Header */}
        <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <button
                onClick={handleSaveSettings}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
                </button>
            </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
            <nav className="space-y-1">
                {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.name}
                </button>
                ))}
            </nav>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-6">
                {renderTabContent()}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Settings;