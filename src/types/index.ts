export interface User {
  id?: string
  name: string
  roll_number?: string
  email?: string
  year?: number
  guest?: boolean
}

export interface Subject {
  name: string
  isLab: boolean
}

export interface AttendanceData {
  subject: string
  classesAttended: number
  classesHeld: number
  classesRemaining?: number
  date: Date
}

export interface AttendanceResult {
  subject: string
  percentage: number
  status: 'SAFE' | 'UNSAFE'
  minPercent: number
  classesRemaining?: number
  required?: number
  canSkip?: number
  maxPossible?: number
  additionalClassesNeeded?: number
  message?: string
  dayOfWeek: string
}

export type AuthMode = 'signin' | 'signup' | 'guest'

