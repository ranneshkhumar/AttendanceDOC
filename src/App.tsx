import { useState, useEffect } from 'react'
import { AuthForm } from './components/Auth/AuthForm'
import { YearSelection } from './components/YearSelection/YearSelection'
import { AttendanceCalculator } from './components/AttendanceCalculator/AttendanceCalculator'
import { SummaryReport } from './components/SummaryReport/SummaryReport'
import { useAuthStore } from './store/authStore'
import { useAppStore } from './store/appStore'

type AppStep = 'auth' | 'year' | 'calculator' | 'summary'

function App() {
  const [step, setStep] = useState<AppStep>('auth')
  const user = useAuthStore((state) => state.user)
  const attendanceResults = useAppStore((state) => state.attendanceResults)

  useEffect(() => {
    if (user) {
      setStep('year')
    }
  }, [user])

  useEffect(() => {
    if (attendanceResults.length > 0) {
      setStep('summary')
    }
  }, [attendanceResults])

  const handleAuthSuccess = () => {
    setStep('year')
  }

  const handleYearNext = () => {
    setStep('calculator')
  }

  const handleYearBack = () => {
    setStep('auth')
  }

  const handleCalculatorNext = () => {
    setStep('summary')
  }

  const handleCalculatorBack = () => {
    setStep('year')
  }

  const handleSummaryBack = () => {
    setStep('calculator')
  }

  return (
    <div className="min-h-screen">
      {step === 'auth' && <AuthForm onSuccess={handleAuthSuccess} />}
      {step === 'year' && <YearSelection onNext={handleYearNext} onBack={handleYearBack} />}
      {step === 'calculator' && <AttendanceCalculator onNext={handleCalculatorNext} onBack={handleCalculatorBack} />}
      {step === 'summary' && <SummaryReport onBack={handleSummaryBack} />}
    </div>
  )
}

export default App

