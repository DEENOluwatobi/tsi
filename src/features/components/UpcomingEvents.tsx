import { Calendar, Clock, MapPin } from 'lucide-react';
import React from 'react'

const events = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      date: "March 15, 2025",
      time: "12:00 AM - 2:00 PM",
      location: "Virtual",
      type: "Workshop",
      spots: 20
    },
    {
      id: 2,
      title: "Data Analysis Masterclass",
      date: "March 20, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Virtual",
      type: "Masterclass",
      spots: 15
    },
    {
      id: 3,
      title: "Product Management Fundamentals",
      date: "March 25, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Virtual",
      type: "Course",
      spots: 25
    }
];

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
                <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
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

                    <button className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-white py-2 rounded-lg hover:shadow-md transition-shadow">
                        Register Now
                    </button>
                </div>
                ))}
            </div>
            </div>
        </section>
    );
  };
export default UpcomingEvents