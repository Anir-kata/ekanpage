import { useState, type FormEvent } from 'react'
import type { Student } from '../types/student'

type AddStudentFormProps = {
  onAddStudent: (student: Student) => void
}

type FormState = {
  fullName: string
  level: string
  objective: string
  nextSessionAt: string
  notes: string
}

const initialForm: FormState = {
  fullName: '',
  level: '',
  objective: '',
  nextSessionAt: '',
  notes: '',
}

export function AddStudentForm({ onAddStudent }: AddStudentFormProps) {
  const [form, setForm] = useState<FormState>(initialForm)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.fullName.trim() || !form.level.trim() || !form.objective.trim()) {
      return
    }

    onAddStudent({
      id: `el-${Date.now()}`,
      fullName: form.fullName.trim(),
      level: form.level.trim(),
      objective: form.objective.trim(),
      sessionsDone: 0,
      nextSessionAt: form.nextSessionAt.trim() || 'A planifier',
      notes: form.notes.trim() || 'Aucune note pour le moment.',
    })

    setForm(initialForm)
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-bold text-slate-900">Ajouter un eleve</h2>
      <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-1 text-sm font-medium text-slate-700">
          Nom complet
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none ring-slate-300 transition focus:ring-2"
            value={form.fullName}
            onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
            placeholder="Ex: Sara Dupont"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium text-slate-700">
          Niveau
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none ring-slate-300 transition focus:ring-2"
            value={form.level}
            onChange={(event) => setForm((prev) => ({ ...prev, level: event.target.value }))}
            placeholder="Ex: Terminale"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium text-slate-700">
          Objectif
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none ring-slate-300 transition focus:ring-2"
            value={form.objective}
            onChange={(event) => setForm((prev) => ({ ...prev, objective: event.target.value }))}
            placeholder="Ex: Preparation bac"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium text-slate-700">
          Prochaine seance
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none ring-slate-300 transition focus:ring-2"
            value={form.nextSessionAt}
            onChange={(event) => setForm((prev) => ({ ...prev, nextSessionAt: event.target.value }))}
            placeholder="Ex: 2026-03-16 17:00"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium text-slate-700">
          Notes
          <textarea
            className="min-h-24 rounded-lg border border-slate-300 px-3 py-2 outline-none ring-slate-300 transition focus:ring-2"
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            placeholder="Points importants de suivi"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Enregistrer l eleve
        </button>
      </form>
    </section>
  )
}
