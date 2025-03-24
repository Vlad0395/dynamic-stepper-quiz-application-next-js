// Quiz data structure

export type QuizStep = {
  id: string
  title: string
  description: string
  image: string
  type: 'single' | 'multiple'
  correct_answer?: string | string[]
  correctAnswer?: string | string[]
  options: {
    id: string
    text: string
  }[]
}
export const quizSteps: Record<string, QuizStep> = {
  step1: {
    id: 'step1',
    title:
      'What is the main difference between the Pages Router and App Router in Next.js?',
    description:
      'Next.js offers two different routing systems with distinct features and capabilities. Identify the key architectural difference.',

    type: 'single',
    options: [
      {
        id: 'a',
        text: 'Pages Router uses file-based routing while App Router uses configuration-based routing',
      },
      {
        id: 'b',
        text: "App Router has built-in support for React Server Components while Pages Router doesn't",
      },
      {
        id: 'c',
        text: "Pages Router supports API routes while App Router doesn't",
      },
      {
        id: 'd',
        text: 'App Router is only available in Next.js version 14 and above',
      },
    ],
    correctAnswer: 'b',
    image:
      '/placeholder.svg?height=200&width=400&text=Next.js+App+Router+vs+Pages+Router',
  },
  step2a: {
    id: 'step2a',
    title:
      'Which of the following methods can be used for data fetching in Next.js App Router?',
    description:
      "Next.js App Router introduces new patterns for data fetching that leverage React's Suspense. Select all valid approaches.",
    type: 'multiple',
    options: [
      { id: 'a', text: 'getServerSideProps()' },
      { id: 'b', text: "fetch() with { cache: 'force-cache' }" },
      { id: 'c', text: 'fetch() with { next: { revalidate: 10 } }' },
      { id: 'd', text: 'useEffect() with fetch()' },
    ],
    correctAnswer: ['b', 'c', 'd'],
    image:
      '/placeholder.svg?height=200&width=400&text=Next.js+Data+Fetching+Methods',
  },
  step2d: {
    id: 'step2d',
    title: 'What is a major advantage of using Server Components in Next.js?',
    description:
      'Server Components allow you to render React components on the server. Identify a key benefit.',
    type: 'single',
    options: [
      { id: 'a', text: 'Improved SEO by pre-rendering content' },
      { id: 'b', text: 'Reduced client-side JavaScript bundle size' },
      { id: 'c', text: 'Easier state management' },
      { id: 'd', text: 'Faster component updates' },
    ],
    correctAnswer: 'b',
    image:
      '/placeholder.svg?height=200&width=400&text=Next.js+Server+Components',
  },
  step3: {
    id: 'step3',
    title:
      'What is the correct way to define a dynamic route segment in Next.js App Router?',
    description:
      'Dynamic routes in Next.js allow you to create pages that can capture values from the URL. Identify the correct file structure.',
    type: 'single',
    options: [
      { id: 'a', text: 'pages/[id].js' },
      { id: 'b', text: 'app/[id]/page.js' },
      { id: 'c', text: 'app/pages/[id].js' },
      { id: 'd', text: 'app/dynamic/[id]/index.js' },
    ],
    correctAnswer: 'b',
    image: '/placeholder.svg?height=200&width=400&text=Next.js+Dynamic+Routes',
  },
  step4: {
    id: 'step4',
    title:
      'Which of the following statements about Server Components in Next.js are true?',
    description:
      'React Server Components introduce a new way to build applications that combine client and server rendering. Select all true statements.',
    type: 'multiple',
    options: [
      { id: 'a', text: 'They can use browser APIs like localStorage' },
      { id: 'b', text: 'They can directly access backend resources' },
      {
        id: 'c',
        text: 'They reduce the JavaScript bundle size sent to the client',
      },
      { id: 'd', text: 'They can use React hooks like useState' },
    ],
    correctAnswer: ['b', 'c'],
    image:
      '/placeholder.svg?height=200&width=400&text=Next.js+Server+Components',
  },
  step5: {
    id: 'step5',
    title: 'What is the correct way to implement a Server Action in Next.js?',
    description:
      'Server Actions allow you to run asynchronous code directly on the server from your client or server components. Identify the correct implementation.',
    type: 'single',
    options: [
      { id: 'a', text: "Add 'use server' directive at the top of a function" },
      { id: 'b', text: 'Create a function in the app/api directory' },
      { id: 'c', text: 'Use the getServerSideProps function' },
      { id: 'd', text: 'Import the serverAction from next/server' },
    ],
    correctAnswer: 'a',
    image: '/placeholder.svg?height=200&width=400&text=Next.js+Server+Actions',
  },
}
