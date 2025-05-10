import { Calendar, Clock, MapPin } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Event } from '@/types/event';
import { events } from '@/data/events';
import { titleToSlug } from '@/types/event';
import { logSlugGeneration } from '@/utils/debug';

const UpcomingEvents = () => {
    return (
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                        Upcoming Events
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our upcoming workshops and training sessions to accelerate your learning
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white h-auto p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                {event.type}
                                </div>
                                <div className="text-gray-600 text-sm">
                                {event.spots} spots left
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                {(() => {
                                const slug = titleToSlug(event.title);
                                // Log for debugging
                                console.log(`Original: "${event.title}" | Slug: "${slug}"`);
                                return (
                                    <Link 
                                    href={`/event/${slug}`}
                                    className="w-full bg-gradient-to-r flex justify-center items-center from-red-500 to-blue-500 text-white py-2 rounded-lg hover:shadow-md transition-shadow"
                                    >
                                        More Details
                                    </Link>
                                );
                                })()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
