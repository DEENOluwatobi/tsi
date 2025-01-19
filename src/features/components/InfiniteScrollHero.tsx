'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image1 from '@/assets/images/image.jpg';
import Image2 from '@/assets/images/image2.jpg';
import Image3 from '@/assets/images/image3.jpg';
import Image4 from '@/assets/images/image4.jpg';
import Image5 from '@/assets/images/image5.jpg';
import Image6 from '@/assets/images/image6.jpg';
import Image from 'next/image';

const InfiniteScrollHero = () => {
  const speeds = [20, 30, 25];
  
  const columnImages = [
    [
      { src: Image1, height: 400 },
      { src: Image2, height: 300 },
      { src: Image3, height: 350 },
      { src: Image4, height: 450 },
    ],
    [
      { src: Image3, height: 380 },
      { src: Image4, height: 320 },
      { src: Image5, height: 400 },
      { src: Image6, height: 360 },
    ],
    [
      { src: Image6, height: 420 },
      { src: Image4, height: 340 },
      { src: Image5, height: 380 },
      { src: Image3, height: 400 },
    ]
  ];

  const [positions, setPositions] = useState([0, 0, 0]);
  const lastFrameRef = useRef(Date.now());

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastFrameRef.current) / 1000; 
      lastFrameRef.current = now;

      setPositions(prevPositions =>
        prevPositions.map((pos, idx) => {
          const newPos = pos + speeds[idx] * delta;
          const columnHeight = columnImages[idx].reduce((sum, img) => sum + img.height, 0);
          return newPos > columnHeight ? 0 : newPos;
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []); 

  return (
    <div className="w-full h-screen bg-transparent flex justify-between px-4">
      {[0, 1, 2].map((columnIndex) => (
        <div
          key={columnIndex}
          className="relative h-full w-1/3 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent z-10" />
          
          <div
            className="absolute w-full transform"
            style={{
              transform: `translateY(-${positions[columnIndex]}px)`,
            }}
          >
            
            {[...columnImages[columnIndex], ...columnImages[columnIndex]].map((image, imageIndex) => (
              <div
                key={imageIndex}
                className="p-4"
                style={{ height: `${image.height}px` }}
              >
                <Image
                  src={image.src}
                  alt={`Scrolling image ${imageIndex}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfiniteScrollHero;