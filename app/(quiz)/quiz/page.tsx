import ErrorBoundary from '@/components/error-boundary'
import StepperQuiz from '@/components/quiz'
import axios from 'axios'
const fetchQuestions = async () => {
  const fields =
    'fields[0]=title&fields[1]=description&fields[2]=options&fields[3]=type&fields[4]=correct_answer&fields[5]=step'
  try {
    const url =
      process.env.NEXT_PUBLIC_API_URL_STRAPI + '/api/questions?' + fields
    const response = await axios.get(url)

    return response.data
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

const Quiz = async () => {
  const { data } = await fetchQuestions()
  return (
    <ErrorBoundary>
      <StepperQuiz data={data} />
    </ErrorBoundary>
  )
}

export default Quiz
