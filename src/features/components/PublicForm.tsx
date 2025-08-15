'use client';
import React, { useState, useEffect } from 'react';
import { 
    FileText, 
    Upload, 
    Check, 
    AlertCircle,
    Send,
    Clock,
    Shield
} from 'lucide-react';
import { doc, getDoc, collection, addDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/firebase.config';

// Types
interface FormField {
    id: string;
    type: 'short_text' | 'long_text' | 'number' | 'checkbox' | 'radio' | 'file_upload';
    question: string;
    required: boolean;
    options?: string[];
}

interface FormData {
    id: string;
    title: string;
    description: string;
    fields: FormField[];
    slug: string;
    isActive: boolean;
    createdAt: any;
    responses: number;
}

interface FormResponse {
     [fieldId: string]: string | string[] | File | null;
}

const PublicFormDisplay = ({ formId }: { formId: string }) => {
    const [formData, setFormData] = useState<FormData | null>(null);
    const [responses, setResponses] = useState<FormResponse>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        loadForm();
    }, [formId]);

    const loadForm = async () => {
        try {
        // Try to find by ID first
        const formDoc = await getDoc(doc(db, 'forms', formId));
        
        if (!formDoc.exists()) {
            // If not found by ID, try to find by slug
            // In a real implementation, you'd want to create a proper query or index
            // For now, we'll just handle the ID case
            console.log('Form not found');
            setLoading(false);
            return;
        }

        const data = { id: formDoc.id, ...formDoc.data() } as FormData;
        
        if (!data.isActive) {
            console.log('Form is not active');
            setLoading(false);
            return;
        }

        setFormData(data);
        } catch (error) {
        console.error('Error loading form:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleInputChange = (fieldId: string, value: string | string[] | File | null) => {
        setResponses(prev => ({
        ...prev,
        [fieldId]: value
        }));

        // Clear error when user starts typing
        if (errors[fieldId]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fieldId];
            return newErrors;
        });
        }
    };

    const handleCheckboxChange = (fieldId: string, option: string, checked: boolean) => {
        const currentValues = (responses[fieldId] as string[]) || [];
        let newValues: string[];

        if (checked) {
        newValues = [...currentValues, option];
        } else {
        newValues = currentValues.filter(val => val !== option);
        }

        handleInputChange(fieldId, newValues);
    };

    const handleFileUpload = (fieldId: string, file: File | null) => {
        if (file && file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
            ...prev,
            [fieldId]: 'File size must be less than 5MB'
        }));
        return;
        }

        const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
        ];

        if (file && !allowedTypes.includes(file.type)) {
        setErrors(prev => ({
            ...prev,
            [fieldId]: 'File type not allowed. Please upload images or documents only.'
        }));
        return;
        }

        handleInputChange(fieldId, file);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        formData?.fields.forEach(field => {
        if (field.required) {
            const value = responses[field.id];
            
            if (!value || 
                (typeof value === 'string' && value.trim() === '') ||
                (Array.isArray(value) && value.length === 0)) {
            newErrors[field.id] = 'This field is required';
            }
        }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setSubmitting(true);

        try {
        // In a real implementation, you'd upload files to storage first
        // For this example, we'll just store the file names
        const processedResponses: Record<string, any> = {};
        
        Object.entries(responses).forEach(([fieldId, value]) => {
            if (value instanceof File) {
                processedResponses[fieldId] = {
                    fileName: value.name,
                    fileSize: value.size,
                    fileType: value.type
                };
            } else {
                processedResponses[fieldId] = value;
            }
        });

        // Save response to Firestore
        await addDoc(collection(db, 'formResponses'), {
            formId: formData?.id,
            responses: processedResponses,
            submittedAt: serverTimestamp(),
            userAgent: navigator.userAgent,
            ipAddress: 'hidden' // In production, you'd capture this server-side
        });

        // Update form response count
        await updateDoc(doc(db, 'forms', formData!.id), {
            responses: increment(1)
        });

        setSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your response. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderField = (field: FormField) => {
        const hasError = errors[field.id];
        const fieldValue = responses[field.id];

        const inputClassName = `w-full p-4 bg-gray-50 border ${
        hasError ? 'border-red-500' : 'border-gray-300'
        } rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none transition-all duration-200`;

        switch (field.type) {
        case 'short_text':
            return (
                <div>
                    <input
                        type="text"
                        value={(fieldValue as string) || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={inputClassName}
                        placeholder="Enter your answer..."
                    />
                </div>
            );

        case 'long_text':
            return (
                <div>
                    <textarea
                        value={(fieldValue as string) || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={`${inputClassName} resize-none`}
                        rows={4}
                        placeholder="Enter your answer..."
                    />
                </div>
            );

        case 'number':
            return (
                <div>
                    <input
                        type="number"
                        value={(fieldValue as string) || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={inputClassName}
                        placeholder="Enter a number..."
                    />
                </div>
            );

        case 'radio':
            return (
                <div className="space-y-3">
                    {field.options?.map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="radio"
                                name={field.id}
                                value={option}
                                checked={(fieldValue as string) === option}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-400 focus:ring-2"
                            />
                            <span className="text-gray-800 group-hover:text-blue-600 transition-colors">
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            );

        case 'checkbox':
            return (
                <div className="space-y-3">
                    {field.options?.map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={(fieldValue as string[])?.includes(option) || false}
                                onChange={(e) => handleCheckboxChange(field.id, option, e.target.checked)}
                                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400 focus:ring-2"
                            />
                            <span className="text-gray-800 group-hover:text-blue-600 transition-colors">
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            );

        case 'file_upload':
            return (
                <div>
                    <div className="relative">
                        <input
                            type="file"
                            onChange={(e) => handleFileUpload(field.id, e.target.files?.[0] || null)}
                            className="hidden"
                            id={`file-${field.id}`}
                            accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt"
                        />
                        <label
                            htmlFor={`file-${field.id}`}
                            className={`flex items-center justify-center p-6 bg-gray-50 border-2 border-dashed ${
                            hasError ? 'border-red-500' : 'border-gray-300'
                            } rounded-xl cursor-pointer hover:border-blue-400 hover:bg-gray-100 transition-all duration-200`}
                        >
                            <div className="text-center">
                                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                <div className="text-gray-700 font-medium">
                                    {fieldValue instanceof File ? fieldValue.name : 'Choose a file to upload'}
                                </div>
                                <div className="text-gray-500 text-sm mt-1">
                                    Max 5MB • Images, PDF, DOC, TXT
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            );

        default:
            return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading form...</p>
                </div>
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <AlertCircle className="mx-auto text-red-400 mb-4" size={64} />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Form Not Found</h1>
                    <p className="text-gray-600 mb-6">
                        This form doesn't exist or has been deactivated by the administrator.
                    </p>
                    <div className="text-gray-500 text-sm">
                        Please check the URL and try again, or contact the form creator.
                    </div>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="text-white" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
                    <p className="text-gray-700 text-lg mb-6">
                        Your response has been submitted successfully.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <p className="text-gray-600 text-sm">
                            Your submission was recorded at {new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
                {/* Form Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                        <FileText className="text-gray-700" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title}</h1>
                    {formData.description && (
                        <p className="text-gray-600 text-base max-w-2xl mx-auto">
                            {formData.description}
                        </p>
                    )}
                    <div className="flex items-center justify-center space-x-4 mt-5 text-gray-500 text-sm">
                        <div className="flex items-center space-x-1">
                            <Clock size={16} />
                            <span>Takes ~3 minutes</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="flex items-center space-x-1">
                            <Shield size={16} />
                            <span>Secure & Private</span>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    {formData.fields.map((field, index) => (
                        <div key={field.id} className="bg-gray-50/50 border border-gray-200 rounded-2xl p-4">
                            <div className="mb-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg text-blue-700 text-sm font-medium mr-3">
                                            {index + 1}
                                        </span>
                                        {field.question}
                                    </h3>
                                    {field.required && (
                                        <span className="text-red-500 text-sm font-medium">Required</span>
                                    )}
                                </div>
                                {errors[field.id] && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle size={16} className="mr-1" />
                                        {errors[field.id]}
                                    </p>
                                )}
                            </div>

                            {renderField(field)}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="mt-12 text-center">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-blue-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 flex items-center space-x-2 mx-auto"
                    >
                        {submitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                <span>Submit Response</span>
                            </>
                        )}
                    </button>
                    
                    <p className="text-gray-500 text-sm mt-4">
                        By submitting this form, you agree to have your responses stored securely.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PublicFormDisplay;