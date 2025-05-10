import React from 'react';
import { Calendar, Clock, MapPin, ArrowLeft, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Event } from '@/types/event';
import { events } from '@/data/events';
import { getEventBySlug } from '@/types/event';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.title.toLowerCase()
      .replace(/\$/g, 'dollar')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim()
  }));
}

export async function generateMetadata({ params }: PageProps) {
  // Wait for params to resolve
  const { slug } = await params;
  
  const event = events.find((event) => {
    const eventSlug = event.title.toLowerCase()
      .replace(/\$/g, 'dollar')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    return eventSlug === slug;
  });

  return {
    title: event ? `Event - ${event.title}` : 'Event Details',
  };
}

export default async function EventPage({ params }: PageProps) {
  // Wait for params to resolve
  const { slug } = await params;
  
  // Get slug from URL
  const event = getEventBySlug(events, slug);
  
  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 md:px-8">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
          Back to all events
        </Link>
        
        {/* Event badge and spots */}
        <div className="flex items-center justify-between mb-6">
          <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            {event.type}
          </div>
          <div className="text-gray-600 text-sm font-medium">
            {event.spots} spots left
          </div>
        </div>
        
        {/* Event title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">{event.title}</h1>
        
        {/* Event card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event details */}
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-3 text-red-500" />
                <span className="text-lg">{event.date}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="w-5 h-5 mr-3 text-red-500" />
                <span className="text-lg">{event.time}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-3 text-red-500" />
                <span className="text-lg">{event.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event image if available */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 flex flex-col md:flex-row gap-2 md:gap-4">
          <div className='w-full md:w-[35%] h-full'>
            {event.image && (
                <div className="md:flex md:justify-center">
                  <img 
                    src={event.image.src} 
                    alt={event.title} 
                    className="w-full md:max-w-xs rounded-lg shadow-md"
                  />
                </div>
              )}
          </div>

          <div className='w-full md:w-[65%] h-full'>
            {event.headertext && (
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{event.headertext}</h2>
            )}
            {event.paragraphtext && (
              <p className="text-gray-700 leading-relaxed mb-6">{event.paragraphtext}</p>
            )}
            
            {/* Twitter link if available */}
            {event.twitter && (
              <a 
                href={event.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 hover:underline"
              >
                <ExternalLink className="w-4 h-4 mr-2 text-sm" />
                View on Twitter/X
              </a>
            )}     
          </div>
        </div>
            
         {/* Action buttons */}
         <div className="w-full justify-center flex flex-col sm:flex-row gap-4 mt-8">
            {event.registration && (
              <a 
                href={event.registration} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto text-center bg-gradient-to-r from-red-500 to-blue-500 text-white py-3 px-8 rounded-lg font-medium hover:shadow-md transition-shadow"
              >
                Register Now
              </a>
            )}
            
            {event.link && (
              <a 
                href={event.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto text-center border-2 border-blue-500 text-blue-500 py-3 px-8 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Join {event.type}
              </a>
            )}
          </div>   
      </div>
    </div>
  );
}