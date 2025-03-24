import React from 'react'
import { Card } from '@/components/ui/card'

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='h-full w-full'>
      <div className='jusify-content mx-auto flex h-full max-w-3xl items-center p-4'>
        <Card className='hide-scrollbar max-h-full w-full overflow-auto'>
          {children}
        </Card>
      </div>
    </div>
  )
}

export default Layout
