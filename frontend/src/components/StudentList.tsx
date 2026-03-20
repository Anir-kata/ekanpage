import type { Student } from '../types/student'

type StudentListProps = {
  students: Student[]
  onRequestCreate: () => void
  onRequestEdit: (student: Student) => void
  onRequireLogin: () => void
  onDeleteStudent: (studentId: string) => Promise<void>
  onOperationSuccess?: (message: string) => void
  canEdit: boolean
  language: 'fr' | 'en'
}

export function StudentList({
  students,
  onRequestCreate,
  onRequestEdit,
  onRequireLogin,
  onDeleteStudent,
  onOperationSuccess,
  canEdit,
  language,
}: StudentListProps) {
  const copy =
    language === 'fr'
      ? {
          studentLabel: (index: number) => `Élève #${index + 1}`,
          confirmDelete: 'Confirmer la suppression de cet élève ?',
          deleteOk: 'Eleve supprime avec succes.',
          deleteFail: 'Suppression impossible pour le moment.',
          title: 'Mes élèves',
          addStudent: 'Ajouter un élève',
          adminLogin: 'admin login',
          empty: 'Aucun élève pour le moment.',
          objective: 'Objectif',
          sessionsDone: 'Séances faites',
          nextSession: 'Prochaine séance',
          notes: 'Avis',
          edit: 'Modifier',
          remove: 'Supprimer',
        }
      : {
          studentLabel: (index: number) => `Student #${index + 1}`,
          confirmDelete: 'Confirm deletion of this student?',
          deleteOk: 'Student deleted successfully.',
          deleteFail: 'Unable to delete student right now.',
          title: 'My students',
          addStudent: 'Add student',
          adminLogin: 'admin login',
          empty: 'No students yet.',
          objective: 'Goal',
          sessionsDone: 'Sessions done',
          nextSession: 'Next session',
          notes: 'Notes',
          edit: 'Edit',
          remove: 'Delete',
        }

  const handleDelete = async (student: Student) => {
    const shouldDelete = window.confirm(copy.confirmDelete)
    if (!shouldDelete) return

    try {
      await onDeleteStudent(student.id)
      onOperationSuccess?.(copy.deleteOk)
    } catch {
      onOperationSuccess?.(copy.deleteFail)
    }
  }

  return (
    <section className="panel rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="hud-title text-lg font-bold text-cyan-200">{copy.title}</h2>
        <button
          className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.26)]"
          onClick={canEdit ? onRequestCreate : onRequireLogin}
        >
          {canEdit ? copy.addStudent : copy.adminLogin}
        </button>
      </div>

      {!students.length && <p className="mt-3 text-slate-300">{copy.empty}</p>}

      {!!students.length && (
        <div className="mt-4 grid gap-4">
          {students.map((student, index) => (
            <article
              key={student.id}
              className="panel-soft stagger-enter rounded-xl p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(34,211,238,0.18)]"
              style={{ ['--stagger-delay' as string]: `${index * 45}ms` }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-100">{copy.studentLabel(index)}</h3>
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {student.level}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{copy.objective}: {student.objective}</p>
              <p className="mt-1 text-sm text-slate-300">{copy.sessionsDone}: {student.sessionsDone}</p>
              <p className="mt-1 text-sm text-slate-300">{copy.nextSession}: {student.nextSessionAt}</p>
              <p className="mt-2 text-sm text-slate-300">{copy.notes}: {student.notes}</p>

              {canEdit && (
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="rounded-lg bg-slate-800/60 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/70"
                    onClick={() => onRequestEdit(student)}
                  >
                    {copy.edit}
                  </button>
                  <button
                    className="rounded-lg bg-rose-500/20 px-3 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/30"
                    onClick={() => void handleDelete(student)}
                  >
                    {copy.remove}
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
