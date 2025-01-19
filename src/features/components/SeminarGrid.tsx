'use client'
import React from 'react';
import Image from 'next/image';
import Image1 from '@/assets/images/image.jpg';
import Image2 from '@/assets/images/image2.jpg';
import Image3 from '@/assets/images/image3.jpg';
import Image4 from '@/assets/images/image4.jpg';
import Image5 from '@/assets/images/image5.jpg';
import Image6 from '@/assets/images/image6.jpg';

const seminarImages = [
    { id: 1, src: Image6, alt: "Seminar event 1" },
    { id: 2, src: Image5, alt: "Seminar event 2" },
    { id: 3, src: Image4, alt: "Seminar event 3" },
    { id: 4, src: Image3, alt: "Seminar event 4" },
    { id: 5, src: Image2, alt: "Seminar event 5" },
    { id: 6, src: Image1, alt: "Seminar event 6" },
];

const SeminarGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 p-1">
            {seminarImages.map((image) => (
                <div key={image.id} className="relative aspect-square group overflow-hidden">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                </div>
            ))}
        </div>
    );
};

export default SeminarGrid;