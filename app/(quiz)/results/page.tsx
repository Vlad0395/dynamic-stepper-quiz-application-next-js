import ErrorBoundary from '@/components/error-boundary'
import QuizResults from '@/components/results'
import React from 'react'

const ResultPage = () => {
  return (
    <ErrorBoundary>
      <QuizResults />
    </ErrorBoundary>
  )
}

export default ResultPage
