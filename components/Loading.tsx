import React from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className='container mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-8'>
      <Card className='w-full'>
        <CardHeader className='pb-4'>
          <div className='mb-2 flex items-center justify-between'>
            <Skeleton className='h-8 w-48' />
            <Skeleton className='h-4 w-20' />
          </div>
          <Skeleton className='h-2 w-full' />
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Image placeholder */}
          <Skeleton className='h-[200px] w-full rounded-lg' />

          {/* Question placeholder */}
          <div className='space-y-4'>
            <Skeleton className='h-6 w-3/4' />

            {/* Options placeholder */}
            <div className='space-y-3'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='flex items-center space-x-2 rounded-md border p-3'
                >
                  <Skeleton className='h-4 w-4 rounded-full' />
                  <Skeleton className='h-4 flex-grow' />
                </div>
              ))}
            </div>
          </div>

          <div className='flex items-center justify-center pt-4'>
            <Loader2 className='text-primary h-8 w-8 animate-spin' />
            <span className='ml-2 text-lg font-medium'>Loading quiz...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Loading
