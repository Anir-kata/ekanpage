import type { Student } from '../types/student'

type StudentApi = {
  id: string
  fullName: string
  level: string
  objective: string
  sessionsDone: number
  nextSessionAt: string | null
  notes: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const pad = (value: number): string => String(value).padStart(2, '0')

const toUiDateTime = (value: string | null): string => {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const toStudent = (student: StudentApi): Student => ({
  id: student.id,
  fullName: student.fullName,
  level: student.level,
  objective: student.objective,
  sessionsDone: student.sessionsDone,
  nextSessionAt: toUiDateTime(student.nextSessionAt),
  notes: student.notes,
})

export async function fetchStudents(): Promise<Student[]> {
  const response = await fetch(`${API_BASE_URL}/students`)
  if (!response.ok) {
    throw new Error('Impossible de charger les eleves depuis le backend.')
  }

  const data = (await response.json()) as StudentApi[]
  return data.map(toStudent)
}
