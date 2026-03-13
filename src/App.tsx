import { useEffect, useMemo, useRef, useState } from 'react'
import { fetchStudents } from './api/students'
import { CVProfile } from './components/CVProfile'
import { StudentList } from './components/StudentList'
import { Tabs, type TabKey } from './components/Tabs'
import type { Student } from './types/student'

function App() {
  const [activeView, setActiveView] = useState<'portfolio' | TabKey>('portfolio')
  const [students, setStudents] = useState<Student[]>([])
  const [studentsLoading, setStudentsLoading] = useState(true)
  const [studentsError, setStudentsError] = useState('')
  const frameRef = useRef<number | null>(null)
  const pointerRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadStudents = async () => {
      setStudentsLoading(true)
      setStudentsError('')

      try {
        const loadedStudents = await fetchStudents()
        if (!cancelled) {
          setStudents(loadedStudents)
        }
      } catch (error) {
        if (!cancelled) {
          setStudentsError(error instanceof Error ? error.message : 'Erreur inconnue de chargement.')
        }
      } finally {
        if (!cancelled) {
          setStudentsLoading(false)
        }
      }
    }

    void loadStudents()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const flushPointer = () => {
      const next = pointerRef.current
      if (!next) {
        frameRef.current = null
        return
      }

      const root = document.documentElement
      root.style.setProperty('--mouse-x', `${next.x}px`)
      root.style.setProperty('--mouse-y', `${next.y}px`)
      pointerRef.current = null
      frameRef.current = null
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY }
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(flushPointer)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const totalSessions = useMemo(
    () => students.reduce((acc, student) => acc + student.sessionsDone, 0),
    [students],
  )

  const updateStudent = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)),
    )
  }

  const addStudent = (student: Student) => {
    setStudents((prev) => [student, ...prev])
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
                Tableau de bord pédagogique
              </h1>
              <p className="mt-3 w-full max-w-3xl text-sm text-slate-300 sm:text-base">
                Suivi des élèves, pilotage des séances et gestion des fiches de progression.
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
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Nombre d'élèves</p>
                <p className="neon-cyan mt-3 text-4xl font-extrabold">{students.length}</p>
              </article>
              <article className="panel-soft rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-blue-400/20">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Séances réalisées</p>
                <p className="mt-3 text-4xl font-extrabold text-blue-300">{totalSessions}</p>
              </article>
              <article className="panel-soft rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-indigo-400/20">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Progression observée</p>
                <p className="mt-3 text-base font-semibold text-indigo-200">Suivi positif global</p>
              </article>
            </section>
          )}

          {activeView === 'dashboard' && (
            <section className="mt-6 panel rounded-2xl p-5">
              <h3 className="hud-title text-base font-bold text-cyan-200">Avis de progression des élèves</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {students.slice(0, 3).map((student, index) => (
                  <article
                    key={student.id}
                    className="panel-soft rounded-xl p-4 transition hover:-translate-y-0.5 hover:shadow-cyan-400/20"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Élève #{index + 1}</p>
                    <p className="mt-2 text-sm text-slate-200">{student.notes}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeView === 'students' && (
            <section className="mt-6">
              {studentsLoading && (
                <div className="panel rounded-2xl p-4 text-sm text-slate-300">Chargement des eleves...</div>
              )}
              {studentsError && (
                <div className="panel rounded-2xl p-4 text-sm text-rose-300">{studentsError}</div>
              )}
              <StudentList students={students} onUpdateStudent={updateStudent} onAddStudent={addStudent} />
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default App
