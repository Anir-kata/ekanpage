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
const TOKEN_STORAGE_KEY = 'ekan_auth_token'

type LoginResponse = {
  accessToken: string
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

function saveAuthToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

function buildAuthHeaders(): HeadersInit {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
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
  const response = await fetch(`${API_BASE_URL}/students${suffix}`, {
    headers: buildAuthHeaders(),
  })
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentification requise. Merci de vous connecter.')
    }

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
      ...buildAuthHeaders(),
    },
    body: JSON.stringify(toCreatePayload(student)),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentification requise. Merci de vous connecter.')
    }

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
      ...buildAuthHeaders(),
    },
    body: JSON.stringify(toUpdatePayload(student)),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentification requise. Merci de vous connecter.')
    }

    throw new Error('Impossible de mettre a jour l\'eleve.')
  }

  const data = (await response.json()) as StudentApi
  return toStudent(data)
}

export async function deleteStudent(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'DELETE',
    headers: buildAuthHeaders(),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentification requise. Merci de vous connecter.')
    }

    throw new Error('Impossible de supprimer l\'eleve.')
  }
}

export async function login(username: string, password: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error('Identifiants invalides.')
  }

  const data = (await response.json()) as LoginResponse
  saveAuthToken(data.accessToken)
}
