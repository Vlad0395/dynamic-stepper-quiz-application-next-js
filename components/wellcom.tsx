'use client'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'

import React from 'react'
import { useRouter } from 'next/navigation'

const Wellcom = () => {
  const { push } = useRouter()

  return (
    <>
      <>
        <CardHeader className='pb-4'>
          <h2 className='text-center text-3xl font-bold'>
            Welcome to the Quiz!
          </h2>
        </CardHeader>

        <CardContent className='space-y-6'>
          <div className='relative mx-auto h-[200px] w-full max-w-[305px] overflow-hidden rounded-lg'>
            <Image
              src='/wellcom_page.webp'
              alt='Quiz welcome image'
              fill
              className='object-cover'
              priority
            />
          </div>

          <div className='space-y-4 text-center'>
            <h3 className='text-xl font-semibold'>Test Your Knowledge</h3>
            <p className='text-muted-foreground'>
              This quiz consists of 5 questions covering various topics. See how
              many you can answer correctly!
            </p>
            <ul className='mx-auto max-w-md space-y-2 text-left'>
              <li className='flex items-center'>
                <Check className='text-primary mr-2 h-4 w-4' />
                <span>5 interactive questions</span>
              </li>
              <li className='flex items-center'>
                <Check className='text-primary mr-2 h-4 w-4' />
                <span>Mix of single and multiple-choice questions</span>
              </li>
              <li className='flex items-center'>
                <Check className='text-primary mr-2 h-4 w-4' />
                <span>Get your score at the end</span>
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className='flex justify-center pt-6'>
          <Button
            onClick={() => push('/quiz')}
            size='lg'
            className='flex items-center'
          >
            Start Quiz
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </CardFooter>
      </>
    </>
  )
}

export default Wellcom
