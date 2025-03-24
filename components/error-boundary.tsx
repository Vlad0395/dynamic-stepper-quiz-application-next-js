'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: undefined })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className='container mx-auto max-w-3xl px-4 py-8'>
          <Card className='w-full'>
            <CardHeader className='pb-4'>
              <div className='flex flex-col items-center justify-center space-y-2'>
                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
                  <AlertTriangle className='h-8 w-8 text-red-600' />
                </div>
                <h2 className='text-center text-2xl font-bold'>
                  Oops! Something went wrong
                </h2>
              </div>
            </CardHeader>

            <CardContent className='space-y-4'>
              <p className='text-muted-foreground text-center'>
                We encountered an unexpected error while running the quiz.
              </p>

              <div className='bg-muted max-h-[200px] overflow-auto rounded-md p-4'>
                <p className='font-mono text-sm'>
                  {this.state.error?.message || 'Unknown error'}
                </p>
              </div>
            </CardContent>

            <CardFooter className='flex justify-center pt-6'>
              <Button
                onClick={this.resetErrorBoundary}
                size='lg'
                className='flex items-center'
              >
                <RefreshCw className='mr-2 h-4 w-4' />
                Try Again
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
