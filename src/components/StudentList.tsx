import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import type { Student } from '../types/student'

type StudentListProps = {
  students: Student[]
  onUpdateStudent: (student: Student) => void
  onAddStudent: (student: Student) => void
}

const FICHE_ACCESS_PATTERN = '0-1-2-5-8'

type StudentDraft = {
  id: string
  fullName: string
  level: string
  objective: string
  sessionsDone: number
  nextSessionAt: string
  notes: string
}

const createEmptyDraft = (): StudentDraft => ({
  id: `el-${Date.now()}`,
  fullName: '',
  level: '',
  objective: '',
  sessionsDone: 0,
  nextSessionAt: '',
  notes: '',
})

const toDateTimeInputValue = (value: string) => value.replace(' ', 'T')

const toStoredDateTime = (value: string) => value.replace('T', ' ')

export function StudentList({ students, onUpdateStudent, onAddStudent }: StudentListProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [draft, setDraft] = useState<StudentDraft | null>(null)
  const [patternAttempt, setPatternAttempt] = useState<number[]>([])
  const [isDrawingPattern, setIsDrawingPattern] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [accessError, setAccessError] = useState('')
  const patternRef = useRef<number[]>([])

  const selectedStudent = useMemo(
    () => students.find((student) => student.id === selectedStudentId) ?? null,
    [selectedStudentId, students],
  )

  const anonymizedLabel = (index: number) => `Élève #${index + 1}`

  const closeModal = () => {
    setSelectedStudentId(null)
    setIsCreateMode(false)
    setDraft(null)
    setPatternAttempt([])
    patternRef.current = []
    setIsDrawingPattern(false)
    setIsUnlocked(false)
    setAccessError('')
  }

  const openEditModal = (student: Student) => {
    setSelectedStudentId(student.id)
    setIsCreateMode(false)
    setDraft({ ...student })
    setPatternAttempt([])
    patternRef.current = []
    setIsDrawingPattern(false)
    setIsUnlocked(false)
    setAccessError('')
  }

  const openCreateModal = () => {
    setSelectedStudentId(null)
    setIsCreateMode(true)
    setDraft(createEmptyDraft())
    setPatternAttempt([])
    patternRef.current = []
    setIsDrawingPattern(false)
    setIsUnlocked(false)
    setAccessError('')
  }

  const applyPattern = (nextPattern: number[]) => {
    patternRef.current = nextPattern
    setPatternAttempt(nextPattern)
  }

  const startPattern = (dot: number) => {
    if (isUnlocked) return
    setAccessError('')
    setIsDrawingPattern(true)
    applyPattern([dot])
  }

  const extendPattern = (dot: number) => {
    if (!isDrawingPattern || isUnlocked) return

    const current = patternRef.current
    if (current.includes(dot)) return
    applyPattern([...current, dot])
  }

  const finishPattern = () => {
    if (!isDrawingPattern || isUnlocked) return
    setIsDrawingPattern(false)

    const entered = patternRef.current.join('-')
    if (entered !== FICHE_ACCESS_PATTERN) {
      setAccessError('Schéma incorrect.')
      applyPattern([])
      return
    }

    setAccessError('')
    setIsUnlocked(true)
    applyPattern([])
  }

  useEffect(() => {
    if (!isDrawingPattern) return

    const handlePointerUp = () => finishPattern()
    window.addEventListener('pointerup', handlePointerUp)
    return () => window.removeEventListener('pointerup', handlePointerUp)
  }, [isDrawingPattern])

  const resetPattern = () => {
    applyPattern([])
    setIsDrawingPattern(false)
    setAccessError('')
  }

  const updateDraft = (field: keyof StudentDraft, value: string | number) => {
    if (!draft) return
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSessionsInput = (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(event.target.value)
    updateDraft('sessionsDone', Number.isNaN(parsed) ? 0 : Math.max(0, parsed))
  }

  const saveStudent = () => {
    if (!draft || !isUnlocked) return

    const payload: Student = {
      id: draft.id,
      fullName: draft.fullName.trim(),
      level: draft.level.trim(),
      objective: draft.objective.trim(),
      sessionsDone: Math.max(0, draft.sessionsDone),
      nextSessionAt: toStoredDateTime(draft.nextSessionAt.trim()),
      notes: draft.notes.trim(),
    }

    if (!payload.fullName || !payload.level || !payload.objective || !payload.nextSessionAt || !payload.notes) {
      setAccessError('Merci de compléter tous les champs avant validation.')
      return
    }

    if (isCreateMode) {
      onAddStudent(payload)
    } else {
      onUpdateStudent(payload)
    }

    closeModal()
  }

  if (!students.length) {
    return (
      <section className="panel rounded-2xl p-6">
        <h2 className="hud-title text-lg font-bold text-cyan-200">Mes élèves</h2>
        <p className="mt-3 text-slate-300">Aucun élève pour le moment.</p>
        <button
          className="mt-4 rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30"
          onClick={openCreateModal}
        >
          Ajouter un élève
        </button>
      </section>
    )
  }

  return (
    <section className="panel rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="hud-title text-lg font-bold text-cyan-200">Mes élèves</h2>
        <button
          className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.26)]"
          onClick={openCreateModal}
        >
          Ajouter un élève
        </button>
      </div>

      <div className="mt-4 grid gap-4">
        {students.map((student, index) => (
          <article
            key={student.id}
            className="panel-soft group cursor-pointer rounded-xl p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(34,211,238,0.18)]"
            onClick={() => openEditModal(student)}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-100">{anonymizedLabel(index)}</h3>
              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                {student.level}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">Objectif: {student.objective}</p>
            <p className="mt-1 text-sm text-slate-300">Séances faites: {student.sessionsDone}</p>
            <p className="mt-1 text-sm text-slate-300">Prochaine séance: {student.nextSessionAt}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-cyan-200/85 group-hover:text-cyan-100">
              Code requis pour ouvrir la fiche complète
            </p>
          </article>
        ))}
      </div>

      {(draft || selectedStudent || isCreateMode) && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4">
          <div className="panel scan-line w-full max-w-2xl rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Fiche élève</p>
                <h3 className="mt-1 text-lg font-semibold text-cyan-100">
                  {isCreateMode ? 'Ajouter un élève' : 'Modifier un élève'}
                </h3>
              </div>
              <button
                className="rounded-lg bg-slate-900/60 px-3 py-1 text-sm text-slate-200 transition hover:bg-slate-800/70 hover:text-cyan-100"
                onClick={closeModal}
              >
                Fermer
              </button>
            </div>

            {!isUnlocked && (
              <div className="mt-4 rounded-xl bg-slate-900/45 p-4">
                <p className="text-sm text-slate-300">
                  Vérification requise pour ouvrir la fiche complète.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-400">
                  Maintenir cliqué et relier les points
                </p>

                <div className="mt-3 inline-grid grid-cols-3 gap-3 rounded-xl bg-slate-950/60 p-3">
                  {Array.from({ length: 9 }, (_, dot) => {
                    const isSelected = patternAttempt.includes(dot)
                    return (
                      <button
                        key={dot}
                        type="button"
                        className={`h-12 w-12 rounded-full border transition ${
                          isSelected
                            ? 'border-cyan-200 bg-cyan-300/35 shadow-[0_0_16px_rgba(34,211,238,0.45)]'
                            : 'border-cyan-400/30 bg-slate-900/70 hover:border-cyan-300/60'
                        }`}
                        onPointerDown={() => startPattern(dot)}
                        onPointerEnter={() => extendPattern(dot)}
                      />
                    )
                  })}
                </div>

                <div className="mt-3">
                  <button
                    className="rounded-lg bg-slate-800/70 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700/80"
                    onClick={resetPattern}
                  >
                    Réinitialiser le schéma
                  </button>
                </div>
                {accessError && <p className="mt-2 text-xs text-rose-300">{accessError}</p>}
              </div>
            )}

            {isUnlocked && (
              <>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm text-slate-300">
                Nom complet
                <input
                  className="futuristic-input rounded-lg px-3 py-2 text-sm"
                  value={draft?.fullName ?? selectedStudent?.fullName ?? ''}
                  onChange={(event) => updateDraft('fullName', event.target.value)}
                />
              </label>

              <label className="grid gap-1 text-sm text-slate-300">
                Niveau
                <input
                  className="futuristic-input rounded-lg px-3 py-2 text-sm"
                  value={draft?.level ?? selectedStudent?.level ?? ''}
                  onChange={(event) => updateDraft('level', event.target.value)}
                />
              </label>

              <label className="grid gap-1 text-sm text-slate-300">
                Objectif
                <input
                  className="futuristic-input rounded-lg px-3 py-2 text-sm"
                  value={draft?.objective ?? selectedStudent?.objective ?? ''}
                  onChange={(event) => updateDraft('objective', event.target.value)}
                />
              </label>

              <label className="grid gap-1 text-sm text-slate-300">
                Séances réalisées
                <input
                  type="number"
                  min={0}
                  className="futuristic-input rounded-lg px-3 py-2 text-sm"
                  value={draft?.sessionsDone ?? selectedStudent?.sessionsDone ?? 0}
                  onChange={handleSessionsInput}
                />
              </label>

              <label className="sm:col-span-2 grid gap-1 text-sm text-slate-300">
                Prochaine séance
                <input
                  type="datetime-local"
                  className="futuristic-input rounded-lg px-3 py-2 text-sm"
                  value={toDateTimeInputValue(draft?.nextSessionAt ?? selectedStudent?.nextSessionAt ?? '')}
                  onChange={(event) => updateDraft('nextSessionAt', toStoredDateTime(event.target.value))}
                />
              </label>

              <label className="sm:col-span-2 grid gap-1 text-sm text-slate-300">
                Avis de progression
                <textarea
                  className="futuristic-input min-h-28 rounded-lg px-3 py-2 text-sm"
                  value={draft?.notes ?? selectedStudent?.notes ?? ''}
                  onChange={(event) => updateDraft('notes', event.target.value)}
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                className="rounded-lg bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/70"
                onClick={closeModal}
              >
                Annuler
              </button>
              <button
                className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30"
                onClick={saveStudent}
              >
                {isCreateMode ? 'Créer l\'élève' : 'Enregistrer les modifications'}
              </button>
            </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
