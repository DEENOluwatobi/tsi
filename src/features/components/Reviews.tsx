'use client'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { ColonIcon } from '@/icons';

const Reviews = () => {

  const data = [
    { 
        name: 'Boluwatife Sowunmi', 
        review: 'During the Skill up program, I gained a lot of thing. But let me just mention some. First and foremost, I was thought how to interact with others,  I got to learn how to teach people and how to stand in front of my fellow student and talk. Furthermore, I got the chance to learn the concept of designing, in term of colour choosing, in term of font choosing and in term of designing. The summarize my experience with the TSI, I gain a lot, both life education and work education. And I am very happy I joined the TSI', 
        stars: 5 
    },
    { 
        name: 'Quadry Shakeerah', 
        review: 'I want to talk about how TSI training made a big impact in my life. I was a young girl who does not know how to operate a Laptop and looking for ways in which I can learn it. Fortunately, I found out about TSI training and I attended the training. During the training I learnt alot of things. I was taught how to use Microsoft word and how to design on Canva Now, I can actually do anything I want on Microsoft word and Canva. This was achieved all thanks to TSI training', 
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