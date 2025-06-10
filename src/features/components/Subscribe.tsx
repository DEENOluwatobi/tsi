'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase.config' 

interface NewsletterSubscription {
  email: string
  subscribedAt: any 
  userAgent?: string
  ipAddress?: string
}

const Subscribe = () => {
  const pathname = usePathname()
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage('Please enter your email address')
      setIsSuccess(false)
      return
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address')
      setIsSuccess(false)
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const subscriptionData: NewsletterSubscription = {
        email: email.toLowerCase().trim(),
        subscribedAt: serverTimestamp(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      }

      await addDoc(collection(db, 'newsletter'), subscriptionData)
      
      setMessage('Successfully subscribed to our newsletter!')
      setIsSuccess(true)
      setEmail('')
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      setMessage('Failed to subscribe. Please try again.')
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }

    setTimeout(() => {
      setMessage('')
      setIsSuccess(false)
    }, 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (message) {
      setMessage('')
      setIsSuccess(false)
    }
  }

  return (
    <div className={`${['/dashboard', '/tutor/dashboard', '/admin/dashboard'].some(path => pathname.startsWith(path)) && 'hidden'} bg-[#060019] w-full`}>
      <div className='w-[90%] md:w-[80%] mx-auto flex flex-col lg:flex-row justify-center lg:justify-start items-center text-white py-2 md:py-10 gap-2 md:gap-4'>
        <span className='text-[1em] md:text-[1.4em] font-medium'>Join our Newsletter</span>
        
        <form onSubmit={handleSubscribe} className='flex-grow w-full lg:w-auto flex flex-col lg:flex-row gap-2 md:gap-4'>
          <div className='flex-grow w-full lg:w-auto'>
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              disabled={isLoading}
              className='rounded-full bg-gray-100 text-gray-700 placeholder:text-gray-400
                         px-4 py-3 md:py-4 w-full border-none outline-none text-[.8em] md:text-[.9em]
                         disabled:opacity-50 disabled:cursor-not-allowed'
              placeholder='Enter email to join our newsletter'
              required
            />
          </div>
          
          <Button 
            type="submit"
            disabled={isLoading || !email.trim()}
            className='w-full md:w-[200px] h-full lg:w-auto bg-gradient-to-r from-[#21367a] to-[#1b84fc] 
                       text-white text-[.8em] md:text-[.9em] px-6 py-4 rounded-full cursor-pointer
                       disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity'
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
      
      {/* Message Display */}
      {message && (
        <div className='w-[90%] md:w-[80%] mx-auto pb-4'>
          <p className={`text-center text-sm ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        </div>
      )}
    </div>
  )
}

export default Subscribe