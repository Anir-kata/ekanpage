import type { Student } from '../types/student'
import { toApiDateTime, toUiDateTime } from '../utils/dateTime'

type StudentApi = {
  id: string
  fullName: string
  level: string
  objective: string
  sessionsDone: number
  nextSessionAt: string | null
  notes: string
}

export type StudentsPage = {
  items: Student[]
  total: number
  page: number
  limit: number
  totalPages: number
}

type StudentsPageApi = {
  items: StudentApi[]
  total: number
  page: number
  limit: number
  totalPages: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const toStudent = (student: StudentApi): Student => ({
  id: student.id,
  fullName: student.fullName,
  level: student.level,
  objective: student.objective,
  sessionsDone: student.sessionsDone,
  nextSessionAt: toUiDateTime(student.nextSessionAt),
  notes: student.notes,
})

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

export async function fetchStudents(params?: { search?: string; page?: number; limit?: number }): Promise<StudentsPage> {
  const query = new URLSearchParams()

  if (params?.search?.trim()) query.set('search', params.search.trim())
  if (params?.page) query.set('page', String(params.page))
  if (params?.limit) query.set('limit', String(params.limit))

  const suffix = query.toString() ? `?${query.toString()}` : ''
  const response = await fetch(`${API_BASE_URL}/students${suffix}`)
  if (!response.ok) {
    throw new Error('Impossible de charger les eleves depuis le backend.')
  }

  const data = (await response.json()) as StudentsPageApi
  return {
    items: data.items.map(toStudent),
    total: data.total,
    page: data.page,
    limit: data.limit,
    totalPages: data.totalPages,
  }
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
