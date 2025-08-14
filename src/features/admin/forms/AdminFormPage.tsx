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
    Settings,
    BarChart3
} from 'lucide-react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase.config';
import FormBuilder from '@/features/admin/forms/FormBuilder';
import FormResponsesViewer from '@/features/admin/forms/ResponseViewer';

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

const AdminFormsPage = () => {
    const [forms, setForms] = useState<FormData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFormBuilder, setShowFormBuilder] = useState(false);
    const [editFormData, setEditFormData] = useState<FormData | null>(null);
    const [viewResponsesFormId, setViewResponsesFormId] = useState<string | null>(null);
    const [copiedFormId, setCopiedFormId] = useState<string | null>(null);

    useEffect(() => {
        loadForms();
    }, []);

    const loadForms = async () => {
        try {
            const formsSnapshot = await getDocs(collection(db, 'forms'));
            const formsData = formsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as FormData[];
            
            // Sort by creation date (newest first)
            formsData.sort((a, b) => {
                const dateA = a.createdAt?.toDate?.() || new Date(0);
                const dateB = b.createdAt?.toDate?.() || new Date(0);
                return dateB.getTime() - dateA.getTime();
            });
            
            setForms(formsData);
        } catch (error) {
            console.error('Error loading forms:', error);
        } finally {
            setLoading(false);
        }
    };

    // const handleCreateForm = async (formData: Omit<FormData, 'id'>) => {
    //     try {
    //         await addDoc(collection(db, 'forms'), formData);
    //         await loadForms();
    //         setShowFormBuilder(false);
    //     } catch (error) {
    //         console.error('Error creating form:', error);
    //     }
    // };

    const handleCreateForm = async (formData: Omit<FormData, 'id'>) => {
        try {
            // Clean the form data to remove any undefined values
            const cleanFormData = {
                title: formData.title || '',
                description: formData.description || '',
                fields: formData.fields || [],
                slug: formData.slug || '',
                isActive: formData.isActive ?? true,
                createdAt: serverTimestamp(),
                responses: formData.responses || 0
            };
    
            console.log('Attempting to save form data:', cleanFormData);
            
            const docRef = await addDoc(collection(db, 'forms'), cleanFormData);
            console.log('Form created successfully with ID:', docRef.id);
            
            await loadForms();
            setShowFormBuilder(false);
        } catch (error: any) {
            console.error('Error creating form:', error);
            // Log the exact error details
            console.error('Error details:', {
                code: error.code,
                message: error.message,
                formData: formData
            });
        }
    };

    const handleUpdateForm = async (formData: Omit<FormData, 'id'>) => {
        if (!editFormData?.id) return;

        try {
            await updateDoc(doc(db, 'forms', editFormData.id), formData);
            await loadForms();
            setShowFormBuilder(false);
            setEditFormData(null);
        } catch (error) {
            console.error('Error updating form:', error);
        }
    };

    const handleDeleteForm = async (formId: string) => {
        if (window.confirm('Are you sure you want to delete this form? All responses will also be deleted.')) {
            try {
                await deleteDoc(doc(db, 'forms', formId));
                await loadForms();
            } catch (error) {
                console.error('Error deleting form:', error);
            }
        }
    };

    const handleToggleFormStatus = async (formId: string, currentStatus: boolean) => {
        try {
            await updateDoc(doc(db, 'forms', formId), {
                isActive: !currentStatus
            });
            await loadForms();
        } catch (error) {
            console.error('Error updating form status:', error);
        }
    };

    const handleCopyFormLink = (formId: string, slug: string) => {
        const formUrl = `${window.location.origin}/forms/${slug}`;
        navigator.clipboard.writeText(formUrl);
        setCopiedFormId(formId);
        setTimeout(() => setCopiedFormId(null), 2000);
    };

    const handleEditForm = (form: FormData) => {
        setEditFormData(form);
        setShowFormBuilder(true);
    };

    const handleViewResponses = (formId: string) => {
        setViewResponsesFormId(formId);
    };

    const filteredForms = forms.filter(form => 
        form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If viewing responses, show the responses viewer
    if (viewResponsesFormId) {
        return (
            <FormResponsesViewer
                formId={viewResponsesFormId}
                onBack={() => setViewResponsesFormId(null)}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-purple-800 rounded-3xl m-6 p-8 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 flex items-center">
                                <Settings className="mr-4" size={40} />
                                Form Management
                            </h1>
                            <p className="text-red-100/80 text-lg">
                                Create, edit, and manage your forms with ease
                            </p>
                        </div>
                        <button
                            onClick={() => setShowFormBuilder(true)}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                        >
                            <Plus size={20} />
                            <span>Create New Form</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl">
                                <FileText className="text-blue-400" size={24} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-bold text-white">{forms.length}</p>
                            <p className="text-sm text-gray-400">Total Forms</p>
                        </div>
                    </div>

                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl">
                                <CheckCircle className="text-green-400" size={24} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-bold text-white">
                                {forms.filter(f => f.isActive).length}
                            </p>
                            <p className="text-sm text-gray-400">Active Forms</p>
                        </div>
                    </div>

                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl">
                                <Users className="text-purple-400" size={24} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-bold text-white">
                                {forms.reduce((total, form) => total + (form.responses || 0), 0)}
                            </p>
                            <p className="text-sm text-gray-400">Total Responses</p>
                        </div>
                    </div>

                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl">
                                <Calendar className="text-amber-400" size={24} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-bold text-white">
                                {forms.filter(f => {
                                    const createdDate = f.createdAt?.toDate?.();
                                    if (!createdDate) return false;
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    return createdDate >= today;
                                }).length}
                            </p>
                            <p className="text-sm text-gray-400">Created Today</p>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search forms..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        />
                    </div>
                    <button className="p-3 bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-xl text-gray-400 hover:text-white transition-colors">
                        <Filter size={20} />
                    </button>
                </div>

                {/* Forms Grid/List */}
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                    </div>
                ) : filteredForms.length === 0 ? (
                    <div className="text-center py-16">
                        <FileText className="mx-auto text-gray-600 mb-4" size={64} />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">
                            {forms.length === 0 ? 'No forms created yet' : 'No forms found'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {forms.length === 0 
                                ? 'Create your first form to get started collecting responses'
                                : 'Try adjusting your search criteria'
                            }
                        </p>
                        {forms.length === 0 && (
                            <button
                                onClick={() => setShowFormBuilder(true)}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 mx-auto"
                            >
                                <Plus size={20} />
                                <span>Create Your First Form</span>
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredForms.map((form) => (
                            <div 
                                key={form.id} 
                                className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:border-gray-600/50 transition-all duration-200 hover:shadow-xl"
                            >
                                {/* Form Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-lg">
                                            <FileText className="text-red-400" size={20} />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {form.isActive ? (
                                                <CheckCircle className="text-green-400" size={16} />
                                            ) : (
                                                <XCircle className="text-red-400" size={16} />
                                            )}
                                            <span className={`text-xs font-medium ${
                                                form.isActive ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                                {form.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Dropdown Menu */}
                                    <div className="relative group">
                                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                                            <MoreVertical className="text-gray-400" size={16} />
                                        </button>
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-700 rounded-xl border border-gray-600 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                            <div className="p-2">
                                                <button
                                                    onClick={() => handleEditForm(form)}
                                                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
                                                >
                                                    <Edit size={16} />
                                                    <span>Edit Form</span>
                                                </button>
                                                <button
                                                    onClick={() => handleViewResponses(form.id!)}
                                                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
                                                >
                                                    <BarChart3 size={16} />
                                                    <span>View Responses</span>
                                                </button>
                                                <button
                                                    onClick={() => handleCopyFormLink(form.id!, form.slug)}
                                                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
                                                >
                                                    {copiedFormId === form.id ? (
                                                        <>
                                                            <CheckCircle size={16} className="text-green-400" />
                                                            <span className="text-green-400">Copied!</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy size={16} />
                                                            <span>Copy Link</span>
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleToggleFormStatus(form.id!, form.isActive)}
                                                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
                                                >
                                                    {form.isActive ? (
                                                        <>
                                                            <XCircle size={16} />
                                                            <span>Deactivate</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle size={16} />
                                                            <span>Activate</span>
                                                        </>
                                                    )}
                                                </button>
                                                <hr className="my-2 border-gray-600" />
                                                <button
                                                    onClick={() => handleDeleteForm(form.id!)}
                                                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                    <span>Delete Form</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Content */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-white line-clamp-2">
                                        {form.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-2">
                                        {form.description || 'No description provided'}
                                    </p>
                                </div>

                                {/* Form Stats */}
                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50">
                                    <div className="flex items-center space-x-4 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Users size={16} className="text-gray-400" />
                                            <span className="text-gray-300">{form.responses || 0}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Calendar size={16} className="text-gray-400" />
                                            <span className="text-gray-300">
                                                {form.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => window.open(`/forms/${form.slug}`, '_blank')}
                                            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                                            title="View public form"
                                        >
                                            <ExternalLink size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleViewResponses(form.id!)}
                                            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                                            title="View responses"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Form Builder Modal */}
            {showFormBuilder && (
                <FormBuilder
                    onClose={() => {
                        setShowFormBuilder(false);
                        setEditFormData(null);
                    }}
                    onSave={editFormData ? handleUpdateForm : handleCreateForm}
                    editFormData={editFormData}
                />
            )}
        </div>
    );
};

export default AdminFormsPage;