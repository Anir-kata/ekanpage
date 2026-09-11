import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Student } from '../types/student'
import { StudentList } from './StudentList'

const student: Student = {
  id: 'student-1',
  fullName: 'Alice Martin',
  level: 'Terminale',
  objective: 'Prep bac',
  sessionsDone: 3,
  sessionWeekday: 2,
  sessionTime: '18:00',
  nextSessionAt: '2026-09-11 10:00',
  notes: 'Bon progres',
}

const baseProps = {
  students: [student],
  onRequestCreate: vi.fn(),
  onRequestEdit: vi.fn(),
  onRequireLogin: vi.fn(),
  onDeleteStudent: vi.fn().mockResolvedValue(undefined),
  canEdit: false,
  language: 'fr' as const,
}

describe('StudentList', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows the French title and student details', () => {
    render(<StudentList {...baseProps} />)
    expect(screen.getByText('Mes élèves')).toBeInTheDocument()
    expect(screen.getByText('Élève #1')).toBeInTheDocument()
    expect(screen.getByText('Objectif: Prep bac')).toBeInTheDocument()
    expect(screen.getByText('Séances faites: 3')).toBeInTheDocument()
    expect(screen.getByText('Avis: Bon progres')).toBeInTheDocument()
  })

  it('shows the English title and labels', () => {
    render(<StudentList {...baseProps} language="en" />)
    expect(screen.getByText('My students')).toBeInTheDocument()
    expect(screen.getByText('Student #1')).toBeInTheDocument()
    expect(screen.getByText('Goal: Prep bac')).toBeInTheDocument()
  })

  it('shows the empty state when there are no students', () => {
    render(<StudentList {...baseProps} students={[]} />)
    expect(screen.getByText('Aucun élève pour le moment.')).toBeInTheDocument()
  })

  it('asks for login when not in edit mode and the add button is clicked', async () => {
    const user = userEvent.setup()
    const onRequireLogin = vi.fn()
    render(<StudentList {...baseProps} onRequireLogin={onRequireLogin} />)

    await user.click(screen.getByRole('button', { name: 'admin login' }))
    expect(onRequireLogin).toHaveBeenCalled()
  })

  it('opens the create form when in edit mode', async () => {
    const user = userEvent.setup()
    const onRequestCreate = vi.fn()
    render(<StudentList {...baseProps} canEdit onRequestCreate={onRequestCreate} />)

    await user.click(screen.getByRole('button', { name: 'Ajouter un élève' }))
    expect(onRequestCreate).toHaveBeenCalled()
  })

  it('opens the edit form when the edit button is clicked', async () => {
    const user = userEvent.setup()
    const onRequestEdit = vi.fn()
    render(<StudentList {...baseProps} canEdit onRequestEdit={onRequestEdit} />)

    await user.click(screen.getByRole('button', { name: 'Modifier' }))
    expect(onRequestEdit).toHaveBeenCalledWith(student)
  })

  it('does not show edit actions in read-only mode', () => {
    render(<StudentList {...baseProps} />)
    expect(screen.queryByRole('button', { name: 'Modifier' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Supprimer' })).not.toBeInTheDocument()
  })

  it('deletes a student after confirmation', async () => {
    const user = userEvent.setup()
    const confirmMock = vi.spyOn(window, 'confirm').mockReturnValue(true)
    const onDeleteStudent = vi.fn().mockResolvedValue(undefined)
    const onOperationSuccess = vi.fn()
    render(
      <StudentList
        {...baseProps}
        canEdit
        onDeleteStudent={onDeleteStudent}
        onOperationSuccess={onOperationSuccess}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Supprimer' }))

    expect(confirmMock).toHaveBeenCalledWith('Confirmer la suppression de cet élève ?')
    expect(onDeleteStudent).toHaveBeenCalledWith('student-1')
    expect(onOperationSuccess).toHaveBeenCalledWith('Eleve supprime avec succes.')
  })

  it('skips deletion when the confirmation is cancelled', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    const onDeleteStudent = vi.fn()
    render(<StudentList {...baseProps} canEdit onDeleteStudent={onDeleteStudent} />)

    await user.click(screen.getByRole('button', { name: 'Supprimer' }))
    expect(onDeleteStudent).not.toHaveBeenCalled()
  })
})