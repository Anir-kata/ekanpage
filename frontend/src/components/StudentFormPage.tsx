import { useMemo, useState } from 'react'
import type { Student } from '../types/student'
import { fromInputDateTimeValue, toInputDateTimeValue } from '../utils/dateTime'

export type StudentFormValues = Omit<Student, 'id'>

type StudentFormPageProps = {
  mode: 'create' | 'edit'
  initialStudent?: Student | null
  onCancel: () => void
  onSubmit: (values: StudentFormValues) => Promise<void>
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

export function StudentFormPage({ mode, initialStudent, onCancel, onSubmit }: StudentFormPageProps) {
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
      setFormError('Merci de remplir tous les champs.')
      return
    }

    try {
      setIsSaving(true)
      setFormError('')
      await onSubmit(payload)
    } catch {
      setFormError('Enregistrement impossible pour le moment.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="panel rounded-2xl p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="hud-title text-lg font-bold text-cyan-200">
          {mode === 'create' ? 'Ajouter un élève' : 'Modifier un élève'}
        </h2>
        <button
          className="rounded-lg bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/70"
          onClick={onCancel}
          disabled={isSaving}
        >
          Retour à la liste
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm text-slate-300">
          Nom complet
          <input
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          Niveau
          <input
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.level}
            onChange={(event) => updateField('level', event.target.value)}
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          Objectif
          <input
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.objective}
            onChange={(event) => updateField('objective', event.target.value)}
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          Séances réalisées
          <input
            type="number"
            min={0}
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.sessionsDone}
            onChange={(event) => updateField('sessionsDone', Math.max(0, Number(event.target.value) || 0))}
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          Jour de cours
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
          Heure de cours
          <input
            type="time"
            className="futuristic-input rounded-lg px-3 py-2 text-sm"
            value={values.sessionTime}
            onChange={(event) => updateField('sessionTime', event.target.value)}
          />
        </label>

        <label className="sm:col-span-2 grid gap-1 text-sm text-slate-300">
          Prochaine séance (calcul automatique)
          <input
            disabled
            className="futuristic-input rounded-lg px-3 py-2 text-sm opacity-75"
            value={toInputDateTimeValue(values.nextSessionAt)}
            onChange={(event) => updateField('nextSessionAt', fromInputDateTimeValue(event.target.value))}
          />
        </label>

        <label className="sm:col-span-2 grid gap-1 text-sm text-slate-300">
          Avis de progression
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
          Annuler
        </button>
        <button
          className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? 'Enregistrement...' : mode === 'create' ? 'Créer l\'élève' : 'Enregistrer'}
        </button>
      </div>
    </section>
  )
}
