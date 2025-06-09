'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState, AppDispatch } from '@/store';
import { signUpUser, signInWithGoogle, clearError } from '@/store/slices/authSlice';
import { Eye, EyeOff, Loader } from 'lucide-react';

// Nigerian states data
const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
];

const techSkills = [
    'Web Development',
    'Mobile Development',
    'Graphic Design',
    'UI/UX Design',
    'Digital Marketing',
    'SEO',
    'Content Writing',
    'Data Analysis',
    'Product Management',
    'Project Management',
    'Cybersecurity',
    'DevOps',
    'Cloud Computing',
    'Artificial Intelligence',
    'Machine Learning'
    ];

const Register: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        techSkill: '',
        state: '',
        country: 'Nigeria',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isAuthenticated) {
        router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (error) {
        const timer = setTimeout(() => {
            dispatch(clearError());
        }, 5000);
        return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.phone.trim()) errors.phone = 'Phone number is required';
        if (!formData.techSkill) errors.techSkill = 'Tech skill is required';
        if (!formData.state) errors.state = 'State is required';
        if (!formData.password) errors.password = 'Password is required';
        else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        if (!formData.agreeToTerms) errors.agreeToTerms = 'You must agree to the terms and conditions';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
        await dispatch(signUpUser({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            techSkill: formData.techSkill,
            state: formData.state,
            country: formData.country
        }));
        } catch (error) {
        console.error('Sign up error:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
        await dispatch(signInWithGoogle());
        } catch (error) {
        console.error('Google sign in error:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));

        // Clear error when user starts typing
        if (formErrors[name]) {
        setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="min-h-screen pt-32 bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link href="/auth/login" className="font-medium text-blue-500 hover:text-blue-400">
                sign in to your existing account
                </Link>
            </p>
            </div>

            {error && (
            <div className="bg-red-50 border border-red-500 text-red-500 px-4 py-3 rounded relative">
                {error}
            </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="sr-only">First Name</label>
                    <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={`relative block w-full px-3 py-2 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-black rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    />
                    {formErrors.firstName && <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>}
                </div>
                <div>
                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                    <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className={`relative block w-full px-3 py-2 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-black rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    />
                    {formErrors.lastName && <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>}
                </div>
                </div>

                {/* Email */}
                <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`relative block w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-black rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className={`relative block w-full px-3 py-2 border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-black rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                </div>

                {/* Tech Skill */}
                <div>
                <label htmlFor="techSkill" className="sr-only">Tech Skill</label>
                <select
                    id="techSkill"
                    name="techSkill"
                    required
                    className={`relative block w-full px-3 py-2 border ${formErrors.techSkill ? 'border-red-500' : 'border-gray-300'} text-black rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    value={formData.techSkill}
                    onChange={handleInputChange}
                >
                    <option value="">Select your tech skill</option>
                    {techSkills.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                    ))}
                </select>
                {formErrors.techSkill && <p className="mt-1 text-sm text-red-500">{formErrors.techSkill}</p>}
                </div>

                {/* State */}
                <div>
                <label htmlFor="state" className="sr-only">State</label>
                <select
                    id="state"
                    name="state"
                    required
                    className={`relative block w-full px-3 py-2 border ${formErrors.state ? 'border-red-500' : 'border-gray-300'} text-black rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    value={formData.state}
                    onChange={handleInputChange}
                >
                    <option value="">Select your state</option>
                    {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                    ))}
                </select>
                {formErrors.state && <p className="mt-1 text-sm text-red-500">{formErrors.state}</p>}
                </div>

                {/* Password */}
                <div className="relative">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className={`relative block w-full px-3 py-2 pr-10 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-black rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
                {formErrors.password && <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className={`relative block w-full px-3 py-2 pr-10 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-black rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
                {formErrors.confirmPassword && <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center">
                <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-black">
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-500 hover:text-blue-400">
                    Terms and Conditions
                    </Link>
                </label>
                </div>
                {formErrors.agreeToTerms && <p className="mt-1 text-sm text-red-500">{formErrors.agreeToTerms}</p>}
            </div>

            <div>
                <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {isLoading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                ) : (
                    'Create Account'
                )}
                </button>
            </div>

            <div className="mt-6">
                <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
                </div>

                <div className="mt-6">
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="ml-2">Continue with Google</span>
                </button>
                </div>
            </div>
            </form>
        </div>
        </div>
    );
};

export default Register;