import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className='container mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-8'>
      <Card className='w-full'>
        <CardHeader className='pb-4'>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <h2 className='text-center text-3xl font-bold'>Page Not Found</h2>
          </div>
        </CardHeader>

        <CardContent className='space-y-4 text-center'>
          <p className='text-muted-foreground'>
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>

          <div className='py-6'>
            <div className='relative flex justify-center'>
              <div className='text-muted-foreground/20 text-9xl font-bold'>
                404
              </div>
            </div>
          </div>

          <p className='text-muted-foreground'>
            Let&apos;s get you back on track to the quiz!
          </p>
        </CardContent>

        <CardFooter className='flex flex-col justify-center gap-4 pt-6 sm:flex-row'>
          <Button asChild size='lg' className='flex items-center'>
            <Link href='/wellcom'>
              <Home className='mr-2 h-4 w-4' />
              Go to Home
            </Link>
          </Button>

          <Button
            asChild
            variant='outline'
            size='lg'
            className='flex items-center'
          >
            <Link href='javascript:history.back()'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Go Back
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
