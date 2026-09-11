import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  clearAuthToken,
  createStudent,
  deleteStudent,
  fetchStudents,
  getAuthToken,
  login,
  updateStudent,
} from './students'

const API_BASE_URL = 'http://localhost:3000'

const mockResponse = (body: unknown, status = 200, headers: Record<string, string> = {}) => {
  const response = {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(headers),
    json: () => Promise.resolve(body),
  } as Response
  return response
}

const studentApiPayload = {
  id: 'student-1',
  displayName: 'Eleve abcd1234',
  fullName: 'Alice Martin',
  level: 'Terminale',
  objective: 'Prep bac',
  sessionsDone: 3,
  sessionWeekday: 2,
  sessionTime: '18:00',
  nextSessionAt: '2026-09-11T10:00:00.000Z',
  notes: 'Bon progres',
}

describe('token helpers', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null when no token is stored', () => {
    expect(getAuthToken()).toBeNull()
  })

  it('stores and clears the token in localStorage', () => {
    localStorage.setItem('ekan_auth_token', 'jwt-token')
    expect(getAuthToken()).toBe('jwt-token')

    clearAuthToken()
    expect(getAuthToken()).toBeNull()
  })
})

describe('fetchStudents', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls the public endpoint when no token is present', async () => {
    const page = {
      items: [studentApiPayload],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    }
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(page))

    const result = await fetchStudents({ page: 1, limit: 10 })

    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/students/public?page=1&limit=10`, undefined)
    expect(result.items).toHaveLength(1)
    expect(result.items[0].fullName).toBe('Eleve abcd1234')
    expect(result.total).toBe(1)
  })

  it('uses the private endpoint and Authorization header when a token is present', async () => {
    localStorage.setItem('ekan_auth_token', 'jwt-token')
    const page = { items: [studentApiPayload], total: 1, page: 1, limit: 10, totalPages: 1 }
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(page))

    await fetchStudents({ page: 1 })

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/students?page=1`,
      { headers: { Authorization: 'Bearer jwt-token' } },
    )
  })

  it('includes a search parameter when provided', async () => {
    const page = { items: [], total: 0, page: 1, limit: 10, totalPages: 1 }
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(page))

    await fetchStudents({ search: '  bac  ', page: 2 })

    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/students/public?search=bac&page=2`, undefined)
  })

  it('falls back to the public endpoint and clears the token on a 401', async () => {
    localStorage.setItem('ekan_auth_token', 'expired-token')
    const page = { items: [studentApiPayload], total: 1, page: 1, limit: 10, totalPages: 1 }

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(mockResponse(null, 401))
      .mockResolvedValueOnce(mockResponse(page))

    const result = await fetchStudents({ page: 1 })

    expect(getAuthToken()).toBeNull()
    expect(result.items[0].fullName).toBe('Eleve abcd1234')
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${API_BASE_URL}/students?page=1`,
      { headers: { Authorization: 'Bearer expired-token' } },
    )
  })

  it('throws a meaningful error when the request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(null, 500))

    await expect(fetchStudents({ page: 1 })).rejects.toThrow('Impossible de charger les eleves depuis le backend.')
  })
})

describe('createStudent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sends a POST with the auth header and maps the created student', async () => {
    localStorage.setItem('ekan_auth_token', 'jwt-token')
    const createPayload = {
      fullName: 'Alice Martin',
      level: 'Terminale',
      objective: 'Prep bac',
      sessionsDone: 0,
      sessionWeekday: 2,
      sessionTime: '18:00',
      nextSessionAt: '2026-09-11 10:00',
      notes: 'A suivre',
    }
    const apiPayload = { ...studentApiPayload, notes: 'A suivre' }
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(apiPayload))

    const created = await createStudent(createPayload)

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/students`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer jwt-token',
        },
      }),
    )
    expect(created.id).toBe('student-1')
  })

  it('throws when not authenticated', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(null, 401))

    await expect(
      createStudent({
        fullName: 'Alice',
        level: 'Terminale',
        objective: 'Bac',
        sessionsDone: 0,
        sessionWeekday: 1,
        sessionTime: '18:00',
        nextSessionAt: '',
        notes: '',
      }),
    ).rejects.toThrow('Connectez-vous pour activer le mode modification.')
  })
})

describe('updateStudent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sends a PATCH with the auth header', async () => {
    localStorage.setItem('ekan_auth_token', 'jwt-token')
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(studentApiPayload))

    const updated = await updateStudent('student-1', { sessionsDone: 4 })

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/students/student-1`,
      expect.objectContaining({ method: 'PATCH' }),
    )
    expect(updated.id).toBe('student-1')
  })

  it('throws when not authenticated', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(null, 401))

    await expect(updateStudent('student-1', { level: 'Bac+1' })).rejects.toThrow(
      'Connectez-vous pour activer le mode modification.',
    )
  })
})

describe('deleteStudent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sends a DELETE with the auth header', async () => {
    localStorage.setItem('ekan_auth_token', 'jwt-token')
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(null, 204))

    await deleteStudent('student-1')

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/students/student-1`,
      { method: 'DELETE', headers: { Authorization: 'Bearer jwt-token' } },
    )
  })

  it('throws when not authenticated', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(null, 401))

    await expect(deleteStudent('student-1')).rejects.toThrow(
      'Connectez-vous pour activer le mode modification.',
    )
  })
})

describe('login', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('stores the access token on success', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockResponse({ accessToken: 'fresh-token' }),
    )

    await login('admin', 'secret')

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/auth/login`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'secret' }),
      }),
    )
    expect(getAuthToken()).toBe('fresh-token')
  })

  it('throws on invalid credentials', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(null, 401))

    await expect(login('admin', 'wrong')).rejects.toThrow('Identifiants invalides.')
    expect(getAuthToken()).toBeNull()
  })
})