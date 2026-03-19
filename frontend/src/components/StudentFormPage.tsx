import { useMemo, useState } from 'react'
import type { Student } from '../types/student'
import { fromInputDateTimeValue, toInputDateTimeValue } from '../utils/dateTime'

export type StudentFormValues = Omit<Student, 'id'>

type StudentFormPageProps = {
  mode: 'create' | 'edit'
  initialStudent?: Student | null
  onCancel: () => void
  onSubmit: (values: StudentFormValues) => Promise<void>
  language: 'fr' | 'en'
}

const emptyValues: StudentFormValues = {
  fullName: '',
  level: '',
  objective: '',
  sessionsDone: 0,
  sessionWeekday: 0,
  sessionTime: '10:00',
  nextSessionAt: '',
  notes: '',
}

const weekdayOptions = [
  { label: 'Dimanche', value: 0 },
  { label: 'Lundi', value: 1 },
  { label: 'Mardi', value: 2 },
  { label: 'Mercredi', value: 3 },
  { label: 'Jeudi', value: 4 },
  { label: 'Vendredi', value: 5 },
  { label: 'Samedi', value: 6 },
]

export function StudentFormPage({ mode, initialStudent, onCancel, onSubmit, language }: StudentFormPageProps) {
  const copy =
    language === 'fr'
      ? {
          requiredError: 'Merci de remplir tous les champs.',
          saveError: 'Enregistrement impossible pour le moment.',
          createTitle: 'Ajouter un élève',
          editTitle: 'Modifier un élève',
          backToList: 'Retour à la liste',
          fullName: 'Nom complet',
          level: 'Niveau',
          objective: 'Objectif',
          sessionsDone: 'Séances réalisées',
          classDay: 'Jour de cours',
          classTime: 'Heure de cours',
          nextSession: 'Prochaine séance (calcul automatique)',
          notes: 'Avis sur les élèves, points à améliorer, etc.',
          cancel: 'Annuler',
          saving: 'Enregistrement...',
          create: "Créer l'élève",
          save: 'Enregistrer',
        }
      : {
          requiredError: 'Please fill in all fields.',
          saveError: 'Unable to save right now.',
          createTitle: 'Add student',
          editTitle: 'Edit student',
          backToList: 'Back to list',
          fullName: 'Full name',
          level: 'Level',
          objective: 'Goal',
          sessionsDone: 'Completed sessions',
          classDay: 'Class day',
          classTime: 'Class time',
          nextSession: 'Next session (auto-calculated)',
          notes: 'Student notes, improvement points, etc.',
          cancel: 'Cancel',
          saving: 'Saving...',
          create: 'Create student',
          save: 'Save',
        }

  const source = useMemo(() => initialStudent ?? null, [initialStudent])

  const [values, setValues] = useState<StudentFormValues>(() => {
    if (mode === 'edit' && source) {
      return {
        fullName: source.fullName,
        level: source.level,
        objective: source.objective,
        sessionsDone: source.sessionsDone,
        sessionWeekday: source.sessionWeekday,
        sessionTime: source.sessionTime,
        nextSessionAt: source.nextSessionAt,
        notes: source.notes,
      }
    }

    return emptyValues
  })
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const updateField = (field: keyof StudentFormValues, value: string | number) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    const payload: StudentFormValues = {
      fullName: values.fullName.trim(),
      level: values.level.trim(),
      objective: values.objective.trim(),
      sessionsDone: Math.max(0, values.sessionsDone),
      sessionWeekday: values.sessionWeekday,
      sessionTime: values.sessionTime,
      nextSessionAt: fromInputDateTimeValue(values.nextSessionAt.trim()),
      notes: values.notes.trim(),
    }

    if (!payload.fullName || !payload.level || !payload.objective || !payload.notes) {
      setFormError(copy.requiredError)
      return
    }

    try {
      setIsSaving(true)
      setFormError('')
      await onSubmit(payload)
    } catch {
      setFormError(copy.saveError)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="panel rounded-2xl p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="hud-title text-lg font-bold text-cyan-200">
          {mode === 'create' ? copy.createTitle : copy.editTitle}
        </h2>
        <button
          className="rounded-lg bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/70"
          onClick={onCancel}
          disabled={isSaving}
        >
          {copy.backToList}
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm text-slate-300">
          {copy.fullName}
          <input
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          {copy.level}
          <input
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.level}
            onChange={(event) => updateField('level', event.target.value)}
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          {copy.objective}
          <input
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.objective}
            onChange={(event) => updateField('objective', event.target.value)}
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          {copy.sessionsDone}
          <input
            type="number"
            min={0}
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.sessionsDone}
            onChange={(event) => updateField('sessionsDone', Math.max(0, Number(event.target.value) || 0))}
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          {copy.classDay}
          <select
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.sessionWeekday}
            onChange={(event) => updateField('sessionWeekday', Number(event.target.value))}
          >
            {weekdayOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          {copy.classTime}
          <input
            type="time"
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.sessionTime}
            onChange={(event) => updateField('sessionTime', event.target.value)}
          />
        </label>

        <label className="sm:col-span-2 grid gap-1 text-sm text-slate-300">
          {copy.nextSession}
          <input
            disabled
            className="futuristic-input rounded-lg px-3 py-2 text-sm opacity-75"
            value={toInputDateTimeValue(values.nextSessionAt)}
            onChange={(event) => updateField('nextSessionAt', fromInputDateTimeValue(event.target.value))}
          />
        </label>

        <label className="sm:col-span-2 grid gap-1 text-sm text-slate-300">
          {copy.notes}
          <textarea
            className="futuristic-input min-h-28 rounded-lg px-3 py-2 text-sm"
            value={values.notes}
            onChange={(event) => updateField('notes', event.target.value)}
          />
        </label>
      </div>

      {formError && <p className="mt-3 text-sm text-rose-300">{formError}</p>}

      <div className="mt-4 flex justify-end gap-2">
        <button
          className="rounded-lg bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/70"
          onClick={onCancel}
          disabled={isSaving}
        >
          {copy.cancel}
        </button>
        <button
          className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? copy.saving : mode === 'create' ? copy.create : copy.save}
        </button>
      </div>
    </section>
  )
}
