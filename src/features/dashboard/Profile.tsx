'use client'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  Edit3,
  Save,
  X,
  Camera
} from 'lucide-react';

const Profile: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        techSkill: user?.techSkill || '',
        state: user?.state || '',
        country: user?.country || '',
        bio: user?.bio || ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSave = () => {
        // Here you would typically dispatch an action to update the user profile
        console.log('Saving profile data:', formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset form data to original user data
        setFormData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        techSkill: user?.techSkill || '',
        state: user?.state || '',
        country: user?.country || '',
        bio: user?.bio || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                    </div>
                    <button className="absolute bottom-0 right-0 h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                    <Camera className="h-4 w-4" />
                    </button>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                    {user?.displayName || `${user?.firstName} ${user?.lastName}`}
                    </h1>
                    <p className="text-gray-500">{user?.techSkill}</p>
                    <p className="text-sm text-gray-400 mt-1">
                    Member since {new Date().toLocaleDateString()}
                    </p>
                </div>
                </div>
                
                <div className="flex space-x-2">
                {!isEditing ? (
                    <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                    </button>
                ) : (
                    <>
                    <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </button>
                    </>
                )}
                </div>
            </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                </div>
                <div className="px-6 py-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* First Name */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                    </label>
                    {isEditing ? (
                        <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    ) : (
                        <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user?.firstName}</span>
                        </div>
                    )}
                    </div>

                    {/* Last Name */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                    </label>
                    {isEditing ? (
                        <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    ) : (
                        <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user?.lastName}</span>
                        </div>
                    )}
                    </div>

                    {/* Email */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    {isEditing ? (
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    ) : (
                        <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user?.email}</span>
                        </div>
                    )}
                    </div>

                    {/* Phone */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    {isEditing ? (
                        <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    ) : (
                        <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user?.phone || 'Not provided'}</span>
                        </div>
                    )}
                    </div>

                    {/* Tech Skill */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tech Skill
                    </label>
                    {isEditing ? (
                        <input
                        type="text"
                        name="techSkill"
                        value={formData.techSkill}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    ) : (
                        <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user?.techSkill || 'Not specified'}</span>
                        </div>
                    )}
                    </div>

                    {/* Location */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                    </label>
                    {isEditing ? (
                        <div className="flex space-x-2">
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        </div>
                    ) : (
                        <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user?.state}, {user?.country}</span>
                        </div>
                    )}
                    </div>
                </div>

                {/* Bio Section */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                    </label>
                    {isEditing ? (
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us about yourself..."
                    />
                    ) : (
                    <div className="text-gray-900 bg-gray-50 p-4 rounded-md">
                        {user?.bio || 'No bio provided yet.'}
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>

            {/* Profile Stats & Additional Info */}
            <div className="space-y-6">
            {/* Profile Completion */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Profile Completion</h3>
                </div>
                <div className="px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm font-medium text-blue-600">
                    {user?.phone && user?.techSkill && user?.state ? '100%' : '75%'}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: user?.phone && user?.techSkill && user?.state ? '100%' : '75%' }}
                    ></div>
                </div>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Basic Information</span>
                    <span className="text-green-600">✓ Complete</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Contact Details</span>
                    <span className={user?.phone ? "text-green-600" : "text-gray-400"}>
                        {user?.phone ? "✓ Complete" : "○ Incomplete"}
                    </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Professional Info</span>
                    <span className={user?.techSkill ? "text-green-600" : "text-gray-400"}>
                        {user?.techSkill ? "✓ Complete" : "○ Incomplete"}
                    </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Location</span>
                    <span className={user?.state ? "text-green-600" : "text-gray-400"}>
                        {user?.state ? "✓ Complete" : "○ Incomplete"}
                    </span>
                    </div>
                </div>
                </div>
            </div>

            {/* Account Details */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Account Details</h3>
                </div>
                <div className="px-6 py-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Member Since</p>
                        <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                    </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Account Status</p>
                        <p className="text-sm text-green-600">Active</p>
                    </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Account Type</p>
                        <p className="text-sm text-gray-500">Student</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Learning Stats */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Learning Stats</h3>
                </div>
                <div className="px-6 py-6 space-y-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-500">Courses Completed</div>
                </div>
                
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">8</div>
                    <div className="text-sm text-gray-500">Certificates Earned</div>
                </div>
                
                <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">45</div>
                    <div className="text-sm text-gray-500">Hours Learned</div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;