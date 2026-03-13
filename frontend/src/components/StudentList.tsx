import type { Student } from '../types/student'

type StudentListProps = {
  students: Student[]
  onRequestCreate: () => void
  onRequestEdit: (student: Student) => void
  onRequireLogin: () => void
  onDeleteStudent: (studentId: string) => Promise<void>
  onOperationSuccess?: (message: string) => void
  canEdit: boolean
}

export function StudentList({
  students,
  onRequestCreate,
  onRequestEdit,
  onRequireLogin,
  onDeleteStudent,
  onOperationSuccess,
  canEdit,
}: StudentListProps) {
  const anonymizedLabel = (index: number) => `Élève #${index + 1}`

  const handleDelete = async (student: Student) => {
    const shouldDelete = window.confirm('Confirmer la suppression de cet élève ?')
    if (!shouldDelete) return

    try {
      await onDeleteStudent(student.id)
      onOperationSuccess?.('Eleve supprime avec succes.')
    } catch {
      onOperationSuccess?.('Suppression impossible pour le moment.')
    }
  }

  return (
    <section className="panel rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="hud-title text-lg font-bold text-cyan-200">Mes élèves</h2>
        <button
          className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.26)]"
          onClick={canEdit ? onRequestCreate : onRequireLogin}
        >
          {canEdit ? 'Ajouter un élève' : 'Se connecter pour modifier'}
        </button>
      </div>

      {!students.length && <p className="mt-3 text-slate-300">Aucun élève pour le moment.</p>}

      {!!students.length && (
        <div className="mt-4 grid gap-4">
          {students.map((student, index) => (
            <article
              key={student.id}
              className="panel-soft rounded-xl p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(34,211,238,0.18)]"
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
              <p className="mt-2 text-sm text-slate-300">Avis: {student.notes}</p>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="rounded-lg bg-slate-800/60 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/70"
                  onClick={() => (canEdit ? onRequestEdit(student) : onRequireLogin())}
                >
                  Modifier
                </button>
                <button
                  className="rounded-lg bg-rose-500/20 px-3 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/30"
                  onClick={() => (canEdit ? void handleDelete(student) : onRequireLogin())}
                >
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
