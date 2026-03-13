import { useEffect, useMemo, useRef, useState } from 'react'
import {
  createStudent as createStudentApi,
  deleteStudent as deleteStudentApi,
  fetchStudents,
  type StudentsPage,
  updateStudent as updateStudentApi,
} from './api/students'
import { CVProfile } from './components/CVProfile'
import { StudentFormPage, type StudentFormValues } from './components/StudentFormPage'
import { StudentList } from './components/StudentList'
import { Tabs, type TabKey } from './components/Tabs'
import type { Student } from './types/student'

type StudentsScreen = 'list' | 'create' | 'edit'

function App() {
  const [activeView, setActiveView] = useState<'portfolio' | TabKey>('portfolio')
  const [studentsView, setStudentsView] = useState<StudentsScreen>('list')
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [studentsLoading, setStudentsLoading] = useState(true)
  const [studentsError, setStudentsError] = useState('')
  const [operationFeedback, setOperationFeedback] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [studentsPage, setStudentsPage] = useState<StudentsPage>({
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  })
  const frameRef = useRef<number | null>(null)
  const pointerRef = useRef<{ x: number; y: number } | null>(null)

  const loadStudents = async (params?: { search?: string; page?: number }) => {
    setStudentsLoading(true)
    setStudentsError('')

    try {
      const loaded = await fetchStudents({
        search: params?.search ?? searchTerm,
        page: params?.page ?? studentsPage.page,
        limit: studentsPage.limit,
      })

      setStudents(loaded.items)
      setStudentsPage(loaded)
    } catch (error) {
      setStudentsError(error instanceof Error ? error.message : 'Erreur inconnue de chargement.')
    } finally {
      setStudentsLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false

    const loadInitialStudents = async () => {
      try {
        const loadedStudents = await fetchStudents({ page: 1, limit: 10 })
        if (!cancelled) {
          setStudents(loadedStudents.items)
          setStudentsPage(loadedStudents)
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

    void loadInitialStudents()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!operationFeedback) return

    const timeout = setTimeout(() => setOperationFeedback(''), 2500)
    return () => clearTimeout(timeout)
  }, [operationFeedback])

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

  const handleCreateStudent = async (values: StudentFormValues) => {
    await createStudentApi(values)
    await loadStudents({ page: 1, search: searchTerm })
    setStudentsView('list')
    setOperationFeedback('Eleve cree avec succes.')
  }

  const handleUpdateStudent = async (values: StudentFormValues) => {
    if (!editingStudent) return

    await updateStudentApi(editingStudent.id, values)
    await loadStudents({ page: studentsPage.page, search: searchTerm })
    setStudentsView('list')
    setEditingStudent(null)
    setOperationFeedback('Eleve mis a jour avec succes.')
  }

  const handleDeleteStudent = async (studentId: string) => {
    await deleteStudentApi(studentId)
    await loadStudents({ page: studentsPage.page, search: searchTerm })
  }

  const applySearch = () => {
    setSearchTerm(searchInput)
    void loadStudents({ search: searchInput, page: 1 })
  }

  const goToPage = (page: number) => {
    if (page < 1 || page > studentsPage.totalPages) return
    void loadStudents({ page })
  }

  const openCreatePage = () => {
    setEditingStudent(null)
    setStudentsView('create')
  }

  const openEditPage = (student: Student) => {
    setEditingStudent(student)
    setStudentsView('edit')
  }

  const closeFormPage = () => {
    setEditingStudent(null)
    setStudentsView('list')
  }

  const isStudentsListView = studentsView === 'list'

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
              {operationFeedback && (
                <div className="panel mb-4 rounded-2xl p-4 text-sm text-emerald-300">{operationFeedback}</div>
              )}

              {isStudentsListView && (
                <>
                  <div className="panel mb-4 grid gap-3 rounded-2xl p-4 sm:grid-cols-[1fr_auto_auto]">
                    <input
                      className="futuristic-input rounded-lg px-3 py-2 text-sm"
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                      placeholder="Rechercher un eleve, niveau ou objectif"
                    />
                    <button
                      className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30"
                      onClick={applySearch}
                    >
                      Rechercher
                    </button>
                    <div className="rounded-lg bg-slate-900/50 px-3 py-2 text-xs text-slate-300">
                      {studentsPage.total} eleve(s)
                    </div>
                  </div>

                  <StudentList
                    students={students}
                    onRequestCreate={openCreatePage}
                    onRequestEdit={openEditPage}
                    onDeleteStudent={handleDeleteStudent}
                    onOperationSuccess={setOperationFeedback}
                  />

                  <div className="panel mt-4 flex items-center justify-between rounded-2xl p-4 text-sm text-slate-300">
                    <button
                      className="rounded-lg bg-slate-900/60 px-3 py-2 transition hover:bg-slate-800/70 disabled:opacity-40"
                      onClick={() => goToPage(studentsPage.page - 1)}
                      disabled={studentsPage.page <= 1}
                    >
                      Page precedente
                    </button>
                    <span>
                      Page {studentsPage.page} / {studentsPage.totalPages}
                    </span>
                    <button
                      className="rounded-lg bg-slate-900/60 px-3 py-2 transition hover:bg-slate-800/70 disabled:opacity-40"
                      onClick={() => goToPage(studentsPage.page + 1)}
                      disabled={studentsPage.page >= studentsPage.totalPages}
                    >
                      Page suivante
                    </button>
                  </div>
                </>
              )}

              {studentsView === 'create' && (
                <StudentFormPage mode="create" onCancel={closeFormPage} onSubmit={handleCreateStudent} />
              )}

              {studentsView === 'edit' && (
                <StudentFormPage
                  mode="edit"
                  initialStudent={editingStudent}
                  onCancel={closeFormPage}
                  onSubmit={handleUpdateStudent}
                />
              )}
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default App
