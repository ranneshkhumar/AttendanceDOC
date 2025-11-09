import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signUp, signIn } from '@/lib/auth'
import { useAuthStore } from '@/store/authStore'
import { AuthMode } from '@/types'
import { isSupabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { User, Mail, Lock, UserCircle, Hash, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { loadAttendanceResults } from '@/lib/attendance'


interface AuthFormProps {
  onSuccess: () => void
}

export const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [name, setName] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const setUser = useAuthStore((state) => state.setUser)
  
  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  
  // Password strength indicator
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { strength: 0, label: '', color: '' }
    if (pwd.length < 6) return { strength: 1, label: 'Weak', color: 'bg-red-500' }
    if (pwd.length < 8) return { strength: 2, label: 'Fair', color: 'bg-yellow-500' }
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) {
      return { strength: 3, label: 'Strong', color: 'bg-green-500' }
    }
    return { strength: 2, label: 'Good', color: 'bg-blue-500' }
  }
  
  const passwordStrength = mode === 'signup' ? getPasswordStrength(password) : null

const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault()
  setError(null)
  setSuccess(false)
  setLoading(true)

  if (!name || !rollNumber || !email || !password) {
    setError('All fields are required')
    setLoading(false)
    return
  }

  if (!isValidEmail(email)) {
    setError('Please enter a valid email address')
    setLoading(false)
    return
  }

  if (password.length < 6) {
    setError('Password must be at least 6 characters long')
    setLoading(false)
    return
  }

  const { user, error: authError } = await signUp(name, rollNumber, email, password)

  if (authError) {
    setError(authError)
  } else if (user) {
    setSuccess(true)

    // 🔥 New account → empty attendance history
    useAuthStore.getState().setAttendanceCache([])

    setTimeout(() => {
      setUser(user)
      onSuccess()
    }, 500)
  }

  setLoading(false)
}


  const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault()
  setError(null)
  setSuccess(false)
  setLoading(true)

  if (!email || !password) {
    setError('Email and password are required')
    setLoading(false)
    return
  }

  if (!isValidEmail(email)) {
    setError('Please enter a valid email address')
    setLoading(false)
    return
  }

  const { user, error: authError } = await signIn(email, password)

  if (authError) {
    setError(authError)
  } else if (user) {
    setSuccess(true)

    // 🔥 Load attendance history for this user
    const savedAttendance = await loadAttendanceResults(user.id)

    // 🔥 Store in global state (Zustand)
    useAuthStore.getState().setAttendanceCache(savedAttendance)

    setTimeout(() => {
      setUser(user)
      onSuccess()
    }, 500)
  }

  setLoading(false)
}


  const handleGuestLogin = () => {
    setUser({ name: 'Guest User', guest: true })
    onSuccess()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Card className="w-full max-w-md glass hover-lift animate-fade-in relative z-10 shadow-2xl border-0">
        <CardHeader className="space-y-4">
          <CardTitle className="text-4xl font-extrabold text-center gradient-text animate-scale-in">
            AttendanceDoc
          </CardTitle>
          <CardDescription className="text-center text-base font-medium">
            {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSupabaseConfigured() && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Supabase is not configured. Sign Up/Sign In are disabled. 
                You can use <strong>Guest Login</strong> to test the app.
              </p>
            </div>
          )}
          <div className="flex gap-2 mb-6">
            <Button
              variant={mode === 'signin' ? 'default' : 'outline'}
              className={cn(
                "flex-1 transition-all duration-300",
                mode === 'signin' && "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg glow-effect"
              )}
              onClick={() => {
                setMode('signin')
                setError(null)
                setSuccess(false)
                setName('')
                setRollNumber('')
                setEmail('')
                setPassword('')
              }}
            >
              Sign In
            </Button>
            <Button
              variant={mode === 'signup' ? 'default' : 'outline'}
              className={cn(
                "flex-1 transition-all duration-300",
                mode === 'signup' && "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg glow-effect"
              )}
              onClick={() => {
                setMode('signup')
                setError(null)
                setSuccess(false)
                setName('')
                setRollNumber('')
                setEmail('')
                setPassword('')
              }}
            >
              Sign Up
            </Button>
          </div>

          {mode === 'signup' ? (
            <form onSubmit={handleSignUp} className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 font-semibold">
                  <UserCircle className="h-4 w-4 text-violet-600" />
                  Name
                </Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 border-2 focus:border-violet-500 focus:ring-2 focus:ring-violet-300 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber" className="flex items-center gap-2 font-semibold">
                  <Hash className="h-4 w-4 text-violet-600" />
                  Roll Number
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="rollNumber"
                    type="text"
                    placeholder="Enter your roll number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="pl-10 border-2 focus:border-violet-500 focus:ring-2 focus:ring-violet-300 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 font-semibold">
                  <Mail className="h-4 w-4 text-violet-600" />
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "pl-10 border-2 focus:ring-2 transition-all duration-300",
                      email && isValidEmail(email) 
                        ? "focus:border-green-500 focus:ring-green-300 border-green-300" 
                        : email && !isValidEmail(email)
                        ? "focus:border-red-500 focus:ring-red-300 border-red-300"
                        : "focus:border-violet-500 focus:ring-violet-300"
                    )}
                    required
                  />
                  {email && isValidEmail(email) && (
                    <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500 animate-scale-in" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 font-semibold">
                  <Lock className="h-4 w-4 text-violet-600" />
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-2 focus:border-violet-500 focus:ring-2 focus:ring-violet-300 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {password && passwordStrength && (
                  <div className="space-y-1">
                    <div className="flex gap-1 h-2">
                      <div className={cn("flex-1 rounded-full transition-all duration-300", passwordStrength.strength >= 1 ? passwordStrength.color : "bg-gray-200")}></div>
                      <div className={cn("flex-1 rounded-full transition-all duration-300", passwordStrength.strength >= 2 ? passwordStrength.color : "bg-gray-200")}></div>
                      <div className={cn("flex-1 rounded-full transition-all duration-300", passwordStrength.strength >= 3 ? passwordStrength.color : "bg-gray-200")}></div>
                    </div>
                    <p className={cn("text-xs font-medium", passwordStrength.strength === 1 ? "text-red-600" : passwordStrength.strength === 2 ? "text-yellow-600" : "text-green-600")}>
                      {passwordStrength.label}
                    </p>
                  </div>
                )}
              </div>
              {error && (
                <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-2 animate-scale-in">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-2 animate-scale-in">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-800 font-medium">Account created successfully!</p>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg glow-effect transition-all duration-300" 
                disabled={loading || success}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing up...
                  </span>
                ) : success ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Success!
                  </span>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 font-semibold">
                  <Mail className="h-4 w-4 text-violet-600" />
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "pl-10 border-2 focus:ring-2 transition-all duration-300",
                      email && isValidEmail(email) 
                        ? "focus:border-green-500 focus:ring-green-300 border-green-300" 
                        : email && !isValidEmail(email)
                        ? "focus:border-red-500 focus:ring-red-300 border-red-300"
                        : "focus:border-violet-500 focus:ring-violet-300"
                    )}
                    required
                  />
                  {email && isValidEmail(email) && (
                    <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500 animate-scale-in" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 font-semibold">
                  <Lock className="h-4 w-4 text-violet-600" />
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-2 focus:border-violet-500 focus:ring-2 focus:ring-violet-300 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-2 animate-scale-in">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-2 animate-scale-in">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-800 font-medium">Signing in...</p>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg glow-effect transition-all duration-300" 
                disabled={loading || success}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : success ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Success!
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 hover:border-violet-300 transition-all duration-300"
              onClick={handleGuestLogin}
            >
              <User className="mr-2 h-4 w-4" />
              Continue as Guest
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


