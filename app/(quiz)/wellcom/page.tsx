import ErrorBoundary from '@/components/error-boundary'
// import Quiz from '@/components/quiz'
// import Results from '@/components/results'

import Wellcom from '@/components/wellcom'

// enum Steps {
//   wellcom = 'wellcom',
//   quiz = 'quiz',
//   results = 'results',
// }

export default function WellcomPage() {
  return (
    <ErrorBoundary>
      <Wellcom />
    </ErrorBoundary>
  )
}
