/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
export type QuizStep = {
  id: number
  title: string
  description: string
  image: { url: string }[]
  type: 'single' | 'multiple'
  correct_answer: string
  step: string
  options: {
    id: string
    text: string
  }[]
}

interface QuizStore {
  questions: QuizStep[]
  resetStore: () => void
  result: {
    correct: number
    total: number
    percentage: number
  }
  setQuestions: (questions: any[]) => void
  answers: Record<string, string | string[]>
  setAnswers: (currentStepId: string, value: string, isMulti?: boolean) => void
  getFeedback: (percentage: number) => {
    title: string
    message: string
    color: string
  }
  culculateScore: () => void
}

const initialState = {
  questions: [],
  answers: {},
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  ...initialState,
  resetStore: () => set({ ...initialState }),
  setQuestions: (questions) => set({ questions }),
  result: {
    correct: 0,
    total: 0,
    percentage: 0,
  },
  setAnswers: (
    currentStepId: string,
    value: string,
    isMulti: boolean = false
  ) => {
    set((prev) => {
      if (isMulti) {
        const currentAnswers = (prev.answers[currentStepId] as string[]) || []
        if (currentAnswers.includes(value)) {
          const answers = {
            ...prev.answers,
            [currentStepId]: currentAnswers.filter((item) => item !== value),
          }
          return { answers }
        } else {
          const answers = {
            ...prev.answers,
            [currentStepId]: [...currentAnswers, value],
          }

          return { answers }
        }
      }
      const answers = { ...prev.answers, [currentStepId]: value }

      return { answers }
    })
  },

  getFeedback: (percentage) => {
    if (percentage >= 90) {
      return {
        title: 'Excellent!',
        message: 'You have an outstanding grasp of this subject. Well done!',
        color: 'text-green-600',
      }
    } else if (percentage >= 70) {
      return {
        title: 'Good Job!',
        message:
          'You have a solid understanding of this topic with some room for improvement.',
        color: 'text-blue-600',
      }
    } else if (percentage >= 50) {
      return {
        title: 'Not Bad!',
        message:
          "You have a basic understanding of this subject, but there's definitely room to learn more.",
        color: 'text-yellow-600',
      }
    } else {
      return {
        title: 'Keep Learning!',
        message:
          'This topic seems challenging for you. We recommend reviewing the material and trying again.',
        color: 'text-red-600',
      }
    }
  },
  culculateScore: () => {
    const { questions, answers } = get()
    const total = questions.length - 1
    let correct = 0
    questions.forEach((question) => {
      if (Array.isArray(answers[question.step])) {
        if (
          (question.correct_answer.split(',') as []).some((ans) =>
            answers[question.step].includes(ans)
          )
        ) {
          correct++
        }
      } else {
        if (answers[question.step] === question.correct_answer) {
          correct++
        }
      }
    })
    const result = {
      correct,
      total,
      percentage: Number(((correct / total) * 100).toFixed(0)),
    }
    set({ result })
  },
}))
