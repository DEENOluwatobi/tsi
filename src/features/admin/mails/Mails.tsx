'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
    Mail, 
    Send, 
    Users, 
    MessageSquare, 
    CheckCircle, 
    Clock,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Reply,
    Trash2,
    Download,
    Calendar
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

// Mock Firebase data - replace with actual Firebase calls
interface NewsletterSubscriber {
    id: string;
    email: string;
    subscribedAt: string;
    userAgent: string;
}

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    status: 'read' | 'unread' | 'replied';
    createdAt: string;
    timestamp: string;
}

const NewsletterTab = () => {
    const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([
        {
            id: '1',
            email: 'tobi@gmail.com',
            subscribedAt: 'June 10, 2025 at 12:32:53 PM UTC+1',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        {
            id: '2',
            email: 'john.doe@example.com',
            subscribedAt: 'June 9, 2025 at 10:15:22 AM UTC+1',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        {
            id: '3',
            email: 'sarah@company.com',
            subscribedAt: 'June 8, 2025 at 3:45:10 PM UTC+1',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
        }
    ]);

    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
    const [emailSubject, setEmailSubject] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const filteredSubscribers = subscribers.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedEmails(filteredSubscribers.map(sub => sub.email));
        } else {
            setSelectedEmails([]);
        }
    };

    const handleSelectEmail = (email: string, checked: boolean) => {
        if (checked) {
            setSelectedEmails([...selectedEmails, email]);
        } else {
            setSelectedEmails(selectedEmails.filter(e => e !== email));
        }
    };

    const handleSendEmail = async () => {
        setIsSending(true);
        try {
            // Here you would integrate with your Node mailer API
            const response = await fetch('/api/admin/send-newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emails: selectedEmails,
                    subject: emailSubject,
                    content: emailContent
                })
            });

            if (response.ok) {
                alert('Emails sent successfully!');
                setIsComposeOpen(false);
                setEmailSubject('');
                setEmailContent('');
                setSelectedEmails([]);
            }
        } catch (error) {
            alert('Failed to send emails');
        } finally {
            setIsSending(false);
        }
    };

    const exportSubscribers = () => {
        const csvContent = [
            ['Email', 'Subscribed At', 'User Agent'],
            ...subscribers.map(sub => [sub.email, sub.subscribedAt, sub.userAgent])
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'newsletter-subscribers.csv';
        a.click();
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-800/60 border-gray-700/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Total Subscribers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{subscribers.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/60 border-gray-700/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Selected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-400">{selectedEmails.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/60 border-gray-700/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-400">+{subscribers.length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search subscribers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-gray-800/60 border-gray-700/50 text-white"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={exportSubscribers}
                        className="bg-gray-800/60 border-gray-700/50 text-gray-300 hover:bg-gray-700/60"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                        <DialogTrigger asChild>
                            <Button 
                                size="sm"
                                disabled={selectedEmails.length === 0}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                <Mail className="h-4 w-4 mr-2" />
                                Compose ({selectedEmails.length})
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl bg-gray-800 border-gray-700">
                            <DialogHeader>
                                <DialogTitle className="text-white">Send Newsletter</DialogTitle>
                                <DialogDescription className="text-gray-400">
                                    Sending to {selectedEmails.length} subscriber{selectedEmails.length !== 1 ? 's' : ''}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Enter email subject..."
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
                                        className="bg-gray-700/50 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-gray-300">Content</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Enter your newsletter content..."
                                        value={emailContent}
                                        onChange={(e) => setEmailContent(e.target.value)}
                                        rows={8}
                                        className="bg-gray-700/50 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Button 
                                        onClick={handleSendEmail}
                                        disabled={!emailSubject || !emailContent || isSending}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        {isSending ? 'Sending...' : 'Send Newsletter'}
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setIsComposeOpen(false)}
                                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Subscribers List */}
            <Card className="bg-gray-800/60 border-gray-700/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-white">Newsletter Subscribers</CardTitle>
                            <CardDescription className="text-gray-400">
                                Manage your newsletter subscription list
                            </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="select-all"
                                checked={selectedEmails.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                                onCheckedChange={handleSelectAll}
                                className='text-white'
                            />
                            <Label htmlFor="select-all" className="text-gray-300 text-sm">
                                Select All
                            </Label>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {filteredSubscribers.map((subscriber) => (
                            <div key={subscriber.id} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                                <Checkbox
                                    checked={selectedEmails.includes(subscriber.email)}
                                    onCheckedChange={(checked: boolean) => handleSelectEmail(subscriber.email, checked as boolean)}
                                    className='text-white'
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                                            <Mail className="h-4 w-4 text-red-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-medium truncate">{subscriber.email}</p>
                                            <p className="text-gray-400 text-sm truncate">
                                                Subscribed {subscriber.subscribedAt}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-gray-400 hover:text-white"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const ContactTab = () => {
    const [contacts, setContacts] = useState<ContactMessage[]>([
        {
            id: '1',
            name: 'Tobi',
            email: 'shodimuabideen@gmail.com',
            message: 'TSI is good',
            status: 'unread',
            createdAt: '2025-06-09T15:37:37.682Z',
            timestamp: 'June 9, 2025 at 4:37:43 PM UTC+1'
        },
        {
            id: '2',
            name: 'John Smith',
            email: 'john@example.com',
            message: 'I have some questions about the tutoring services. Could you please provide more information about the pricing and availability?',
            status: 'replied',
            createdAt: '2025-06-08T10:22:15.123Z',
            timestamp: 'June 8, 2025 at 11:22:15 AM UTC+1'
        }
    ]);

    const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isReplying, setIsReplying] = useState(false);

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            contact.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleReply = async (contact: ContactMessage) => {
        setIsReplying(true);
        try {
            const response = await fetch('/api/admin/reply-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: contact.email,
                    subject: `Re: Your inquiry`,
                    content: replyContent,
                    originalMessage: contact.message
                })
            });

            if (response.ok) {
                // Update contact status
                setContacts(prev => prev.map(c => 
                    c.id === contact.id ? { ...c, status: 'replied' as const } : c
                ));
                setSelectedContact(null);
                setReplyContent('');
                alert('Reply sent successfully!');
            }
        } catch (error) {
            alert('Failed to send reply');
        } finally {
            setIsReplying(false);
        }
    };

    const markAsRead = (contactId: string) => {
        setContacts(prev => prev.map(c => 
            c.id === contactId ? { ...c, status: 'read' as const } : c
        ));
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            unread: 'bg-red-500/20 text-red-400 border-red-500/30',
            read: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            replied: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        };
        return variants[status as keyof typeof variants] || variants.unread;
    };

    const statusCounts = {
        all: contacts.length,
        unread: contacts.filter(c => c.status === 'unread').length,
        read: contacts.filter(c => c.status === 'read').length,
        replied: contacts.filter(c => c.status === 'replied').length
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gray-800/60 border-gray-700/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Total Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{statusCounts.all}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/60 border-gray-700/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Unread</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-400">{statusCounts.unread}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/60 border-gray-700/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Read</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-400">{statusCounts.read}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/60 border-gray-700/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Replied</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-400">{statusCounts.replied}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search contacts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-gray-800/60 border-gray-700/50 text-white"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40 bg-gray-800/60 border-gray-700/50 text-white">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="unread">Unread</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="replied">Replied</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Messages List */}
            <Card className="bg-gray-800/60 border-gray-700/50">
                <CardHeader>
                    <CardTitle className="text-white">Contact Messages</CardTitle>
                    <CardDescription className="text-gray-400">
                        Manage and respond to user inquiries
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredContacts.map((contact) => (
                            <div key={contact.id} className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                            <MessageSquare className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="text-white font-medium">{contact.name}</h3>
                                                <Badge className={getStatusBadge(contact.status)}>
                                                    {contact.status}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-400 text-sm">{contact.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-400 text-sm">{contact.timestamp}</span>
                                        <div className="flex space-x-1">
                                            {contact.status === 'unread' && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => markAsRead(contact.id)}
                                                    className="text-gray-400 hover:text-white"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedContact(contact)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <Reply className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed">{contact.message}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Reply Dialog */}
            <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
                <DialogContent className="sm:max-w-2xl bg-gray-800 border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-white">Reply to {selectedContact?.name}</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Responding to: {selectedContact?.email}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedContact && (
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-700/50 rounded-lg">
                                <p className="text-gray-400 text-sm mb-2">Original Message:</p>
                                <p className="text-gray-300">{selectedContact.message}</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reply" className="text-gray-300">Your Reply</Label>
                                <Textarea
                                    id="reply"
                                    placeholder="Type your reply..."
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    rows={6}
                                    className="bg-gray-700/50 border-gray-600 text-white"
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button 
                                    onClick={() => handleReply(selectedContact)}
                                    disabled={!replyContent || isReplying}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    {isReplying ? 'Sending...' : 'Send Reply'}
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => setSelectedContact(null)}
                                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default function AdminMailsPage() {
    const { admin } = useSelector((state: RootState) => state.admin);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-blue-800 rounded-2xl py-6 px-8 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 flex items-center">
                                <Mail className="mr-4" size={32} />
                                Mail Management
                            </h1>
                            <p className="text-red-100 text-lg opacity-90">
                                Manage newsletters and contact messages
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Send size={38} className="text-white/80" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="newsletters" className="w-full">
                <TabsList className="grid w-full h-auto grid-cols-2 bg-gray-800/60 border border-gray-700/50">
                    <TabsTrigger 
                        value="newsletters" 
                        className="py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-400"
                    >
                        <Users className="mr-2 h-4 w-4" />
                        Newsletter
                    </TabsTrigger>
                    <TabsTrigger 
                        value="contacts" 
                        className="py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-400"
                    >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Us
                    </TabsTrigger>
                </TabsList>
                
                <TabsContent value="newsletters" className="mt-6">
                    <NewsletterTab />
                </TabsContent>
                
                <TabsContent value="contacts" className="mt-6">
                    <ContactTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}