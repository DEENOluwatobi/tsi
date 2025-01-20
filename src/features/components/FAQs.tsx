"use client"
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/variants';
  
const FAQs = () => {

    const faqs = [
        {
          id: '1',
          question: "How long are the training programs?",
          answer: "Our programs range from 3 to 6 months, depending on the skill track and your learning pace. Each program is designed to provide comprehensive knowledge while being flexible enough to accommodate working professionals."
        },
        {
          id: '2',
          question: "Are the courses suitable for beginners?",
          answer: "Yes! Our courses are designed for all skill levels. We provide additional support and resources for beginners to ensure everyone can follow along and achieve their learning goals."
        },
        {
          id: '3',
          question: "Do you offer job placement assistance?",
          answer: "Yes, we provide comprehensive job placement support including resume reviews, interview preparation, and direct connections with our hiring partners."
        },
        {
          id: '4',
          question: "What is the learning format?",
          answer: "We offer a blended learning approach with live online classes, recorded sessions, practical projects, and one-on-one mentoring sessions."
        }
      ];

    return (
        <div className="relative flex flex-col gap-4 items-start sm:items-center justify-center py-5 md:py-10 bg-white overflow-hidden">
            <motion.h1 
            variants={fadeIn('down', 0.1)}
            initial='hidden'
            whileInView={'show'}
            className='w-full bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent text-[1.5rem] md:text-[2.5rem] text-dark font-bold text-center md:px-2'
            >   
                Frequently Asked Questions
            </motion.h1>

            <motion.div 
            variants={fadeIn('up', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className='relative z-10 w-full md:w-[70%] lg:w-[60%] mx-auto p-4 sm:mt-6'
            >
                <Accordion  type="single" collapsible className="w-full">
                    {faqs.map((question, index) => (
                        <AccordionItem key={index} value={question.id} className='border-b border-gray-300 helvetica'>
                            <AccordionTrigger className='text-[1em] text-left md:text-[1.1em] font-medium text-dark'>
                                {question.question}
                            </AccordionTrigger>
                            <AccordionContent className='text-[1em] md:text-[1.1em] font-medium md:leading-6 text-textFont'>
                                {question.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}  
                </Accordion> 
            </motion.div>
        </div>
    )
}

export default FAQs;
  