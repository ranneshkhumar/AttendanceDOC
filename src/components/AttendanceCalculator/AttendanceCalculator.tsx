import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppStore } from '@/store/appStore'
import { getSubjectsForYear } from '@/lib/subjects'
import { calculateAttendance, validateAttendanceData } from '@/lib/attendance'
import { AttendanceData, AttendanceResult } from '@/types'
import { CheckCircle2, XCircle, AlertCircle, Calculator, Calendar, ArrowLeft, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AttendanceCalculatorProps {
  onNext: () => void
  onBack: () => void
}

export const AttendanceCalculator = ({ onNext, onBack }: AttendanceCalculatorProps) => {
  const selectedYear = useAppStore((state) => state.selectedYear)
  const attendanceData = useAppStore((state) => state.attendanceData)
  const setAttendanceData = useAppStore((state) => state.setAttendanceData)
  const setAttendanceResults = useAppStore((state) => state.setAttendanceResults)

  const subjects = selectedYear ? getSubjectsForYear(selectedYear) : []
  
  // Load existing data if available, otherwise use default date
  const existingDate = attendanceData.length > 0 
    ? attendanceData[0].date.toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0]
  
  // Common date for all subjects - load from existing data if available
  const [commonDate, setCommonDate] = useState<string>(existingDate)
  
  // Initialize form data with existing attendance data if available
  const initializeFormData = () => {
    const initialData: Record<string, {
      classesAttended: string
      classesHeld: string
      classesRemaining: string
    }> = {}
    
    subjects.forEach((subject) => {
      const existing = attendanceData.find(d => d.subject === subject.name)
      if (existing) {
        initialData[subject.name] = {
          classesAttended: existing.classesAttended.toString(),
          classesHeld: existing.classesHeld.toString(),
          classesRemaining: existing.classesRemaining?.toString() || '',
        }
      } else {
        initialData[subject.name] = {
          classesAttended: '',
          classesHeld: '',
          classesRemaining: '',
        }
      }
    })
    
    return initialData
  }
  
  const [formData, setFormData] = useState<Record<string, {
    classesAttended: string
    classesHeld: string
    classesRemaining: string
  }>>(initializeFormData)
  
  // Update form data when subjects change or when navigating back
  useEffect(() => {
    if (subjects.length > 0) {
      const updatedData = initializeFormData()
      setFormData(updatedData)
      if (attendanceData.length > 0) {
        setCommonDate(attendanceData[0].date.toISOString().split('T')[0])
      }
    }
  }, [selectedYear, subjects.length])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [subjectResults, setSubjectResults] = useState<Record<string, AttendanceResult>>({})

  const handleInputChange = (subjectName: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [subjectName]: {
        ...prev[subjectName],
        [field]: value,
      }
    }))
    
    // Clear error when user starts typing
    if (errors[subjectName]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[subjectName]
        return newErrors
      })
    }
  }

  // Recalculate when form data or date changes
  useEffect(() => {
    subjects.forEach(subject => {
      const data = formData[subject.name]
      
      // Clear result if fields are empty
      if (!data.classesAttended || !data.classesHeld) {
        setSubjectResults(prev => {
          const newResults = { ...prev }
          delete newResults[subject.name]
          return newResults
        })
        return
      }

      const classesAttended = parseFloat(data.classesAttended)
      const classesHeld = parseFloat(data.classesHeld)
      const classesRemaining = data.classesRemaining ? parseFloat(data.classesRemaining) : undefined

      if (isNaN(classesAttended) || isNaN(classesHeld)) {
        setSubjectResults(prev => {
          const newResults = { ...prev }
          delete newResults[subject.name]
          return newResults
        })
        return
      }

      const attendanceData: AttendanceData = {
        subject: subject.name,
        classesAttended,
        classesHeld,
        classesRemaining,
        date: new Date(commonDate),
      }

      const validationError = validateAttendanceData(attendanceData)
      if (validationError) {
        setErrors(prev => ({ ...prev, [subject.name]: validationError }))
        setSubjectResults(prev => {
          const newResults = { ...prev }
          delete newResults[subject.name]
          return newResults
        })
        return
      }

      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[subject.name]
        return newErrors
      })

      const result = calculateAttendance(attendanceData)
      setSubjectResults(prev => ({
        ...prev,
        [subject.name]: result
      }))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, commonDate, subjects.length])

  const handleViewSummary = () => {
    const newErrors: Record<string, string> = {}
    const attendanceDataList: AttendanceData[] = []
    const results: AttendanceResult[] = []

    subjects.forEach((subject) => {
      const data = formData[subject.name]
      const classesAttended = parseFloat(data.classesAttended)
      const classesHeld = parseFloat(data.classesHeld)
      const classesRemaining = data.classesRemaining ? parseFloat(data.classesRemaining) : undefined

      if (!data.classesAttended || !data.classesHeld) {
        newErrors[subject.name] = 'Please fill in classes attended and classes held'
        return
      }

      const attendanceData: AttendanceData = {
        subject: subject.name,
        classesAttended,
        classesHeld,
        classesRemaining,
        date: new Date(commonDate),
      }

      const validationError = validateAttendanceData(attendanceData)
      if (validationError) {
        newErrors[subject.name] = validationError
      } else {
        attendanceDataList.push(attendanceData)
        const result = calculateAttendance(attendanceData)
        results.push(result)
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setAttendanceData(attendanceDataList)
    setAttendanceResults(results)
    onNext()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 p-4 py-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Card className="mb-6 glass hover-lift animate-fade-in shadow-2xl border-0">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-center mb-2">
              <Calculator className="h-10 w-10 text-emerald-600 animate-bounce-subtle" />
            </div>
            <CardTitle className="text-4xl font-extrabold text-center gradient-text">
              AttendanceDOC
            </CardTitle>
            <CardDescription className="text-center text-base font-medium">
              Enter attendance data for each subject. Results will appear automatically.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Common Date Picker */}
        <Card className="mb-6 glass hover-lift animate-scale-in shadow-xl border-0">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Label htmlFor="common-date" className="text-lg font-bold flex items-center gap-2 text-emerald-700">
                <Calendar className="h-5 w-5" />
                Date (Common for all subjects)
              </Label>
              <Input
                id="common-date"
                type="date"
                value={commonDate}
                onChange={(e) => setCommonDate(e.target.value)}
                className="max-w-xs border-2 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 transition-all duration-300"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {subjects.map((subject) => {
            const data = formData[subject.name]
            const error = errors[subject.name]
            const result = subjectResults[subject.name]
            const minPercent = subject.isLab ? 80 : 75

            return (
              <div key={subject.name} className="space-y-4 animate-fade-in">
                <Card className={cn(
                  "hover-lift transition-all duration-300 shadow-lg",
                  result && result.status === 'SAFE' ? "border-2 border-green-400" : result && result.status === 'UNSAFE' ? "border-2 border-red-400" : "border-2 border-emerald-200"
                )}>
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <TrendingUp className={cn(
                        "h-5 w-5",
                        result && result.status === 'SAFE' ? "text-green-600" : result && result.status === 'UNSAFE' ? "text-red-600" : "text-emerald-600"
                      )} />
                      {subject.name}
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        (Minimum: {minPercent}%)
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${subject.name}-attended`} className="font-semibold">Classes Attended</Label>
                        <Input
                          id={`${subject.name}-attended`}
                          type="number"
                          min="0"
                          placeholder="0"
                          value={data.classesAttended}
                          onChange={(e) => handleInputChange(subject.name, 'classesAttended', e.target.value)}
                          className="border-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${subject.name}-held`} className="font-semibold">Classes Held</Label>
                        <Input
                          id={`${subject.name}-held`}
                          type="number"
                          min="0"
                          placeholder="0"
                          value={data.classesHeld}
                          onChange={(e) => handleInputChange(subject.name, 'classesHeld', e.target.value)}
                          className="border-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${subject.name}-remaining`} className="font-semibold">Classes Remaining (Optional)</Label>
                        <Input
                          id={`${subject.name}-remaining`}
                          type="number"
                          min="0"
                          placeholder="0"
                          value={data.classesRemaining}
                          onChange={(e) => handleInputChange(subject.name, 'classesRemaining', e.target.value)}
                          className="border-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 transition-all duration-300"
                        />
                      </div>
                    </div>
                    {error && (
                      <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg animate-scale-in">
                        <p className="text-sm text-red-800 font-medium">{error}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Show result immediately for this subject */}
                {result && (
                  <Card className={cn(
                    "animate-scale-in hover-lift shadow-xl",
                    result.status === 'SAFE' ? 'border-2 border-green-500 glow-effect-green' : 'border-2 border-red-500 glow-effect-red'
                  )}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Attendance Result - {subject.name}</CardTitle>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                          result.status === 'SAFE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {result.status === 'SAFE' ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          <span className="font-semibold">{result.status}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Percentage</p>
                          <p className="text-2xl font-bold">{result.percentage.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Minimum Required</p>
                          <p className="text-2xl font-bold">{result.minPercent}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Day of Week</p>
                          <p className="text-lg font-semibold">{result.dayOfWeek}</p>
                        </div>
                        {result.classesRemaining !== undefined && (
                          <div>
                            <p className="text-sm text-muted-foreground">Remaining Classes</p>
                            <p className="text-2xl font-bold">{result.classesRemaining}</p>
                          </div>
                        )}
                      </div>

                      {result.message && (
                        <div className={`p-4 rounded-lg flex items-start gap-3 ${
                          result.status === 'SAFE' 
                            ? 'bg-green-50 border border-green-200' 
                            : result.maxPossible !== undefined && result.maxPossible < result.minPercent
                            ? 'bg-red-50 border border-red-200'
                            : 'bg-yellow-50 border border-yellow-200'
                        }`}>
                          <AlertCircle className={`h-5 w-5 mt-0.5 ${
                            result.status === 'SAFE' 
                              ? 'text-green-600' 
                              : result.maxPossible !== undefined && result.maxPossible < result.minPercent
                              ? 'text-red-600'
                              : 'text-yellow-600'
                          }`} />
                          <div>
                            <p className={`font-medium ${
                              result.status === 'SAFE' 
                                ? 'text-green-800' 
                                : result.maxPossible !== undefined && result.maxPossible < result.minPercent
                                ? 'text-red-800'
                                : 'text-yellow-800'
                            }`}>
                              {result.message}
                            </p>
                            {result.maxPossible !== undefined && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Maximum possible: {result.maxPossible.toFixed(2)}%
                              </p>
                            )}
                            {result.additionalClassesNeeded !== undefined && result.additionalClassesNeeded > 0 && (
                              <p className="text-sm font-semibold text-red-800 mt-2">
                                Additional classes needed: {result.additionalClassesNeeded} class{result.additionalClassesNeeded > 1 ? 'es' : ''}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {result.required !== undefined && result.required > 0 && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">
                            You must attend <span className="font-bold">{result.required}</span> out of{' '}
                            <span className="font-bold">{result.classesRemaining}</span> remaining classes.
                          </p>
                        </div>
                      )}

                      {result.canSkip !== undefined && result.canSkip > 0 && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm font-medium text-green-800">
                            You can skip <span className="font-bold">{result.canSkip}</span> out of{' '}
                            <span className="font-bold">{result.classesRemaining}</span> remaining classes.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <Button 
            onClick={onBack} 
            variant="outline" 
            size="lg" 
            className="min-w-[200px] hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-300 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button 
            onClick={handleViewSummary} 
            size="lg" 
            className="min-w-[200px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg glow-effect transition-all duration-300"
          >
            View Complete Summary
          </Button>
        </div>
      </div>
    </div>
  )
}

