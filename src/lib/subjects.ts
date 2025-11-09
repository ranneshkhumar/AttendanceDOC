import { Subject } from '../types'

export const YEAR_SUBJECTS: Record<number, Subject[]> = {
  1: [
    { name: 'Anatomy', isLab: false },
    { name: 'Anatomy (Lab)', isLab: true },
    { name: 'Biochemistry', isLab: false },
    { name: 'Biochemistry (Lab)', isLab: true },
    { name: 'Physiology', isLab: false },
    { name: 'Physiology (Lab)', isLab: true },
  ],
  2: [
    { name: 'Pathology', isLab: false },
    { name: 'Pathology (Lab)', isLab: true },
    { name: 'Microbiology', isLab: false },
    { name: 'Microbiology (Lab)', isLab: true },
    { name: 'Pharmacology', isLab: false },
    { name: 'Pharmacology (Lab)', isLab: true },
  ],
}

export const getSubjectsForYear = (year: number): Subject[] => {
  return YEAR_SUBJECTS[year] || []
}

