import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useAppStore } from '@/store/appStore'
import { updateUserYear } from '@/lib/auth'
import { getSubjectsForYear } from '@/lib/subjects'
import { GraduationCap, ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface YearSelectionProps {
  onNext: () => void
  onBack: () => void
}

export const YearSelection = ({ onNext, onBack }: YearSelectionProps) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const user = useAuthStore((state) => state.user)
  const setSelectedYearStore = useAppStore((state) => state.setSelectedYear)

  const handleYearSelect = async (year: number) => {
    setSelectedYear(year)
    setError(null)
  }

  const handleContinue = async () => {
    if (!selectedYear) {
      setError('Please select a year')
      return
    }

    const subjects = getSubjectsForYear(selectedYear)
    if (subjects.length === 0) {
      setError('Subjects not added yet for this year')
      return
    }

    setLoading(true)
    setError(null)

    // Update year in database if not guest
    if (user && !user.guest && user.id) {
      const { error: updateError } = await updateUserYear(user.id, selectedYear)
      if (updateError) {
        setError(updateError)
        setLoading(false)
        return
      }
    }

    setSelectedYearStore(selectedYear)
    setLoading(false)
    onNext()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <Card className="w-full max-w-2xl glass hover-lift animate-fade-in relative z-10 shadow-2xl border-0">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center mb-2">
            <GraduationCap className="h-12 w-12 text-violet-600 animate-bounce-subtle" />
          </div>
          <CardTitle className="text-4xl font-extrabold text-center gradient-text">
            Select Your Year
          </CardTitle>
          <CardDescription className="text-center text-base font-medium">
            Choose your academic year to view available subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((year, index) => (
              <Button
                key={year}
                variant={selectedYear === year ? 'default' : 'outline'}
                size="lg"
                className={cn(
                  "h-20 text-xl font-bold transition-all duration-300 animate-fade-in relative overflow-hidden",
                  selectedYear === year 
                    ? "bg-gradient-to-br from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg glow-effect scale-105" 
                    : "hover:bg-gradient-to-br hover:from-violet-50 hover:to-purple-50 hover:border-violet-300 hover:scale-105",
                  "hover:shadow-xl"
                )}
                onClick={() => handleYearSelect(year)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {selectedYear === year && (
                  <Check className="absolute top-1 right-1 h-5 w-5 animate-scale-in" />
                )}
                Year {year}
              </Button>
            ))}
          </div>

          {selectedYear && (
            <div className="mb-6 p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 animate-scale-in shadow-lg">
              <h3 className="font-bold mb-3 text-lg text-violet-900 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Subjects for Year {selectedYear}:
              </h3>
              {getSubjectsForYear(selectedYear).length > 0 ? (
                <ul className="list-none space-y-2">
                  {getSubjectsForYear(selectedYear).map((subject, idx) => (
                    <li 
                      key={subject.name} 
                      className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        subject.isLab ? "bg-purple-500" : "bg-violet-500"
                      )}></div>
                      <span className="font-medium">{subject.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground font-medium">Subjects not added yet</p>
              )}
            </div>
          )}

          {error && <p className="text-sm text-destructive mb-4">{error}</p>}

          <div className="flex gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 hover:border-violet-300 transition-all duration-300"
              size="lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg glow-effect disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              disabled={!selectedYear || loading}
              size="lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </span>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

