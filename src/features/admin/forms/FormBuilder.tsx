'use client';
import React, { useState, useEffect } from 'react';
import { 
    Plus, 
    FileText, 
    Users, 
    Calendar,
    MoreVertical,
    Edit,
    Eye,
    Trash2,
    ExternalLink,
    Copy,
    CheckCircle,
    XCircle,
    Search,
    Filter,
    Loader2
} from 'lucide-react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
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
    id?: string;
    title: string;
    description: string;
    fields: FormField[];
    slug: string;
    isActive: boolean;
    createdAt: any;
    responses: number;
}

const FormBuilder = ({ onClose, onSave, editFormData = null }: {
    onClose: () => void;
    onSave: (formData: Omit<FormData, 'id'>) => void;
    editFormData?: FormData | null;
}) => {
    const [title, setTitle] = useState(editFormData?.title || '');
    const [description, setDescription] = useState(editFormData?.description || '');
    const [fields, setFields] = useState<FormField[]>(editFormData?.fields || []);
    const [isLoading, setIsLoading] = useState(false);

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    };

    const addField = (type: FormField['type']) => {
        const newField: FormField = {
        id: Date.now().toString(),
        type,
        question: '',
        required: false,
        options: type === 'checkbox' || type === 'radio' ? ['Option 1'] : undefined
        };
        setFields([...fields, newField]);
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
        setFields(fields.map(field => 
        field.id === id ? { ...field, ...updates } : field
        ));
    };

    const removeField = (id: string) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const addOption = (fieldId: string) => {
        const field = fields.find(f => f.id === fieldId);
        if (field && field.options) {
        updateField(fieldId, {
            options: [...field.options, `Option ${field.options.length + 1}`]
        });
        }
    };

    const updateOption = (fieldId: string, optionIndex: number, value: string) => {
        const field = fields.find(f => f.id === fieldId);
        if (field && field.options) {
        const newOptions = [...field.options];
        newOptions[optionIndex] = value;
        updateField(fieldId, { options: newOptions });
        }
    };

    const removeOption = (fieldId: string, optionIndex: number) => {
        const field = fields.find(f => f.id === fieldId);
        if (field && field.options && field.options.length > 1) {
        const newOptions = field.options.filter((_, index) => index !== optionIndex);
        updateField(fieldId, { options: newOptions });
        }
    };

    const handleSave = async () => {
        if (!title.trim() || fields.length === 0) {
            alert('Please provide a title and at least one field');
            return;
        }
    
        // Validate that all fields have questions
        const invalidFields = fields.filter(field => !field.question.trim());
        if (invalidFields.length > 0) {
            alert('Please provide questions for all fields');
            return;
        }
    
        setIsLoading(true);
        
        try {
            // Clean the fields data to ensure no undefined values
            const cleanFields: FormField[] = fields.map(field => {
                const cleanField: FormField = {
                    id: field.id,
                    type: field.type,
                    question: field.question.trim(),
                    required: Boolean(field.required)
                };
                
                // Only add options if they exist and are not empty
                if ((field.type === 'checkbox' || field.type === 'radio') && field.options && field.options.length > 0) {
                    cleanField.options = field.options.filter(option => option.trim() !== '');
                }
                
                return cleanField;
            });
    
            const formData: Omit<FormData, 'id'> = {
                title: title.trim(),
                description: description.trim(),
                fields: cleanFields,
                slug: generateSlug(title),
                isActive: true,
                createdAt: serverTimestamp(),
                responses: 0
            };
    
            console.log('Form data being sent:', formData);
            
            onSave(formData);
        } catch (error) {
            console.error('Error preparing form data:', error);
            alert('Error preparing form data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const fieldTypeLabels = {
        short_text: 'Short Text',
        long_text: 'Long Text',
        number: 'Number',
        checkbox: 'Multiple Choice',
        radio: 'Single Choice',
        file_upload: 'File Upload'
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-red-500/10 to-blue-500/10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">
                        {editFormData ? 'Edit Form' : 'Create New Form'}
                        </h2>
                        <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                        <XCircle className="text-gray-400" size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex h-full overflow-y-auto">
                    {/* Form Builder */}
                    <div className="flex-1 flex-col p-6 overflow-y-auto">
                        {/* Form Details */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Form Title *
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                    placeholder="Enter form title..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                                    rows={3}
                                    placeholder="Enter form description..."
                                />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">Form Fields</h3>
                            
                            {fields.map((field, index) => (
                                <div key={field.id} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="text-sm text-gray-400">Question {index + 1}</span>
                                        <button
                                        onClick={() => removeField(field.id)}
                                        className="p-1 hover:bg-red-500/20 text-red-400 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={field.question}
                                            onChange={(e) => updateField(field.id, { question: e.target.value })}
                                            className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400"
                                            placeholder="Enter your question..."
                                        />

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300">
                                                Type: {fieldTypeLabels[field.type]}
                                            </span>
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={field.required}
                                                    onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                                    className="rounded border-gray-500 text-red-500 focus:ring-red-500"
                                                />
                                                <span className="text-sm text-gray-300">Required</span>
                                            </label>
                                        </div>

                                        {(field.type === 'checkbox' || field.type === 'radio') && field.options && (
                                            <div className="space-y-2">
                                                <label className="text-sm text-gray-300">Options:</label>
                                                {field.options.map((option, optionIndex) => (
                                                    <div key={optionIndex} className="flex items-center space-x-2">
                                                        <input
                                                        type="text"
                                                        value={option}
                                                        onChange={(e) => updateOption(field.id, optionIndex, e.target.value)}
                                                        className="flex-1 p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                                                        />
                                                        {field.options!.length > 1 && (
                                                        <button
                                                            onClick={() => removeOption(field.id, optionIndex)}
                                                            className="p-2 hover:bg-red-500/20 text-red-400 rounded"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                onClick={() => addOption(field.id)}
                                                className="text-sm text-blue-400 hover:text-blue-300"
                                                >
                                                    + Add Option
                                                </button>
                                            </div>
                                        )}

                                        {field.type === 'file_upload' && (
                                            <div className="text-xs text-gray-400">
                                                Max file size: 5MB (Documents and Images only)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Add Field Buttons */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {Object.entries(fieldTypeLabels).map(([type, label]) => (
                                <button
                                    key={type}
                                    onClick={() => addField(type as FormField['type'])}
                                    className="p-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white text-sm transition-colors"
                                >
                                    + {label}
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="w-80 bg-gray-700/30 border-l border-gray-700 p-6">
                        <div className="space-y-4">
                            <button
                                onClick={handleSave}
                                disabled={!title.trim() || fields.length === 0 || isLoading}
                                className="w-full p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                {isLoading && (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                )}
                                <span>{isLoading ? 'Saving...' : editFormData ? 'Update Form' : 'Create Form'}</span>
                            </button>

                            <div className="text-xs text-gray-400 space-y-1">
                                <p>• Form will be accessible via link</p>
                                <p>• Anyone with the link can submit</p>
                                <p>• You can edit questions anytime</p>
                                <p>• View all responses in one place</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormBuilder 
