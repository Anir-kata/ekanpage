import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import {
  clearAuthToken,
  createStudent as createStudentApi,
  deleteStudent as deleteStudentApi,
  fetchStudents,
  getAuthToken,
  login as loginApi,
  type StudentsPage,
  updateStudent as updateStudentApi,
} from './api/students'
import { CVProfile } from './components/CVProfile'
import { StudentFormPage, type StudentFormValues } from './components/StudentFormPage'
import { StudentList } from './components/StudentList'
import { Tabs, type TabKey } from './components/Tabs'
import type { Student } from './types/student'

type StudentsScreen = 'list' | 'create' | 'edit'
type AuthScreen = 'none' | 'login'

function App() {
  const [activeView, setActiveView] = useState<'portfolio' | TabKey>('portfolio')
  const [studentsView, setStudentsView] = useState<StudentsScreen>('list')
  const [authScreen, setAuthScreen] = useState<AuthScreen>('none')
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [isEditMode, setIsEditMode] = useState(Boolean(getAuthToken()))
  const [loginUsername, setLoginUsername] = useState('anir')
  const [loginPassword, setLoginPassword] = useState('anir123')
  const [loginError, setLoginError] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [students, setStudents] = useState<Student[]>([])
  const [studentsLoading, setStudentsLoading] = useState(true)
  const [studentsError, setStudentsError] = useState('')
  const [operationFeedback, setOperationFeedback] = useState('')
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)
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
    if (!isEditMode) {
      setAuthScreen('login')
      return
    }

    setEditingStudent(null)
    setStudentsView('create')
  }

  const openEditPage = (student: Student) => {
    if (!isEditMode) {
      setAuthScreen('login')
      return
    }

    setEditingStudent(student)
    setStudentsView('edit')
  }

  const closeFormPage = () => {
    setEditingStudent(null)
    setStudentsView('list')
  }

  const isStudentsListView = studentsView === 'list'
  const reviewFeed = useMemo(
    () =>
      students
        .filter((student) => Boolean(student.notes?.trim()))
        .map((student) => ({
          note: student.notes.trim(),
          level: student.level,
          sessionsDone: student.sessionsDone,
          nextSessionAt: student.nextSessionAt,
        })),
    [students],
  )

  useEffect(() => {
    if (!reviewFeed.length) {
      setActiveReviewIndex(0)
      return
    }

    const interval = setInterval(() => {
      setActiveReviewIndex((previous) => (previous + 1) % reviewFeed.length)
    }, 4200)

    return () => clearInterval(interval)
  }, [reviewFeed.length])

  const activeReview = reviewFeed.length ? reviewFeed[activeReviewIndex % reviewFeed.length] : null

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoginError('')

    try {
      setIsLoginLoading(true)
      await loginApi(loginUsername.trim(), loginPassword)
      setIsEditMode(true)
      setAuthScreen('none')
      setOperationFeedback('Mode modification activé.')
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Connexion impossible.')
    } finally {
      setIsLoginLoading(false)
    }
  }

  const handleLogout = () => {
    clearAuthToken()
    setIsEditMode(false)
    setStudentsView('list')
    setEditingStudent(null)
    setOperationFeedback('Mode lecture activé.')
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
            <div className="flex items-center gap-2">
              {!isEditMode && (
                <button
                  className="rounded-xl bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30"
                  onClick={() => setAuthScreen('login')}
                >
                  Se connecter
                </button>
              )}
              {isEditMode && (
                <button
                  className="rounded-xl bg-rose-900/50 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-800/70"
                  onClick={handleLogout}
                >
                  Se deconnecter
                </button>
              )}
              <button
                className="rounded-xl bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800/70 hover:text-cyan-100"
                onClick={() => setActiveView('portfolio')}
              >
                Retour au portfolio
              </button>
            </div>
          </section>

          {authScreen === 'login' && (
            <section className="panel mt-6 rounded-2xl p-5">
              <h3 className="hud-title text-base font-bold text-cyan-200">Se connecter</h3>
              <form onSubmit={handleLogin} className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  className="futuristic-input rounded-lg px-3 py-2 text-sm"
                  value={loginUsername}
                  onChange={(event) => setLoginUsername(event.target.value)}
                  placeholder="Nom d'utilisateur"
                />
                <input
                  type="password"
                  className="futuristic-input rounded-lg px-3 py-2 text-sm"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  placeholder="Mot de passe"
                />
                <div className="sm:col-span-2 flex justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/70"
                    onClick={() => setAuthScreen('none')}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isLoginLoading}
                    className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30 disabled:opacity-60"
                  >
                    {isLoginLoading ? 'Connexion...' : 'Activer le mode modification'}
                  </button>
                </div>
                {loginError && <p className="sm:col-span-2 text-sm text-rose-300">{loginError}</p>}
              </form>
            </section>
          )}

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
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
                <article className="review-spotlight relative overflow-hidden rounded-xl p-4 sm:p-5">
                  {activeReview && (
                    <>
                      <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">Signal principal</p>
                      <p className="review-quote mt-3 text-base leading-relaxed text-slate-100 sm:text-lg">
                        "{activeReview.note}"
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-1">
                          Niveau: {activeReview.level}
                        </span>
                        <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2 py-1">
                          Sessions: {activeReview.sessionsDone}
                        </span>
                        <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-1">
                          Prochaine: {activeReview.nextSessionAt}
                        </span>
                      </div>
                      <p className="mt-4 text-xs tracking-[0.2em] text-cyan-300/70">***** FEEDBACK VERIFIED *****</p>
                    </>
                  )}
                  {!activeReview && <p className="text-sm text-slate-300">Aucun avis pour le moment.</p>}
                </article>

                <div className="rounded-xl border border-cyan-400/20 bg-slate-950/35 p-3">
                  {!!reviewFeed.length && (
                    <>
                      <div className="reviews-ticker">
                        {[...reviewFeed, ...reviewFeed].map((review, index) => (
                          <span key={`${review.note}-${index}`} className="reviews-chip">
                            {review.note}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {reviewFeed.slice(0, 8).map((review, index) => (
                          <button
                            key={`${review.note}-${index}-dot`}
                            type="button"
                            className={`review-dot ${index === activeReviewIndex % reviewFeed.length ? 'review-dot--active' : ''}`}
                            onClick={() => setActiveReviewIndex(index)}
                            aria-label={`Afficher l'avis ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  {!reviewFeed.length && <p className="text-sm text-slate-300">Aucun avis pour le moment.</p>}
                </div>
              </div>

              {!!reviewFeed.length && (
                <div className="mt-4 text-xs text-slate-400">
                  Rotation automatique toutes les 4.2 secondes. Cliquez sur un indicateur pour figer un avis.
                </div>
              )}
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
                    onRequireLogin={() => setAuthScreen('login')}
                    onDeleteStudent={handleDeleteStudent}
                    onOperationSuccess={setOperationFeedback}
                    canEdit={isEditMode}
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
