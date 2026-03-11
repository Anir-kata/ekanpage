import { useMemo, useState } from 'react'
import { AddStudentForm } from './components/AddStudentForm'
import { StudentList } from './components/StudentList'
import { Tabs, type TabKey } from './components/Tabs'
import { mockStudents } from './data/mockStudents'
import type { Student } from './types/student'

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard')
  const [students, setStudents] = useState<Student[]>(mockStudents)

  const totalSessions = useMemo(
    () => students.reduce((acc, student) => acc + student.sessionsDone, 0),
    [students],
  )

  const addStudent = (student: Student) => {
    setStudents((prev) => [student, ...prev])
    setActiveTab('students')
  }

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-[-80px] top-[-90px] h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-60px] right-[-40px] h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl" />

      <header className="panel scan-line relative rounded-3xl p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/90">Math Mentor Interface v1.0</p>
        <h1 className="hud-title mt-3 text-2xl font-black text-slate-100 sm:text-3xl lg:text-4xl">
          Command Center: Student Tracking
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Control panel futuriste pour gerer tes eleves, visualiser les progres et piloter tes sessions.
        </p>
      </header>

      <section className="panel mt-6 rounded-2xl p-4">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
      </section>

      {activeTab === 'dashboard' && (
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

      {activeTab === 'students' && (
        <section className="mt-6">
          <StudentList students={students} />
        </section>
      )}

      {activeTab === 'add' && (
        <section className="mt-6">
          <AddStudentForm onAddStudent={addStudent} />
        </section>
      )}
    </main>
  )
}

export default App
