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
type Language = 'fr' | 'en'

function App() {
  const [activeView, setActiveView] = useState<'portfolio' | TabKey>('portfolio')
  const [language, setLanguage] = useState<Language>('fr')
  const [studentsView, setStudentsView] = useState<StudentsScreen>('list')
  const [authScreen, setAuthScreen] = useState<AuthScreen>('none')
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [isEditMode, setIsEditMode] = useState(Boolean(getAuthToken()))
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [students, setStudents] = useState<Student[]>([])
  const [studentsLoading, setStudentsLoading] = useState(true)
  const [studentsError, setStudentsError] = useState('')
  const [operationFeedback, setOperationFeedback] = useState('')
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)
  const [studentsPage, setStudentsPage] = useState<StudentsPage>({
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  })
  const frameRef = useRef<number | null>(null)
  const pointerRef = useRef<{ x: number; y: number } | null>(null)

  const loadStudents = async (params?: { page?: number }) => {
    setStudentsLoading(true)
    setStudentsError('')

    try {
      const loaded = await fetchStudents({
        page: params?.page ?? studentsPage.page,
        limit: studentsPage.limit,
      })

      setStudents(loaded.items)
      setStudentsPage(loaded)
    } catch (error) {
      setStudentsError(error instanceof Error ? error.message : copy.unknownLoadError)
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

  const copy = useMemo(
    () =>
      language === 'fr'
        ? {
            unknownLoadError: 'Erreur inconnue de chargement.',
            studentCreated: 'Eleve cree avec succes.',
            studentUpdated: 'Eleve mis a jour avec succes.',
            editModeEnabled: 'Mode modification activé.',
            loginFailed: 'Connexion impossible.',
            readModeEnabled: 'Mode lecture activé.',
            teachingSpace: "Espace d'enseignement",
            dashboardTitle: 'Tableau de bord pédagogique',
            dashboardSubtitle: 'Suivi des élèves, pilotage des séances et gestion des fiches de progression.',
            logout: 'Se deconnecter',
            backToPortfolio: 'Retour au portfolio',
            adminLogin: 'Admin login',
            usernamePlaceholder: 'Pseudo',
            passwordPlaceholder: 'Mot de passe',
            cancel: 'Annuler',
            login: 'Se connecter',
            loginLoading: 'Connexion...',
            totalStudents: "Nombre d'élèves",
            doneSessions: 'Séances réalisées',
            observedProgress: 'Progression observée',
            positiveProgress: 'Suivi positif global',
            notesTitle: 'Avis sur les élèves, points à améliorer, etc..',
            noReview: 'Aucun avis pour le moment.',
            showReviewAria: (index: number) => `Afficher l'avis ${index + 1}`,
            sessionsCount: 'nombre de séances',
            loadingStudents: 'Chargement des eleves...',
            previousPage: 'Page precedente',
            nextPage: 'Page suivante',
            page: 'Page',
            toggleTo: 'ENG',
          }
        : {
            unknownLoadError: 'Unknown loading error.',
            studentCreated: 'Student created successfully.',
            studentUpdated: 'Student updated successfully.',
            editModeEnabled: 'Edit mode enabled.',
            loginFailed: 'Unable to sign in.',
            readModeEnabled: 'Read-only mode enabled.',
            teachingSpace: 'Teaching workspace',
            dashboardTitle: 'Teaching dashboard',
            dashboardSubtitle: 'Track students, monitor sessions, and manage progress notes.',
            logout: 'Sign out',
            backToPortfolio: 'Back to portfolio',
            adminLogin: 'Admin login',
            usernamePlaceholder: 'Username',
            passwordPlaceholder: 'Password',
            cancel: 'Cancel',
            login: 'Sign in',
            loginLoading: 'Signing in...',
            totalStudents: 'Total students',
            doneSessions: 'Sessions completed',
            observedProgress: 'Observed progress',
            positiveProgress: 'Overall positive progress',
            notesTitle: 'Student feedback and improvement points',
            noReview: 'No feedback yet.',
            showReviewAria: (index: number) => `Show feedback ${index + 1}`,
            sessionsCount: 'sessions',
            loadingStudents: 'Loading students...',
            previousPage: 'Previous page',
            nextPage: 'Next page',
            page: 'Page',
            toggleTo: 'FR',
          },
    [language],
  )

  const handleCreateStudent = async (values: StudentFormValues) => {
    await createStudentApi(values)
    await loadStudents({ page: 1 })
    setStudentsView('list')
    setOperationFeedback(copy.studentCreated)
  }

  const handleUpdateStudent = async (values: StudentFormValues) => {
    if (!editingStudent) return

    await updateStudentApi(editingStudent.id, values)
    await loadStudents({ page: studentsPage.page })
    setStudentsView('list')
    setEditingStudent(null)
    setOperationFeedback(copy.studentUpdated)
  }

  const handleDeleteStudent = async (studentId: string) => {
    await deleteStudentApi(studentId)
    await loadStudents({ page: studentsPage.page })
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
      await loadStudents({ page: 1 })
      setIsEditMode(true)
      setAuthScreen('none')
      setOperationFeedback(copy.editModeEnabled)
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : copy.loginFailed)
    } finally {
      setIsLoginLoading(false)
    }
  }

  const handleLogout = () => {
    clearAuthToken()
    setIsEditMode(false)
    setStudentsView('list')
    setEditingStudent(null)
    setStudents([])
    setStudentsPage({
      items: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    })
    setStudentsError('')
    setOperationFeedback(copy.readModeEnabled)
  }

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-[-80px] top-[-90px] h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-60px] right-[-40px] h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="mb-4 flex justify-end">
        <button
          type="button"
          className="rounded-xl border border-cyan-400/25 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-slate-800/70"
          onClick={() => setLanguage((previous) => (previous === 'fr' ? 'en' : 'fr'))}
        >
          {copy.toggleTo}
        </button>
      </div>

      {activeView === 'portfolio' && <CVProfile onOpenPedagogy={() => setActiveView('dashboard')} language={language} />}

      {activeView !== 'portfolio' && (
        <>
          {activeView === 'dashboard' && (
            <header className="panel scan-line relative rounded-3xl p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/90">{copy.teachingSpace}</p>
              <h1 className="hud-title mt-3 text-2xl font-black text-slate-100 sm:text-3xl lg:text-4xl">
                {copy.dashboardTitle}
              </h1>
              <p className="mt-3 w-full max-w-3xl text-sm text-slate-300 sm:text-base">
                {copy.dashboardSubtitle}
              </p>
            </header>
          )}

          <section className="panel mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
            <Tabs activeTab={activeView} onChange={setActiveView} language={language} />
            <div className="flex items-center gap-2">
              {isEditMode && (
                <button
                  className="rounded-xl bg-rose-900/50 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-800/70"
                  onClick={handleLogout}
                >
                  {copy.logout}
                </button>
              )}
              <button
                className="rounded-xl bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800/70 hover:text-cyan-100"
                onClick={() => setActiveView('portfolio')}
              >
                {copy.backToPortfolio}
              </button>
            </div>
          </section>

          {authScreen === 'login' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
              <div
                className="absolute inset-0"
                onClick={() => setAuthScreen('none')}
                aria-hidden="true"
              />
              <section className="panel relative z-10 w-full max-w-md rounded-2xl p-5">
                <h3 className="hud-title text-base font-bold text-cyan-200">{copy.adminLogin}</h3>
                <form onSubmit={handleLogin} className="mt-4 grid gap-3">
                  <input
                    className="futuristic-input rounded-lg px-3 py-2 text-sm"
                    value={loginUsername}
                    onChange={(event) => setLoginUsername(event.target.value)}
                    placeholder={copy.usernamePlaceholder}
                    autoFocus
                  />
                  <input
                    type="password"
                    className="futuristic-input rounded-lg px-3 py-2 text-sm"
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    placeholder={copy.passwordPlaceholder}
                  />
                  <div className="mt-1 flex justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-lg bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/70"
                      onClick={() => setAuthScreen('none')}
                    >
                      {copy.cancel}
                    </button>
                    <button
                      type="submit"
                      disabled={isLoginLoading}
                      className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/30 disabled:opacity-60"
                    >
                      {isLoginLoading ? copy.loginLoading : copy.login}
                    </button>
                  </div>
                  {loginError && <p className="text-sm text-rose-300">{loginError}</p>}
                </form>
              </section>
            </div>
          )}

          {activeView === 'dashboard' && (
            <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <article className="panel-soft rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-cyan-400/20">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.totalStudents}</p>
                <p className="neon-cyan mt-3 text-4xl font-extrabold">{students.length}</p>
              </article>
              <article className="panel-soft rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-blue-400/20">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.doneSessions}</p>
                <p className="mt-3 text-4xl font-extrabold text-blue-300">{totalSessions}</p>
              </article>
              <article className="panel-soft rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-indigo-400/20">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.observedProgress}</p>
                <p className="mt-3 text-base font-semibold text-indigo-200">{copy.positiveProgress}</p>
              </article>
            </section>
          )}

          {activeView === 'dashboard' && (
            <section className="mt-6 panel rounded-2xl p-5">
              <h3 className="hud-title text-base font-bold text-cyan-200">{copy.notesTitle}</h3>
              <div className="mt-4">
                <article className="review-spotlight relative overflow-hidden rounded-xl p-4 sm:p-5">
                  {activeReview && (
                    <div className="relative z-10">
                      <p className="review-quote mt-3 text-base leading-relaxed text-slate-100 sm:text-lg">
                        "{activeReview.note}"
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-1">
                          {activeReview.level}
                        </span>
                        <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2 py-1">
                          {copy.sessionsCount}: {activeReview.sessionsDone}
                        </span>
                      </div>
                    </div>
                  )}
                  {!activeReview && <p className="text-sm text-slate-300">{copy.noReview}</p>}
                </article>
                {!!reviewFeed.length && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {reviewFeed.slice(0, 8).map((review, index) => (
                      <button
                        key={`${review.note}-${index}-dot`}
                        type="button"
                        className={`review-dot ${index === activeReviewIndex % reviewFeed.length ? 'review-dot--active' : ''}`}
                        onClick={() => setActiveReviewIndex(index)}
                        aria-label={copy.showReviewAria(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {activeView === 'students' && (
            <section className="mt-6">
              {studentsLoading && (
                <div className="panel rounded-2xl p-4 text-sm text-slate-300">{copy.loadingStudents}</div>
              )}
              {studentsError && (
                <div className="panel rounded-2xl p-4 text-sm text-rose-300">{studentsError}</div>
              )}
              {operationFeedback && (
                <div className="panel mb-4 rounded-2xl p-4 text-sm text-emerald-300">{operationFeedback}</div>
              )}

              {isStudentsListView && (
                <>

                  <StudentList
                    students={students}
                    onRequestCreate={openCreatePage}
                    onRequestEdit={openEditPage}
                    onRequireLogin={() => setAuthScreen('login')}
                    onDeleteStudent={handleDeleteStudent}
                    onOperationSuccess={setOperationFeedback}
                    canEdit={isEditMode}
                    language={language}
                  />

                  <div className="panel mt-4 flex items-center justify-between rounded-2xl p-4 text-sm text-slate-300">
                    <button
                      className="rounded-lg bg-slate-900/60 px-3 py-2 transition hover:bg-slate-800/70 disabled:opacity-40"
                      onClick={() => goToPage(studentsPage.page - 1)}
                      disabled={studentsPage.page <= 1}
                    >
                      {copy.previousPage}
                    </button>
                    <span>
                      {copy.page} {studentsPage.page} / {studentsPage.totalPages}
                    </span>
                    <button
                      className="rounded-lg bg-slate-900/60 px-3 py-2 transition hover:bg-slate-800/70 disabled:opacity-40"
                      onClick={() => goToPage(studentsPage.page + 1)}
                      disabled={studentsPage.page >= studentsPage.totalPages}
                    >
                      {copy.nextPage}
                    </button>
                  </div>
                </>
              )}

              {studentsView === 'create' && (
                <StudentFormPage mode="create" onCancel={closeFormPage} onSubmit={handleCreateStudent} language={language} />
              )}

              {studentsView === 'edit' && (
                <StudentFormPage
                  mode="edit"
                  initialStudent={editingStudent}
                  onCancel={closeFormPage}
                  onSubmit={handleUpdateStudent}
                  language={language}
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
