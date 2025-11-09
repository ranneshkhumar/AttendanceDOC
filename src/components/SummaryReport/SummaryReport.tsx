import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/appStore'
import { CheckCircle2, XCircle, AlertCircle, FileText, Edit } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SummaryReportProps {
  onBack: () => void
}

export const SummaryReport = ({ onBack }: SummaryReportProps) => {
  const attendanceResults = useAppStore((state) => state.attendanceResults)

  const safeCount = attendanceResults.filter(r => r.status === 'SAFE').length
  const unsafeCount = attendanceResults.filter(r => r.status === 'UNSAFE').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-100 p-4 py-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Card className="mb-6 glass hover-lift animate-fade-in shadow-2xl border-0">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-10 w-10 text-rose-600 animate-bounce-subtle" />
            </div>
            <CardTitle className="text-4xl font-extrabold text-center gradient-text">
              Attendance Summary Report
            </CardTitle>
            <CardDescription className="text-center text-base font-medium">
              Overview of your attendance status for all subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 justify-center mb-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-300 shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <span className="font-bold text-green-700 text-lg">Safe: {safeCount}</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-100 to-rose-100 rounded-xl border-2 border-red-300 shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <XCircle className="h-6 w-6 text-red-600" />
                <span className="font-bold text-red-700 text-lg">Unsafe: {unsafeCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {attendanceResults.map((result, index) => (
            <Card 
              key={result.subject} 
              className={cn(
                "hover-lift shadow-xl animate-fade-in",
                result.status === 'SAFE' ? 'border-2 border-green-500 glow-effect-green' : 'border-2 border-red-500 glow-effect-red'
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{result.subject}</CardTitle>
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
          ))}
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <Button 
            onClick={onBack} 
            size="lg" 
            className="min-w-[250px] bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-lg glow-effect transition-all duration-300"
          >
            <Edit className="mr-2 h-4 w-4" />
            Update Attendance
          </Button>
        </div>
      </div>
    </div>
  )
}

