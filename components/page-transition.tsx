'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type TransitionType = 'fade' | 'slide' | 'scale' | 'rotate' | 'flip'

interface PageTransitionProps {
  children: ReactNode
  transitionType?: TransitionType
  duration?: number
}

export default function PageTransition({
  children,
  transitionType = 'fade',
  duration = 0.3,
}: PageTransitionProps) {
  const pathname = usePathname()

  const getTransitionVariants = (type: TransitionType) => {
    switch (type) {
      case 'slide':
        return {
          initial: { x: '100%' },
          animate: { x: 0 },
          exit: { x: '-100%' },
        }

      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }
    }
  }

  const variants = getTransitionVariants(transitionType)

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial='initial'
        animate='animate'
        exit='exit'
        variants={variants}
        transition={{ duration }}
        className='w-full'
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
