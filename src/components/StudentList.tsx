import { useState } from 'react'
import type { Student } from '../types/student'

type StudentListProps = {
  students: Student[]
  onUpdateFiche: (studentId: string, notes: string) => void
}

const FICHE_ACCESS_CODE = 'anir123'

export function StudentList({ students, onUpdateFiche }: StudentListProps) {
  const [draftByStudent, setDraftByStudent] = useState<Record<string, string>>({})
  const [codeByStudent, setCodeByStudent] = useState<Record<string, string>>({})
  const [unlockedByStudent, setUnlockedByStudent] = useState<Record<string, boolean>>({})
  const [errorByStudent, setErrorByStudent] = useState<Record<string, string>>({})

  const unlockStudentFiche = (studentId: string) => {
    if (codeByStudent[studentId]?.trim() !== FICHE_ACCESS_CODE) {
      setErrorByStudent((prev) => ({ ...prev, [studentId]: "Code invalide. Utilise 'anir123'." }))
      return
    }

    setUnlockedByStudent((prev) => ({ ...prev, [studentId]: true }))
    setErrorByStudent((prev) => ({ ...prev, [studentId]: '' }))
  }

  const saveFiche = (studentId: string, fallbackValue: string) => {
    const value = draftByStudent[studentId] ?? fallbackValue
    onUpdateFiche(studentId, value)
  }

  if (!students.length) {
    return (
      <section className="panel rounded-2xl p-6">
        <h2 className="hud-title text-lg font-bold text-cyan-200">Mes eleves</h2>
        <p className="mt-3 text-slate-300">Aucun eleve pour le moment.</p>
      </section>
    )
  }

  return (
    <section className="panel rounded-2xl p-6">
      <h2 className="hud-title text-lg font-bold text-cyan-200">Mes eleves</h2>
      <div className="mt-4 grid gap-4">
        {students.map((student) => (
          <article
            key={student.id}
            className="panel-soft rounded-xl p-4 transition duration-300 hover:-translate-y-0.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-100">{student.fullName}</h3>
              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                {student.level}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">Objectif: {student.objective}</p>
            <p className="mt-1 text-sm text-slate-300">Seances faites: {student.sessionsDone}</p>
            <p className="mt-1 text-sm text-slate-300">Prochaine seance: {student.nextSessionAt}</p>

            <div className="mt-4 rounded-xl bg-slate-900/35 p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Fiche de suivi</p>

              {!unlockedByStudent[student.id] && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <input
                    type="password"
                    value={codeByStudent[student.id] ?? ''}
                    onChange={(event) => setCodeByStudent((prev) => ({ ...prev, [student.id]: event.target.value }))}
                    placeholder="Code d'acces"
                    className="futuristic-input rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    className="rounded-lg bg-cyan-400/20 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/30"
                    onClick={() => unlockStudentFiche(student.id)}
                  >
                    Debloquer la fiche
                  </button>
                  {errorByStudent[student.id] && <p className="w-full text-xs text-rose-300">{errorByStudent[student.id]}</p>}
                </div>
              )}

              {unlockedByStudent[student.id] ? (
                <div className="mt-3 grid gap-2">
                  <textarea
                    className="futuristic-input min-h-28 rounded-lg px-3 py-2 text-sm"
                    value={draftByStudent[student.id] ?? student.notes}
                    onChange={(event) =>
                      setDraftByStudent((prev) => ({
                        ...prev,
                        [student.id]: event.target.value,
                      }))
                    }
                  />
                  <button
                    className="justify-self-start rounded-lg bg-cyan-400/20 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/30"
                    onClick={() => saveFiche(student.id, student.notes)}
                  >
                    Enregistrer la fiche
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-400">{student.notes}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
