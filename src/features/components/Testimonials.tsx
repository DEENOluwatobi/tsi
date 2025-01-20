'use client'
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonationGrid from './DonationGrid';
import SeminarGrid from './SeminarGrid';
import TrainingGrid from './TrainingGrid';

const Testimonials = () => {
    return (
        <Tabs defaultValue="donation" className='w-full pt-24 md:pt-36'>
            <TabsList className="w-[300px] mx-auto grid grid-cols-3 bg-gradient-to-br from-blue-500 to-red-500 shadow-lg text-white rounded-xl py-1 px-2 h-12">
                <TabsTrigger value="donation">Donation</TabsTrigger>
                <TabsTrigger value="seminar">Seminar</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
            </TabsList>

            <TabsContent value='donation' className="mt-4">
                <DonationGrid />
            </TabsContent>
            
            <TabsContent value='seminar' className="mt-4">
                <SeminarGrid />
            </TabsContent>
            
            <TabsContent value='training' className="mt-4">
                <TrainingGrid />
            </TabsContent>
        </Tabs>
    )
}

export default Testimonials