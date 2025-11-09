import { create } from 'zustand'
import { User } from '../types'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void

  attendanceCache: any[]          // <-- NEW
  setAttendanceCache: (rows: any[]) => void  // <-- NEW
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

  attendanceCache: [],                     // <-- NEW
  setAttendanceCache: (rows) => set({ attendanceCache: rows }),  // <-- NEW
}))



