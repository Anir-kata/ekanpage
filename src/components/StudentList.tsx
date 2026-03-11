import type { Student } from '../types/student'

type StudentListProps = {
  students: Student[]
}

export function StudentList({ students }: StudentListProps) {
  if (!students.length) {
    return (
      <section className="panel rounded-2xl p-6">
        <h2 className="hud-title text-lg font-bold text-cyan-200">Mes eleves</h2>
        <p className="mt-3 text-slate-300">Aucun eleve pour le moment. Ajoute ton premier eleve dans l onglet dedie.</p>
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
            className="panel-soft rounded-xl p-4 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-100">{student.fullName}</h3>
              <span className="rounded-full border border-cyan-300/50 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                {student.level}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">Objectif: {student.objective}</p>
            <p className="mt-1 text-sm text-slate-300">Seances faites: {student.sessionsDone}</p>
            <p className="mt-1 text-sm text-slate-300">Prochaine seance: {student.nextSessionAt}</p>
            <p className="mt-3 text-sm text-slate-400">Notes: {student.notes}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
