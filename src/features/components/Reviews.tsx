'use client'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { ColonIcon } from '@/icons';

const Reviews = () => {

  const data = [
    { 
        name: 'Aisha Bello', 
        review: 'SkillUp Initiative changed my life! I learned valuable tech skills that helped me secure a job in web development. The training was hands-on and easy to follow.', 
        stars: 5 
    },
    { 
        name: 'Samuel Adeyemi', 
        review: 'I’m so grateful for SkillUp Initiative. They not only taught me programming but also helped me build confidence in my abilities. Highly recommend it to anyone eager to learn!', 
        stars: 5 
    },
    { 
        name: 'Mariam Yusuf', 
        review: 'The mentorship and support I received from SkillUp Initiative were exceptional. I now have the skills to create apps and work on real-world projects.', 
        stars: 4 
    },
    { 
        name: 'Chinedu Okafor', 
        review: 'SkillUp Initiative is the best thing that ever happened to me. Their tech programs are thorough, and the trainers are always ready to help. I’ve already started freelancing!', 
        stars: 5 
    },
  ];

  return (
    <div className='w-full bg-gradient-to-l from-[bg-gradient-to-r from-[#21367a] to-[#1b84fc] py-10 text-white justify-center items-center flex flex-col gap-2 md:gap-8'>
      <h1 className='text-[.7em] md:text-[.8em] font-bold text-white'>FEW REVIEWS YOU SHOULD SEE</h1>
      <div className='text-xl md:text-3xl font-semibold'>
        <span>What people are saying about us</span>
      </div>

      <Carousel className="w-[95%] md:w-[85%]">

        <CarouselContent className='w-full md:w-[50%] h-[300px] md:h-[320px]'>
          {data.map((item, index) => (
            <CarouselItem key={index} className=''>
              <div className="p-1">
                <Card className='w-full h-full border-none flex flex-col gap-2'>
                  <CardContent className="flex w-full h-[200px] items-center justify-center p-6">
                    <div className='flex flex-col gap-6'>
                      <ColonIcon className='w-10 md:w-20'/>
                      <p className='text-[.8em] lg:text-[1em]'>
                        {item.review}
                      </p>
                    </div>
                  </CardContent>

                  <div className='text-[.8em] md:text-[.9em] px-6'>
                    <h3>{item.name}</h3>
                    <div>
                      {[...Array(item.stars)].map((_, starIndex) => (
                        <span key={starIndex} className="text-white">&#9733;</span>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className='flex gap-2 justify-end items-center'>
          <CarouselPrevious className='w-14 h-14'/>
          <CarouselNext className='w-14 h-14'/>
        </div>
      </Carousel>
    </div>
  )
}

export default Reviews