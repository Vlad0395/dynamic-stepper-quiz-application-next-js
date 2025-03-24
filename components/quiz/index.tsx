'use client'

import { useLayoutEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { QuizStep, useQuizStore } from '@/stores/quizStore'
import { sendGAEvent } from '@next/third-parties/google'

const StepperQuiz = ({ data }: { data: QuizStep[] }) => {
  const { replace, push } = useRouter()
  const { answers, setAnswers, setQuestions } = useQuizStore()
  const [progress, setProgress] = useState(20)

  const searchParams = useSearchParams()
  const step = searchParams.get('step')

  useLayoutEffect(() => {
    setQuestions(data)
    replace(`/quiz?step=${step ? step : data[0]?.step}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentStep =
    data?.find((d) => d.step.toString() === step) || ({} as QuizStep)

  const handlePrevious = () => {
    const prevStep = data.findIndex((d) => d.step === currentStep.step) - 1
    replace(`/quiz?step=${data[prevStep].step}`)
    setProgress(progress - 20)
  }
  const handleNext = () => {
    const correct = currentStep.correct_answer === answers[currentStep.step]
    let nextStep = 0
    sendGAEvent({
      action: 'click',
      category: 'quiz',
      label: currentStep.step,
      value: answers[currentStep.step],
    })
    if (correct && currentStep.step === '1') {
      nextStep = data.findIndex((d) => d.step === currentStep.step) + 1
    } else if (!correct && currentStep.step === '1')
      nextStep = data.findIndex((d) => d.step === currentStep.step) + 2
    else nextStep = data.findIndex((d) => d.step === currentStep.step) + 1
    if (nextStep === data.length - 1) {
      push('/results')

      return
    }
    replace(`/quiz?step=${data[nextStep].step}`)
    setProgress(progress + 20)
  }
  const hasAnswer = () => {
    if (!answers[currentStep.step]) return false
    if (currentStep.type === 'multiple') {
      return (answers[currentStep.step] as string[]).length > 0
    }
    return !!answers[currentStep.step]
  }
  return (
    <>
      <CardHeader className='pb-0'>
        <div className='mb-2 flex items-center justify-between'>
          <h1 className='text-primary text-xl font-bold'>
            Next.js Programming Quiz
          </h1>
          <div className='text-muted-foreground text-sm'>
            Step {data.findIndex((d) => d.id === currentStep.id) + 1} of{' '}
            {data.length - 1}
            <span className='ml-2 text-xs'>
              (
              {data.length -
                data.findIndex((d) => d.step === currentStep.step) -
                2}{' '}
              steps left)
            </span>
          </div>
        </div>
        <Progress value={progress} className='mb-4 h-2' />
        <div className='relative mx-auto mb-4 h-48 w-full overflow-hidden rounded-md'>
          <Image
            src={currentStep.image?.[0]?.url || '/placeholder.svg'}
            alt={currentStep.title}
            fill
            className='object-cover'
            priority
          />
        </div>
        <h2 className='text-2xl font-bold'>{currentStep.title}</h2>
        <p className='text-muted-foreground'>{currentStep.description}</p>
      </CardHeader>
      <CardContent className='pt-6'>
        {currentStep.type === 'single' ? (
          <RadioGroup
            value={(answers[currentStep.step] as string) || ''}
            onValueChange={(value) => {
              setAnswers(currentStep.step, value)
            }}
            className='space-y-3'
          >
            {Object.keys(currentStep).length > 0 &&
              currentStep?.options.map((option) => (
                <div key={option.id} className='flex items-center space-x-2'>
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label
                    htmlFor={option.id}
                    className='flex-1 cursor-pointer py-2'
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
          </RadioGroup>
        ) : (
          <div className='space-y-3'>
            {Object.keys(currentStep).length > 0 &&
              currentStep.options.map((option) => (
                <div key={option.id} className='flex items-center space-x-2'>
                  <Checkbox
                    id={option.id}
                    checked={(
                      (answers[currentStep.step] as string[]) || []
                    ).includes(option.id)}
                    onCheckedChange={() =>
                      setAnswers(currentStep.step, option.id, true)
                    }
                  />
                  <Label
                    htmlFor={option.id}
                    className='flex-1 cursor-pointer py-2'
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
          </div>
        )}
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          variant='outline'
          onClick={() =>
            data.findIndex((d) => d.id === currentStep.id) === 0
              ? push('/wellcom')
              : handlePrevious()
          }
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          {data.findIndex((d) => d.id === currentStep.id) === 0
            ? 'Cancel'
            : 'Previous'}
        </Button>
        <Button onClick={handleNext} disabled={!hasAnswer()}>
          {data.findIndex((d) => d.id === currentStep.id) ===
          data.length - 1 ? (
            <>
              Complete
              <Check className='ml-2 h-4 w-4' />
            </>
          ) : (
            <>
              Next
              <ArrowRight className='ml-2 h-4 w-4' />
            </>
          )}
        </Button>
      </CardFooter>
    </>
  )
}
export default StepperQuiz
