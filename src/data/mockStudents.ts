import type { Student } from '../types/student'

export const mockStudents: Student[] = [
  {
    id: 'el-001',
    fullName: 'Sarah Benali',
    level: 'Terminale',
    objective: 'Preparation bac mathematiques',
    sessionsDone: 6,
    nextSessionAt: '2026-03-14 18:00',
    notes: 'Bonne progression en probabilites. Travailler les suites.',
  },
  {
    id: 'el-002',
    fullName: 'Nassim Fares',
    level: 'Premiere',
    objective: 'Renforcer les bases en algebra',
    sessionsDone: 3,
    nextSessionAt: '2026-03-13 17:30',
    notes: 'A besoin de plus de methodologie pour les exercices.',
  },
]
