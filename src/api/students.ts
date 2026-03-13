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

const toApiDateTime = (value: string): string | undefined => {
  const normalized = value.replace(' ', 'T')
  const date = new Date(normalized)
  if (Number.isNaN(date.getTime())) return undefined

  return date.toISOString()
}

const toCreatePayload = (student: Omit<Student, 'id'>) => ({
  fullName: student.fullName,
  level: student.level,
  objective: student.objective,
  sessionsDone: student.sessionsDone,
  nextSessionAt: toApiDateTime(student.nextSessionAt),
  notes: student.notes,
})

const toUpdatePayload = (student: Partial<Omit<Student, 'id'>>) => ({
  fullName: student.fullName,
  level: student.level,
  objective: student.objective,
  sessionsDone: student.sessionsDone,
  nextSessionAt: student.nextSessionAt === undefined ? undefined : toApiDateTime(student.nextSessionAt),
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

export async function createStudent(student: Omit<Student, 'id'>): Promise<Student> {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toCreatePayload(student)),
  })

  if (!response.ok) {
    throw new Error('Impossible de creer l\'eleve.')
  }

  const data = (await response.json()) as StudentApi
  return toStudent(data)
}

export async function updateStudent(id: string, student: Partial<Omit<Student, 'id'>>): Promise<Student> {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toUpdatePayload(student)),
  })

  if (!response.ok) {
    throw new Error('Impossible de mettre a jour l\'eleve.')
  }

  const data = (await response.json()) as StudentApi
  return toStudent(data)
}

export async function deleteStudent(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Impossible de supprimer l\'eleve.')
  }
}
