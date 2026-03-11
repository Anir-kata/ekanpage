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
    <section className="panel rounded-2xl p-6">
      <h2 className="hud-title text-lg font-bold text-cyan-200">Ajouter un eleve</h2>
      <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-1 text-sm font-medium text-slate-300">
          Nom complet
          <input
            className="futuristic-input rounded-lg px-3 py-2 transition"
            value={form.fullName}
            onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
            placeholder="Ex: Sara Dupont"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium text-slate-300">
          Niveau
          <input
            className="futuristic-input rounded-lg px-3 py-2 transition"
            value={form.level}
            onChange={(event) => setForm((prev) => ({ ...prev, level: event.target.value }))}
            placeholder="Ex: Terminale"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium text-slate-300">
          Objectif
          <input
            className="futuristic-input rounded-lg px-3 py-2 transition"
            value={form.objective}
            onChange={(event) => setForm((prev) => ({ ...prev, objective: event.target.value }))}
            placeholder="Ex: Preparation bac"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium text-slate-300">
          Prochaine seance
          <input
            className="futuristic-input rounded-lg px-3 py-2 transition"
            value={form.nextSessionAt}
            onChange={(event) => setForm((prev) => ({ ...prev, nextSessionAt: event.target.value }))}
            placeholder="Ex: 2026-03-16 17:00"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium text-slate-300">
          Notes
          <textarea
            className="futuristic-input min-h-24 rounded-lg px-3 py-2 transition"
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            placeholder="Points importants de suivi"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition duration-300 hover:bg-cyan-300/30 hover:shadow-[0_0_22px_rgba(34,211,238,0.36)]"
        >
          Enregistrer l'élève
        </button>
      </form>
    </section>
  )
}
