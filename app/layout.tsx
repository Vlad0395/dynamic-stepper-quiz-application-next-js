import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

import './globals.css'

export const metadata: Metadata = {
  title: 'Stepper Quiz – Content Breakdown with Descriptions',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALITICS_TAG && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALITICS_TAG} />
      )}

    </html>
  )
}
