import { format } from 'date-fns'
import { AttendanceData, AttendanceResult } from '../types'

export const calculateAttendance = (data: AttendanceData): AttendanceResult => {
  const { subject, classesAttended, classesHeld, classesRemaining, date } = data
  
  const isLab = subject.includes('(Lab)')
  const minPercent = isLab ? 80 : 75
  
  const percentage = (classesAttended / classesHeld) * 100
  const status: 'SAFE' | 'UNSAFE' = percentage >= minPercent ? 'SAFE' : 'UNSAFE'
  
  const dayOfWeek = format(date, 'EEEE')
  
  let message: string | undefined
  let maxPossible: number | undefined
  let required: number | undefined
  let canSkip: number | undefined
  let additionalClassesNeeded: number | undefined
  
  if (classesRemaining !== undefined && classesRemaining > 0) {
    maxPossible = ((classesAttended + classesRemaining) / (classesHeld + classesRemaining)) * 100
    
    if (maxPossible < minPercent) {
      // Calculate how many additional classes beyond remaining are needed
      // We need: (attended + remaining + additional) / (held + remaining + additional) * 100 >= minPercent
      // Solving: (attended + remaining + additional) >= (minPercent / 100) * (held + remaining + additional)
      // attended + remaining + additional >= (minPercent / 100) * held + (minPercent / 100) * remaining + (minPercent / 100) * additional
      // attended + remaining + additional - (minPercent / 100) * additional >= (minPercent / 100) * (held + remaining)
      // attended + remaining + additional * (1 - minPercent / 100) >= (minPercent / 100) * (held + remaining)
      // additional * (1 - minPercent / 100) >= (minPercent / 100) * (held + remaining) - attended - remaining
      // additional >= ((minPercent / 100) * (held + remaining) - attended - remaining) / (1 - minPercent / 100)
      // additional >= (minPercent * (held + remaining) - 100 * (attended + remaining)) / (100 - minPercent)
      
      const numerator = minPercent * (classesHeld + classesRemaining) - 100 * (classesAttended + classesRemaining)
      const denominator = 100 - minPercent
      additionalClassesNeeded = Math.ceil(numerator / denominator)
      
      if (additionalClassesNeeded > 0) {
        message = `Even attending all remaining classes cannot reach the minimum required. You need ${additionalClassesNeeded} additional class${additionalClassesNeeded > 1 ? 'es' : ''} beyond the ${classesRemaining} remaining to reach ${minPercent}%.`
      } else {
        message = 'Even attending all remaining classes cannot reach the minimum required.'
      }
    } else {
      // Calculate required classes
      // We want: (attended + required) / (held + remaining) * 100 >= minPercent
      // So: (attended + required) >= (minPercent / 100) * (held + remaining)
      // required >= (minPercent / 100) * (held + remaining) - attended
      // required >= (minPercent * (held + remaining)) / 100 - attended
      
      const minRequired = (minPercent / 100) * (classesHeld + classesRemaining) - classesAttended
      required = Math.ceil(minRequired)
      
      // Ensure required doesn't exceed remaining
      if (required > classesRemaining) {
        required = classesRemaining
      }
      
      if (required > 0) {
        message = `You must attend ${required} out of ${classesRemaining} remaining classes.`
      } else {
        // If required is 0 or negative, we can skip some classes
        canSkip = Math.abs(Math.floor(minRequired))
        if (canSkip > classesRemaining) {
          canSkip = classesRemaining
        }
        if (canSkip > 0) {
          message = `You can skip ${canSkip} out of ${classesRemaining} remaining classes.`
        } else {
          message = `You can skip all ${classesRemaining} remaining classes and still meet the requirement.`
        }
      }
    }
  }
  
  return {
    subject,
    percentage,
    status,
    minPercent,
    classesRemaining,
    required,
    canSkip,
    maxPossible,
    additionalClassesNeeded,
    message,
    dayOfWeek,
  }
}

export const validateAttendanceData = (data: AttendanceData): string | null => {
  if (data.classesHeld < data.classesAttended) {
    return 'Classes held must be greater than or equal to classes attended'
  }
  if (data.classesAttended < 0 || data.classesHeld < 0) {
    return 'Values cannot be negative'
  }
  if (data.classesRemaining !== undefined && data.classesRemaining < 0) {
    return 'Classes remaining cannot be negative'
  }
  return null
}

