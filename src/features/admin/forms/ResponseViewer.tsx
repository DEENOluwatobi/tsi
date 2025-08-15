'use client';
import React, { useState, useEffect } from 'react';
import { 
    ArrowLeft,
    Download,
    Eye,
    Calendar,
    Users,
    BarChart3,
    FileText,
    Search,
    Filter,
    Clock,
    ExternalLink,
    Trash2,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { collection, query, where, getDocs, doc, getDoc, deleteDoc, orderBy } from 'firebase/firestore';
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
    id: string;
    formId: string;
    responses: Record<string, any>;
    submittedAt: any;
    userAgent?: string;
    ipAddress?: string;
}

const ResponseViewer = ({ response, formData, onClose }: {
    response: FormResponse;
    formData: FormData;
    onClose: () => void;
}) => {
    const renderResponseValue = (field: FormField, value: any) => {
        if (!value) return <span className="text-gray-400 italic">No response</span>;

        switch (field.type) {
         case 'checkbox':
            if (Array.isArray(value)) {
                return (
                    <div className="space-y-1">
                        {value.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <CheckCircle size={16} className="text-green-400" />
                                <span className="text-white">{item}</span>
                            </div>
                        ))}
                    </div>
                );
            }
            return <span className="text-white">{value}</span>;

        case 'file_upload':
            if (typeof value === 'object' && value.fileName) {
                return (
                    <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                        <div className="flex items-center space-x-2 mb-1">
                            <FileText size={16} className="text-blue-400" />
                            <span className="text-white font-medium">{value.fileName}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                            Size: {(value.fileSize / 1024).toFixed(1)} KB • Type: {value.fileType}
                        </div>
                    </div>
                );
            }
            return <span className="text-white">{value}</span>;

        case 'long_text':
            return (
                <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
                    <pre className="text-white whitespace-pre-wrap font-sans">{value}</pre>
                </div>
            );

        default:
           return <span className="text-white">{value}</span>;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Response Details</h2>
                            <p className="text-gray-400 mt-1">
                                Submitted on {response.submittedAt?.toDate?.()?.toLocaleString() || 'Unknown date'}
                            </p>
                        </div>
                        <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="text-gray-400" size={24} />
                        </button>
                    </div>
                </div>

                {/* Response Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="space-y-6">
                        {formData.fields.map((field, index) => (
                            <div key={field.id} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50">
                                <div className="flex items-start space-x-3 mb-3">
                                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500/20 rounded-lg text-blue-300 text-xs font-medium">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-white mb-1">{field.question}</h3>
                                        <p className="text-xs text-gray-400 capitalize">{field.type.replace('_', ' ')} field</p>
                                    </div>
                                </div>
                                <div className="ml-9">
                                    {renderResponseValue(field, response.responses[field.id])}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Meta Information */}
                    <div className="mt-8 bg-gray-700/20 rounded-xl p-4 border border-gray-600/30">
                        <h4 className="text-sm font-medium text-gray-300 mb-3">Submission Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Submitted:</span>
                                <span className="text-white ml-2">
                                    {response.submittedAt?.toDate?.()?.toLocaleString() || 'Unknown'}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-400">Response ID:</span>
                                <span className="text-white ml-2 font-mono text-xs">{response.id}</span>
                            </div>
                            {response.userAgent && (
                                <div className="md:col-span-2">
                                    <span className="text-gray-400">Browser:</span>
                                    <span className="text-white ml-2 text-xs">{response.userAgent}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormResponsesViewer = ({ formId, onBack }: {
    formId: string;
    onBack: () => void;
}) => {
    const [formData, setFormData] = useState<FormData | null>(null);
    const [responses, setResponses] = useState<FormResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedResponse, setSelectedResponse] = useState<FormResponse | null>(null);
    const [stats, setStats] = useState({
        totalResponses: 0,
        todayResponses: 0,
        averageTime: '~3 min'
    });

    useEffect(() => {
        loadFormAndResponses();
    }, [formId]);

    const loadFormAndResponses = async () => {
        try {
        // Load form data
        const formDoc = await getDoc(doc(db, 'forms', formId));
        if (formDoc.exists()) {
            const form = { id: formDoc.id, ...formDoc.data() } as FormData;
            setFormData(form);
        }

        // Load responses
        const responsesQuery = query(
            collection(db, 'formResponses'),
            where('formId', '==', formId),
            orderBy('submittedAt', 'desc')
        );
        
        const responsesSnapshot = await getDocs(responsesQuery);
        const responsesData = responsesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as FormResponse[];

        setResponses(responsesData);

        // Calculate stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayCount = responsesData.filter(response => {
            const responseDate = response.submittedAt?.toDate?.();
            return responseDate && responseDate >= today;
        }).length;

        setStats({
            totalResponses: responsesData.length,
            todayResponses: todayCount,
            averageTime: '~3 min'
        });

        } catch (error) {
            console.error('Error loading form and responses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteResponse = async (responseId: string) => {
        if (window.confirm('Are you sure you want to delete this response? This action cannot be undone.')) {
            try {
                await deleteDoc(doc(db, 'formResponses', responseId));
                loadFormAndResponses();
            } catch (error) {
                console.error('Error deleting response:', error);
            }
        }
    };

    const exportToCSV = () => {
        if (!formData || responses.length === 0) return;

        // Create CSV headers
        const headers = ['Response ID', 'Submitted At', ...formData.fields.map(field => field.question)];
        
        // Create CSV rows
        const rows = responses.map(response => {
            const row = [
                response.id,
                response.submittedAt?.toDate?.()?.toISOString() || '',
                ...formData.fields.map(field => {
                const value = response.responses[field.id];
                if (Array.isArray(value)) {
                    return value.join('; ');
                } else if (typeof value === 'object' && value?.fileName) {
                    return value.fileName;
                }
                    return value || '';
                })
            ];
            return row;
        });

        // Convert to CSV format
        const csvContent = [headers, ...rows]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `${formData.title}_responses.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const filteredResponses = responses.filter(response => {
        if (!searchQuery) return true;
        
        return Object.values(response.responses).some(value => {
        if (typeof value === 'string') {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (Array.isArray(value)) {
            return value.some(item => 
                typeof item === 'string' && item.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return false;
        });
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="text-center py-16">
                <AlertCircle className="mx-auto text-red-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Form Not Found</h3>
                <p className="text-gray-500 mb-6">Unable to load form data</p>
                <button
                onClick={onBack}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-3xl p-4 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                            <button
                                onClick={onBack}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={24} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold mb-2 flex items-center">
                                    <BarChart3 className="mr-2" size={30} />
                                    Form Responses
                                </h1>
                                <h2 className="text-lg text-blue-100 font-medium mb-2">{formData.title}</h2>
                                <p className="text-blue-100/80">
                                    {formData.description || 'View and manage all form submissions'}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={exportToCSV}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                            >
                                <Download size={20} />
                                <span>Export CSV</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                            <Users className="text-blue-400" size={24} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold text-white">{stats.totalResponses}</p>
                        <p className="text-sm text-gray-400">Total Responses</p>
                    </div>
                </div>

                <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
                            <Calendar className="text-green-400" size={24} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold text-white">{stats.todayResponses}</p>
                        <p className="text-sm text-gray-400">Today's Responses</p>
                    </div>
                </div>

                <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl">
                            <Clock className="text-amber-400" size={24} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold text-white">{stats.averageTime}</p>
                        <p className="text-sm text-gray-400">Avg. Completion Time</p>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search responses..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button className="p-3 bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-xl text-gray-400 hover:text-white transition-colors">
                    <Filter size={20} />
                </button>
            </div>

            {/* Responses Table */}
            {filteredResponses.length === 0 ? (
                <div className="text-center py-16">
                    <FileText className="mx-auto text-gray-600 mb-4" size={64} />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">
                        {responses.length === 0 ? 'No responses yet' : 'No responses found'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {responses.length === 0 
                            ? 'Share your form link to start collecting responses'
                            : 'Try adjusting your search criteria'
                        }
                    </p>
                </div>
            ) : (
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-700/30 border-b border-gray-700">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-gray-300">#</th>
                                    <th className="text-left p-4 font-semibold text-gray-300">Submitted</th>
                                    <th className="text-left p-4 font-semibold text-gray-300">Preview</th>
                                    <th className="text-left p-4 font-semibold text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResponses.map((response, index) => (
                                    <tr key={response.id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                                        <td className="p-4 text-gray-400">{index + 1}</td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-1">
                                                <Calendar size={16} className="text-gray-400" />
                                                <span className="text-gray-300">
                                                    {response.submittedAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {response.submittedAt?.toDate?.()?.toLocaleTimeString() || ''}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="max-w-xs">
                                                {Object.entries(response.responses)
                                                .slice(0, 2)
                                                .map(([fieldId, value]) => {
                                                    const field = formData.fields.find(f => f.id === fieldId);
                                                    if (!field) return null;
                                                    
                                                    let displayValue = '';
                                                    if (Array.isArray(value)) {
                                                        displayValue = value.join(', ');
                                                    } else if (typeof value === 'object' && value?.fileName) {
                                                        displayValue = `📎 ${value.fileName}`;
                                                    } else if (typeof value === 'string') {
                                                        displayValue = value;
                                                    } else {
                                                        displayValue = String(value || '');
                                                    }

                                                    return (
                                                        <div key={fieldId} className="text-sm text-gray-300 truncate mb-1">
                                                            <span className="text-gray-500">{field.question}:</span> {displayValue}
                                                        </div>
                                                    );
                                                })}
                                                {Object.keys(response.responses).length > 2 && (
                                                    <div className="text-xs text-gray-500">
                                                        +{Object.keys(response.responses).length - 2} more fields
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                onClick={() => setSelectedResponse(response)}
                                                className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                                                title="View full response"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                onClick={() => handleDeleteResponse(response.id)}
                                                className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                                                title="Delete response"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Response Viewer Modal */}
            {selectedResponse && (
                <ResponseViewer
                response={selectedResponse}
                formData={formData}
                onClose={() => setSelectedResponse(null)}
                />
            )}
        </div>
    );
};

export default FormResponsesViewer;