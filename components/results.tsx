'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { QuizStep, useQuizStore } from '@/stores/quizStore'
import { Badge } from './ui/badge'

const resources = [
  'Next.js Documentation - nextjs.org',
  'Vercel Blog - Articles about Next.js best practices',
  'React Server Components Documentation',
  'Next.js GitHub repository examples',
]

const QuizResults = () => {
  const { push } = useRouter()

  const {
    questions,
    answers,
    result,
    getFeedback,
    culculateScore,
    resetStore,
  } = useQuizStore()
  useEffect(() => {
    culculateScore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setFeedback(getFeedback(result.percentage || 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  const handleRetakeQuiz = () => {
    push('/quiz')
    resetStore()
  }

  // Get feedback based on score
  const [feedback, setFeedback] = useState(
    {} as { title: string; message: string; color: string }
  )
  return (
    <>
      <CardHeader>
        <div className='mb-2 flex items-center justify-between'>
          <h1 className='text-primary text-xl font-bold'>
            Next.js Quiz Results
          </h1>
        </div>
        <div className='flex flex-col items-center justify-center py-6'>
          <div className='relative mb-6 h-48 w-full overflow-hidden rounded-md'>
            <Image
              src={'/result.png'}
              alt='Results'
              fill
              className='object-cover'
              priority
            />
          </div>
          <div className='relative mb-4 h-32 w-32'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-4xl font-bold'>
                {result.percentage || 0}%
              </div>
            </div>
            <svg className='h-full w-full' viewBox='0 0 100 100'>
              <circle
                className='text-gray-200'
                strokeWidth='10'
                stroke='currentColor'
                fill='transparent'
                r='40'
                cx='50'
                cy='50'
              />
              <circle
                className={`${result.percentage || 0 >= 70 ? 'text-green-500' : result.percentage || 0 >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
                strokeWidth='10'
                strokeDasharray={`${result.percentage * 2.51} 251`}
                strokeLinecap='round'
                stroke='currentColor'
                fill='transparent'
                r='40'
                cx='50'
                cy='50'
                transform='rotate(-90 50 50)'
              />
            </svg>
          </div>
          <h2 className={`text-2xl font-bold ${feedback.color}`}>
            {feedback.title}
          </h2>
          <p className='text-muted-foreground mt-2 text-center'>
            {feedback.message}
          </p>
          <div className='mt-4 text-center'>
            <p className='text-lg'>
              You scored <span className='font-bold'>{result.correct}</span> out
              of <span className='font-bold'>{result.total}</span> questions
              correctly.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Separator />

        <div>
          <h3 className='mb-4 text-lg font-semibold'>Question Review</h3>
          <div className='space-y-6'>
            {Object.entries(answers || {}).map(([key, value], index) => {
              const question =
                questions.find((q) => q.step === key) || ({} as QuizStep)
              const correct = Array.isArray(value)
                ? (question?.correct_answer.split(',') ?? [])?.some((ans) =>
                    value.includes(ans)
                  )
                : question?.correct_answer === value
              return (
                <div
                  key={index}
                  className={`rounded-lg border p-4 ${correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
                >
                  <h4 className='mb-2 font-medium'>
                    Question {index + 1}: {question.title}
                  </h4>
                  <div className='mb-2'>
                    <p className='text-sm font-medium'>Your answer:</p>
                    {question.type === 'single' ? (
                      <p className='text-muted-foreground'>
                        {question.options.find((opt) => opt.id === value)
                          ?.text || 'No answer'}
                      </p>
                    ) : (
                      <p className='text-muted-foreground'>
                        {question.options
                          ?.filter((opt) =>
                            ((value as string[]) || []).includes(opt.id)
                          )
                          .map((opt) => opt.text)
                          .join(', ') || 'No answer'}
                      </p>
                    )}
                  </div>
                  {!correct && (
                    <div>
                      <p className='text-sm font-medium'>Correct answer:</p>
                      {question.type === 'single' ? (
                        <p className='text-muted-foreground'>
                          {
                            question.options.find(
                              (opt) => opt.id === question.correct_answer
                            )?.text
                          }
                        </p>
                      ) : (
                        <p className='text-muted-foreground'>
                          {question.options
                            .filter((opt) =>
                              (
                                question.correct_answer.split(',') as string[]
                              ).includes(opt.id)
                            )
                            .map((opt) => opt.text)
                            .join(', ')}
                        </p>
                      )}
                    </div>
                  )}
                  <Badge
                    className={correct ? 'bg-green-500' : 'bg-red-500'}
                    variant='secondary'
                  >
                    {correct ? 'Correct' : 'Incorrect'}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className='mb-2 text-lg font-semibold'>Recommended Resources</h3>
          <ul className='space-y-2'>
            {resources.map((resource, index) => (
              <li key={index} className='flex items-start'>
                <span className='border-primary mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs'>
                  {index + 1}
                </span>
                <span>{resource}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-2 sm:flex-row'>
        <Button
          variant='outline'
          onClick={handleRetakeQuiz}
          className='w-full sm:w-auto'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Retake Quiz
        </Button>
      </CardFooter>
    </>
  )
}

export default QuizResults
