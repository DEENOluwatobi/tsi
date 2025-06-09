'use client';
import React, { useState, useEffect, useRef } from 'react';
import { JitsiMeeting, JaaSMeeting } from '@jitsi/react-sdk';
import { useSelector } from 'react-redux';
import { 
    Camera, 
    CameraOff, 
    Mic, 
    MicOff, 
    Monitor, 
    Hand, 
    PhoneOff, 
    MessageSquare, 
    Users, 
    Share2, 
    Send,
    Code,
    Search,
    TrendingUp,
    Package,
    ArrowRight,
    Clock,
    Video
} from 'lucide-react';

// Define types
interface Message {
    id: number;
    sender: string;
    message: string;
    time: string;
    isSystem: boolean;
    isInstructor?: boolean;
}

interface ClassOption {
    id: string;
    name: string;
    description: string;
    instructor: string;
    duration: string;
    participants: number;
    status: 'live' | 'scheduled' | 'ended';
    startTime: string;
    icon: React.ReactNode;
    color: string;
}

interface RootState {
    auth: {
        user: {
            firstName: string;
            lastName: string;
            email: string;
        } ;
    };
}

const VideoClassroom: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [currentStep, setCurrentStep] = useState<'select' | 'classroom'>('select');
    const [selectedClass, setSelectedClass] = useState<ClassOption | null>(null);
    const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
    const [isAudioOn, setIsAudioOn] = useState<boolean>(true);
    const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
    const [isHandRaised, setIsHandRaised] = useState<boolean>(false);
    const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
    const [isParticipantsOpen, setIsParticipantsOpen] = useState<boolean>(false);
    const [chatMessage, setChatMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    
    const jitsiAPI = useRef<any>(null);

    // Available classes
    const availableClasses: ClassOption[] = [
        {
        id: 'web-dev-fundamentals',
        name: 'Web Development Fundamentals',
        description: 'Learn HTML, CSS, JavaScript basics and modern web development practices',
        instructor: 'Sarah Johnson',
        duration: '2 hours',
        participants: 24,
        status: 'live',
        startTime: '10:00 AM',
        icon: <Code className="w-6 h-6" />,
        color: 'blue'
        },
        {
        id: 'seo-mastery',
        name: 'SEO Mastery Workshop',
        description: 'Advanced SEO techniques, keyword research, and content optimization',
        instructor: 'Mike Chen',
        duration: '1.5 hours',
        participants: 18,
        status: 'live',
        startTime: '2:00 PM',
        icon: <Search className="w-6 h-6" />,
        color: 'green'
        },
        {
        id: 'product-management',
        name: 'Product Management Essentials',
        description: 'Product strategy, user research, and agile development methodologies',
        instructor: 'Emily Rodriguez',
        duration: '2.5 hours',
        participants: 31,
        status: 'scheduled',
        startTime: '4:00 PM',
        icon: <Package className="w-6 h-6" />,
        color: 'purple'
        },
        {
        id: 'digital-marketing',
        name: 'Digital Marketing Strategy',
        description: 'Social media marketing, content strategy, and performance analytics',
        instructor: 'David Kim',
        duration: '2 hours',
        participants: 27,
        status: 'live',
        startTime: '11:30 AM',
        icon: <TrendingUp className="w-6 h-6" />,
        color: 'orange'
        }
    ];

    const addMessage = (messageData: Partial<Message>): void => {
        const newMessage: Message = {
        id: Date.now(),
        sender: messageData.sender || 'Unknown',
        message: messageData.message || '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: messageData.isSystem || false,
        isInstructor: messageData.isInstructor || false 
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const sendMessage = (): void => {
        if (chatMessage.trim()) {
        if (jitsiAPI.current) {
            jitsiAPI.current.executeCommand('sendChatMessage', chatMessage);
        }
        
        addMessage({
            sender: `${user?.firstName} ${user?.lastName}`,
            message: chatMessage,
            isInstructor: false
        });
        
        setChatMessage('');
        }
    };

    const handleJoinClass = (classOption: ClassOption): void => {
        setSelectedClass(classOption);
        setIsConnecting(true);
        setCurrentStep('classroom');
        
        // Initialize welcome message
        setMessages([{
        id: 1,
        sender: 'System',
        message: `Welcome to ${classOption.name}! 🎓`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
        }]);
    };

    const handleLeaveClass = (): void => {
        if (jitsiAPI.current) {
        jitsiAPI.current.dispose();
        jitsiAPI.current = null;
        }
        setCurrentStep('select');
        setSelectedClass(null);
        setMessages([]);
        setIsConnecting(false);
    };

    const toggleAudio = (): void => {
        if (jitsiAPI.current) {
        jitsiAPI.current.executeCommand('toggleAudio');
        }
        setIsAudioOn(prev => !prev);
    };

    const toggleVideo = (): void => {
        if (jitsiAPI.current) {
        jitsiAPI.current.executeCommand('toggleVideo');
        }
        setIsVideoOn(prev => !prev);
    };

    const toggleScreenShare = (): void => {
        if (jitsiAPI.current) {
        jitsiAPI.current.executeCommand('toggleShareScreen');
        }
        setIsScreenSharing(prev => !prev);
    };

    const toggleRaiseHand = (): void => {
        if (jitsiAPI.current) {
        jitsiAPI.current.executeCommand('toggleRaiseHand');
        }
        setIsHandRaised(prev => !prev);
    };

    const handleApiReady = (externalApi: any): void => {
        jitsiAPI.current = externalApi;
        setIsConnecting(false);

        // Event listeners
        externalApi.addEventListener('readyToClose', () => {
        handleLeaveClass();
        });

        externalApi.addEventListener('participantJoined', (participant: any) => {
        addMessage({
            sender: 'System',
            message: `${participant.displayName || 'Someone'} joined the class`,
            isSystem: true
        });
        });

        externalApi.addEventListener('participantLeft', (participant: any) => {
        addMessage({
            sender: 'System',
            message: `${participant.displayName || 'Someone'} left the class`,
            isSystem: true
        });
        });

        externalApi.addEventListener('videoConferenceJoined', () => {
        addMessage({
            sender: 'System',
            message: 'You have successfully joined the classroom! 🎉',
            isSystem: true
        });
        });

        externalApi.addEventListener('videoConferenceLeft', () => {
        handleLeaveClass();
        });

        // Audio/Video state listeners
        externalApi.addEventListener('audioMuteStatusChanged', (event: any) => {
        setIsAudioOn(!event.muted);
        });

        externalApi.addEventListener('videoMuteStatusChanged', (event: any) => {
        setIsVideoOn(!event.muted);
        });

        externalApi.addEventListener('screenSharingStatusChanged', (event: any) => {
        setIsScreenSharing(event.on);
        });

        externalApi.addEventListener('raiseHandUpdated', (event: any) => {
        setIsHandRaised(event.handRaised);
        });

        externalApi.addEventListener('incomingMessage', (event: any) => {
        addMessage({
            sender: event.from || 'Unknown',
            message: event.message,
            isSystem: false
        });
        });
    };

    const handleIFrameRef = (iframeRef: any): void => {
        if (iframeRef && iframeRef.style) {
        iframeRef.style.height = '100%';
        iframeRef.style.width = '100%';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
        case 'live': return 'bg-green-100 text-green-800';
        case 'scheduled': return 'bg-blue-100 text-blue-800';
        case 'ended': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getColorClasses = (color: string) => {
        switch (color) {
        case 'blue': return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
        case 'green': return 'bg-green-50 border-green-200 hover:bg-green-100';
        case 'purple': return 'bg-purple-50 border-purple-200 hover:bg-purple-100';
        case 'orange': return 'bg-orange-50 border-orange-200 hover:bg-orange-100';
        default: return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
        }
    };

    // Class Selection Screen
    if (currentStep === 'select') {
        return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                        <Video className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Live Classrooms</h1>
                        <p className="text-gray-600">Join your scheduled classes and interactive sessions</p>
                    </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Live Sessions Available</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                        Welcome, <span className="font-semibold text-gray-900">{user?.firstName} {user?.lastName}</span>
                    </div>
                    </div>
                </div>

                {/* Class Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {availableClasses.map((classOption) => (
                    <div
                        key={classOption.id}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${getColorClasses(classOption.color)}`}
                        onClick={() => handleJoinClass(classOption)}
                    >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(classOption.status)}`}>
                            {classOption.status === 'live' && <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>}
                            {classOption.status}
                        </span>
                        </div>

                        {/* Class Icon */}
                        <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-4 ${
                        classOption.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        classOption.color === 'green' ? 'bg-green-100 text-green-600' :
                        classOption.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                        }`}>
                        {classOption.icon}
                        </div>

                        {/* Class Info */}
                        <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {classOption.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {classOption.description}
                        </p>
                        
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Instructor:</span>
                            <span className="font-semibold text-gray-900">{classOption.instructor}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Duration:</span>
                            <span className="text-gray-900">{classOption.duration}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Start Time:</span>
                            <span className="text-gray-900">{classOption.startTime}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Participants:</span>
                            <span className="text-gray-900">{classOption.participants} students</span>
                            </div>
                        </div>
                        </div>

                        {/* Join Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{classOption.participants} joined</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                            <span className="text-sm">
                            {classOption.status === 'live' ? 'Join Now' : 'Join When Live'}
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                        </div>
                    </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-12 bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                        <p className="font-semibold text-gray-900">Technical Requirements</p>
                        <p className="text-gray-600">Ensure camera and microphone access is enabled</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                        <p className="font-semibold text-gray-900">Class Etiquette</p>
                        <p className="text-gray-600">Keep microphone muted when not speaking</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                        <p className="font-semibold text-gray-900">Support</p>
                        <p className="text-gray-600">Contact support if you experience any issues</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }

    // Classroom Screen
    return (
        <div className="h-screen bg-white flex flex-col">
            {/* Class Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 z-10">
                <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                    onClick={handleLeaveClass}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                    ← Back to Classes
                    </button>
                    <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                        selectedClass?.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        selectedClass?.color === 'green' ? 'bg-green-100 text-green-600' :
                        selectedClass?.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                    }`}>
                        {selectedClass?.icon}
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">{selectedClass?.name}</h1>
                        <p className="text-sm text-gray-600">with {selectedClass?.instructor}</p>
                    </div>
                    </div>
                    <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500 text-sm font-semibold">LIVE</span>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4">
                    <span className="text-gray-500 text-sm">{selectedClass?.participants} participants</span>
                    <button
                    onClick={() => {
                        if (typeof window !== 'undefined' && navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        addMessage({
                            sender: 'System',
                            message: 'Class link copied to clipboard! 📋',
                            isSystem: true
                        });
                        }
                    }}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                    <Share2 className="w-5 h-5" />
                    </button>
                </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Video Area */}
                <div className="flex-1 flex flex-col relative bg-gray-50">
                <div className="flex-1">
                <JaaSMeeting
                    appId="vpaas-magic-cookie-ad97ab768f1b4daeab60da8cb5d9ad21"
                    roomName={`skillup-${selectedClass?.id || 'default'}`}
                    configOverwrite={{
                        startWithAudioMuted: false,
                        startWithVideoMuted: false,
                        disableModeratorIndicator: true,
                        enableEmailInStats: false,
                        prejoinPageEnabled: false,
                        enableWelcomePage: false,
                        // Remove lobby completely
                        lobby: {
                        enableChat: false,
                        autoKnock: false
                        },
                        // Auto-join settings
                        enableClosePage: false,
                        enableLobby: false,
                        lobbyModeEnabled: false,
                        requireDisplayName: false
                    }}
                    interfaceConfigOverwrite={{
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
                        TOOLBAR_ALWAYS_VISIBLE: true,
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_WATERMARK_FOR_GUESTS: false,
                        SHOW_BRAND_WATERMARK: false,
                        BRAND_WATERMARK_LINK: '',
                        SHOW_POWERED_BY: false,
                        DISPLAY_WELCOME_FOOTER: false,
                        MOBILE_APP_PROMO: false,
                        NATIVE_APP_NAME: 'SkillUp Initiative',
                        PROVIDER_NAME: 'SkillUp Initiative',
                        VIDEO_LAYOUT_FIT: 'nocrop',
                        filmStripOnly: false,
                        VERTICAL_FILMSTRIP: true
                    }}
                    userInfo={{
                        displayName: `${user?.firstName} ${user?.lastName}`,
                        email: user?.email
                    }}
                    onApiReady={handleApiReady}
                    getIFrameRef={handleIFrameRef}
                    />
                    
                    {/* Loading overlay */}
                    {isConnecting && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                        <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Connecting to Classroom</h2>
                        <p className="text-gray-600">Please wait while we set up your video session...</p>
                        </div>
                    </div>
                    )}
                </div>

                {/* Custom Controls Overlay */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-white shadow-2xl rounded-2xl px-6 py-3 flex items-center space-x-4 border border-gray-200">
                    <button
                        onClick={toggleAudio}
                        className={`p-3 rounded-xl transition-colors ${
                        isAudioOn ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-red-100 hover:bg-red-200 text-red-600'
                        }`}
                        title={isAudioOn ? 'Mute' : 'Unmute'}
                    >
                        {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    </button>

                    <button
                        onClick={toggleVideo}
                        className={`p-3 rounded-xl transition-colors ${
                        isVideoOn ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-red-100 hover:bg-red-200 text-red-600'
                        }`}
                        title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
                    >
                        {isVideoOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                    </button>

                    <button
                        onClick={toggleScreenShare}
                        className={`p-3 rounded-xl transition-colors ${
                        isScreenSharing ? 'bg-blue-100 hover:bg-blue-200 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                        title="Share screen"
                    >
                        <Monitor className="w-5 h-5" />
                    </button>

                    <button
                        onClick={toggleRaiseHand}
                        className={`p-3 rounded-xl transition-colors ${
                        isHandRaised ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                        title="Raise hand"
                    >
                        <Hand className="w-5 h-5" />
                    </button>

                    <div className="w-px h-8 bg-gray-300"></div>

                    <button
                        onClick={handleLeaveClass}
                        className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-colors"
                        title="Leave classroom"
                    >
                        <PhoneOff className="w-5 h-5" />
                    </button>
                    </div>
                </div>
                </div>

                {/* Sidebar */}
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                {/* Sidebar Tabs */}
                <div className="flex border-b border-gray-200 bg-gray-50">
                    <button
                    onClick={() => { setIsChatOpen(true); setIsParticipantsOpen(false); }}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                        isChatOpen ? 'text-blue-600 bg-white border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    >
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Chat
                    </button>
                    <button
                    onClick={() => { setIsParticipantsOpen(true); setIsChatOpen(false); }}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                        isParticipantsOpen ? 'text-blue-600 bg-white border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    >
                    <Users className="w-4 h-4 inline mr-2" />
                    Info
                    </button>
                </div>

                {/* Chat Panel */}
                {isChatOpen && (
                    <div className="flex-1 flex flex-col">
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className="flex flex-col">
                            <div className="flex items-center space-x-2 mb-1">
                                <span className={`text-xs font-medium ${
                                message.isSystem ? 'text-green-600' : 
                                message.isInstructor ? 'text-purple-600' : 'text-blue-600'
                                }`}>
                                {message.sender}
                                </span>
                                <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                            <p className="text-sm text-gray-700">{message.message}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex space-x-2">
                        <input
                            type="text"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                        </div>
                    </div>
                    </div>
                )}

                {/* Class Info Panel */}
                {isParticipantsOpen && (
                    <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-6">
                        <div>
                        <h3 className="text-gray-900 font-semibold mb-3">Class Information</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                            <span className="text-gray-600">Course:</span>
                            <span className="text-gray-900 font-medium">{selectedClass?.name}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="text-gray-600">Instructor:</span>
                            <span className="text-gray-900">{selectedClass?.instructor}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="text-gray-900">{selectedClass?.duration}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="text-gray-600">Participants:</span>
                            <span className="text-gray-900">{selectedClass?.participants} students</span>
                            </div>
                        </div>
                        </div>

                        <div>
                        <h3 className="text-gray-900 font-semibold mb-3">Your Profile</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="text-gray-900">{user?.firstName} {user?.lastName}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="text-gray-900">{user?.email}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="text-green-600 flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Online
                            </span>
                            </div>
                        </div>
                        </div>

                        <div>
                        <h3 className="text-gray-900 font-semibold mb-3">Quick Actions</h3>
                        <div className="space-y-2">
                            <button
                            onClick={() => {
                                if (typeof window !== 'undefined' && navigator.clipboard) {
                                navigator.clipboard.writeText(window.location.href);
                                addMessage({
                                    sender: 'System',
                                    message: 'Class link copied to clipboard! 📋',
                                    isSystem: true
                                });
                                }
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                            >
                            <Share2 className="w-4 h-4" />
                            <span>Share Class Link</span>
                            </button>
                            <button
                            onClick={() => {
                                addMessage({
                                sender: 'System',
                                message: 'For technical support, please contact our help desk.',
                                isSystem: true
                                });
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                            >
                            <MessageSquare className="w-4 h-4" />
                            <span>Get Help</span>
                            </button>
                        </div>
                        </div>

                        <div>
                        <h3 className="text-gray-900 font-semibold mb-3">Class Resources</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>• Course materials will be shared during the session</p>
                            <p>• Recording will be available after class</p>
                            <p>• Q&A session at the end</p>
                            <p>• Certificate upon completion</p>
                        </div>
                        </div>
                    </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default VideoClassroom;

