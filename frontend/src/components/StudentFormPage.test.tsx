import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Student } from '../types/student'
import { StudentFormPage } from './StudentFormPage'

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

const onSubmit = vi.fn().mockResolvedValue(undefined)
const onCancel = vi.fn()

const baseProps = {
  onSubmit,
  onCancel,
  language: 'fr' as const,
}

const labels = {
  fullName: 'Nom complet',
  level: 'Niveau',
  objective: 'Objectif',
  notes: 'Avis sur les élèves, points à améliorer, etc.',
}

describe('StudentFormPage', () => {
  it('shows the create title in create mode', () => {
    render(<StudentFormPage mode="create" initialStudent={null} {...baseProps} />)
    expect(screen.getByRole('heading', { name: 'Ajouter un élève' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: "Créer l'élève" })).toBeInTheDocument()
  })

  it('shows the edit title and pre-fills the form in edit mode', () => {
    render(<StudentFormPage mode="edit" initialStudent={student} {...baseProps} />)
    expect(screen.getByRole('heading', { name: 'Modifier un élève' })).toBeInTheDocument()
    expect(screen.getByDisplayValue('Alice Martin')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Terminale')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Bon progres')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeInTheDocument()
  })

  it('shows an error when required fields are empty and does not submit', async () => {
    const user = userEvent.setup()
    render(<StudentFormPage mode="create" initialStudent={null} {...baseProps} />)

    await user.click(screen.getByRole('button', { name: "Créer l'élève" }))

    expect(screen.getByText('Merci de remplir tous les champs.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits the trimmed payload and shows the success state', async () => {
    const user = userEvent.setup()
    render(<StudentFormPage mode="create" initialStudent={null} {...baseProps} />)

    await user.type(screen.getByLabelText(labels.fullName), '  Bob Dupont  ')
    await user.type(screen.getByLabelText(labels.level), 'Premiere')
    await user.type(screen.getByLabelText(labels.objective), 'Progresser en maths')
    await user.type(screen.getByLabelText(labels.notes), 'Motivation elevee')
    await user.click(screen.getByRole('button', { name: "Créer l'élève" }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: 'Bob Dupont',
        level: 'Premiere',
        objective: 'Progresser en maths',
        notes: 'Motivation elevee',
      }),
    )
    expect(screen.getByText('Enregistre')).toBeInTheDocument()
  })

  it('shows an error message when submission fails', async () => {
    const user = userEvent.setup()
    const failingOnSubmit = vi.fn().mockRejectedValue(new Error('boom'))
    render(
      <StudentFormPage
        mode="create"
        initialStudent={null}
        onSubmit={failingOnSubmit}
        onCancel={onCancel}
        language="fr"
      />,
    )

    await user.type(screen.getByLabelText(labels.fullName), 'Bob Dupont')
    await user.type(screen.getByLabelText(labels.level), 'Premiere')
    await user.type(screen.getByLabelText(labels.objective), 'Progresser')
    await user.type(screen.getByLabelText(labels.notes), 'Notes')
    await user.click(screen.getByRole('button', { name: "Créer l'élève" }))

    expect(await screen.findByText('Enregistrement impossible pour le moment.')).toBeInTheDocument()
  })

  it('cancels via the cancel and back buttons', async () => {
    const user = userEvent.setup()
    const cancel = vi.fn()
    render(<StudentFormPage mode="create" initialStudent={null} onSubmit={onSubmit} onCancel={cancel} language="fr" />)

    await user.click(screen.getByRole('button', { name: 'Annuler' }))
    expect(cancel).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: 'Retour à la liste' }))
    expect(cancel).toHaveBeenCalledTimes(2)
  })
})