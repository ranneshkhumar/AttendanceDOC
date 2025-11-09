import { create } from 'zustand'
import { AttendanceData, AttendanceResult } from '../types'

interface AppState {
  selectedYear: number | null
  attendanceData: AttendanceData[]
  attendanceResults: AttendanceResult[]
  setSelectedYear: (year: number | null) => void
  setAttendanceData: (data: AttendanceData[]) => void
  setAttendanceResults: (results: AttendanceResult[]) => void
  addAttendanceData: (data: AttendanceData) => void
  reset: () => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedYear: null,
  attendanceData: [],
  attendanceResults: [],
  setSelectedYear: (year) => set({ selectedYear: year }),
  setAttendanceData: (data) => set({ attendanceData: data }),
  setAttendanceResults: (results) => set({ attendanceResults: results }),
  addAttendanceData: (data) => set((state) => ({
    attendanceData: [...state.attendanceData, data]
  })),
  reset: () => set({
    selectedYear: null,
    attendanceData: [],
    attendanceResults: []
  }),
}))

