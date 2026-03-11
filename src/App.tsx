import { useMemo, useState } from 'react'
import { CVProfile } from './components/CVProfile'
import { StudentList } from './components/StudentList'
import { Tabs, type TabKey } from './components/Tabs'
import { mockStudents } from './data/mockStudents'
import type { Student } from './types/student'

function App() {
  const [activeView, setActiveView] = useState<'portfolio' | TabKey>('portfolio')
  const [students, setStudents] = useState<Student[]>(mockStudents)

  const totalSessions = useMemo(
    () => students.reduce((acc, student) => acc + student.sessionsDone, 0),
    [students],
  )

  const updateStudentFiche = (studentId: string, notes: string) => {
    setStudents((prev) => prev.map((student) => (student.id === studentId ? { ...student, notes } : student)))
  }

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-[-80px] top-[-90px] h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-60px] right-[-40px] h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl" />

      {activeView === 'portfolio' && <CVProfile onOpenPedagogy={() => setActiveView('dashboard')} />}

      {activeView !== 'portfolio' && (
        <>
          {activeView === 'dashboard' && (
            <header className="panel scan-line relative rounded-3xl p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/90">Espace d'enseignement</p>
              <h1 className="hud-title mt-3 text-2xl font-black text-slate-100 sm:text-3xl lg:text-4xl">
                Tableau de bord pedagogique
              </h1>
              <p className="mt-3 w-full max-w-3xl text-sm text-slate-300 sm:text-base">
                Suivi des eleves, pilotage des seances et gestion des fiches de progression.
              </p>
            </header>
          )}

          <section className="panel mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
            <Tabs activeTab={activeView} onChange={setActiveView} />
            <button
              className="rounded-xl bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800/70 hover:text-cyan-100"
              onClick={() => setActiveView('portfolio')}
            >
              Retour au portfolio
            </button>
          </section>

          {activeView === 'dashboard' && (
            <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <article className="panel-soft rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-cyan-400/20">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Nombre d eleves</p>
                <p className="neon-cyan mt-3 text-4xl font-extrabold">{students.length}</p>
              </article>
              <article className="panel-soft rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-blue-400/20">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Seances realisees</p>
                <p className="mt-3 text-4xl font-extrabold text-blue-300">{totalSessions}</p>
              </article>
              <article className="panel-soft rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-indigo-400/20">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Prochaine etape</p>
                <p className="mt-3 text-base font-semibold text-indigo-200">Ajouter des fiches de suivi par eleve</p>
              </article>
            </section>
          )}

          {activeView === 'students' && (
            <section className="mt-6">
              <StudentList students={students} onUpdateFiche={updateStudentFiche} />
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default App
