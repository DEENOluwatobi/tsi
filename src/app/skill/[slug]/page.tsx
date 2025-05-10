'use client'

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { skillsData } from '@/data/skills';
import { ArrowLeft, Calendar, DollarSign, Clock, BookOpen } from 'lucide-react';

const SkillDetail = () => {
    const params = useParams();
    const slug = params.slug as string;
    
    const skill = skillsData.find(s => s.slug === slug);
    
    if (!skill) {
        return notFound();
    }
    
    // Calculate days remaining for discount
    const daysRemaining = skill.pricing?.discountEnds ? 
        Math.max(0, Math.ceil((new Date(skill.pricing.discountEnds).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 0;
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Header with gradient background */}
            <div className={`bg-gradient-to-r ${skill.gradient} py-16 pt-32 px-4 md:px-8 lg:px-16`}>
                <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center text-white mb-8 hover:underline transition-all">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to all skills
                </Link>
                
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
                    <div className="border border-gray-500 bg-gradient-to-r ${skill.gradient} p-4 rounded-lg mr-6">
                        <skill.icon className={`h-12 w-12  text-white`} />
                    </div>
                    
                    <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                        {skill.title}
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl">
                        {skill.description}
                    </p>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content - 2/3 width */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">Overview</h2>
                            <div className="prose prose-lg max-w-none">
                                <p>{skill.longDescription}</p>
                            </div>
                        </section>
                        
                        {/* Benefits */}
                        {skill.benefits && skill.benefits.length > 0 && (
                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Benefits</h2>
                                <ul className="space-y-4">
                                {skill.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start">
                                    <div className={`flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r ${skill.gradient} flex items-center justify-center text-white font-bold text-sm mr-3 mt-1`}>
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700">{benefit}</p>
                                    </li>
                                ))}
                                </ul>
                            </section>
                        )}
                        
                        {/* Curriculum */}
                        {skill.modules && skill.modules.length > 0 && (
                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold mb-6">Curriculum</h2>
                                <div className="space-y-4">
                                    {skill.modules.map((module, index) => (
                                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                            <div className="flex items-start">
                                                <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r ${skill.gradient} flex items-center justify-center text-white font-bold text-sm mr-4`}>
                                                <BookOpen className="h-4 w-4" />
                                                </div>
                                                <div>
                                                <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                                                <p className="text-gray-600">{module.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {/* Testimonials */}
                        {skill.testimonials && skill.testimonials.length > 0 && (
                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold mb-6">Expert Testimonials</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {skill.testimonials.map((testimonial, index) => (
                                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                        <p className="text-gray-700 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                                            <div>
                                                <p className="font-semibold">{testimonial.name}</p>
                                                <p className="text-gray-500 text-sm">{testimonial.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                    
                    {/* Sidebar - 1/3 width */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-8">
                            {/* Pricing */}
                            {skill.pricing && (
                                <div className="mb-8">
                                    {/* <h3 className="text-xl font-bold mb-4">Pricing</h3> */}
                                    
                                    {/* <div className="flex items-center mb-4">
                                        <p className="text-gray-500 line-through mr-3">₦{skill.pricing.regular}</p>
                                        <p className={`text-2xl font-bold bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent`}>
                                            ₦{skill.pricing.discount}
                                        </p>
                                    </div> */}
                                    
                                    {daysRemaining > 0 && (
                                        <div className="bg-gray-50 p-3 rounded-lg mb-6">
                                            <div className="flex items-center text-gray-700">
                                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                                <p className="text-sm">
                                                Discount ends in <span className="font-bold">{daysRemaining} days</span>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        
                            {/* Program start date */}
                            {skill.startDate && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-4">Program Begins</h3>
                                    <div className="flex items-center text-gray-700">
                                        <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                                        <p>{skill.startDate}</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* CTA button */}
                            <Link href='https://forms.gle/o2tJDefJMJ7gYvWg6' target='blank' className=''>
                                <button 
                                    className={`w-full py-4 px-6 bg-gradient-to-r ${skill.gradient} text-white rounded-lg font-bold text-lg shadow-sm hover:shadow-md transition-shadow`}
                                >
                                    Reserve Your Seat Now
                                </button>
                            </Link>
                            
                            <p className="text-center text-gray-500 text-sm mt-4">
                                Limited spots available (95% scholarship available)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillDetail;