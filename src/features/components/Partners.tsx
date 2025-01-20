'use client'
import React from 'react';

const partners = [
    { id: 1, name: "TechCorp", logo: "/api/placeholder/150/50" },
    { id: 2, name: "InnovateCo", logo: "/api/placeholder/150/50" },
    { id: 3, name: "GrowthHub", logo: "/api/placeholder/150/50" },
    { id: 4, name: "DevStudio", logo: "/api/placeholder/150/50" },
    { id: 5, name: "DigitalFirst", logo: "/api/placeholder/150/50" },
    { id: 6, name: "FutureLearn", logo: "/api/placeholder/150/50" }
];

const Partners = () => {
    return (
        <section className="py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                        Our Partners
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Collaborating with industry leaders to provide the best opportunities for our graduates
                    </p>
                </div>
        
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                    {partners.map((partner) => (
                        <div key={partner.id} className="p-4 hover:shadow-lg rounded-lg transition-shadow">
                            <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners