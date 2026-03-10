import type { Student } from '../types/student'

type StudentListProps = {
  students: Student[]
}

export function StudentList({ students }: StudentListProps) {
  if (!students.length) {
    return (
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Mes eleves</h2>
        <p className="mt-3 text-slate-600">Aucun eleve pour le moment. Ajoute ton premier eleve dans l onglet dedie.</p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-bold text-slate-900">Mes eleves</h2>
      <div className="mt-4 grid gap-4">
        {students.map((student) => (
          <article key={student.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-900">{student.fullName}</h3>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{student.level}</span>
            </div>
            <p className="mt-2 text-sm text-slate-700">Objectif: {student.objective}</p>
            <p className="mt-1 text-sm text-slate-700">Seances faites: {student.sessionsDone}</p>
            <p className="mt-1 text-sm text-slate-700">Prochaine seance: {student.nextSessionAt}</p>
            <p className="mt-3 text-sm text-slate-600">Notes: {student.notes}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
